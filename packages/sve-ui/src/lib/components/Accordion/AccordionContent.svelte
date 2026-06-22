<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Accordion.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-accordion__content', cls].filter(Boolean).join(' '));
</script>

<Accordion.Content class={className} data-slot="accordion-content" {...rest} />

<style>
  :global(.sve-accordion__content) {
    padding-bottom: var(--sve-space-4);
    color: var(--sve-color-default-foreground);
    font-size: var(--sve-font-size-sm);
    line-height: var(--sve-line-height-normal);
  }
</style>
