<script lang="ts">
	import { CalendarDate, Time } from '@internationalized/date';
	import type { DateValue } from '@internationalized/date';
	import {
		Busy,
		Button,
		Card,
		DateField,
		DateRangeField,
		DateRangePicker,
		DatePicker,
		RangeCalendar,
		Field,
		Heading,
		RatingGroup,
		Slider,
		Spinner,
		Text,
		TimeField,
		TimeRangeField,
		ToggleGroup,
		toast,
		focusFirstInvalidField
	} from 'sve-ui';

	/*
		This screen exists because the last two user-reported bugs were in components
		the example never rendered: PinInput showed nothing you typed, and the date
		pickers opened a transparent panel. Both needed someone to OPEN them.

		So it is deliberately the date-heavy screen.
	*/

	let stay = $state<{ start: DateValue | undefined; end: DateValue | undefined }>({
		start: new CalendarDate(2026, 3, 12),
		end: undefined
	});
	let arrivalTime = $state<Time | undefined>(new Time(15, 0));
	let quietHours = $state<{ start: Time | undefined; end: Time | undefined }>({
		start: new Time(22, 0),
		end: new Time(7, 0)
	});
	let deadline = $state<DateValue | undefined>(undefined);
	let budget = $state(1200);
	let rating = $state(4);
	let board = $state('half');

	let formEl = $state<HTMLFormElement>();
	let errors = $state<{ stay?: string; deadline?: string }>({});
	let saving = $state(false);
	let quote = $state<number | null>(null);
	let loadingQuote = $state(false);

	const nights = $derived(
		stay.start && stay.end
			? Math.max(0, stay.end.toDate('UTC').getTime() - stay.start.toDate('UTC').getTime()) /
					86_400_000
			: 0
	);

	const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		saving = true;
		errors = {};
		await new Promise((r) => setTimeout(r, 600));

		const next: typeof errors = {};
		if (!stay.start || !stay.end) next.stay = 'Pick both ends of the stay.';
		if (!deadline) next.deadline = 'Pick a decision date.';
		saving = false;

		if (Object.keys(next).length > 0) {
			errors = next;
			await focusFirstInvalidField({ root: formEl });
			return;
		}

		loadingQuote = true;
		await new Promise((r) => setTimeout(r, 1100));
		quote = nights * (budget / 10);
		loadingQuote = false;
		toast.success('Quote ready', { description: `${nights} nights` });
	}
</script>

<Heading level={1} size="lg">Booking</Heading>
<Text color="secondary">Every date component in one form, because that is where they break.</Text>

