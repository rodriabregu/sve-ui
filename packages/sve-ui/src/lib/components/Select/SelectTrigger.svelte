<script lang="ts">
  import { Select } from 'bits-ui';
  import type { ComponentProps, Snippet } from 'svelte';

  type BitsTriggerProps = ComponentProps<typeof Select.Trigger>;

  interface Props extends Omit<BitsTriggerProps, 'class' | 'children'> {
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();

  const className = $derived(['sve-select__trigger', cls].filter(Boolean).join(' '));
</script>

<Select.Trigger class={className} data-slot="select-trigger" {...rest}>
  <span class="sve-select__trigger-value">{@render children?.()}</span>
  <svg class="sve-select__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
</Select.Trigger>

<style>
  :global(.sve-select__trigger) {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
    width: 100%;
    min-height: 2.5rem;
    padding: var(--sve-space-2) var(--sve-space-3);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    cursor: pointer;
    text-align: left;
  }

  :global(.sve-select__trigger:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 1px;
    border-color: var(--sve-color-primary-border);
  }

  :global(.sve-select__trigger:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.sve-select__trigger-value) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.sve-select__trigger-icon) {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    opacity: 0.6;
  }
</style>
