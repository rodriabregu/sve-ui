<script lang="ts">
  import * as Tooltip from '$lib/components/Tooltip/index.js';
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <Tooltip.Content>Tooltip text</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