<form bind:this={formEl} onsubmit={submit} novalidate>
	<Field
		label="Stay dates"
		description="Two months are shown so a stay across a month boundary is visible at once."
		error={errors.stay}
		required
	>
		{#snippet control(props)}
			<DateRangePicker.Root bind:value={stay} locale="en-US" numberOfMonths={2}>
				<DateRangePicker.Label>Stay dates</DateRangePicker.Label>
				<!-- One Input per end of the range; `type` is required on each. -->
				<DateRangePicker.Input type="start">
					{#snippet children({ segments })}
						{#each segments as { part, value }, i (i)}
							<DateRangePicker.Segment {part}>{value}</DateRangePicker.Segment>
						{/each}
					{/snippet}
				</DateRangePicker.Input>
				<span aria-hidden="true">&ndash;</span>
				<DateRangePicker.Input type="end">
					{#snippet children({ segments })}
						{#each segments as { part, value }, i (i)}
							<DateRangePicker.Segment {part}>{value}</DateRangePicker.Segment>
						{/each}
					{/snippet}
				</DateRangePicker.Input>
				<DateRangePicker.Trigger {...props} aria-label="Open the stay calendar" />
				<DateRangePicker.Content>
					<DateRangePicker.Calendar>
						{#snippet children({ months, weekdays })}
							<DateRangePicker.Header>
								<DateRangePicker.PrevButton aria-label="Previous month"
									>&lsaquo;</DateRangePicker.PrevButton
								>
								<DateRangePicker.Heading />
								<DateRangePicker.NextButton aria-label="Next month"
									>&rsaquo;</DateRangePicker.NextButton
								>
							</DateRangePicker.Header>
							{#each months as month (month.value)}
								<DateRangePicker.Grid>
									<DateRangePicker.GridHead>
										<DateRangePicker.GridRow>
											{#each weekdays as day, i (i)}
												<DateRangePicker.HeadCell>{day.slice(0, 2)}</DateRangePicker.HeadCell>
											{/each}
										</DateRangePicker.GridRow>
									</DateRangePicker.GridHead>
									<DateRangePicker.GridBody>
										{#each month.weeks as week, w (w)}
											<DateRangePicker.GridRow>
												{#each week as date (date.toString())}
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
		{/snippet}
	</Field>

	<Field label="Decide by" error={errors.deadline} required>
		{#snippet control(props)}
			<DatePicker.Root bind:value={deadline} locale="en-US" calendarLabel="Decision date">
				<DatePicker.Label>Decide by</DatePicker.Label>
				<DatePicker.Input>
					{#snippet children({ segments })}
						{#each segments as { part, value }, i (i)}
							<DatePicker.Segment {part}>{value}</DatePicker.Segment>
						{/each}
					{/snippet}
				</DatePicker.Input>
				<DatePicker.Trigger {...props} aria-label="Open the decision calendar" />
				<DatePicker.Content>
					<DatePicker.Calendar>
						{#snippet children({ months, weekdays })}
							<DatePicker.Header>
								<DatePicker.PrevButton aria-label="Previous month">&lsaquo;</DatePicker.PrevButton>
								<DatePicker.Heading />
								<DatePicker.NextButton aria-label="Next month">&rsaquo;</DatePicker.NextButton>
							</DatePicker.Header>
							{#each months as month (month.value)}
								<DatePicker.Grid>
									<DatePicker.GridHead>
										<DatePicker.GridRow>
											{#each weekdays as day, i (i)}
												<DatePicker.HeadCell>{day.slice(0, 2)}</DatePicker.HeadCell>
											{/each}
										</DatePicker.GridRow>
									</DatePicker.GridHead>
									<DatePicker.GridBody>
										{#each month.weeks as week, w (w)}
											<DatePicker.GridRow>
												{#each week as date (date.toString())}
													<DatePicker.Cell {date} month={month.value}>
														<DatePicker.Day />
													</DatePicker.Cell>
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
		{/snippet}
	</Field>

	<Field label="Arrival time" description="Local time at the property.">
		{#snippet control(props)}
			<TimeField.Root bind:value={arrivalTime} locale="en-US" {...props}>
				<TimeField.Input>
					{#snippet children({ segments })}
						{#each segments as { part, value }, i (i)}
							<TimeField.Segment {part}>{value}</TimeField.Segment>
						{/each}
					{/snippet}
				</TimeField.Input>
			</TimeField.Root>
		{/snippet}
	</Field>

	<Field label="Nightly budget" description="US dollars.">
		{#snippet control(props)}
			<Slider
				{...props}
				value={budget}
				max={5000}
				step={50}
				thumbLabel="Nightly budget"
				onValueChange={(v: number[]) => (budget = v[0] ?? budget)}
			/>
		{/snippet}
	</Field>

	<Field label="Board" description="What is included.">
		{#snippet control(props)}
			<ToggleGroup.Root type="single" bind:value={board} aria-label="Board type" {...props}>
				<ToggleGroup.Item value="room" aria-label="Room only">Room</ToggleGroup.Item>
				<ToggleGroup.Item value="half" aria-label="Half board">Half</ToggleGroup.Item>
				<ToggleGroup.Item value="full" aria-label="Full board">Full</ToggleGroup.Item>
			</ToggleGroup.Root>
		{/snippet}
	</Field>

	<Field label="How important is a sea view?">
		{#snippet control(props)}
			<RatingGroup.Root
				{...props}
				bind:value={rating}
				max={5}
				aria-label="Sea view importance"
				aria-valuetext={(v: number, max: number) => `${v} of ${max}`}
			>
				{#snippet children({ items })}
					{#each items as item (item.index)}
						<RatingGroup.Item index={item.index}>&#9733;</RatingGroup.Item>
					{/each}
				{/snippet}
			</RatingGroup.Root>
		{/snippet}
	</Field>

	<Button type="submit" color="primary" loading={saving} loadingLabel="Checking the dates">
		Get a quote
	</Button>
</form>

<Busy
	busy={loadingQuote}
	label="Preparing your quote"
	doneLabel={quote === null ? 'No quote yet' : 'Quote ready'}
>
	<Card.Root>
		<Card.Header><Heading level={2} size="md">Quote</Heading></Card.Header>
		<Card.Content>
			{#if loadingQuote}
				<Spinner />
			{:else if quote === null}
				<Text color="secondary">Submit the form to see a price.</Text>
			{:else}
				<Text>{nights} nights &middot; {money.format(quote)}</Text>
			{/if}
		</Card.Content>
	</Card.Root>
</Busy>

<!--
	The same dates again, but as bare fields instead of pickers. Typed entry and
	calendar entry are different components with different failure modes, and a
	screen that only renders the picker never exercises the segments.
-->
<Card.Root>
	<Card.Header><Heading level={2} size="md">Type the dates instead</Heading></Card.Header>
	<Card.Content>
		<DateRangeField.Root bind:value={stay} locale="en-GB">
			<DateRangeField.Label>Stay</DateRangeField.Label>
			<DateRangeField.Input type="start">
				{#snippet children({ segments })}
					{#each segments as { part, value: sv }, i (i)}
						<DateRangeField.Segment {part}>{sv}</DateRangeField.Segment>
					{/each}
				{/snippet}
			</DateRangeField.Input>
			<span aria-hidden="true">&ndash;</span>
			<DateRangeField.Input type="end">
				{#snippet children({ segments })}
					{#each segments as { part, value: sv }, i (i)}
						<DateRangeField.Segment {part}>{sv}</DateRangeField.Segment>
					{/each}
				{/snippet}
			</DateRangeField.Input>
		</DateRangeField.Root>

		<DateField.Root bind:value={deadline} locale="en-GB">
			<DateField.Label>Decide by</DateField.Label>
			<DateField.Input>
				{#snippet children({ segments })}
					{#each segments as { part, value: sv }, i (i)}
						<DateField.Segment {part}>{sv}</DateField.Segment>
					{/each}
				{/snippet}
			</DateField.Input>
		</DateField.Root>

		<TimeRangeField.Root bind:value={quietHours} locale="en-GB">
			<TimeRangeField.Label>Quiet hours</TimeRangeField.Label>
			<TimeRangeField.Input type="start">
				{#snippet children({ segments })}
					{#each segments as { part, value: sv }, i (i)}
						<TimeRangeField.Segment {part}>{sv}</TimeRangeField.Segment>
					{/each}
				{/snippet}
			</TimeRangeField.Input>
			<span aria-hidden="true">&ndash;</span>
			<TimeRangeField.Input type="end">
				{#snippet children({ segments })}
					{#each segments as { part, value: sv }, i (i)}
						<TimeRangeField.Segment {part}>{sv}</TimeRangeField.Segment>
					{/each}
				{/snippet}
			</TimeRangeField.Input>
		</TimeRangeField.Root>
	</Card.Content>
</Card.Root>

<Card.Root>
	<Card.Header><Heading level={2} size="md">Or pick them inline</Heading></Card.Header>
	<Card.Content>
		<RangeCalendar.Root bind:value={stay} calendarLabel="Stay dates" minDays={2}>
			{#snippet children({ months, weekdays })}
				<RangeCalendar.Header>
					<RangeCalendar.PrevButton>&lsaquo;</RangeCalendar.PrevButton>
					<RangeCalendar.Heading />
					<RangeCalendar.NextButton>&rsaquo;</RangeCalendar.NextButton>
				</RangeCalendar.Header>
				{#each months as month (month.value)}
					<RangeCalendar.Grid>
						<RangeCalendar.GridHead>
							<RangeCalendar.GridRow>
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
	</Card.Content>
</Card.Root>
