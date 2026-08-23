<script lang="ts">
  // Bits re-exports the SAME `menu/components/menu-item.svelte` under both
  // DropdownMenu.Item and ContextMenu.Item, so one styled wrapper serves both.
  // The menu context comes from whichever Root wraps it.
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof DropdownMenu.Item>;

  interface Props extends Omit<BitsItemProps, 'class'> {
    /** Extra classes merged onto the item. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<DropdownMenu.Item
  class={['sve-menu-item', cls].filter(Boolean).join(' ')}
  data-slot="menu-item"
  {children}
  {...rest}
/>

<style>
  :global(.sve-menu-item) {
    display: flex;
    align-items: center;
    gap: var(--sve-space-2);
    cursor: default;
    padding: var(--sve-space-1) var(--sve-space-2);
    border-radius: var(--sve-radius-sm);
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground, #1a202c);
    outline: none;
  }

  /* Bits sets data-highlighted for both hover and keyboard focus, so pointer
     and keyboard users get the same affordance from one rule. */
  :global(.sve-menu-item[data-highlighted]) {
    background-color: var(--sve-color-primary-surface, #fff5f5);
    color: var(--sve-color-default-foreground, #1a202c);
  }

  :global(.sve-menu-item[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
