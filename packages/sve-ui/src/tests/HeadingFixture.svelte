<script lang="ts">
  import Heading from '$lib/components/Heading/Heading.svelte';

  type Level = 1 | 2 | 3 | 4 | 5 | 6;
  type Size = 'sm' | 'md' | 'lg';
  type Weight = 'normal' | 'medium' | 'bold';

  interface Props {
    level?: Level;
    size?: Size;
    weight?: Weight;
    content?: string;
  }

  let { level, size, weight, content = 'Hello heading' }: Props = $props();
</script>

<Heading {level} {size} {weight} data-testid="heading-el">{content}</Heading>
