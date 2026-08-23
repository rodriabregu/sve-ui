<script lang="ts">
  import { DateRangePicker } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof DateRangePicker.Calendar>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the calendar. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The range calendar, wired to the picker's state. Its Day carries the range
  states (`data-selection-start`, `data-range-middle`, `data-highlighted`), so
  compose it with RangeCalendar's Cell and Day rather than Calendar's.
-->
<DateRangePicker.Calendar
  class={['sve-calendar', 'sve-range-calendar', cls].filter(Boolean).join(' ')}
  data-slot="date-range-picker-calendar"
  {children}
  {...rest}
/>

<style>
  /* The popover panel already frames it; don't double-frame. */
  :global(.sve-picker__content .sve-range-calendar) {
    border: none;
    box-shadow: none;
  }
</style>
