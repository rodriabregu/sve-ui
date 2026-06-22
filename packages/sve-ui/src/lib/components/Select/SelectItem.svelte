<script lang="ts">
  import { Select } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof Select.Item>;

  // `value` (required) and `label` flow through ...rest; the selected check is
  // rendered via CSS (::after on [data-selected]) to avoid shadowing the
  // children snippet.
  interface Props extends Omit<BitsItemProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-select__item', cls].filter(Boolean).join(' '));
</script>

<Select.Item class={className} data-slot="select-item" {...rest} />

<style>
  :global(.sve-select__item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
    padding: var(--sve-space-2) var(--sve-space-3);
    border-radius: var(--sve-radius-sm);
    color: var(--sve-color-default-foreground);
    font-size: var(--sve-font-size-md);
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  :global(.sve-select__item[data-highlighted]) {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
  }

  :global(.sve-select__item[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  :global(.sve-select__item[data-selected])::after {
    content: '✓';
    color: var(--sve-color-primary);
    font-weight: var(--sve-font-weight-bold);
  }
</style>
