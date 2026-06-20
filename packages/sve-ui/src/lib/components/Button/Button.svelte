<script module lang="ts">
  import { defineVariants } from '$lib/internal/variants';

  type Variant = 'solid' | 'outline' | 'ghost' | 'flat';
  type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  type Size = 'sm' | 'md' | 'lg';

  // Defined once at module level — not recreated per instance.
  export const buttonVariants = defineVariants({
    base: 'sve-button',
    variants: {
      variant: {
        solid:   'sve-button--solid',
        outline: 'sve-button--outline',
        ghost:   'sve-button--ghost',
        flat:    'sve-button--flat',
      },
      color: {
        primary:   'sve-c-primary',
        secondary: 'sve-c-secondary',
        success:   'sve-c-success',
        warning:   'sve-c-warning',
        danger:    'sve-c-danger',
        default:   'sve-c-default',
      },
      size: {
        sm: 'sve-button--sm',
        md: 'sve-button--md',
        lg: 'sve-button--lg',
      },
    },
    defaultVariants: {
      variant: 'solid',
      color:   'default',
      size:    'md',
    },
  });

  export type { Variant, Color, Size };
</script>

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLButtonAttributes, 'class'> {
    variant?: Variant;
    color?: Color;
    size?: Size;
    class?: string;
    children?: Snippet;
  }

  let {
    variant,
    color,
    size,
    disabled = false,
    class: cls,
    onclick,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    buttonVariants({ variant, color, size, class: cls })
  );
</script>

<button
  class={className}
  {disabled}
  onclick={disabled ? undefined : onclick}
  {...rest}
>
  {@render children?.()}
</button>

