<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsSeparatorProps = ComponentProps<typeof Command.Separator>;

  interface Props extends Omit<BitsSeparatorProps, 'class'> {
    /** Extra classes merged onto the divider. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<Command.Separator
  class={['sve-command__separator', cls].filter(Boolean).join(' ')}
  data-slot="command-separator"
  {...rest}
/>

<style>
  :global(.sve-command__separator) {
    height: 1px;
    margin: var(--sve-space-1) 0;
    background-color: var(--sve-color-default-border);
  }
</style>
