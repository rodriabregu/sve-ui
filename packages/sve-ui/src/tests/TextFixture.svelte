<script lang="ts">
  import Text from '$lib/components/Text/Text.svelte';

  type As = 'p' | 'span' | 'div' | 'label';
  type Size = 'sm' | 'md' | 'lg';
  type Weight = 'normal' | 'medium' | 'bold';
  type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

  interface Props {
    as?: As;
    size?: Size;
    weight?: Weight;
    color?: Color;
    content?: string;
  }

  let { as = 'p', size, weight, color, content = 'Hello text' }: Props = $props();
</script>

<Text {as} {size} {weight} {color} data-testid="text-el">{content}</Text>
