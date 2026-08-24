<script lang="ts">
	import * as TimeField from '$lib/components/TimeField/index.js';
	import { Time } from '@internationalized/date';

	interface Props {
		hourCycle?: 12 | 24;
	}

	let { hourCycle }: Props = $props();

	let value = $state<Time | undefined>(undefined);
</script>

<TimeField.Root bind:value {hourCycle} locale="en-US">
	<TimeField.Label>Pickup time</TimeField.Label>
	<TimeField.Input>
		{#snippet children({ segments })}
			{#each segments as { part, value: segValue }, i (i)}
				<TimeField.Segment {part}>{segValue}</TimeField.Segment>
			{/each}
		{/snippet}
	</TimeField.Input>
</TimeField.Root>
