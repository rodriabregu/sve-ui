<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.Grid>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the element. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Bits renders real table markup, so the grid is a table to a screen reader. -->
<Calendar.Grid
  class={['sve-calendar__grid', cls].filter(Boolean).join(' ')}
  data-slot="calendar-grid"
  {children}
  {...rest}
/>

<style>
  :global(.sve-calendar__grid) {
    border-collapse: collapse;
    width: 100%;
  }
</style>
