<script lang="ts">
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { HTMLAttributes } from 'svelte/elements';
	import ToastItem from './ToastItem.svelte';
	import { toasts, pauseAll, resumeAll, setLimit } from './store.svelte.js';

	type Position =
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/**
		 * Names the notification region. An unnamed landmark is announced as
		 * nothing, and this one is present from first render whether or not there
		 * is anything in it.
		 * @default 'Notifications'
		 */
		label?: string;
		/** Where the stack sits. @default 'bottom-right' */
		position?: Position;
		/**
		 * How many toasts may be on screen. Beyond this the oldest is dropped —
		 * the newest message is the one the user is waiting for.
		 * @default 5
		 */
		max?: number;
		/** Base label for each dismiss button, for translation. @default 'Dismiss' */
		dismissLabel?: string;
		/** Extra classes merged onto the region. */
		class?: string;
	}

	let {
		label = 'Notifications',
		position = 'bottom-right',
		max = 5,
		dismissLabel = 'Dismiss',
		class: cls,
		...rest
	}: Props = $props();

	// Applied at init, NOT only in an `$effect`. Effects flush after mount, so a
	// `toast()` called in the same tick the Viewport mounts — or before the first
	// effect runs at all — would be capped by the default instead of by `max`.
	// The effect then keeps it in sync when the prop changes.
	setLimit(untrack(() => max));
	$effect(() => setLimit(max));

	// Svelte transitions run regardless of the user's motion preference, so it
	// has to be read. Motion that cannot be turned off is a barrier for people
	// who get motion sickness from it, not a decoration.
	const reduceMotion =
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const flyDistance = $derived(position.startsWith('top') ? -24 : 24);
	const flyDuration = $derived(reduceMotion ? 0 : 200);
</script>

<!--
  The required mount point. The imperative `toast()` call enqueues; this decides
  where the stack lives, how loudly it is announced and how many fit — so the
  API is an imperative trigger with a declarative placement, not a global that
  paints itself wherever it likes.

  Mount it ONCE, high in the layout.

  The `<ol>` is a persistent live region: it exists from first render, empty,
  because assistive technology announces additions to a region it was already
  observing. Creating the region and its content at the same moment is the
  classic reason a toast is silent.

  Politeness is fixed at polite on purpose. `assertive` interrupts whatever is
  being read, and anything that earns an interruption is too important to
  auto-dismiss — that is an `Alert` you render inline, or an `AlertDialog`. A
  toast is for what the user can afford to miss.
-->
<!--
  A named `<section>` IS a region — no explicit role, which `<ol>` does not
  allow anyway (it already carries an implicit `list` role, and axe rejects the
  override). The list inside it is the live region.
-->
<section
	class={['sve-toast-viewport', `sve-toast-viewport--${position}`, cls].filter(Boolean).join(' ')}
	aria-label={label}
	onpointerenter={pauseAll}
	onpointerleave={resumeAll}
	onfocusin={pauseAll}
	onfocusout={resumeAll}
	{...rest}
>
	<ol class="sve-toast-viewport__list" aria-live="polite" aria-relevant="additions">
		{#each toasts as item (item.id)}
			<li transition:fly={{ y: flyDistance, duration: flyDuration }}>
				<ToastItem {item} {dismissLabel} />
			</li>
		{/each}
	</ol>
</section>

<style>
	.sve-toast-viewport {
		position: fixed;
		z-index: var(--sve-toast-z-index, 100);
		padding: var(--sve-space-4);
		width: min(var(--sve-toast-width, 22rem), calc(100vw - 2 * var(--sve-space-4)));
		/*
      The container spans a corner but must not swallow clicks on the page
      behind it; each toast turns pointer events back on for itself.
    */
		pointer-events: none;
	}

	.sve-toast-viewport__list {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.sve-toast-viewport--top-left {
		top: 0;
		left: 0;
	}
	.sve-toast-viewport--top-center {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.sve-toast-viewport--top-right {
		top: 0;
		right: 0;
	}
	.sve-toast-viewport--bottom-left {
		bottom: 0;
		left: 0;
	}
	.sve-toast-viewport--bottom-center {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.sve-toast-viewport--bottom-right {
		bottom: 0;
		right: 0;
	}

	/* Newest nearest the edge the stack grows from. */
	:global(.sve-toast-viewport--bottom-left .sve-toast-viewport__list),
	:global(.sve-toast-viewport--bottom-center .sve-toast-viewport__list),
	:global(.sve-toast-viewport--bottom-right .sve-toast-viewport__list) {
		flex-direction: column-reverse;
	}
</style>
