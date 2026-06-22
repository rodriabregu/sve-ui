<script module lang="ts">
  export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof Checkbox.Root>;

  interface Props extends Omit<BitsRootProps, 'class' | 'children'> {
    size?: Size;
    class?: string;
  }

  let {
    size = 'md',
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: cls,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-checkbox', `sve-checkbox--${size}`, cls].filter(Boolean).join(' ')
  );
</script>

<Checkbox.Root
  bind:checked
  bind:indeterminate
  class={className}
  data-slot="checkbox"
  {...rest}
>
  {#snippet children({ checked, indeterminate })}
    {#if indeterminate}
      <svg class="sve-checkbox__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true">
        <path d="M5 12h14" />
      </svg>
    {:else if checked}
      <svg class="sve-checkbox__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    {/if}
  {/snippet}
</Checkbox.Root>

<style>
  :global(.sve-checkbox) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-sm);
    background-color: transparent;
    color: var(--sve-color-primary-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  :global(.sve-checkbox[data-state='checked']),
  :global(.sve-checkbox[data-state='indeterminate']) {
    background-color: var(--sve-color-primary);
    border-color: var(--sve-color-primary);
  }

  :global(.sve-checkbox:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  :global(.sve-checkbox:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.sve-checkbox__icon) {
    width: 80%;
    height: 80%;
  }

  /* --- Sizes --- */
  :global(.sve-checkbox--sm) { width: 1rem; height: 1rem; }
  :global(.sve-checkbox--md) { width: 1.25rem; height: 1.25rem; }
  :global(.sve-checkbox--lg) { width: 1.5rem; height: 1.5rem; }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-checkbox) {
      transition: none;
    }
  }
</style>
