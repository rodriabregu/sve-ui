<script lang="ts">
	import { DatePicker } from 'sve-ui';
	import { CalendarDate } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['date-picker'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why both halves' },
		{ id: 'composed', label: 'Almost entirely reused' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { DatePicker } from 'sve-ui';
  import { CalendarDate } from '@internationalized/date';

  let value = $state(new CalendarDate(2026, 1, 15));
<\u002fscript>

<DatePicker.Root bind:value locale={userLocale} calendarLabel="Departure date">
  <DatePicker.Label>Departure</DatePicker.Label>
  <DatePicker.Input>
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (i)}
        <DatePicker.Segment {part}>{value}</DatePicker.Segment>
      {/each}
      <DatePicker.Trigger aria-label="Open calendar">&#128197;</DatePicker.Trigger>
    {/snippet}
  </DatePicker.Input>
  <DatePicker.Content>
    <DatePicker.Calendar>
      <!-- compose the calendar exactly as on the Calendar page -->
    </DatePicker.Calendar>
  </DatePicker.Content>
</DatePicker.Root>`;

	let value = $state<CalendarDate | undefined>(new CalendarDate(2026, 1, 15));
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			A segmented field plus a calendar popover, sharing <strong>one</strong> value. Put the
			<code class="ic">Trigger</code> inside the <code class="ic">Input</code>, after the segments —
			it is usually icon-only, so give it an <code class="ic">aria-label</code>.
		</p>
		<Preview code={usageCode} align="start">
			<DatePicker.Root bind:value locale="en-US" calendarLabel="Departure date">
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
													<DatePicker.Cell {date} month={month.value}
														><DatePicker.Day /></DatePicker.Cell
													>
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
		</Preview>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why both halves</h2>
		<p class="sec__p">
			The pairing is the point. Someone who <em>knows</em> the date types it in three keystrokes;
			someone choosing "the second Tuesday" opens the calendar. Ship only the
			<a href="/components/calendar">calendar</a> and you have made the fast path slow. Ship only
			the
			<a href="/components/date-field">field</a> and you have made browsing impossible.
		</p>
		<p class="sec__p">
			They share one value rather than two synced ones, which is why typing a date moves the
			calendar's selection and picking a day fills the segments — no reconciliation code on your
			side. Asserted in the tests.
		</p>
	</section>

	<section id="composed" class="sec">
		<h2 class="sec__h">Almost entirely reused</h2>
		<p class="sec__p">
			Only <code class="ic">Root</code>, <code class="ic">Trigger</code>,
			<code class="ic">Content</code> and <code class="ic">Calendar</code> are specific to the picker.
			Everything else is a component you already have, because Bits re-exports the identical modules:
		</p>
		<ul class="sec__p">
			<li>
				<code class="ic">Input</code>, <code class="ic">Label</code>,
				<code class="ic">Segment</code>
				→ <a href="/components/date-field">Date Field</a>
			</li>
			<li>the calendar chrome → <a href="/components/calendar">Calendar</a></li>
			<li>
				<code class="ic">Arrow</code>, <code class="ic">Close</code> →
				<a href="/components/popover">Popover</a>
			</li>
		</ul>
		<p class="sec__p">
			So a field inside a picker behaves and looks exactly like a standalone one — not by
			convention, but because it <em>is</em> the same component.
		</p>
		<p class="sec__p">
			Everything on those pages applies here: <code class="ic">locale</code> reorders the segments
			and sets the calendar's first day of week, <code class="ic">calendarLabel</code> must be passed
			(Bits defaults it to the literal word "Event"), and the calendar's nav buttons have hardcoded aria-labels.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">DatePicker.Root</code> — <code class="ic">value</code>,
			<code class="ic">placeholder</code> and <code class="ic">open</code> are bindable.
		</p>
		<PropsTable component="DatePickerRoot" />
		<p class="sec__p" style="margin-top:16px">
			The reused parts are documented on their own pages.
		</p>
	</section>
</DocPage>

<style>
	.sec {
		margin-bottom: 48px;
		scroll-margin-top: 84px;
	}
	.sec__h {
		font-size: 21px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--doc-fg);
		margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.sec__p a {
		color: var(--doc-primary-text);
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
</style>
