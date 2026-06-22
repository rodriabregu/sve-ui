<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Tabs.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-tabs__content', cls].filter(Boolean).join(' '));
</script>

<Tabs.Content class={className} data-slot="tabs-content" {...rest} />

<style>
  :global(.sve-tabs__content) {
    color: var(--sve-color-default-foreground);
    font-family: var(--sve-font-family-sans);
  }

  :global(.sve-tabs__content:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
    border-radius: var(--sve-radius-sm);
  }
</style>
