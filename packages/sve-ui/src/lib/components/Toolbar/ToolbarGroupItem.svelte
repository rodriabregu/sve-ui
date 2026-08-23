<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupItemProps = ComponentProps<typeof Toolbar.GroupItem>;

  interface Props extends Omit<BitsGroupItemProps, 'class'> {
    /** Extra classes merged onto the item. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Icon-only items need `aria-label`. Bits sets data-state on/off. -->
<Toolbar.GroupItem
  class={['sve-toolbar__group-item', cls].filter(Boolean).join(' ')}
  data-slot="toolbar-group-item"
  {children}
  {...rest}
/>

<style>
  :global(.sve-toolbar__group-item) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    min-width: 2rem;
    padding: 0 var(--sve-space-2);
    border: none;
    border-radius: var(--sve-radius-sm);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  :global(.sve-toolbar__group-item:hover:not(:disabled)) {
    background-color: var(--sve-color-default);
  }

  :global(.sve-toolbar__group-item[data-state='on']) {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
  }

  :global(.sve-toolbar__group-item:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
  }

  :global(.sve-toolbar__group-item:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-toolbar__group-item) {
      transition: none;
    }
  }
</style>
