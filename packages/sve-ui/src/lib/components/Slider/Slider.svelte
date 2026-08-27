<script lang="ts">
	import { Slider } from 'bits-ui';
	import type { Component } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Self-contained slider: renders the track, filled range, and one thumb per
	 * value internally, so consumers just set `value` / `min` / `max` / `step`.
	 *
	 * Bits' Slider.Root props are a discriminated union (single vs multiple); we
	 * expose a flat surface and forward to a loosely-typed view of the root to
	 * avoid TypeScript's "union too complex" overflow.
	 */
	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
		/** @default 'single' */
		type?: 'single' | 'multiple';
		/** Current value(s). NOT bindable — read changes through `onValueChange`. */
		value?: number | number[];
		/** Called when the value changes. This is how you track the slider. */
		onValueChange?: (value: number & number[]) => void;
		/** Minimum value. */
		min?: number;
		/** Maximum value. */
		max?: number;
		/** Step increment. */
		step?: number;
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Accessible name for the thumb(s). The `role="slider"` element needs a name;
		 * in `multiple` mode each thumb gets the label suffixed with its position.
		 */
		thumbLabel?: string;
		/** Extra classes merged onto the root. */
		/**
		 * Marks the control as failing validation.
		 *
		 * Always applies the invalid styling. Does NOT set `aria-invalid`: this renders as `container; the thumb is the slider`, and ARIA does not
		 * support the attribute there, so assistive technology is free to ignore it.
		 * axe does NOT flag it either way — verified by injecting it and watching the
		 * suite still pass — so this is a decision taken from the spec, not one a
		 * tool enforces. The accessible signal comes
		 * from `Field` wiring the error message through `aria-describedby`.
		 *
		 * Prefer letting `Field` drive this: passing `Field` an `error` is what makes
		 * a field invalid, so the message the user reads and the state of the control
		 * cannot disagree.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Marks the control as required.
		 *
		 * Lands on the thumb, which is the `role="slider"` element — the container
		 * this component renders is not the slider, so the attribute would be inert
		 * there. A native `required` attribute is inert on both.
		 * @default false
		 */
		required?: boolean;
		class?: string;
	}

	let {
		required = false,
		invalid = false,
		type = 'single',
		thumbLabel,
		class: cls,
		...rest
	}: Props = $props();

	function thumbName(index: number): string | undefined {
		if (!thumbLabel) return undefined;
		return type === 'multiple' ? `${thumbLabel} ${index + 1}` : thumbLabel;
	}

	const className = $derived(
		['sve-slider', invalid && 'sve-slider--invalid', cls].filter(Boolean).join(' ')
	);

	const Root = Slider.Root as unknown as Component<Record<string, unknown>>;
</script>

<Root {type} class={className} data-slot="slider" {...rest}>
	{#snippet children({ thumbItems }: { thumbItems: { index: number; value: number }[] })}
		<span class="sve-slider__track">
			<Slider.Range class="sve-slider__range" />
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<Slider.Thumb
				index={thumb.index}
				class="sve-slider__thumb"
				aria-label={thumbName(thumb.index)}
				aria-required={required ? true : undefined}
			/>
		{/each}
	{/snippet}
</Root>

<style>
	:global(.sve-slider) {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 1.25rem;
		touch-action: none;
		user-select: none;
		cursor: pointer;
	}

	:global(.sve-slider__track) {
		position: relative;
		flex-grow: 1;
		height: 0.375rem;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default);
	}

	:global(.sve-slider__range) {
		position: absolute;
		height: 100%;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-primary);
	}

	:global(.sve-slider__thumb) {
		display: block;
		width: 1.125rem;
		height: 1.125rem;
		border-radius: var(--sve-radius-full);
		background-color: #ffffff;
		border: 1px solid var(--sve-color-default-border);
		box-shadow: var(--sve-shadow-sm);
		cursor: grab;
	}

	:global(.sve-slider__thumb:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	:global(.sve-slider[data-disabled]) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/*
		A ring rather than a border: these controls have no border to recolour, and
		colour alone is not a sufficient signal anyway — `Field` supplies the text.
	*/
	:global(.sve-slider--invalid) {
		outline: 2px solid var(--sve-color-danger);
		outline-offset: 2px;
		border-radius: var(--sve-radius-sm);
	}
</style>
