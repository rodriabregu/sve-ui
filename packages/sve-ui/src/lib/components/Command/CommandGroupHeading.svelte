<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsHeadingProps = ComponentProps<typeof Command.GroupHeading>;

  interface Props extends Omit<BitsHeadingProps, 'class'> {
    /** Extra classes merged onto the heading. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<Command.GroupHeading
  class={['sve-command__group-heading', cls].filter(Boolean).join(' ')}
  data-slot="command-group-heading"
  {children}
  {...rest}
/>

<style>
  :global(.sve-command__group-heading) {
    padding: var(--sve-space-2) var(--sve-space-2) var(--sve-space-1);
    font-size: var(--sve-font-size-xs);
    font-weight: var(--sve-font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
  }
</style>
