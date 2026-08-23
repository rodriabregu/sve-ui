<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.NextButton>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the button. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Steps to the next month. Bits disables it when that would cross
  `minValue`/`maxValue`. Bits hardcodes `aria-label="Next"` on this button and merges its own
  props last, so an `aria-label` you pass is DISCARDED — verified in the
  rendered DOM. Do not rely on setting it; if you need a longer name, that
  is an upstream change.
-->
<Calendar.NextButton
  class={['sve-calendar__nav', cls].filter(Boolean).join(' ')}
  data-slot="calendar-next-button"
  {children}
  {...rest}
/>
