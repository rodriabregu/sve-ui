<script lang="ts">
  import * as Sheet from '$lib/components/Sheet/index.js';

  interface Props {
    side?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg';
  }

  let { side, size }: Props = $props();

  let open = $state(false);
</script>

<Sheet.Root bind:open>
  <Sheet.Trigger>Open filters</Sheet.Trigger>
  <Sheet.Content {side} {size}>
    <Sheet.Title>Filters</Sheet.Title>
    <Sheet.Description>Narrow the result list.</Sheet.Description>
    <Sheet.Close>Done</Sheet.Close>
  </Sheet.Content>
</Sheet.Root>
<output data-testid="open">{open}</output>
