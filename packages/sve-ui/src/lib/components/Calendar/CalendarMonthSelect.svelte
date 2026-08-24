<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.MonthSelect>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the select. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<!--
  A native <select> for jumping straight to a month or year. Worth including
  for any range wider than a few months: paging one month at a time to reach a
  birth year is not navigation, it is a punishment.
-->
<Calendar.MonthSelect
  class={['sve-calendar__select', cls].filter(Boolean).join(' ')}
  data-slot="calendar-month-select"
  {...rest}
/>

<style>
  :global(.sve-calendar__select) {
    padding: var(--sve-space-1) var(--sve-space-2);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
  }

  :global(.sve-calendar__select:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }
</style>
