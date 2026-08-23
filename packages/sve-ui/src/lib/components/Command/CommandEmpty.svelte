<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsEmptyProps = ComponentProps<typeof Command.Empty>;

  interface Props extends Omit<BitsEmptyProps, 'class'> {
    /** Extra classes merged onto the empty state. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Rendered only when the filter matches nothing. Always include one — a palette
  that goes silently blank reads as broken rather than as "no results".
-->
<Command.Empty
  class={['sve-command__empty', cls].filter(Boolean).join(' ')}
  data-slot="command-empty"
  {children}
  {...rest}
/>

<style>
  :global(.sve-command__empty) {
    padding: var(--sve-space-6) var(--sve-space-4);
    text-align: center;
    font-size: var(--sve-font-size-sm);
    opacity: 0.6;
  }
</style>
