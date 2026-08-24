<script lang="ts">
	import { RangeCalendar } from 'sve-ui';
	import { CalendarDate } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['range-calendar'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'interaction', label: 'The two-step interaction' },
		{ id: 'bounds', label: 'Bounding the span' },
		{ id: 'shared', label: 'Shared with Calendar' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { RangeCalendar } from 'sve-ui';
  import { CalendarDate } from '@internationalized/date';

  let value = $state({
    start: new CalendarDate(2026, 1, 10),
    end: new CalendarDate(2026, 1, 14)
  });
<\u002fscript>

<RangeCalendar.Root bind:value calendarLabel="Stay dates" minDays={2} maxDays={14}>
  {#snippet children({ months, weekdays })}
    <RangeCalendar.Header>
      <RangeCalendar.PrevButton>&lt;</RangeCalendar.PrevButton>
      <RangeCalendar.Heading />
      <RangeCalendar.NextButton>&gt;</RangeCalendar.NextButton>
    </RangeCalendar.Header>
    <!-- Grid, GridHead, GridBody, GridRow, HeadCell compose exactly as in Calendar -->
  {/snippet}
</RangeCalendar.Root>`;

	let value = $state({
		start: new CalendarDate(2026, 1, 10),
		end: new CalendarDate(2026, 1, 14)
	});
	let placeholder = $state(new CalendarDate(2026, 1, 1));
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Composes exactly like <a href="/components/calendar">Calendar</a>; only the selection model
			differs. <code class="ic">value</code> is
			<code class="ic">{'{ start, end }'}</code> of <code class="ic">DateValue</code>s, and
			<code class="ic">@internationalized/date</code> is a peerDependency — install it alongside sve-ui.
		</p>
		<Preview code={usageCode} align="start">
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
		</Preview>
	</section>

	<section id="interaction" class="sec">
		<h2 class="sec__h">The two-step interaction</h2>
		<p class="sec__p">
			First click sets the start, second sets the end, and hovering between them previews the span.
			Bits also <strong>normalises a backwards selection</strong>, so clicking the end before the
			start does the sensible thing rather than producing an inverted range — which is the bug every
			hand-rolled range picker ships first.
		</p>
		<p class="sec__p">
			The styling follows that model: the two endpoints are filled and the days between are a tint,
			with the inner corners squared off, so the span reads as one continuous band with two handles
			rather than as a row of separately selected days. The live hover preview uses the same tint as
			the committed middle, so what you see while choosing is what you get.
		</p>
	</section>

	<section id="bounds" class="sec">
		<h2 class="sec__h">Bounding the span</h2>
		<p class="sec__p">
			<code class="ic">minDays</code> and <code class="ic">maxDays</code> bound how long a range may be
			— a two-night minimum, a fortnight maximum.
		</p>
		<p class="sec__p">
			<code class="ic">excludeDisabled</code> refuses a range that would straddle an unavailable date.
			That one matters for booking: without it, a user can select across a day that is already taken and
			the range silently swallows it. "Three nights including the one that is gone" is not a valid answer.
		</p>
	</section>

	<section id="shared" class="sec">
		<h2 class="sec__h">Shared with Calendar</h2>
		<p class="sec__p">
			<code class="ic">Header</code>, <code class="ic">Heading</code>, the nav buttons,
			<code class="ic">Grid</code>, <code class="ic">GridHead</code>,
			<code class="ic">GridBody</code>, <code class="ic">GridRow</code>,
			<code class="ic">HeadCell</code>, <code class="ic">MonthSelect</code> and
			<code class="ic">YearSelect</code> are the <strong>same components</strong>
			<a href="/components/calendar">Calendar</a> uses — Bits re-exports the identical modules to
			both namespaces, so there is one styled implementation rather than two copies of the same CSS
			drifting apart. Only <code class="ic">Root</code>, <code class="ic">Cell</code> and
			<code class="ic">Day</code> are range-specific.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">RangeCalendar.Root</code></p>
		<PropsTable component="RangeCalendarRoot" />
		<p class="sec__p" style="margin-top:16px">
			The shared parts are documented on the
			<a href="/components/calendar">Calendar</a> page.
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
