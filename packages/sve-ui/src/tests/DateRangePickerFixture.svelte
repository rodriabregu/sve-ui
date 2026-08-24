<script lang="ts">
	import * as DateRangePicker from '$lib/components/DateRangePicker/index.js';
	import { CalendarDate } from '@internationalized/date';

	let value = $state({
		start: new CalendarDate(2026, 1, 10) as CalendarDate | undefined,
		end: new CalendarDate(2026, 1, 14) as CalendarDate | undefined
	});
	let placeholder = $state(new CalendarDate(2026, 1, 1));
	let open = $state(false);
</script>

<DateRangePicker.Root
	bind:value
	bind:placeholder
	bind:open
	locale="en-US"
	calendarLabel="Stay dates"
	aria-labelledby="drp-label"
>
	<DateRangePicker.Label id="drp-label">Stay dates</DateRangePicker.Label>
	<DateRangePicker.Input type="start">
		{#snippet children({ segments })}
			{#each segments as { part, value: sv }, i (i)}
				<DateRangePicker.Segment {part}>{sv}</DateRangePicker.Segment>
			{/each}
		{/snippet}
	</DateRangePicker.Input>
	<span aria-hidden="true">–</span>
	<DateRangePicker.Input type="end">
		{#snippet children({ segments })}
			{#each segments as { part, value: sv }, i (i)}
				<DateRangePicker.Segment {part}>{sv}</DateRangePicker.Segment>
			{/each}
			<DateRangePicker.Trigger aria-label="Open calendar">📅</DateRangePicker.Trigger>
		{/snippet}
	</DateRangePicker.Input>
	<DateRangePicker.Content>
		<DateRangePicker.Calendar>
			{#snippet children({ months, weekdays })}
				<DateRangePicker.Header>
					<DateRangePicker.PrevButton>‹</DateRangePicker.PrevButton>
					<DateRangePicker.Heading />
					<DateRangePicker.NextButton>›</DateRangePicker.NextButton>
				</DateRangePicker.Header>
				{#each months as month (month.value)}
					<DateRangePicker.Grid>
						<DateRangePicker.GridHead>
							<DateRangePicker.GridRow>
								{#each weekdays as day, i (i)}
									<DateRangePicker.HeadCell>{day}</DateRangePicker.HeadCell>
								{/each}
							</DateRangePicker.GridRow>
						</DateRangePicker.GridHead>
						<DateRangePicker.GridBody>
							{#each month.weeks as week, i (i)}
								<DateRangePicker.GridRow>
									{#each week as date (date)}
										<DateRangePicker.Cell {date} month={month.value}>
											<DateRangePicker.Day />
										</DateRangePicker.Cell>
									{/each}
								</DateRangePicker.GridRow>
							{/each}
						</DateRangePicker.GridBody>
					</DateRangePicker.Grid>
				{/each}
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
</DateRangePicker.Root>
<output data-testid="range">{value.start?.toString()}..{value.end?.toString()}</output>
