<script lang="ts">
  import * as DropdownMenu from '$lib/components/DropdownMenu/index.js';
</script>

<DropdownMenu.Root>
  {#snippet children()}
    <DropdownMenu.Trigger>
      {#snippet children()}
        Open menu
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      {#snippet children()}
        <DropdownMenu.Group>
          {#snippet children()}
            <DropdownMenu.Label>
              {#snippet children()}
                Actions
              {/snippet}
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              {#snippet children()}
                Edit
              {/snippet}
            </DropdownMenu.Item>
          {/snippet}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          {#snippet children()}
            Delete
          {/snippet}
        </DropdownMenu.Item>
      {/snippet}
    </DropdownMenu.Content>
  {/snippet}
</DropdownMenu.Root>
