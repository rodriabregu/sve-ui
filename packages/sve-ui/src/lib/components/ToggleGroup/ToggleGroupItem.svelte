<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof ToggleGroup.Item>;

  interface Props extends Omit<BitsItemProps, 'class'> {
    /** Extra classes merged onto the item. */
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-toggle-group__item', cls].filter(Boolean).join(' '));
</script>

<!--
  Bits renders a <button> and owns `aria-pressed` plus the `data-state` on/off
  attribute. An icon-only item needs an `aria-label`.
-->
<ToggleGroup.Item class={className} data-slot="toggle-group-item" {...rest} />

<style>
  :global(.sve-toggle-group__item) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sve-space-2);
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-weight: var(--sve-font-weight-medium);
    line-height: var(--sve-line-height-tight);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  /* --- Sizes inherited from the group --- */
  :global(.sve-toggle-group--sm .sve-toggle-group__item) {
    height: 2rem;
    padding: 0 var(--sve-space-2);
    font-size: var(--sve-font-size-sm);
  }
  :global(.sve-toggle-group--md .sve-toggle-group__item) {
    height: 2.5rem;
    padding: 0 var(--sve-space-3);
    font-size: var(--sve-font-size-md);
  }
  :global(.sve-toggle-group--lg .sve-toggle-group__item) {
    height: 3rem;
    padding: 0 var(--sve-space-4);
    font-size: var(--sve-font-size-lg);
  }

  :global(.sve-toggle-group__item:hover:not(:disabled)) {
    background-color: var(--sve-color-default-surface);
  }

  :global(.sve-toggle-group__item[data-state='on']) {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
  }

  /* Inset so the ring is not clipped by the group's overflow: hidden. */
  :global(.sve-toggle-group__item:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
  }

  :global(.sve-toggle-group__item:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-toggle-group__item) {
      transition: none;
    }
  }
</style>
