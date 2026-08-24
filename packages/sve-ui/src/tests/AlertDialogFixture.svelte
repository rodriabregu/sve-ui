<script lang="ts">
	import * as AlertDialog from '$lib/components/AlertDialog/index.js';

	let open = $state(false);
	let confirmed = $state(false);
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Title>Delete this project?</AlertDialog.Title>
		<AlertDialog.Description>
			This removes the project and every deployment. It cannot be undone.
		</AlertDialog.Description>
		<AlertDialog.Cancel>Keep project</AlertDialog.Cancel>
		<AlertDialog.Action onclick={() => (confirmed = true)}>Delete project</AlertDialog.Action>
	</AlertDialog.Content>
</AlertDialog.Root>
<output data-testid="open">{open}</output>
<output data-testid="confirmed">{confirmed}</output>
