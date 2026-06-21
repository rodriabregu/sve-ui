<script lang="ts">
  import Badge from '$lib/components/Badge/Badge.svelte';

  type Variant = 'solid' | 'outline' | 'subtle';
  type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: Variant;
    color?: Color;
    size?: Size;
    content?: string;
  }

  let { variant, color, size, content = 'Hello badge' }: Props = $props();
</script>

<Badge {variant} {color} {size} data-testid="badge-el">{content}</Badge>
