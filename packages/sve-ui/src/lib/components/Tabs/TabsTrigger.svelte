<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsTriggerProps = ComponentProps<typeof Tabs.Trigger>;

  interface Props extends Omit<BitsTriggerProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-tabs__trigger', cls].filter(Boolean).join(' '));
</script>

<Tabs.Trigger class={className} data-slot="tabs-trigger" {...rest} />

<style>
  :global(.sve-tabs__trigger) {
    padding: var(--sve-space-2) var(--sve-space-3);
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    opacity: 0.65;
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    font-weight: var(--sve-font-weight-medium);
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  }

  :global(.sve-tabs__trigger:hover:not([data-state='active'])) {
    opacity: 1;
  }

  :global(.sve-tabs__trigger[data-state='active']) {
    color: var(--sve-color-primary);
    border-bottom-color: var(--sve-color-primary);
    opacity: 1;
  }

  :global(.sve-tabs__trigger:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
    border-radius: var(--sve-radius-sm);
  }

  :global(.sve-tabs__trigger:disabled) {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
