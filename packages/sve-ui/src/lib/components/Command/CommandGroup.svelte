<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupProps = ComponentProps<typeof Command.Group>;

  interface Props extends Omit<BitsGroupProps, 'class'> {
    /** Extra classes merged onto the group. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits hides the whole group when the filter leaves it empty, so you never get a
  heading with nothing under it.
-->
<Command.Group
  class={['sve-command__group', cls].filter(Boolean).join(' ')}
  data-slot="command-group"
  {children}
  {...rest}
/>

<style>
  :global(.sve-command__group) {
    padding-bottom: var(--sve-space-1);
  }
</style>
