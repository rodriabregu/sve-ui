<script lang="ts">
  import * as ToggleGroup from '$lib/components/ToggleGroup/index.js';

  let value = $state('left');
</script>

<ToggleGroup.Root type="single" bind:value aria-label="Text alignment">
  <ToggleGroup.Item value="left" aria-label="Align left">L</ToggleGroup.Item>
  <ToggleGroup.Item value="center" aria-label="Align center">C</ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Align right">R</ToggleGroup.Item>
</ToggleGroup.Root>
<output data-testid="value">{value}</output>
