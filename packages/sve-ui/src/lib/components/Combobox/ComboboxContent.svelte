<script lang="ts">
  import { Combobox } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Combobox.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-combobox__content', cls].filter(Boolean).join(' '));
</script>

<Combobox.Portal>
  <Combobox.Content class={className} data-slot="combobox-content" {...rest} />
</Combobox.Portal>

<style>
  :global(.sve-combobox__content) {
    z-index: 60;
    min-width: var(--bits-combobox-anchor-width, 12rem);
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
