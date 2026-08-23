<script lang="ts">
  import { Command } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsListProps = ComponentProps<typeof Command.List>;

  interface Props extends Omit<BitsListProps, 'class'> {
    /** Extra classes merged onto the list. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits gives this role="listbox" and links it to the input. Its accessible name
  comes from the `ariaLabel` prop, which Bits defaults to "Suggestions..." —
  pass your own so the list says what it holds. We deliberately do NOT override
  that default here: silently diverging from Bits would surprise anyone reading
  their docs, so it is documented instead.
-->
<Command.List
  class={['sve-command__list', cls].filter(Boolean).join(' ')}
  data-slot="command-list"
  {children}
  {...rest}
/>

<style>
  :global(.sve-command__list) {
    max-height: 18rem;
    overflow-y: auto;
    padding: var(--sve-space-1);
  }
</style>
