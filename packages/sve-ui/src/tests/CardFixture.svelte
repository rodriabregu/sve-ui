<script lang="ts">
  import * as Card from '$lib/components/Card/index.js';

  interface Props {
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: '2' | '4' | '6' | '8';
    class?: string;
  }

  let { variant, padding, class: cls }: Props = $props();
</script>

<Card.Root {variant} {padding} class={cls} data-testid="card-root">
  <Card.Header data-testid="card-header">Header</Card.Header>
  <Card.Content data-testid="card-content">Content</Card.Content>
  <Card.Footer data-testid="card-footer">Footer</Card.Footer>
</Card.Root>
