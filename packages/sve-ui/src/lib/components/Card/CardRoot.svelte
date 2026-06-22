<script module lang="ts">
  import { defineVariants } from '$lib/internal/variants';

  type Variant = 'elevated' | 'outlined' | 'filled';
  type Padding = '2' | '4' | '6' | '8';

  export const cardVariants = defineVariants({
    base: 'sve-card',
    variants: {
      variant: {
        elevated: 'sve-card--elevated',
        outlined: 'sve-card--outlined',
        filled:   'sve-card--filled',
      },
      padding: {
        '2': 'sve-card--p2',
        '4': 'sve-card--p4',
        '6': 'sve-card--p6',
        '8': 'sve-card--p8',
      },
    },
    defaultVariants: {
      variant: 'elevated',
    },
  });

  export type { Variant, Padding };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    variant?: Variant;
    padding?: Padding;
    class?: string;
    children?: Snippet;
  }

  let {
    variant,
    padding,
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    cardVariants({ variant, padding, class: cls })
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--sve-radius-lg);
    font-family: var(--sve-font-family-sans);
    overflow: hidden;
  }

  /* --- Variants --- */
  .sve-card--elevated {
    background-color: var(--sve-color-default-surface);
    box-shadow: var(--sve-shadow-md);
    border: 1px solid transparent;
  }

  .sve-card--outlined {
    background-color: var(--sve-color-default-surface);
    border: 1px solid var(--sve-color-default-border);
    box-shadow: none;
  }

  .sve-card--filled {
    background-color: var(--sve-color-default);
    border: 1px solid transparent;
    box-shadow: none;
  }

  /* --- Padding --- */
  .sve-card--p2 { padding: var(--sve-space-2); }
  .sve-card--p4 { padding: var(--sve-space-4); }
  .sve-card--p6 { padding: var(--sve-space-6); }
  .sve-card--p8 { padding: var(--sve-space-8); }
</style>
