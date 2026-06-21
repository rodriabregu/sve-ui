<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Level = 1 | 2 | 3 | 4 | 5 | 6;
  type Size = 'sm' | 'md' | 'lg';
  type Weight = 'normal' | 'medium' | 'bold';
  type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

  interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> {
    level?: Level;
    size?: Size;
    weight?: Weight;
    color?: Color;
    class?: string;
    children?: Snippet;
  }

  let {
    level = 2,
    size,
    weight = 'bold',
    color = 'inherit',
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const tag = $derived(`h${level}` as const);

  const className = $derived(
    [
      'sve-heading',
      size   ? `sve-heading--${size}`   : '',
      weight ? `sve-heading--${weight}` : '',
      color !== 'inherit' ? `sve-c-${color}` : '',
      cls ?? '',
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<svelte:element this={tag} class={className} {...rest}>
  {@render children?.()}
</svelte:element>

<style>
  .sve-heading {
    font-family: var(--sve-font-family-sans);
    line-height: var(--sve-line-height-tight);
    margin: 0;
  }

  /* --- Sizes --- */
  .sve-heading--sm { font-size: var(--sve-font-size-sm); }
  .sve-heading--md { font-size: var(--sve-font-size-md); }
  .sve-heading--lg { font-size: var(--sve-font-size-lg); }

  /* --- Weights --- */
  .sve-heading--normal { font-weight: var(--sve-font-weight-normal); }
  .sve-heading--medium { font-weight: var(--sve-font-weight-medium); }
  .sve-heading--bold   { font-weight: var(--sve-font-weight-bold); }

  /* --- Semantic colors --- */
  .sve-c-primary   { color: var(--sve-color-primary); }
  .sve-c-secondary { color: var(--sve-color-secondary); }
  .sve-c-success   { color: var(--sve-color-success); }
  .sve-c-warning   { color: var(--sve-color-warning-foreground); }
  .sve-c-danger    { color: var(--sve-color-danger); }
  .sve-c-default   { color: var(--sve-color-default-foreground); }
</style>
