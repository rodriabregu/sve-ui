<script lang="ts">
  import { Avatar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  import type { Snippet } from 'svelte';

  type BitsRootProps = ComponentProps<typeof Avatar.Root>;

  type Size = 'sm' | 'md' | 'lg';
  type Shape = 'circle' | 'square';

  interface Props extends Omit<BitsRootProps, 'class'> {
    size?: Size;
    shape?: Shape;
    class?: string;
    children?: Snippet;
  }

  let {
    size = 'md',
    shape = 'circle',
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const className = $derived(
    [
      'sve-avatar',
      `sve-avatar--${size}`,
      `sve-avatar--${shape}`,
      cls ?? '',
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<Avatar.Root
  class={className}
  data-slot="avatar-root"
  {children}
  {...rest}
/>

<style>
  :global(.sve-avatar) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    font-family: var(--sve-font-family-sans);
    font-weight: var(--sve-font-weight-medium);
    background-color: var(--sve-color-default-surface);
    color: var(--sve-color-default-foreground);
  }

  /* --- Sizes --- */
  :global(.sve-avatar--sm) { width: 2rem;   height: 2rem;   font-size: var(--sve-font-size-sm); }
  :global(.sve-avatar--md) { width: 2.5rem; height: 2.5rem; font-size: var(--sve-font-size-md); }
  :global(.sve-avatar--lg) { width: 3.5rem; height: 3.5rem; font-size: var(--sve-font-size-lg); }

  /* --- Shapes --- */
  :global(.sve-avatar--circle) { border-radius: var(--sve-radius-full); }
  :global(.sve-avatar--square) { border-radius: var(--sve-radius-md); }
</style>
