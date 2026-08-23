<script lang="ts">
	import { DateRangePicker } from 'sve-ui';
	import { CalendarDate } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['date-range-picker'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'months', label: 'Show two months' },
		{ id: 'naming', label: 'Name the Root' },
		{ id: 'composed', label: 'Almost entirely reused' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { DateRangePicker } from 'sve-ui';
<\u002fscript>

<DateRangePicker.Root
  bind:value
  locale={userLocale}
  calendarLabel="Stay dates"
  numberOfMonths={2}
  aria-labelledby="stay-label"
>
  <DateRangePicker.Label id="stay-label">Stay dates</DateRangePicker.Label>
  <DateRangePicker.Input type="start">...</DateRangePicker.Input>
  <span aria-hidden="true">&#8211;</span>
  <DateRangePicker.Input type="end">
    <!-- segments, then the Trigger -->
  </DateRangePicker.Input>
  <DateRangePicker.Content>
    <DateRangePicker.Calendar>...</DateRangePicker.Calendar>
  </DateRangePicker.Content>
</DateRangePicker.Root>`;

	let value = $state({
		start: new CalendarDate(2026, 1, 10) as CalendarDate | undefined,
		end: new CalendarDate(2026, 1, 14) as CalendarDate | undefined
	});
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Two segmented fields plus a range calendar, sharing one value. Put the
			<code class="ic">Trigger</code> in the <code class="ic">end</code> Input, after its segments.
		</p>
		<Preview code={usageCode} align="start">
			<DateRangePicker.Root
				bind:value
				locale="en-US"
				calendarLabel="Stay dates"
				aria-labelledby="demo-stay-label"
			>
				<DateRangePicker.Label id="demo-stay-label">Stay dates</DateRangePicker.Label>
				<div class="row">
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
				</div>
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
												<DateRangePicker.Cell {date} month={month.value}><DateRangePicker.Day /></DateRangePicker.Cell>
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
		</Preview>
	</section>

	<section id="months" class="sec">
		<h2 class="sec__h">Show two months</h2>
		<p class="sec__p">
			Set <code class="ic">numberOfMonths={2}</code> for most range pickers. A stay that crosses a
			month boundary is the common case, and one month forces the user to page back and forth just to
			see both ends of their own selection.
		</p>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">Name the Root</h2>
		<p class="warn">
			Like the <a href="/components/date-range-field">range field</a>, the range picker's group carries
			no accessible name of its own.
		</p>
		<p class="sec__p">
			Pass <code class="ic">aria-labelledby</code> pointing at your Label's id, or
			<code class="ic">aria-label</code>. Without it the field announces as an anonymous group.
		</p>
	</section>

	<section id="composed" class="sec">
		<h2 class="sec__h">Almost entirely reused</h2>
		<p class="sec__p">
			Only <code class="ic">Root</code>, <code class="ic">Trigger</code> and
			<code class="ic">Calendar</code> are specific to this picker. The rest comes from components you
			already have:
		</p>
		<ul class="sec__p">
			<li><code class="ic">Label</code>, <code class="ic">Input</code> → <a href="/components/date-range-field">Date Range Field</a> (Input takes the required <code class="ic">type</code>)</li>
			<li><code class="ic">Segment</code> → <a href="/components/date-field">Date Field</a></li>
			<li><code class="ic">Content</code> → <a href="/components/date-picker">Date Picker</a> — literally the same panel</li>
			<li>the calendar chrome → <a href="/components/calendar">Calendar</a></li>
			<li><code class="ic">Cell</code>, <code class="ic">Day</code> → <a href="/components/range-calendar">Range Calendar</a>, since they carry the range states</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">DateRangePicker.Root</code> — <code class="ic">value</code>,
			<code class="ic">placeholder</code> and <code class="ic">open</code> are bindable.
		</p>
		<PropsTable component="DateRangePickerRoot" />
	</section>
</DocPage>

<style>
	.sec { margin-bottom: 48px; scroll-margin-top: 84px; }
	.sec__h {
		font-size: 21px; font-weight: 700; letter-spacing: -0.02em;
		color: var(--doc-fg); margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px; font-size: 14.5px; line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.sec__p a { color: var(--doc-primary-text); }
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.warn {
		margin: 0 0 16px; padding: 12px 14px;
		border-left: 3px solid var(--doc-primary-text);
		background: var(--doc-surface-2);
		border-radius: 0 8px 8px 0;
		font-size: 14px; line-height: 1.55; color: var(--doc-fg-muted);
	}
	.row { display: flex; align-items: center; gap: 8px; }
</style>
