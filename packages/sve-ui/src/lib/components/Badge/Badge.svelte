<script module lang="ts">
  import { defineVariants } from '$lib/internal/variants';

  type Variant = 'solid' | 'outline' | 'subtle';
  type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  type Size = 'sm' | 'md' | 'lg';

  export const badgeVariants = defineVariants({
    base: 'sve-badge',
    variants: {
      variant: {
        solid:   'sve-badge--solid',
        outline: 'sve-badge--outline',
        subtle:  'sve-badge--subtle',
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
        sm: 'sve-badge--sm',
        md: 'sve-badge--md',
        lg: 'sve-badge--lg',
      },
    },
    defaultVariants: {
      variant: 'subtle',
      color:   'default',
      size:    'md',
    },
  });

  export type { Variant, Color, Size };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
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
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    badgeVariants({ variant, color, size, class: cls })
  );
</script>

<span class={className} {...rest}>
  {@render children?.()}
</span>

<style>
  .sve-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--sve-font-family-sans);
    font-weight: var(--sve-font-weight-medium);
    line-height: var(--sve-line-height-normal);
    border-radius: var(--sve-radius-full);
    border: 1px solid transparent;
    white-space: nowrap;
  }

  /* --- Sizes --- */
  .sve-badge--sm {
    padding: 0 var(--sve-space-2);
    font-size: var(--sve-font-size-sm);
    height: 1.25rem;
  }

  .sve-badge--md {
    padding: 0 var(--sve-space-3);
    font-size: var(--sve-font-size-sm);
    height: 1.5rem;
  }

  .sve-badge--lg {
    padding: 0 var(--sve-space-4);
    font-size: var(--sve-font-size-md);
    height: 1.75rem;
  }

  /* --- Solid variant --- */
  .sve-badge--solid.sve-c-primary   { background-color: var(--sve-color-primary);   color: var(--sve-color-primary-foreground);   border-color: var(--sve-color-primary); }
  .sve-badge--solid.sve-c-secondary { background-color: var(--sve-color-secondary); color: var(--sve-color-secondary-foreground); border-color: var(--sve-color-secondary); }
  .sve-badge--solid.sve-c-success   { background-color: var(--sve-color-success);   color: var(--sve-color-success-foreground);   border-color: var(--sve-color-success); }
  .sve-badge--solid.sve-c-warning   { background-color: var(--sve-color-warning);   color: var(--sve-color-warning-foreground);   border-color: var(--sve-color-warning); }
  .sve-badge--solid.sve-c-danger    { background-color: var(--sve-color-danger);    color: var(--sve-color-danger-foreground);    border-color: var(--sve-color-danger); }
  .sve-badge--solid.sve-c-default   { background-color: var(--sve-color-default);   color: var(--sve-color-default-foreground);   border-color: var(--sve-color-default); }

  /* --- Outline variant --- */
  .sve-badge--outline.sve-c-primary   { background-color: transparent; color: var(--sve-color-primary);           border-color: var(--sve-color-primary-border); }
  .sve-badge--outline.sve-c-secondary { background-color: transparent; color: var(--sve-color-secondary);         border-color: var(--sve-color-secondary-border); }
  .sve-badge--outline.sve-c-success   { background-color: transparent; color: var(--sve-color-success);           border-color: var(--sve-color-success-border); }
  .sve-badge--outline.sve-c-warning   { background-color: transparent; color: var(--sve-color-warning-foreground); border-color: var(--sve-color-warning-border); }
  .sve-badge--outline.sve-c-danger    { background-color: transparent; color: var(--sve-color-danger);            border-color: var(--sve-color-danger-border); }
  .sve-badge--outline.sve-c-default   { background-color: transparent; color: var(--sve-color-default-foreground); border-color: var(--sve-color-default-border); }

  /* --- Subtle variant --- */
  .sve-badge--subtle.sve-c-primary   { background-color: var(--sve-color-primary-surface);   color: var(--sve-color-primary);           border-color: transparent; }
  .sve-badge--subtle.sve-c-secondary { background-color: var(--sve-color-secondary-surface); color: var(--sve-color-secondary);         border-color: transparent; }
  .sve-badge--subtle.sve-c-success   { background-color: var(--sve-color-success-surface);   color: var(--sve-color-success);           border-color: transparent; }
  .sve-badge--subtle.sve-c-warning   { background-color: var(--sve-color-warning-surface);   color: var(--sve-color-warning-foreground); border-color: transparent; }
  .sve-badge--subtle.sve-c-danger    { background-color: var(--sve-color-danger-surface);    color: var(--sve-color-danger);            border-color: transparent; }
  .sve-badge--subtle.sve-c-default   { background-color: var(--sve-color-default-surface);   color: var(--sve-color-default-foreground); border-color: transparent; }
</style>
