<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Collapsible.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    /** Extra classes merged onto the panel. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-collapsible__content', cls].filter(Boolean).join(' '));
</script>

<Collapsible.Content class={className} data-slot="collapsible-content" {...rest} />

<style>
  :global(.sve-collapsible__content) {
    padding: var(--sve-space-2) var(--sve-space-3);
    font-size: var(--sve-font-size-md);
    line-height: var(--sve-line-height-normal);
    color: var(--sve-color-default-foreground);
  }
</style>
