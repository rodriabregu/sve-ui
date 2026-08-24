<script lang="ts">
	import * as RangeCalendar from '$lib/components/RangeCalendar/index.js';
	import { CalendarDate } from '@internationalized/date';

	let value = $state({
		start: new CalendarDate(2026, 1, 10),
		end: new CalendarDate(2026, 1, 14)
	});
	let placeholder = $state(new CalendarDate(2026, 1, 1));
</script>

<RangeCalendar.Root bind:value bind:placeholder calendarLabel="Stay dates">
	{#snippet children({ months, weekdays })}
		<RangeCalendar.Header>
			<RangeCalendar.PrevButton>‹</RangeCalendar.PrevButton>
			<RangeCalendar.Heading />
			<RangeCalendar.NextButton>›</RangeCalendar.NextButton>
		</RangeCalendar.Header>
		{#each months as month (month.value)}
			<RangeCalendar.Grid>
				<RangeCalendar.GridHead>
					<RangeCalendar.GridRow>
						<!-- Key by index: narrow weekday names are not unique. -->
						{#each weekdays as day, i (i)}
							<RangeCalendar.HeadCell>{day}</RangeCalendar.HeadCell>
						{/each}
					</RangeCalendar.GridRow>
				</RangeCalendar.GridHead>
				<RangeCalendar.GridBody>
					{#each month.weeks as week, i (i)}
						<RangeCalendar.GridRow>
							{#each week as date (date)}
								<RangeCalendar.Cell {date} month={month.value}>
									<RangeCalendar.Day />
								</RangeCalendar.Cell>
							{/each}
						</RangeCalendar.GridRow>
					{/each}
				</RangeCalendar.GridBody>
			</RangeCalendar.Grid>
		{/each}
	{/snippet}
</RangeCalendar.Root>
<output data-testid="range">{value.start?.toString()}..{value.end?.toString()}</output>
