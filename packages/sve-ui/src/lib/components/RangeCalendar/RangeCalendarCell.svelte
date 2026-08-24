<script lang="ts">
  import { RangeCalendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof RangeCalendar.Cell>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the cell. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<RangeCalendar.Cell
  class={['sve-calendar__cell', cls].filter(Boolean).join(' ')}
  data-slot="range-calendar-cell"
  {children}
  {...rest}
/>
