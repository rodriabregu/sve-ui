<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.Header>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the header. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- The month navigation bar: PrevButton, Heading, NextButton. -->
<Calendar.Header
  class={['sve-calendar__header', cls].filter(Boolean).join(' ')}
  data-slot="calendar-header"
  {children}
  {...rest}
/>

<style>
  :global(.sve-calendar__header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
  }
</style>
