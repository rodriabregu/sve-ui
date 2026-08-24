<script lang="ts">
	import * as DateField from '$lib/components/DateField/index.js';
	import { CalendarDate } from '@internationalized/date';

	interface Props {
		locale?: string;
		granularity?: 'day' | 'hour' | 'minute' | 'second';
	}

	let { locale = 'en-US', granularity }: Props = $props();

	let value = $state<CalendarDate | undefined>(undefined);
</script>

<DateField.Root bind:value {locale} {granularity}>
	<DateField.Label>Departure date</DateField.Label>
	<DateField.Input>
		{#snippet children({ segments })}
			{#each segments as { part, value: segValue }, i (i)}
				<DateField.Segment {part}>{segValue}</DateField.Segment>
			{/each}
		{/snippet}
	</DateField.Input>
</DateField.Root>
<output data-testid="value">{value?.toString() ?? ''}</output>
