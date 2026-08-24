<script lang="ts">
	import { RatingGroup } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsItemProps = ComponentProps<typeof RatingGroup.Item>;

	interface Props extends Omit<BitsItemProps, 'class'> {
		/** Extra classes merged onto the item. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits sets `data-state` to active, partial or inactive, so a half-star reading
  is expressible. The item is decorative on its own — the accessible value comes
  from Root's slider role, which is why you name and describe the ROOT, not each
  star.
-->
<RatingGroup.Item
	class={['sve-rating-group__item', cls].filter(Boolean).join(' ')}
	data-slot="rating-group-item"
	{children}
	{...rest}
/>

<style>
	:global(.sve-rating-group__item) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		border: none;
		background-color: transparent;
		font-size: inherit;
		line-height: 1;
		color: var(--sve-color-default-border);
		cursor: pointer;
		transition:
			color 0.15s ease,
			transform 0.15s ease;
	}

	:global(.sve-rating-group__item[data-state='active']),
	:global(.sve-rating-group__item[data-state='partial']) {
		color: var(--sve-color-warning);
	}

	:global(.sve-rating-group__item[data-state='partial']) {
		opacity: 0.6;
	}

	:global(.sve-rating-group__item:hover:not([data-disabled])) {
		transform: scale(1.1);
	}

	:global(.sve-rating-group__item[data-disabled]) {
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-rating-group__item) {
			transition: none;
		}
		:global(.sve-rating-group__item:hover:not([data-disabled])) {
			transform: none;
		}
	}
</style>
