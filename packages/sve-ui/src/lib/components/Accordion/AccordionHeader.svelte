<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsHeaderProps = ComponentProps<typeof Accordion.Header>;

  interface Props extends Omit<BitsHeaderProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-accordion__header', cls].filter(Boolean).join(' '));
</script>

<Accordion.Header class={className} data-slot="accordion-header" {...rest} />

<style>
  :global(.sve-accordion__header) {
    margin: 0;
  }
</style>
