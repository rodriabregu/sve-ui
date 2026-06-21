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
    ['sve-card__header', cls].filter(Boolean).join(' ')
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-card__header {
    padding: var(--sve-space-4) var(--sve-space-6);
    border-bottom: 1px solid var(--sve-color-default-border);
    font-weight: var(--sve-font-weight-medium);
    font-size: var(--sve-font-size-md);
    color: var(--sve-color-default-foreground);
  }
</style>
