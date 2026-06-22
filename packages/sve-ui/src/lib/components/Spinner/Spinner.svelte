<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Size = 'sm' | 'md' | 'lg';
  type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class' | 'role'> {
    size?: Size;
    color?: Color;
    label?: string;
    class?: string;
  }

  let {
    size = 'md',
    color = 'default',
    label = 'Loading',
    class: cls,
    ...rest
  }: Props = $props();

  const className = $derived(
    [
      'sve-spinner',
      `sve-spinner--${size}`,
      `sve-c-${color}`,
      cls ?? '',
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<span role="status" class={className} aria-label={label} {...rest}>
  <span class="sve-spinner__track" aria-hidden="true"></span>
</span>

<style>
  .sve-spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* --- Sizes --- */
  .sve-spinner--sm { width: 1rem;    height: 1rem; }
  .sve-spinner--md { width: 1.5rem;  height: 1.5rem; }
  .sve-spinner--lg { width: 2.5rem;  height: 2.5rem; }

  /* --- Track (the spinning ring) --- */
  .sve-spinner__track {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: var(--sve-radius-full);
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-right-color: currentColor;
    animation: sve-spin 0.7s linear infinite;
  }

  /* --- Colors via currentColor --- */
  .sve-c-primary   { color: var(--sve-color-primary); }
  .sve-c-secondary { color: var(--sve-color-secondary); }
  .sve-c-success   { color: var(--sve-color-success); }
  .sve-c-warning   { color: var(--sve-color-warning); }
  .sve-c-danger    { color: var(--sve-color-danger); }
  .sve-c-default   { color: var(--sve-color-default-foreground); }

  /* Respect the user's motion preference */
  @media (prefers-reduced-motion: reduce) {
    .sve-spinner__track {
      animation: none;
    }
  }

  @keyframes sve-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>
