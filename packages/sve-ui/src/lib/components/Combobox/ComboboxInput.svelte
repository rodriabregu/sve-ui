<script lang="ts">
  import { Combobox } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsInputProps = ComponentProps<typeof Combobox.Input>;

  interface Props extends Omit<BitsInputProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-combobox__input', cls].filter(Boolean).join(' '));
</script>

<Combobox.Input class={className} data-slot="combobox-input" {...rest} />

<style>
  :global(.sve-combobox__input) {
    display: block;
    width: 100%;
    height: 2.5rem;
    padding: var(--sve-space-2) var(--sve-space-3);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    outline: none;
  }

  :global(.sve-combobox__input:focus-visible) {
    border-color: var(--sve-color-primary-border);
    box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
  }

  :global(.sve-combobox__input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
