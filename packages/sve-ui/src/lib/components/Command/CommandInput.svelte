<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsInputProps = ComponentProps<typeof Command.Input>;

  interface Props extends Omit<BitsInputProps, 'class' | 'value'> {
    /** The search query. Bindable. */
    value?: string;
    /** Extra classes merged onto the input. */
    class?: string;
  }

  // Bindable, so the query must be passed as `bind:value` rather than spread.
  let { value = $bindable(''), class: cls, ...rest }: Props = $props();
</script>

<!--
  Bits wires the combobox ARIA and keeps focus here while the arrow keys move
  the highlight through the list — so the user types and navigates without ever
  leaving the field.
-->
<Command.Input
  bind:value
  class={['sve-command__input', cls].filter(Boolean).join(' ')}
  data-slot="command-input"
  {...rest}
/>

<style>
  :global(.sve-command__input) {
    width: 100%;
    padding: var(--sve-space-3) var(--sve-space-4);
    border: none;
    border-bottom: 1px solid var(--sve-color-default-border);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-md);
    color: var(--sve-color-default-foreground);
    outline: none;
  }

  :global(.sve-command__input::placeholder) {
    color: var(--sve-color-default-foreground);
    opacity: 0.5;
  }
</style>
