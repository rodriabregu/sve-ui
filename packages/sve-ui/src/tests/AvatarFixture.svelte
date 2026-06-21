<script lang="ts">
  import * as Avatar from '$lib/components/Avatar/index.js';

  type Size = 'sm' | 'md' | 'lg';
  type Shape = 'circle' | 'square';

  interface Props {
    size?: Size;
    shape?: Shape;
    src?: string;
    alt?: string;
  }

  let {
    size = 'md',
    shape = 'circle',
    src = '',
    alt = 'Test avatar',
  }: Props = $props();
</script>

<Avatar.Root {size} {shape}>
  <Avatar.Image {src} {alt} />
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar.Root>
