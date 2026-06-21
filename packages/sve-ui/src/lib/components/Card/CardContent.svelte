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
    ['sve-card__content', cls].filter(Boolean).join(' ')
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-card__content {
    padding: var(--sve-space-6);
    flex: 1;
    color: var(--sve-color-default-foreground);
    font-size: var(--sve-font-size-md);
    line-height: var(--sve-line-height-normal);
  }
</style>
