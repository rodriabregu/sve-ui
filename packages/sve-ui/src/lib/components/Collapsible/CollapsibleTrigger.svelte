<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsTriggerProps = ComponentProps<typeof Collapsible.Trigger>;

  interface Props extends Omit<BitsTriggerProps, 'class'> {
    /** Extra classes merged onto the trigger. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-collapsible__trigger', cls].filter(Boolean).join(' '));
</script>

<!--
  Bits renders a <button> and owns `aria-expanded` plus `aria-controls` pointing
  at the panel, so the open state is announced without any work here.
-->
<Collapsible.Trigger class={className} data-slot="collapsible-trigger" {...rest} />

<style>
  :global(.sve-collapsible__trigger) {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
    width: 100%;
    padding: var(--sve-space-2) var(--sve-space-3);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-md);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  :global(.sve-collapsible__trigger:hover:not(:disabled)) {
    background-color: var(--sve-color-default-surface);
  }

  :global(.sve-collapsible__trigger:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  :global(.sve-collapsible__trigger:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-collapsible__trigger) {
      transition: none;
    }
  }
</style>
