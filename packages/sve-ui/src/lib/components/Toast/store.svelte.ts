/**
 * The toast queue — the library's ONLY piece of mutable module-level state.
 *
 * That is a deliberate exception, and it is worth saying why. A toast does not
 * notify state, it notifies an EVENT: a fetch resolved, a socket message
 * arrived, a form action came back. State lives in the component tree; the
 * event happens in a `catch`. And the argument that settles it is not
 * ergonomics — an imperative call is reachable from code that is not a
 * component at all (a `fetch` wrapper, an interceptor, a `load` function),
 * where a context-based API simply cannot be used.
 *
 * The cost is that module state is shared across requests on the server. A
 * toast enqueued during SSR would leak into another user's response, so every
 * mutator below refuses to run there. That is enforced, not documented and
 * hoped for.
 */

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastAction {
	/** Visible label. Say what it does — "Undo", not "OK". */
	label: string;
	/** Runs on activation. The toast is dismissed afterwards. */
	onclick: () => void;
}

export interface ToastOptions {
	/** Secondary line. Keep the title readable on its own — this may be skipped. */
	description?: string;
	/**
	 * Milliseconds before it dismisses itself, or `Infinity` to keep it until the
	 * user acts.
	 *
	 * Defaults to 5000, EXCEPT when the toast carries an `action`: then it
	 * defaults to `Infinity`. A disappearing toast that holds the only copy of an
	 * action is a control the user can lose a race against, so opting into that
	 * has to be explicit.
	 */
	duration?: number;
	/** Render a dismiss button. @default true */
	dismissible?: boolean;
	/** A single action. Mirror it somewhere permanent if it matters. */
	action?: ToastAction;
}

export interface ToastItem {
	readonly id: string;
	readonly title: string;
	readonly description?: string;
	readonly variant: ToastVariant;
	readonly duration: number;
	readonly dismissible: boolean;
	readonly action?: ToastAction;
}

/** The live queue. `Toast.Viewport` renders it; nothing else should mutate it. */
export const toasts = $state<ToastItem[]>([]);

const DEFAULT_DURATION = 5000;

let seq = 0;
let limit = 5;

interface Timer {
	handle: ReturnType<typeof setTimeout>;
	/** Milliseconds still owed when paused. */
	remaining: number;
	startedAt: number;
}

/*
  Timers are bookkeeping, not state: nothing renders from this map, and no
  `$derived` or template reads it. A SvelteMap would add proxy overhead and a
  reactive dependency for a value whose only job is holding setTimeout handles.
*/
// eslint-disable-next-line svelte/prefer-svelte-reactivity
const timers = new Map<string, Timer>();

/**
 * Enqueuing during server rendering would put one user's toast in another
 * user's HTML, so it is refused. It is reported loudly rather than thrown:
 * a toast is by definition not essential to the page, and taking the render
 * down over one is a worse outcome than the missing notification.
 */
function refusedOnServer(): boolean {
	if (typeof window !== 'undefined') return false;
	console.error(
		'[sve-ui] toast() was called during server rendering and ignored. The queue ' +
			'is module state, so a toast enqueued on the server would leak into another ' +
			"request's response. Move the call into an event handler, `onMount`, or a " +
			'client-only module.'
	);
	return true;
}

function clearTimer(id: string): void {
	const timer = timers.get(id);
	if (!timer) return;
	clearTimeout(timer.handle);
	timers.delete(id);
}

function startTimer(id: string, remaining: number): void {
	if (!Number.isFinite(remaining)) return;
	timers.set(id, {
		handle: setTimeout(() => dismiss(id), remaining),
		remaining,
		startedAt: Date.now()
	});
}

function add(variant: ToastVariant, title: string, options: ToastOptions = {}): string {
	if (refusedOnServer()) return '';

	const id = `sve-toast-${++seq}`;
	const item: ToastItem = {
		id,
		title,
		description: options.description,
		variant,
		// An action changes the default, because the user has to be able to reach
		// it. Passing a duration explicitly overrides that on purpose.
		duration: options.duration ?? (options.action ? Infinity : DEFAULT_DURATION),
		dismissible: options.dismissible ?? true,
		action: options.action
	};

	toasts.push(item);

	// Oldest goes first: the newest message is the one the user is waiting for.
	while (toasts.length > limit) {
		const evicted = toasts.shift();
		if (evicted) clearTimer(evicted.id);
	}

	startTimer(id, item.duration);
	return id;
}

/** Remove one toast. Safe to call for an id that is already gone. */
export function dismiss(id: string): void {
	clearTimer(id);
	const index = toasts.findIndex((t) => t.id === id);
	if (index !== -1) toasts.splice(index, 1);
}

/** Remove every toast. */
export function clear(): void {
	for (const id of timers.keys()) clearTimeout(timers.get(id)!.handle);
	timers.clear();
	toasts.length = 0;
}

/**
 * Freeze every countdown. `Toast.Viewport` calls this on hover and on focus.
 *
 * Focus matters as much as hover: someone reading a toast with a screen reader,
 * or tabbing towards its action, is not moving a pointer — and having the
 * message pulled away mid-sentence is the same defect either way.
 */
export function pauseAll(): void {
	const now = Date.now();
	for (const [id, timer] of timers) {
		clearTimeout(timer.handle);
		timers.set(id, {
			...timer,
			remaining: Math.max(0, timer.remaining - (now - timer.startedAt))
		});
	}
}

/** Resume every countdown from where it was paused. */
export function resumeAll(): void {
	for (const [id, timer] of timers) startTimer(id, timer.remaining);
}

/**
 * How many toasts may be on screen. Set from `Toast.Viewport`'s `max` prop —
 * the Viewport is the single required mount point, so it owns this.
 */
export function setLimit(next: number): void {
	limit = Math.max(1, Math.floor(next));
	while (toasts.length > limit) {
		const evicted = toasts.shift();
		if (evicted) clearTimer(evicted.id);
	}
}

/** Test seam: drops all state, including the id counter. */
export function reset(): void {
	clear();
	seq = 0;
	limit = 5;
}

interface ToastApi {
	(title: string, options?: ToastOptions): string;
	info(title: string, options?: ToastOptions): string;
	success(title: string, options?: ToastOptions): string;
	warning(title: string, options?: ToastOptions): string;
	error(title: string, options?: ToastOptions): string;
	dismiss(id: string): void;
	clear(): void;
}

/**
 * Show a toast. Requires a `<Toast.Viewport />` mounted somewhere, once —
 * without it these calls queue into a list nothing renders.
 *
 *   toast.success('Project saved');
 *   toast.error('Upload failed', { description: 'The file is over 10 MB.' });
 *   toast('Copied', { duration: 2000 });
 */
export const toast: ToastApi = Object.assign(
	(title: string, options?: ToastOptions) => add('info', title, options),
	{
		info: (title: string, options?: ToastOptions) => add('info', title, options),
		success: (title: string, options?: ToastOptions) => add('success', title, options),
		warning: (title: string, options?: ToastOptions) => add('warning', title, options),
		error: (title: string, options?: ToastOptions) => add('error', title, options),
		dismiss,
		clear
	}
);
