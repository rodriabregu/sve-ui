<script module lang="ts">
	export type Side = 'left' | 'right' | 'top' | 'bottom';
	export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import SheetOverlay from './SheetOverlay.svelte';

	type BitsContentProps = ComponentProps<typeof Dialog.Content>;

	interface Props extends Omit<BitsContentProps, 'class'> {
		/**
		 * Which edge the panel slides in from.
		 * @default 'right'
		 */
		side?: Side;
		/**
		 * Panel thickness — width for left/right, height for top/bottom.
		 * @default 'md'
		 */
		size?: Size;
		/** Extra classes merged onto the panel. */
		class?: string;
	}

	let { side = 'right', size = 'md', class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A Sheet is a Dialog anchored to an edge, not a separate primitive — so it
  inherits the focus trap, ESC handling and ARIA from Bits Dialog rather than
  reimplementing them. Pair it with `Sheet.Title`, which Bits points
  `aria-labelledby` at.
-->
<Dialog.Portal>
	<SheetOverlay />
	<Dialog.Content
		class={['sve-sheet', `sve-sheet--${side}`, `sve-sheet--${size}`, cls].filter(Boolean).join(' ')}
		data-slot="sheet-content"
		data-side={side}
		{children}
		{...rest}
	/>
</Dialog.Portal>

<style>
	:global(.sve-sheet) {
		position: fixed;
		z-index: 51;
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-4);
		overflow-y: auto;
		background-color: var(--sve-color-default-surface, #fff);
		box-shadow: var(--sve-shadow-md);
		padding: var(--sve-space-6);
		outline: none;
	}

	/* --- Sides: pinned to an edge, spanning the perpendicular axis --- */
	:global(.sve-sheet--right) {
		top: 0;
		right: 0;
		height: 100vh;
		border-top-left-radius: var(--sve-radius-lg);
		border-bottom-left-radius: var(--sve-radius-lg);
	}
	:global(.sve-sheet--left) {
		top: 0;
		left: 0;
		height: 100vh;
		border-top-right-radius: var(--sve-radius-lg);
		border-bottom-right-radius: var(--sve-radius-lg);
	}
	:global(.sve-sheet--top) {
		top: 0;
		left: 0;
		width: 100vw;
		border-bottom-left-radius: var(--sve-radius-lg);
		border-bottom-right-radius: var(--sve-radius-lg);
	}
	:global(.sve-sheet--bottom) {
		bottom: 0;
		left: 0;
		width: 100vw;
		border-top-left-radius: var(--sve-radius-lg);
		border-top-right-radius: var(--sve-radius-lg);
	}

	/* --- Sizes apply to the axis the panel actually grows on --- */
	:global(.sve-sheet--left.sve-sheet--sm),
	:global(.sve-sheet--right.sve-sheet--sm) {
		width: min(90vw, 18rem);
	}
	:global(.sve-sheet--left.sve-sheet--md),
	:global(.sve-sheet--right.sve-sheet--md) {
		width: min(90vw, 24rem);
	}
	:global(.sve-sheet--left.sve-sheet--lg),
	:global(.sve-sheet--right.sve-sheet--lg) {
		width: min(90vw, 32rem);
	}

	:global(.sve-sheet--top.sve-sheet--sm),
	:global(.sve-sheet--bottom.sve-sheet--sm) {
		height: min(85vh, 12rem);
	}
	:global(.sve-sheet--top.sve-sheet--md),
	:global(.sve-sheet--bottom.sve-sheet--md) {
		height: min(85vh, 18rem);
	}
	:global(.sve-sheet--top.sve-sheet--lg),
	:global(.sve-sheet--bottom.sve-sheet--lg) {
		height: min(85vh, 26rem);
	}
</style>
