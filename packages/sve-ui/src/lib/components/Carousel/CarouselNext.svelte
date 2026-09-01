<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useCarousel } from './context.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'aria-label'> {
		/** Accessible name. Defaults to "Previous slide". */
		label?: string;
		/** Extra classes merged onto the button. */
		class?: string;
		children?: Snippet;
	}

	let { label = 'Next slide', class: cls, children, ...rest }: Props = $props();

	const ctx = useCarousel();
	const className = $derived(['sve-carousel__control', cls].filter(Boolean).join(' '));
</script>

<!--
  `disabled`, not hidden.

  A control that vanishes at the ends changes the tab order under the user and
  moves the control beside it, which is disorienting for anyone navigating by
  keyboard. Disabled keeps the layout still and states the boundary.
-->
<button
	type="button"
	class={className}
	aria-label={label}
	disabled={!ctx || !ctx.canScrollNext}
	onclick={() => ctx?.next()}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg
		>
	{/if}
</button>

<style>
	.sve-carousel__control {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default-surface);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			opacity 0.15s ease;
	}

	.sve-carousel__control:hover:not(:disabled) {
		background-color: var(--sve-color-default);
	}

	.sve-carousel__control:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	.sve-carousel__control:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.sve-carousel__control svg {
		width: 1rem;
		height: 1rem;
	}
</style>
