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
    ['sve-alert__description', cls].filter(Boolean).join(' ')
  );
</script>

<div class={className} {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-alert__description {
    font-size: var(--sve-font-size-sm);
    line-height: var(--sve-line-height-normal);
    opacity: 0.85;
  }
</style>
