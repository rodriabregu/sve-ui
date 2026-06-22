<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsItemProps = ComponentProps<typeof RadioGroup.Item>;

  interface Props extends Omit<BitsItemProps, 'class' | 'children'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-radio', cls].filter(Boolean).join(' '));
</script>

<RadioGroup.Item class={className} data-slot="radio-item" {...rest}>
  {#snippet children({ checked })}
    {#if checked}<span class="sve-radio__dot" data-slot="radio-dot"></span>{/if}
  {/snippet}
</RadioGroup.Item>

<style>
  :global(.sve-radio) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-full);
    background-color: transparent;
    cursor: pointer;
    transition: border-color 0.15s ease;
  }

  :global(.sve-radio[data-state='checked']) {
    border-color: var(--sve-color-primary);
  }

  :global(.sve-radio:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  :global(.sve-radio:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.sve-radio__dot) {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: var(--sve-radius-full);
    background-color: var(--sve-color-primary);
  }
</style>
