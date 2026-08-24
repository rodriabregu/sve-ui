<script lang="ts">
	import { Calendar } from 'sve-ui';
	import { CalendarDate } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.calendar;

	const toc: TocEntry[] = [
		{ id: 'install', label: 'Install the peer' },
		{ id: 'usage', label: 'Usage' },
		{ id: 'naming', label: 'Naming the calendar' },
		{ id: 'states', label: 'Disabled vs unavailable' },
		{ id: 'locale', label: 'Locale is not cosmetic' },
		{ id: 'props', label: 'Props' }
	];

	const installCode = `pnpm add sve-ui @internationalized/date`;

	const usageCode = `<script>
  import { Calendar } from 'sve-ui';
  import { CalendarDate } from '@internationalized/date';

  let value = $state(new CalendarDate(2026, 1, 15));
  let placeholder = $state(new CalendarDate(2026, 1, 1));
<\u002fscript>

<Calendar.Root type="single" bind:value bind:placeholder calendarLabel="Departure date">
  {#snippet children({ months, weekdays })}
    <Calendar.Header>
      <Calendar.PrevButton>&lt;</Calendar.PrevButton>
      <Calendar.Heading />
      <Calendar.NextButton>&gt;</Calendar.NextButton>
    </Calendar.Header>
    {#each months as month (month.value)}
      <Calendar.Grid>
        <Calendar.GridHead>
          <Calendar.GridRow>
            <!-- key by INDEX: narrow weekday names are not unique -->
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
</Calendar.Root>`;

	let value = $state<CalendarDate | undefined>(new CalendarDate(2026, 1, 15));
	let placeholder = $state(new CalendarDate(2026, 1, 1));
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="install" class="sec">
		<h2 class="sec__h">Install the peer</h2>
		<p class="warn">
			Every date component needs <code class="ic">@internationalized/date</code>, which is a
			<strong>peerDependency</strong> — install it yourself.
		</p>
		<Preview code={installCode} align="start">
			<p class="sec__p" style="margin:0">
				Dates are <code class="ic">DateValue</code> objects, not JavaScript
				<code class="ic">Date</code>s. You construct them, so there has to be exactly
				<strong>one copy</strong> of that library — two copies means objects that stop lining up, and
				that is the kind of bug that takes an afternoon to find.
			</p>
		</Preview>
	</section>

	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Root hands you <code class="ic">months</code> and <code class="ic">weekdays</code> through a
			snippet and you render the table. Bits owns everything hard: the roving grid, arrow keys across
			weeks and months, PageUp/PageDown, Home/End, and the calendar arithmetic itself.
		</p>
		<p class="sec__p">
			<code class="ic">value</code> is the selection and
			<code class="ic">placeholder</code> is the month on screen — both bindable, and they are
			genuinely separate: paging through months must not change what is selected.
		</p>
		<Preview code={usageCode} align="start">
			<Calendar.Root
				type="single"
				bind:value
				bind:placeholder
				calendarLabel="Departure date"
				isDateUnavailable={(d) => d.day === 20}
			>
				{#snippet children({ months, weekdays })}
					<Calendar.Header>
						<Calendar.PrevButton>‹</Calendar.PrevButton>
						<Calendar.Heading />
						<Calendar.NextButton>›</Calendar.NextButton>
					</Calendar.Header>
				{#each months as month (month.value)}
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow>
								{#each weekdays as day, i (i)}
									<Calendar.HeadCell>{day}</Calendar.HeadCell>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
						<Calendar.GridBody>
							{#each month.weeks as week, i (i)}
								<Calendar.GridRow>
									{#each week as date (date)}
										<Calendar.Cell {date} month={month.value}><Calendar.Day /></Calendar.Cell>
									{/each}
								</Calendar.GridRow>
							{/each}
						</Calendar.GridBody>
					</Calendar.Grid>
				{/each}
				{/snippet}
			</Calendar.Root>
		</Preview>
		<p class="cap">The 20th is marked unavailable — struck through, not merely greyed out.</p>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">Naming the calendar</h2>
		<p class="sec__p">
			Pass <code class="ic">calendarLabel</code>. Bits builds the root's accessible name as
			<code class="ic">{'`${calendarLabel} ${month} ${year}`'}</code> and defaults the first part to
			the literal word <strong>"Event"</strong> — so an unset calendar announces as
			"Event January 2026", which tells the user nothing about what they are picking.
		</p>
		<p class="sec__p">
			Pass "Departure date", "Due date", "Booking". Verified in the rendered DOM and asserted in the
			tests, because the prop name does not make this obvious.
		</p>
		<p class="sec__p">
			The nav buttons are the opposite case: Bits <strong>hardcodes</strong> their
			<code class="ic">aria-label</code> to "Previous" and "Next" and merges its own props last, so an
			<code class="ic">aria-label</code> you pass is discarded. Do not waste time trying.
		</p>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">Disabled vs unavailable</h2>
		<p class="sec__p">
			These are different answers and they are styled differently on purpose:
		</p>
		<ul class="sec__p">
			<li>
				<code class="ic">isDateDisabled</code> / <code class="ic">minValue</code> /
				<code class="ic">maxValue</code> → <strong>out of range</strong>. Faded out; there is nothing
				to reason about.
			</li>
			<li>
				<code class="ic">isDateUnavailable</code> → <strong>exists but taken</strong>. A fully booked
				day. Kept readable and struck through, which reads as "that date is gone" rather than "that
				date does not exist".
			</li>
		</ul>
		<p class="sec__p">
			Collapsing both into one grey blur throws away information the user needs.
			<code class="ic">data-today</code> gets a ring rather than a fill, so today stays legible even
			when it is also the selected day.
		</p>
	</section>

	<section id="locale" class="sec">
		<h2 class="sec__h">Locale is not cosmetic</h2>
		<p class="sec__p">
			<code class="ic">locale</code> changes the month names, <strong>which day the week starts
			on</strong>, and the numeral system. Hardcoding Monday-first or Sunday-first is a correctness bug
			for half your users, not a styling preference. Pass the user's locale.
		</p>
		<p class="sec__p">
			Add <code class="ic">MonthSelect</code> and <code class="ic">YearSelect</code> for any range
			wider than a few months. Paging one month at a time to reach a birth year is not navigation.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Calendar.Root</code></p>
		<PropsTable component="CalendarRoot" />
		<p class="sec__p" style="margin-top:16px">
			Every other part takes <code class="ic">class</code> plus its native attributes.
			<code class="ic">Grid</code>, <code class="ic">GridHead</code>,
			<code class="ic">GridBody</code>, <code class="ic">GridRow</code>,
			<code class="ic">HeadCell</code>, <code class="ic">Header</code>,
			<code class="ic">Heading</code>, the nav buttons and the selects are
			<strong>shared</strong> with <a href="/components/range-calendar">Range Calendar</a>.
		</p>
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
	.cap { margin: 12px 0 0; font-size: 12.5px; color: var(--doc-fg-subtle); }
</style>
