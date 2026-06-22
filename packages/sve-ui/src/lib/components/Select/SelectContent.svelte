<script lang="ts">
  import { Select } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Select.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-select__content', cls].filter(Boolean).join(' '));
</script>

<Select.Portal>
  <Select.Content class={className} data-slot="select-content" {...rest} />
</Select.Portal>

<style>
  :global(.sve-select__content) {
    z-index: 60;
    min-width: var(--bits-select-anchor-width, 8rem);
    max-height: 18rem;
    overflow-y: auto;
    padding: var(--sve-space-1);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: var(--sve-color-default-surface);
    box-shadow: var(--sve-shadow-md);
    font-family: var(--sve-font-family-sans);
  }
</style>
