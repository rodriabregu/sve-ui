<script lang="ts">
  import { Combobox } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof Combobox.Item>;

  // `value` (required) and `label` flow through ...rest; the selected check is
  // rendered via CSS (::after on [data-selected]) to avoid shadowing children.
  interface Props extends Omit<BitsItemProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-combobox__item', cls].filter(Boolean).join(' '));
</script>

<Combobox.Item class={className} data-slot="combobox-item" {...rest} />

<style>
  :global(.sve-combobox__item) {
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

  :global(.sve-combobox__item[data-highlighted]) {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
  }

  :global(.sve-combobox__item[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  :global(.sve-combobox__item[data-selected])::after {
    content: '✓';
    color: var(--sve-color-primary);
    font-weight: var(--sve-font-weight-bold);
  }
</style>
