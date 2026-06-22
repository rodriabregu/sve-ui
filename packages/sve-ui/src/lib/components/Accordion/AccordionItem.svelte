<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof Accordion.Item>;

  interface Props extends Omit<BitsItemProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-accordion__item', cls].filter(Boolean).join(' '));
</script>

<Accordion.Item class={className} data-slot="accordion-item" {...rest} />

<style>
  :global(.sve-accordion__item) {
    border-bottom: 1px solid var(--sve-color-default-border);
  }
</style>
