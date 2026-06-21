<script lang="ts">
  import * as Popover from '$lib/components/Popover/index.js';
</script>

<Popover.Root>
  {#snippet children()}
    <Popover.Trigger>
      {#snippet children()}
        Open popover
      {/snippet}
    </Popover.Trigger>
    <Popover.Content>
      {#snippet children()}
        <p>Popover content</p>
        <Popover.Close>
          {#snippet children()}
            Close
          {/snippet}
        </Popover.Close>
      {/snippet}
    </Popover.Content>
  {/snippet}
</Popover.Root>
