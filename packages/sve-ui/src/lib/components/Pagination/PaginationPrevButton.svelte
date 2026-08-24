<script lang="ts">
	import { Pagination } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsPrevProps = ComponentProps<typeof Pagination.PrevButton>;

	interface Props extends Omit<BitsPrevProps, 'class'> {
		/** Extra classes merged onto the button. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits disables this on the first page. An arrow-only button has no accessible
  name, so pass `aria-label="Previous page"` when there is no text.
-->
<Pagination.PrevButton
	class={['sve-pagination__nav', cls].filter(Boolean).join(' ')}
	data-slot="pagination-prev"
	{children}
	{...rest}
/>

<style>
	:global(.sve-pagination__nav) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2rem;
		padding: 0 var(--sve-space-2);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-sm);
		background-color: transparent;
		font-family: inherit;
		font-size: var(--sve-font-size-sm);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.sve-pagination__nav:hover:not(:disabled)) {
		background-color: var(--sve-color-default-surface);
	}

	:global(.sve-pagination__nav:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.sve-pagination__nav:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-pagination__nav) {
			transition: none;
		}
	}
</style>
