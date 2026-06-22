<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { ComponentProps, Snippet } from 'svelte';

  type BitsTriggerProps = ComponentProps<typeof Accordion.Trigger>;

  interface Props extends Omit<BitsTriggerProps, 'class' | 'children'> {
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();

  const className = $derived(['sve-accordion__trigger', cls].filter(Boolean).join(' '));
</script>

<Accordion.Trigger class={className} data-slot="accordion-trigger" {...rest}>
  <span class="sve-accordion__label">{@render children?.()}</span>
  <svg class="sve-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
</Accordion.Trigger>

<style>
  :global(.sve-accordion__trigger) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
    padding: var(--sve-space-4) 0;
    border: none;
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    font-weight: var(--sve-font-weight-medium);
    text-align: left;
    cursor: pointer;
  }

  :global(.sve-accordion__trigger:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
    border-radius: var(--sve-radius-sm);
  }

  :global(.sve-accordion__trigger:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.sve-accordion__chevron) {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: var(--sve-color-default-foreground);
    opacity: 0.6;
    transition: transform 0.2s ease;
  }

  :global(.sve-accordion__trigger[data-state='open'] .sve-accordion__chevron) {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-accordion__chevron) {
      transition: none;
    }
  }
</style>
