<script module lang="ts">
	export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { Switch } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof Switch.Root>;

	interface Props extends Omit<BitsRootProps, 'class'> {
		size?: Size;
		/**
		 * Marks the control as failing validation.
		 *
		 * Always applies the invalid styling. Also sets `aria-invalid`, which this element's `switch` role supports.
		 *
		 * Prefer letting `Field` drive this: passing `Field` an `error` is what makes
		 * a field invalid, so the message the user reads and the state of the control
		 * cannot disagree.
		 * @default false
		 */
		invalid?: boolean;
		class?: string;
	}

	let {
		invalid = false,
		size = 'md',
		checked = $bindable(false),
		class: cls,
		...rest
	}: Props = $props();

	const className = $derived(
		['sve-switch', invalid && 'sve-switch--invalid', `sve-switch--${size}`, cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<Switch.Root
	bind:checked
	class={className}
	aria-invalid={invalid ? true : undefined}
	data-slot="switch"
	{...rest}
>
	<Switch.Thumb class="sve-switch__thumb" data-slot="switch-thumb" />
</Switch.Root>

<style>
	:global(.sve-switch) {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		padding: 2px;
		border: none;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.sve-switch[data-state='checked']) {
		background-color: var(--sve-color-primary);
	}

	:global(.sve-switch:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	:global(.sve-switch:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.sve-switch__thumb) {
		display: block;
		border-radius: var(--sve-radius-full);
		background-color: #ffffff;
		box-shadow: var(--sve-shadow-sm);
		transition: transform 0.15s ease;
		transform: translateX(0);
	}

	/* --- Sizes (track height/width + thumb size + travel) --- */
	:global(.sve-switch--sm) {
		width: 2rem;
		height: 1.25rem;
	}
	:global(.sve-switch--sm .sve-switch__thumb) {
		width: 1rem;
		height: 1rem;
	}
	:global(.sve-switch--sm[data-state='checked'] .sve-switch__thumb) {
		transform: translateX(0.75rem);
	}

	:global(.sve-switch--md) {
		width: 2.5rem;
		height: 1.5rem;
	}
	:global(.sve-switch--md .sve-switch__thumb) {
		width: 1.25rem;
		height: 1.25rem;
	}
	:global(.sve-switch--md[data-state='checked'] .sve-switch__thumb) {
		transform: translateX(1rem);
	}

	:global(.sve-switch--lg) {
		width: 3rem;
		height: 1.75rem;
	}
	:global(.sve-switch--lg .sve-switch__thumb) {
		width: 1.5rem;
		height: 1.5rem;
	}
	:global(.sve-switch--lg[data-state='checked'] .sve-switch__thumb) {
		transform: translateX(1.25rem);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-switch),
		:global(.sve-switch__thumb) {
			transition: none;
		}
	}

	/*
		A ring rather than a border: these controls have no border to recolour, and
		colour alone is not a sufficient signal anyway — `Field` supplies the text.
	*/
	:global(.sve-switch--invalid) {
		outline: 2px solid var(--sve-color-danger);
		outline-offset: 2px;
		border-radius: var(--sve-radius-sm);
	}
</style>
