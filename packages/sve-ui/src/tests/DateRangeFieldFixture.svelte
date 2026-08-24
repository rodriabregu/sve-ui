<script lang="ts">
	import * as DateRangeField from '$lib/components/DateRangeField/index.js';
	import { CalendarDate } from '@internationalized/date';

	let value = $state({
		start: undefined as CalendarDate | undefined,
		end: undefined as CalendarDate | undefined
	});
</script>

<!--
  aria-labelledby on the ROOT: Bits leaves the range field's group unnamed,
  so without this it announces as an anonymous group.
-->
<DateRangeField.Root bind:value locale="en-US" aria-labelledby="stay-label">
	<DateRangeField.Label id="stay-label">Stay dates</DateRangeField.Label>
	<!--
    TWO Inputs, one per half. `type` is required — this is not one input holding
    a range, it is a start field and an end field sharing a Root and a Label.
  -->
	<DateRangeField.Input type="start">
		{#snippet children({ segments })}
			{#each segments as { part, value: segValue }, i (i)}
				<DateRangeField.Segment {part}>{segValue}</DateRangeField.Segment>
			{/each}
		{/snippet}
	</DateRangeField.Input>
	<span aria-hidden="true">–</span>
	<DateRangeField.Input type="end">
		{#snippet children({ segments })}
			{#each segments as { part, value: segValue }, i (i)}
				<DateRangeField.Segment {part}>{segValue}</DateRangeField.Segment>
			{/each}
		{/snippet}
	</DateRangeField.Input>
</DateRangeField.Root>
