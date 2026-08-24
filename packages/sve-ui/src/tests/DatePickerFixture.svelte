<script lang="ts">
	import * as DatePicker from '$lib/components/DatePicker/index.js';
	import { CalendarDate } from '@internationalized/date';

	let value = $state<CalendarDate | undefined>(new CalendarDate(2026, 1, 15));
	let placeholder = $state(new CalendarDate(2026, 1, 1));
	let open = $state(false);
</script>

<DatePicker.Root
	bind:value
	bind:placeholder
	bind:open
	locale="en-US"
	calendarLabel="Departure date"
>
	<DatePicker.Label>Departure</DatePicker.Label>
	<DatePicker.Input>
		{#snippet children({ segments })}
			{#each segments as { part, value: sv }, i (i)}
				<DatePicker.Segment {part}>{sv}</DatePicker.Segment>
			{/each}
			<DatePicker.Trigger aria-label="Open calendar">📅</DatePicker.Trigger>
		{/snippet}
	</DatePicker.Input>
	<DatePicker.Content>
		<DatePicker.Calendar>
			{#snippet children({ months, weekdays })}
				<DatePicker.Header>
					<DatePicker.PrevButton>‹</DatePicker.PrevButton>
					<DatePicker.Heading />
					<DatePicker.NextButton>›</DatePicker.NextButton>
				</DatePicker.Header>
				{#each months as month (month.value)}
					<DatePicker.Grid>
						<DatePicker.GridHead>
							<DatePicker.GridRow>
								{#each weekdays as day, i (i)}
									<DatePicker.HeadCell>{day}</DatePicker.HeadCell>
								{/each}
							</DatePicker.GridRow>
						</DatePicker.GridHead>
						<DatePicker.GridBody>
							{#each month.weeks as week, i (i)}
								<DatePicker.GridRow>
									{#each week as date (date)}
										<DatePicker.Cell {date} month={month.value}><DatePicker.Day /></DatePicker.Cell>
									{/each}
								</DatePicker.GridRow>
							{/each}
						</DatePicker.GridBody>
					</DatePicker.Grid>
				{/each}
			{/snippet}
		</DatePicker.Calendar>
	</DatePicker.Content>
</DatePicker.Root>
<output data-testid="value">{value?.toString() ?? ''}</output>
<output data-testid="open">{open}</output>
