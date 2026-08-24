<script lang="ts">
	import * as Command from '$lib/components/Command/index.js';

	let search = $state('');
	let value = $state('');
</script>

<Command.Root label="Command palette" bind:value>
	<Command.Input bind:value={search} placeholder="Type a command" />
	<Command.List>
		<Command.Viewport>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group>
				<Command.GroupHeading>Actions</Command.GroupHeading>
				<Command.GroupItems>
					<Command.Item value="new-file">New file</Command.Item>
					<Command.Item value="open-file">Open file</Command.Item>
					<Command.Item value="delete" keywords={['trash', 'remove']}>Delete</Command.Item>
				</Command.GroupItems>
			</Command.Group>
			<Command.Separator />
			<Command.Group>
				<Command.GroupHeading>Help</Command.GroupHeading>
				<Command.GroupItems>
					<Command.Item value="docs">Documentation</Command.Item>
				</Command.GroupItems>
			</Command.Group>
		</Command.Viewport>
	</Command.List>
</Command.Root>
<output data-testid="search">{search}</output>
<output data-testid="value">{value}</output>
