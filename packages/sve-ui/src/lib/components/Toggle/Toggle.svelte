<script module lang="ts">
	export type Size = 'sm' | 'md' | 'lg';
	export type Variant = 'outline' | 'ghost';
</script>

<script lang="ts">
	// Aliased: a component named `Toggle` that also imports `Toggle` collapses its
	// generated type to `any`. See scripts/check-dts.mjs.
	import { Toggle as TogglePrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof TogglePrimitive.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'pressed' | 'disabled'> {
		/**
		 * Whether the toggle is pressed. Bindable.
		 * @default false
		 */
		pressed?: boolean;
		/**
		 * @default false
		 */
		disabled?: boolean;
		/** @default 'md' */
		size?: Size;
		/** @default 'outline' */
		variant?: Variant;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	let {
		pressed = $bindable(false),
		disabled = false,
		size = 'md',
		variant = 'outline',
		class: cls,
		...rest
	}: Props = $props();

	const className = $derived(
		['sve-toggle', `sve-toggle--${variant}`, `sve-toggle--${size}`, cls].filter(Boolean).join(' ')
	);
</script>

<!--
  Accessibility: Bits renders a <button> and owns `aria-pressed` plus the
  `data-state` on/off attribute. An icon-only toggle needs an `aria-label`,
  which passes through the spread.
-->
<TogglePrimitive.Root bind:pressed {disabled} class={className} data-slot="toggle" {...rest} />

<style>
	:global(.sve-toggle) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--sve-space-2);
		border: 1px solid transparent;
		border-radius: var(--sve-radius-md);
		font-family: var(--sve-font-family-sans);
		font-weight: var(--sve-font-weight-medium);
		line-height: var(--sve-line-height-tight);
		color: var(--sve-color-default-foreground);
		background-color: transparent;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	/* --- Sizes --- */
	:global(.sve-toggle--sm) {
		height: 2rem;
		padding: 0 var(--sve-space-2);
		font-size: var(--sve-font-size-sm);
	}
	:global(.sve-toggle--md) {
		height: 2.5rem;
		padding: 0 var(--sve-space-3);
		font-size: var(--sve-font-size-md);
	}
	:global(.sve-toggle--lg) {
		height: 3rem;
		padding: 0 var(--sve-space-4);
		font-size: var(--sve-font-size-lg);
	}

	/* --- Variants (off state) --- */
	:global(.sve-toggle--outline) {
		border-color: var(--sve-color-default-border);
	}
	:global(.sve-toggle--ghost) {
		border-color: transparent;
	}

	:global(.sve-toggle:hover:not(:disabled)) {
		background-color: var(--sve-color-default-surface);
	}

	/* --- On state: Bits sets data-state="on" --- */
	:global(.sve-toggle[data-state='on']) {
		background-color: var(--sve-color-primary-surface);
		border-color: var(--sve-color-primary-border);
		color: var(--sve-color-primary);
	}

	:global(.sve-toggle[data-state='on']:hover:not(:disabled)) {
		background-color: var(--sve-color-primary-surface);
		border-color: var(--sve-color-primary);
	}

	:global(.sve-toggle:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	:global(.sve-toggle:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-toggle) {
			transition: none;
		}
	}
</style>
