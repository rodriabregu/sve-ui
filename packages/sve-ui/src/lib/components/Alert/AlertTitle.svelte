<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    class?: string;
    children?: Snippet;
  }

  let {
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    ['sve-alert__title', cls].filter(Boolean).join(' ')
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-alert__title {
    font-weight: var(--sve-font-weight-medium);
    font-size: var(--sve-font-size-md);
    line-height: var(--sve-line-height-tight);
  }
</style>
