<script module lang="ts">
  import { defineVariants } from '$lib/internal/variants';

  type Size    = 'sm' | 'md' | 'lg';
  type Variant = 'outline' | 'filled';

  export const inputVariants = defineVariants({
    base: 'sve-input',
    variants: {
      variant: {
        outline: 'sve-input--outline',
        filled:  'sve-input--filled',
      },
      size: {
        sm: 'sve-input--sm',
        md: 'sve-input--md',
        lg: 'sve-input--lg',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size:    'md',
    },
  });

  export type { Size, Variant };
</script>

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'class' | 'size'> {
    size?: Size;
    variant?: Variant;
    invalid?: boolean;
    class?: string;
  }

  let {
    size,
    variant,
    invalid = false,
    class: cls,
    ...rest
  }: Props = $props();

  const className = $derived(
    inputVariants({
      size,
      variant,
      class: [cls, invalid ? 'sve-input--invalid' : ''].filter(Boolean).join(' ') || undefined,
    })
  );
</script>

<!--
  Accessibility: consumers MUST associate a label via one of:
    - <label for="..."> matching the input's forwarded `id` prop
    - aria-labelledby pointing to a visible label element
  Both approaches work through the spread `{...rest}`.
  `aria-invalid` is wired automatically via the `invalid` prop.
-->
<input
  class={className}
  aria-invalid={invalid ? true : undefined}
  {...rest}
/>

<style>
  .sve-input {
    display: block;
    width: 100%;
    border-radius: var(--sve-radius-md);
    border: 1px solid transparent;
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    line-height: var(--sve-line-height-normal);
    /* Suppress the default browser outline; we render our own focus-visible ring below */
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    background-color: transparent;
    color: var(--sve-color-default-foreground);
  }

  /* --- Sizes --- */
  .sve-input--sm {
    padding: var(--sve-space-1) var(--sve-space-2);
    font-size: var(--sve-font-size-sm);
    height: 2rem;
  }

  .sve-input--md {
    padding: var(--sve-space-2) var(--sve-space-3);
    height: 2.5rem;
  }

  .sve-input--lg {
    padding: var(--sve-space-3) var(--sve-space-4);
    font-size: var(--sve-font-size-lg);
    height: 3rem;
  }

  /* --- Focus-visible ring (respects high-contrast mode via outline) --- */
  .sve-input:focus-visible {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 1px;
  }

  /* --- Outline variant --- */
  .sve-input--outline {
    background-color: transparent;
    border-color: var(--sve-color-default-border);
  }

  .sve-input--outline:focus-visible {
    border-color: var(--sve-color-primary-border);
    box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
  }

  /* --- Filled variant --- */
  .sve-input--filled {
    background-color: var(--sve-color-default-surface);
    border-color: transparent;
  }

  .sve-input--filled:focus-visible {
    background-color: var(--sve-color-default-surface);
    border-color: var(--sve-color-primary-border);
    box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
  }

  /* --- Invalid state --- */
  .sve-input--invalid {
    border-color: var(--sve-color-danger-border);
  }

  .sve-input--invalid:focus-visible {
    border-color: var(--sve-color-danger);
    box-shadow: 0 0 0 3px var(--sve-color-danger-surface);
    outline-color: var(--sve-color-danger);
  }

  /* --- Disabled state --- */
  .sve-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
