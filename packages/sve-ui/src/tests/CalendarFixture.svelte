<script lang="ts">
	import * as Calendar from '$lib/components/Calendar/index.js';
	import { CalendarDate } from '@internationalized/date';

	interface Props {
		locale?: string;
		minValue?: CalendarDate;
		maxValue?: CalendarDate;
	}

	let { locale = 'en', minValue, maxValue }: Props = $props();

	// A fixed month so the assertions are deterministic — January 2026.
	let value = $state<CalendarDate | undefined>(new CalendarDate(2026, 1, 15));
	let placeholder = $state(new CalendarDate(2026, 1, 1));
</script>

<Calendar.Root
	type="single"
	bind:value
	bind:placeholder
	{locale}
	{minValue}
	{maxValue}
	calendarLabel="Departure date"
	isDateUnavailable={(d) => d.day === 20}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header>
			<Calendar.PrevButton aria-label="Previous month">‹</Calendar.PrevButton>
			<Calendar.Heading />
			<Calendar.NextButton aria-label="Next month">›</Calendar.NextButton>
		</Calendar.Header>
		{#each months as month (month.value)}
			<Calendar.Grid>
				<Calendar.GridHead>
					<Calendar.GridRow>
						<!-- Key by INDEX: narrow weekday names are not unique ("T" is both
                 Tuesday and Thursday), so keying by the label throws. -->
						{#each weekdays as day, i (i)}
							<Calendar.HeadCell>{day}</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as week, i (i)}
						<Calendar.GridRow>
							{#each week as date (date)}
								<Calendar.Cell {date} month={month.value}>
									<Calendar.Day />
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	{/snippet}
</Calendar.Root>
<output data-testid="value">{value?.toString() ?? ''}</output>
