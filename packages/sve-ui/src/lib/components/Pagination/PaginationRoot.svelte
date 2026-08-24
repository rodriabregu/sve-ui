<script lang="ts">
	import { Pagination } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof Pagination.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'page'> {
		/** Current page number. Bindable. */
		page?: number;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	// `page` must be destructured and passed as `bind:page`. Forwarding it in the
	// spread makes it one-way, so clicking a page would never reach the caller.
	let { page = $bindable(1), class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Root exposes a `pages` snippet prop, so the consumer renders the buttons:

    <Pagination.Root count={100} perPage={10} bind:page>
      {#snippet children({ pages, currentPage })}
        …
      {/snippet}
    </Pagination.Root>

  That indirection is what lets Bits own the ellipsis logic and keyboard
  navigation while you keep control of the markup.

  Wrap it in a <nav aria-label="Pagination"> so the region is announced.
-->
<Pagination.Root
	bind:page
	class={['sve-pagination', cls].filter(Boolean).join(' ')}
	data-slot="pagination"
	{children}
	{...rest}
/>

<style>
	:global(.sve-pagination) {
		display: flex;
		align-items: center;
		gap: var(--sve-space-1);
		font-family: var(--sve-font-family-sans);
	}
</style>
