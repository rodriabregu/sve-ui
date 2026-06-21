<script lang="ts">
  import * as Tooltip from '$lib/components/Tooltip/index.js';
</script>

<Tooltip.Provider>
  {#snippet children()}
    <Tooltip.Root>
      {#snippet children()}
        <Tooltip.Trigger>
          {#snippet children()}
            Hover me
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content>
          {#snippet children()}
            Tooltip text
          {/snippet}
        </Tooltip.Content>
      {/snippet}
    </Tooltip.Root>
  {/snippet}
</Tooltip.Provider>
