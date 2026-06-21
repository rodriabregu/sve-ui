<script lang="ts">
  import { Avatar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsImageProps = ComponentProps<typeof Avatar.Image>;

  interface Props extends Omit<BitsImageProps, 'class' | 'alt'> {
    /** Required: describes the image for screen readers. Always provide meaningful alt text. */
    alt: string;
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<Avatar.Image
  class={['sve-avatar__image', cls].filter(Boolean).join(' ')}
  {...rest}
/>

<style>
  :global(.sve-avatar__image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
