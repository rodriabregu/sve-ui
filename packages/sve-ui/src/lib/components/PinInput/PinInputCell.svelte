<script lang="ts">
  import { PinInput } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsCellProps = ComponentProps<typeof PinInput.Cell>;

  interface Props extends Omit<BitsCellProps, 'class'> {
    /** Extra classes merged onto the cell. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<!--
  Purely visual: the real input lives on Root. Bits marks the focused cell with
  `data-active` and renders a blinking caret placeholder when the cell is empty.
-->
<PinInput.Cell
  class={['sve-pin-input__cell', cls].filter(Boolean).join(' ')}
  data-slot="pin-input-cell"
  {...rest}
/>

<style>
  :global(.sve-pin-input__cell) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 3rem;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    font-size: var(--sve-font-size-lg);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  /* The focus ring lands on the cell the caret is in, since the real input is
     visually hidden and cannot show focus itself. */
  :global(.sve-pin-input__cell[data-active]) {
    border-color: var(--sve-color-primary);
    box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-pin-input__cell) {
      transition: none;
    }
  }
</style>
