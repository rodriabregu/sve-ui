<script lang="ts">
  import * as ToggleGroup from '$lib/components/ToggleGroup/index.js';

  let value = $state<string[]>(['bold']);
</script>

<ToggleGroup.Root type="multiple" bind:value aria-label="Text formatting">
  <ToggleGroup.Item value="bold" aria-label="Bold">B</ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic">I</ToggleGroup.Item>
</ToggleGroup.Root>
<output data-testid="value">{value.join(',')}</output>
