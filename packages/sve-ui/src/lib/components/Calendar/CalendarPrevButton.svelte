<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.PrevButton>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the button. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Steps to the previous month. Bits disables it when that would cross
  `minValue`/`maxValue`. Bits hardcodes `aria-label="Previous"` on this button and merges its own
  props last, so an `aria-label` you pass is DISCARDED — verified in the
  rendered DOM. Do not rely on setting it; if you need a longer name, that
  is an upstream change.
-->
<Calendar.PrevButton
  class={['sve-calendar__nav', cls].filter(Boolean).join(' ')}
  data-slot="calendar-prev-button"
  {children}
  {...rest}
/>

<style>
  :global(.sve-calendar__nav) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  :global(.sve-calendar__nav:hover:not(:disabled)) {
    background-color: var(--sve-color-default);
  }

  :global(.sve-calendar__nav:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  :global(.sve-calendar__nav:disabled) {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-calendar__nav) {
      transition: none;
    }
  }
</style>
