<script module lang="ts">
  export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';
  import type { ComponentProps, Snippet } from 'svelte';

  type BitsRootProps = ComponentProps<typeof LabelPrimitive.Root>;

  interface Props extends Omit<BitsRootProps, 'class' | 'children'> {
    size?: Size;
    /**
     * Renders a visual required marker. This is decorative only — the control
     * itself must still carry `required` (or `aria-required`) so assistive
     * technology announces it.
     */
    required?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    size = 'md',
    required = false,
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-label', `sve-label--${size}`, cls].filter(Boolean).join(' ')
  );
</script>

<!--
  Accessibility: pass `for` matching the control's `id`, or nest the control
  inside the label. Bits owns the click-to-focus behaviour.
-->
<LabelPrimitive.Root class={className} data-slot="label" {...rest}>
  {@render children?.()}
  {#if required}
    <span class="sve-label__required" aria-hidden="true">*</span>
  {/if}
</LabelPrimitive.Root>

<style>
  :global(.sve-label) {
    display: inline-flex;
    align-items: center;
    gap: var(--sve-space-1);
    font-family: var(--sve-font-family-sans);
    font-weight: var(--sve-font-weight-medium);
    line-height: var(--sve-line-height-tight);
    color: var(--sve-color-default-foreground);
  }

  /* --- Sizes --- */
  :global(.sve-label--sm) { font-size: var(--sve-font-size-xs); }
  :global(.sve-label--md) { font-size: var(--sve-font-size-sm); }
  :global(.sve-label--lg) { font-size: var(--sve-font-size-md); }

  :global(.sve-label__required) {
    color: var(--sve-color-danger);
  }

  /* Dim the label when it labels a disabled control */
  :global(.sve-label:has(+ :disabled)),
  :global(.sve-label:has(:disabled)) {
    opacity: 0.5;
  }
</style>
