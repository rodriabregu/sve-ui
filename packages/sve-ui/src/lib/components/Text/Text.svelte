<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type As = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'li' | 'dt' | 'dd' | 'figcaption' | 'address' | 'cite' | 'code' | 'abbr' | 'time' | 'q' | 'blockquote' | 'pre';
  type Size = 'sm' | 'md' | 'lg';
  type Weight = 'normal' | 'medium' | 'bold';
  type Align = 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    as?: As;
    size?: Size;
    weight?: Weight;
    color?: Color;
    align?: Align;
    truncate?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    as = 'p',
    size,
    weight,
    color = 'inherit',
    align,
    truncate = false,
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    [
      'sve-text',
      size   ? `sve-text--${size}`   : '',
      weight ? `sve-text--${weight}` : '',
      color !== 'inherit' ? `sve-c-${color}` : '',
      align  ? `sve-text--${align}`  : '',
      truncate ? 'sve-text--truncate' : '',
      cls ?? '',
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<svelte:element this={as} class={className} {...rest}>
  {@render children?.()}
</svelte:element>

<style>
  .sve-text {
    font-family: var(--sve-font-family-sans);
    line-height: var(--sve-line-height-normal);
    margin: 0;
  }

  /* --- Sizes --- */
  .sve-text--sm { font-size: var(--sve-font-size-sm); }
  .sve-text--md { font-size: var(--sve-font-size-md); }
  .sve-text--lg { font-size: var(--sve-font-size-lg); }

  /* --- Weights --- */
  .sve-text--normal { font-weight: var(--sve-font-weight-normal); }
  .sve-text--medium { font-weight: var(--sve-font-weight-medium); }
  .sve-text--bold   { font-weight: var(--sve-font-weight-bold); }

  /* --- Alignment --- */
  .sve-text--left    { text-align: left; }
  .sve-text--center  { text-align: center; }
  .sve-text--right   { text-align: right; }
  .sve-text--justify { text-align: justify; }

  /* --- Truncate --- */
  .sve-text--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* --- Semantic colors --- */
  .sve-c-primary   { color: var(--sve-color-primary); }
  .sve-c-secondary { color: var(--sve-color-secondary); }
  .sve-c-success   { color: var(--sve-color-success); }
  .sve-c-warning   { color: var(--sve-color-warning-foreground); }
  .sve-c-danger    { color: var(--sve-color-danger); }
  .sve-c-default   { color: var(--sve-color-default-foreground); }
</style>
