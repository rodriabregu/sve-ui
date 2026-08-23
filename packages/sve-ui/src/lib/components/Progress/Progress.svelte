<script module lang="ts">
  export type Size = 'sm' | 'md' | 'lg';
  export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
  // Aliased: see scripts/check-dts.mjs — a same-name import collapses the
  // generated component type to `any`.
  import { Progress as ProgressPrimitive } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof ProgressPrimitive.Root>;

  interface Props extends Omit<BitsRootProps, 'class' | 'value' | 'max' | 'min'> {
    /**
     * Current value. Pass `null` for an indeterminate bar — use it when the
     * duration is genuinely unknown, not as a substitute for measuring it.
     * @default 0
     */
    value?: number | null;
    /** @default 100 */
    max?: number;
    /** @default 0 */
    min?: number;
    /** @default 'md' */
    size?: Size;
    /** @default 'primary' */
    color?: Color;
    /** Extra classes merged onto the track. */
    class?: string;
  }

  let {
    value = 0,
    max = 100,
    min = 0,
    size = 'md',
    color = 'primary',
    class: cls,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-progress', `sve-progress--${size}`, `sve-c-${color}`, cls].filter(Boolean).join(' ')
  );

  /** Fill width as a percentage; indeterminate bars are driven by CSS instead. */
  const percent = $derived(
    value === null ? 0 : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  );

  const indeterminate = $derived(value === null);
</script>

<!--
  Accessibility: Bits owns `role="progressbar"` and the aria-value* attributes.
  A progressbar still needs an accessible NAME — pass `aria-label`, or
  `aria-labelledby` pointing at a visible label. Both pass through the spread.
-->
<ProgressPrimitive.Root
  {value}
  {max}
  {min}
  class={className}
  data-slot="progress"
  data-indeterminate={indeterminate ? '' : undefined}
  {...rest}
>
  <div class="sve-progress__fill" style:width={indeterminate ? undefined : `${percent}%`}></div>
</ProgressPrimitive.Root>

<style>
  :global(.sve-progress) {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: var(--sve-radius-full);
    background-color: var(--sve-color-default-surface);
  }

  /* --- Sizes --- */
  :global(.sve-progress--sm) { height: 0.25rem; }
  :global(.sve-progress--md) { height: 0.5rem; }
  :global(.sve-progress--lg) { height: 0.75rem; }

  :global(.sve-progress__fill) {
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    transition: width 0.25s ease;
  }

  /* --- Indeterminate: a travelling sliver, since there is no value to show --- */
  :global(.sve-progress[data-indeterminate] .sve-progress__fill) {
    width: 35%;
    animation: sve-progress-slide 1.3s ease-in-out infinite;
  }

  /* --- Colors via currentColor on the track --- */
  :global(.sve-c-primary)   { color: var(--sve-color-primary); }
  :global(.sve-c-secondary) { color: var(--sve-color-secondary); }
  :global(.sve-c-success)   { color: var(--sve-color-success); }
  :global(.sve-c-warning)   { color: var(--sve-color-warning); }
  :global(.sve-c-danger)    { color: var(--sve-color-danger); }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-progress__fill) {
      transition: none;
    }
    /* Keep a visible indicator rather than a moving one. */
    :global(.sve-progress[data-indeterminate] .sve-progress__fill) {
      animation: none;
      width: 100%;
      opacity: 0.4;
    }
  }

  @keyframes sve-progress-slide {
    from { transform: translateX(-100%); }
    to   { transform: translateX(286%); }
  }
</style>
