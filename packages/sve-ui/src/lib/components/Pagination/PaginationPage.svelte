<script lang="ts">
  import { Pagination } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsPageProps = ComponentProps<typeof Pagination.Page>;

  interface Props extends Omit<BitsPageProps, 'class'> {
    /** Extra classes merged onto the page button. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits marks the active page with `data-selected` and wires `aria-label`, so the
  current page is announced rather than only coloured differently.
-->
<Pagination.Page
  class={['sve-pagination__page', cls].filter(Boolean).join(' ')}
  data-slot="pagination-page"
  {children}
  {...rest}
/>

<style>
  :global(.sve-pagination__page) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 var(--sve-space-2);
    border: 1px solid transparent;
    border-radius: var(--sve-radius-sm);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  :global(.sve-pagination__page:hover:not(:disabled)) {
    background-color: var(--sve-color-default-surface);
  }

  :global(.sve-pagination__page[data-selected]) {
    background-color: var(--sve-color-primary);
    border-color: var(--sve-color-primary);
    color: var(--sve-color-primary-foreground);
  }

  :global(.sve-pagination__page:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-pagination__page) {
      transition: none;
    }
  }
</style>
