<script lang="ts">
  import * as DropdownMenu from '$lib/components/DropdownMenu/index.js';
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item>Edit</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
