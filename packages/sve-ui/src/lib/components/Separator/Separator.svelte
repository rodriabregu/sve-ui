<script lang="ts">
  import { Separator as SeparatorPrimitive } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof SeparatorPrimitive.Root>;

  interface Props extends Omit<BitsRootProps, 'class'> {
    class?: string;
  }

  let {
    orientation = 'horizontal',
    decorative = false,
    class: cls,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-separator', `sve-separator--${orientation}`, cls].filter(Boolean).join(' ')
  );
</script>

<!--
  Bits owns the semantics: `role="separator"` with `aria-orientation`, or
  `role="none"` when `decorative` is set. Use `decorative` for purely visual
  rules that carry no structural meaning.
-->
<SeparatorPrimitive.Root class={className} data-slot="separator" {orientation} {decorative} {...rest} />

<style>
  :global(.sve-separator) {
    flex-shrink: 0;
    background-color: var(--sve-color-default-border);
    border: none;
  }

  :global(.sve-separator--horizontal) {
    width: 100%;
    height: 1px;
  }

  :global(.sve-separator--vertical) {
    width: 1px;
    height: 100%;
    align-self: stretch;
  }
</style>
