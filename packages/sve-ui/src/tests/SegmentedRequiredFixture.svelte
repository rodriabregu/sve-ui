<script lang="ts">
	import * as DateField from '$lib/components/DateField/index.js';

	interface Props {
		required?: boolean;
	}

	let { required = false }: Props = $props();
</script>

<DateField.Root locale="en-US" {required}>
	<DateField.Label>Departure</DateField.Label>
	<DateField.Input>
		{#snippet children({ segments })}
			{#each segments as { part, value }, i (i)}
				<DateField.Segment {part}>{value}</DateField.Segment>
			{/each}
		{/snippet}
	</DateField.Input>
</DateField.Root>
