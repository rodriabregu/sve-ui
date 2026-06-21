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
    ['sve-card__footer', cls].filter(Boolean).join(' ')
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-card__footer {
    padding: var(--sve-space-4) var(--sve-space-6);
    border-top: 1px solid var(--sve-color-default-border);
    display: flex;
    align-items: center;
    gap: var(--sve-space-3);
  }
</style>
