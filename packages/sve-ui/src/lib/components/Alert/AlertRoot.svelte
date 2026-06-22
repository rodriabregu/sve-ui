<script module lang="ts">
  import { defineVariants } from '$lib/internal/variants';

  type Color   = 'default' | 'primary' | 'success' | 'warning' | 'danger';
  type Variant = 'subtle' | 'solid' | 'outline';

  export const alertVariants = defineVariants({
    base: 'sve-alert',
    variants: {
      variant: {
        subtle:  'sve-alert--subtle',
        solid:   'sve-alert--solid',
        outline: 'sve-alert--outline',
      },
      color: {
        default:  'sve-c-default',
        primary:  'sve-c-primary',
        success:  'sve-c-success',
        warning:  'sve-c-warning',
        danger:   'sve-c-danger',
      },
    },
    defaultVariants: {
      variant: 'subtle',
      color:   'default',
    },
  });

  export type { Color, Variant };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role'> {
    color?: Color;
    variant?: Variant;
    class?: string;
    children?: Snippet;
  }

  let {
    color,
    variant,
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    alertVariants({ color, variant, class: cls })
  );

  const role = $derived(
    color === 'danger' || color === 'warning' ? 'alert' : 'status'
  );
</script>

<!--
  Live-region behavior: role="alert" and role="status" only trigger
  screen-reader announcement when the element is *dynamically inserted*
  into the DOM after initial page load. Alerts present on SSR / initial
  render are NOT announced automatically — this is a browser limitation.
  If you need an alert to be announced on first render, use aria-live
  and insert the element after a short delay in the client.
-->
<div class={className} {role} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-alert {
    display: flex;
    flex-direction: column;
    gap: var(--sve-space-1);
    padding: var(--sve-space-4);
    border-radius: var(--sve-radius-md);
    border: 1px solid transparent;
    font-family: var(--sve-font-family-sans);
  }

  /* --- Subtle variant --- */
  .sve-alert--subtle.sve-c-default  { background-color: var(--sve-color-default-surface);   color: var(--sve-color-default-foreground); border-color: transparent; }
  .sve-alert--subtle.sve-c-primary  { background-color: var(--sve-color-primary-surface);   color: var(--sve-color-primary);           border-color: transparent; }
  .sve-alert--subtle.sve-c-success  { background-color: var(--sve-color-success-surface);   color: var(--sve-color-success);           border-color: transparent; }
  .sve-alert--subtle.sve-c-warning  { background-color: var(--sve-color-warning-surface);   color: var(--sve-color-warning-foreground); border-color: transparent; }
  .sve-alert--subtle.sve-c-danger   { background-color: var(--sve-color-danger-surface);    color: var(--sve-color-danger);            border-color: transparent; }

  /* --- Solid variant --- */
  .sve-alert--solid.sve-c-default  { background-color: var(--sve-color-default);   color: var(--sve-color-default-foreground); border-color: var(--sve-color-default); }
  .sve-alert--solid.sve-c-primary  { background-color: var(--sve-color-primary);   color: var(--sve-color-primary-foreground); border-color: var(--sve-color-primary); }
  .sve-alert--solid.sve-c-success  { background-color: var(--sve-color-success);   color: var(--sve-color-success-foreground); border-color: var(--sve-color-success); }
  .sve-alert--solid.sve-c-warning  { background-color: var(--sve-color-warning);   color: var(--sve-color-warning-foreground); border-color: var(--sve-color-warning); }
  .sve-alert--solid.sve-c-danger   { background-color: var(--sve-color-danger);    color: var(--sve-color-danger-foreground);  border-color: var(--sve-color-danger); }

  /* --- Outline variant --- */
  .sve-alert--outline.sve-c-default  { background-color: transparent; color: var(--sve-color-default-foreground); border-color: var(--sve-color-default-border); }
  .sve-alert--outline.sve-c-primary  { background-color: transparent; color: var(--sve-color-primary);           border-color: var(--sve-color-primary-border); }
  .sve-alert--outline.sve-c-success  { background-color: transparent; color: var(--sve-color-success);           border-color: var(--sve-color-success-border); }
  .sve-alert--outline.sve-c-warning  { background-color: transparent; color: var(--sve-color-warning-foreground); border-color: var(--sve-color-warning-border); }
  .sve-alert--outline.sve-c-danger   { background-color: transparent; color: var(--sve-color-danger);            border-color: var(--sve-color-danger-border); }
</style>
