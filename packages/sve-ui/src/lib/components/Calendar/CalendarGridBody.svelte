<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.GridBody>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the element. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Bits renders real table markup, so the grid is a table to a screen reader. -->
<Calendar.GridBody
  class={['sve-calendar__grid-body', cls].filter(Boolean).join(' ')}
  data-slot="calendar-grid-body"
  {children}
  {...rest}
/>
