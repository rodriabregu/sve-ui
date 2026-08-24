<script module lang="ts">
	export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { RatingGroup } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof RatingGroup.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value'> {
		/**
		 * Current rating. Bindable.
		 * @default 0
		 */
		value?: number;
		/** @default 'md' */
		size?: Size;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	// `value` must be destructured and passed as `bind:value`. Forwarding it in
	// the spread makes it one-way, so clicking a star would not reach the caller.
	let { value = $bindable(0), size = 'md', class: cls, children, ...rest }: Props = $props();

	const className = $derived(
		['sve-rating-group', `sve-rating-group--${size}`, cls].filter(Boolean).join(' ')
	);
</script>

<!--
  Bits gives this a slider role with aria-value*, so arrow keys adjust the
  rating — it is a real input, not a row of clickable icons.

  Two things you must supply:
    - a NAME, via `aria-label` — "Rating" at minimum.
    - `aria-valuetext`, ideally as a function: (value, max) => `${value} of
      ${max} stars`. Without it the rating is announced as a bare number, and
      "3" tells the user nothing about the scale.

  Root hands you an `items` array through a snippet, each with an `index` and a
  `state` of active / partial / inactive, so you render the icons.
-->
<RatingGroup.Root bind:value class={className} data-slot="rating-group" {children} {...rest} />

<style>
	:global(.sve-rating-group) {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		font-family: var(--sve-font-family-sans);
	}

	:global(.sve-rating-group[data-orientation='vertical']) {
		flex-direction: column;
	}

	:global(.sve-rating-group:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
		border-radius: var(--sve-radius-sm);
	}

	:global(.sve-rating-group[data-disabled]) {
		opacity: 0.5;
	}

	/* --- Sizes drive the item icon size --- */
	:global(.sve-rating-group--sm) {
		font-size: 1rem;
	}
	:global(.sve-rating-group--md) {
		font-size: 1.25rem;
	}
	:global(.sve-rating-group--lg) {
		font-size: 1.75rem;
	}
</style>
