<script lang="ts">
  import { Avatar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  import type { Snippet } from 'svelte';

  type BitsFallbackProps = ComponentProps<typeof Avatar.Fallback>;

  interface Props extends Omit<BitsFallbackProps, 'class'> {
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<Avatar.Fallback
  class={['sve-avatar__fallback', cls].filter(Boolean).join(' ')}
  {children}
  {...rest}
/>

<style>
  :global(.sve-avatar__fallback) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: var(--sve-font-family-sans);
    font-weight: var(--sve-font-weight-medium);
    user-select: none;
  }
</style>
