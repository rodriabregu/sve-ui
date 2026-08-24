<script lang="ts">
	import * as ContextMenu from '$lib/components/ContextMenu/index.js';
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>Right-click this row</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Group>
			<ContextMenu.Label>Actions</ContextMenu.Label>
			<ContextMenu.Item>Rename</ContextMenu.Item>
			<ContextMenu.Item>Duplicate</ContextMenu.Item>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Item>Delete</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