<style>
  .sve-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sve-space-2);
    font-family: var(--sve-font-family-sans);
    font-weight: var(--sve-font-weight-medium);
    line-height: var(--sve-line-height-normal);
    border-radius: var(--sve-radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
    outline-offset: 2px;
  }

  /* Focus ring for accessibility */
  .sve-button:focus-visible {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  /* Disabled state */
  .sve-button:disabled,
  .sve-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  /* --- Sizes --- */
  .sve-button--sm {
    padding: var(--sve-space-1) var(--sve-space-3);
    font-size: var(--sve-font-size-sm);
  }

  .sve-button--md {
    padding: var(--sve-space-2) var(--sve-space-4);
    font-size: var(--sve-font-size-md);
  }

  .sve-button--lg {
    padding: var(--sve-space-3) var(--sve-space-6);
    font-size: var(--sve-font-size-lg);
  }

  /* --- Solid variant --- */
  .sve-button--solid.sve-c-primary {
    background-color: var(--sve-color-primary);
    color: var(--sve-color-primary-foreground);
    border-color: var(--sve-color-primary);
  }
  .sve-button--solid.sve-c-primary:hover:not(:disabled) {
    background-color: var(--sve-color-primary-hover);
    border-color: var(--sve-color-primary-hover);
  }
  .sve-button--solid.sve-c-primary:active:not(:disabled) {
    background-color: var(--sve-color-primary-active);
    border-color: var(--sve-color-primary-active);
  }

  .sve-button--solid.sve-c-secondary {
    background-color: var(--sve-color-secondary);
    color: var(--sve-color-secondary-foreground);
    border-color: var(--sve-color-secondary);
  }
  .sve-button--solid.sve-c-secondary:hover:not(:disabled) {
    background-color: var(--sve-color-secondary-hover);
    border-color: var(--sve-color-secondary-hover);
  }

  .sve-button--solid.sve-c-success {
    background-color: var(--sve-color-success);
    color: var(--sve-color-success-foreground);
    border-color: var(--sve-color-success);
  }
  .sve-button--solid.sve-c-success:hover:not(:disabled) {
    background-color: var(--sve-color-success-hover);
    border-color: var(--sve-color-success-hover);
  }

  .sve-button--solid.sve-c-warning {
    background-color: var(--sve-color-warning);
    color: var(--sve-color-warning-foreground);
    border-color: var(--sve-color-warning);
  }
  .sve-button--solid.sve-c-warning:hover:not(:disabled) {
    background-color: var(--sve-color-warning-hover);
    border-color: var(--sve-color-warning-hover);
  }

  .sve-button--solid.sve-c-danger {
    background-color: var(--sve-color-danger);
    color: var(--sve-color-danger-foreground);
    border-color: var(--sve-color-danger);
  }
  .sve-button--solid.sve-c-danger:hover:not(:disabled) {
    background-color: var(--sve-color-danger-hover);
    border-color: var(--sve-color-danger-hover);
  }

  .sve-button--solid.sve-c-default {
    background-color: var(--sve-color-default);
    color: var(--sve-color-default-foreground);
    border-color: var(--sve-color-default);
  }
  .sve-button--solid.sve-c-default:hover:not(:disabled) {
    background-color: var(--sve-color-default-hover);
    border-color: var(--sve-color-default-hover);
  }

  /* --- Outline variant --- */
  .sve-button--outline.sve-c-primary {
    background-color: transparent;
    color: var(--sve-color-primary);
    border-color: var(--sve-color-primary-border);
  }
  .sve-button--outline.sve-c-primary:hover:not(:disabled) {
    background-color: var(--sve-color-primary-surface);
  }

  .sve-button--outline.sve-c-secondary {
    background-color: transparent;
    color: var(--sve-color-secondary);
    border-color: var(--sve-color-secondary-border);
  }
  .sve-button--outline.sve-c-secondary:hover:not(:disabled) {
    background-color: var(--sve-color-secondary-surface);
  }

  .sve-button--outline.sve-c-danger {
    background-color: transparent;
    color: var(--sve-color-danger);
    border-color: var(--sve-color-danger-border);
  }
  .sve-button--outline.sve-c-danger:hover:not(:disabled) {
    background-color: var(--sve-color-danger-surface);
  }

  .sve-button--outline.sve-c-success {
    background-color: transparent;
    color: var(--sve-color-success);
    border-color: var(--sve-color-success-border);
  }

  .sve-button--outline.sve-c-warning {
    background-color: transparent;
    color: var(--sve-color-warning);
    border-color: var(--sve-color-warning-border);
  }

  .sve-button--outline.sve-c-default {
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    border-color: var(--sve-color-default-border);
  }

  /* --- Ghost variant --- */
  .sve-button--ghost {
    background-color: transparent;
    border-color: transparent;
  }
  .sve-button--ghost.sve-c-primary {
    color: var(--sve-color-primary);
  }
  .sve-button--ghost.sve-c-primary:hover:not(:disabled) {
    background-color: var(--sve-color-primary-surface);
  }
  .sve-button--ghost.sve-c-secondary {
    color: var(--sve-color-secondary);
  }
  .sve-button--ghost.sve-c-secondary:hover:not(:disabled) {
    background-color: var(--sve-color-secondary-surface);
  }
  .sve-button--ghost.sve-c-danger {
    color: var(--sve-color-danger);
  }
  .sve-button--ghost.sve-c-danger:hover:not(:disabled) {
    background-color: var(--sve-color-danger-surface);
  }
  .sve-button--ghost.sve-c-success {
    color: var(--sve-color-success);
  }
  .sve-button--ghost.sve-c-warning {
    color: var(--sve-color-warning);
  }
  .sve-button--ghost.sve-c-default {
    color: var(--sve-color-default-foreground);
  }
  .sve-button--ghost.sve-c-default:hover:not(:disabled) {
    background-color: var(--sve-color-default-surface);
  }

  /* --- Flat variant --- */
  .sve-button--flat {
    border-color: transparent;
  }
  .sve-button--flat.sve-c-primary {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
  }
  .sve-button--flat.sve-c-primary:hover:not(:disabled) {
    background-color: var(--sve-color-primary-border);
  }
  .sve-button--flat.sve-c-secondary {
    background-color: var(--sve-color-secondary-surface);
    color: var(--sve-color-secondary);
  }
  .sve-button--flat.sve-c-danger {
    background-color: var(--sve-color-danger-surface);
    color: var(--sve-color-danger);
  }
  .sve-button--flat.sve-c-success {
    background-color: var(--sve-color-success-surface);
    color: var(--sve-color-success);
  }
  .sve-button--flat.sve-c-warning {
    background-color: var(--sve-color-warning-surface);
    color: var(--sve-color-warning);
  }
  .sve-button--flat.sve-c-default {
    background-color: var(--sve-color-default-surface);
    color: var(--sve-color-default-foreground);
  }
</style>
