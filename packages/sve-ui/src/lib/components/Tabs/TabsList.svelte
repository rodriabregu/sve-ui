<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsListProps = ComponentProps<typeof Tabs.List>;

  interface Props extends Omit<BitsListProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-tabs__list', cls].filter(Boolean).join(' '));
</script>

<Tabs.List class={className} data-slot="tabs-list" {...rest} />

<style>
  :global(.sve-tabs__list) {
    display: flex;
    gap: var(--sve-space-1);
    border-bottom: 1px solid var(--sve-color-default-border);
  }
</style>
