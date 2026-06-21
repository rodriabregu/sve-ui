<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof DropdownMenu.Item>;

  interface Props extends Omit<BitsItemProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<DropdownMenu.Item
  class={['sve-dropdown-item', cls].filter(Boolean).join(' ')}
  {children}
  {...rest}
/>

<style>
  :global(.sve-dropdown-item) {
    cursor: default;
    padding: var(--sve-space-1) var(--sve-space-2);
    border-radius: var(--sve-radius-sm);
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground, #1a202c);
    outline: none;
  }

  :global(.sve-dropdown-item[data-highlighted]) {
    background-color: var(--sve-color-primary-surface, #fff5f5);
    color: var(--sve-color-default-foreground, #1a202c);
  }

  :global(.sve-dropdown-item[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
