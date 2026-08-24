<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.GridRow>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the element. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Bits renders real table markup, so the grid is a table to a screen reader. -->
<Calendar.GridRow
  class={['sve-calendar__grid-row', cls].filter(Boolean).join(' ')}
  data-slot="calendar-grid-row"
  {children}
  {...rest}
/>
