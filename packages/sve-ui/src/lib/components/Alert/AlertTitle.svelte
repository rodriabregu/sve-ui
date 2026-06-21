<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /** Element to render. Defaults to a semantic `<p>` (not a bare `<div>`). */
    as?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    as = 'p',
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-alert__title', cls].filter(Boolean).join(' ')
  );
</script>

<svelte:element this={as} class={className} {...rest}>
  {@render children?.()}
</svelte:element>

<style>
  .sve-alert__title {
    font-weight: var(--sve-font-weight-medium);
    font-size: var(--sve-font-size-md);
    line-height: var(--sve-line-height-tight);
  }
</style>
