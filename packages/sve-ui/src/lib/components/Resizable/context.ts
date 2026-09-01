import { setContext, getContext } from 'svelte';

const RESIZABLE_CONTEXT_KEY = Symbol('sve-ui:resizable');

export type Direction = 'horizontal' | 'vertical';

/**
 * A pane's limits, passed as GETTERS.
 *
 * Registration happens once, at init, because the Handle beside a pane needs its
 * index and id on first render. Snapshotting the numbers there would freeze them:
 * a consumer whose `min` depends on state would change it and the group would go
 * on clamping against the old value. Getters keep registration one-time and the
 * limits live.
 */
export interface PaneRegistration {
	/** Smallest share of the group this pane accepts, in percent. */
	readonly min: number;
	/** Largest share, in percent. */
	readonly max: number;
}

export interface ResizableContext {
	readonly direction: Direction;
	/** Current size of every pane, in percent, in DOM order. */
	readonly sizes: number[];
	/** Registers a pane and returns its index. */
	register(reg: PaneRegistration): number;
	/** Size of one pane, for its `flex-basis`. */
	sizeOf(index: number): number;
	/** Ids so a Handle can point `aria-controls` at the pane it resizes. */
	idOf(index: number): string;
	/**
	 * Moves the boundary between `index` and `index + 1` by a delta in percent.
	 * Clamped by both panes' own limits, so a drag past a minimum stops rather
	 * than pushing the other pane out of the group.
	 */
	resize(index: number, deltaPercent: number): void;
	/** The group element, so a Handle can convert pixels to percent. */
	readonly element: HTMLElement | undefined;
}

export function setResizableContext(ctx: ResizableContext): void {
	setContext(RESIZABLE_CONTEXT_KEY, ctx);
}

/**
 * Reads the resizable context.
 *
 * Returns undefined outside a `Resizable.Group`, so a Pane rendered on its own
 * still renders instead of throwing.
 */
export function useResizable(): ResizableContext | undefined {
	return getContext<ResizableContext>(RESIZABLE_CONTEXT_KEY);
}
