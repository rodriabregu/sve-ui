<script lang="ts">
	import { Table, Code } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.table;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sorting', label: 'Sorting is yours' },
		{ id: 'no-grid', label: 'Why not role="grid"' },
		{ id: 'scroll', label: 'The scroll container' },
		{ id: 'selection', label: 'Selected rows' },
		{ id: 'numbers', label: 'Numeric columns' },
		{ id: 'a11y', label: 'Accessibility' },
		{ id: 'props', label: 'Props' }
	];

	type Dir = 'none' | 'asc' | 'desc';

	const rows = [
		{ region: 'Argentina', revenue: 1200 },
		{ region: 'Brazil', revenue: 3400 },
		{ region: 'Uruguay', revenue: 340 }
	];

	let sort = $state<Dir>('none');

	// The component does not sort for you — this is the application code that
	// does, and a real one would use Intl.Collator for the text columns.
	const sorted = $derived(
		sort === 'none'
			? rows
			: [...rows].sort((a, b) => (sort === 'asc' ? a.revenue - b.revenue : b.revenue - a.revenue))
	);

	const total = rows.reduce((sum, r) => sum + r.revenue, 0);

	const usageCode = `<script>
  import { Table } from 'sve-ui';

  let sort = $state('none');
  const sorted = $derived(/* YOUR sort — see below */ rows);
<\u002fscript>

<Table.Root scrollLabel="Revenue by region, scrollable" zebra>
  <Table.Caption>Revenue by region</Table.Caption>

  <Table.Header>
    <Table.Row>
      <Table.Head>Region</Table.Head>
      <Table.Head sortable {sort} onSortChange={(d) => (sort = d)} numeric>
        Revenue
      </Table.Head>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {#each sorted as row (row.region)}
      <Table.Row>
        <Table.RowHeader>{row.region}</Table.RowHeader>
        <Table.Cell numeric>{row.revenue}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>

  <Table.Footer>
    <Table.Row>
      <Table.RowHeader>Total</Table.RowHeader>
      <Table.Cell numeric>{total}</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>`;

	const sortingCode = `// The component renders the button and sets aria-sort.
// Applying the order is yours, because only you know:
//   - whether the rows even live on this machine
//   - how it interacts with pagination
//   - the user's locale, which decides how text compares
const collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' });

const sorted = $derived(
  sort === 'none'
    ? rows
    : [...rows].sort((a, b) => {
        const n = collator.compare(a.region, b.region);
        return sort === 'asc' ? n : -n;
      })
);`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Custom rather than a Bits UI wrapper — Bits ships no table, and there is nothing headless to
			buy. A data table is already a solved accessibility problem in HTML:
			<code class="ic">&lt;table&gt;</code>, <code class="ic">&lt;caption&gt;</code> and
			<code class="ic">scope</code> on the headers. What this adds is getting that markup right by default,
			plus the styling and the scroll container on top.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Table.Root scrollLabel="Revenue by region, scrollable" zebra>
					<Table.Caption>Revenue by region</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Region</Table.Head>
							<Table.Head sortable {sort} onSortChange={(d) => (sort = d)} numeric>
								Revenue
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each sorted as row (row.region)}
							<Table.Row>
								<Table.RowHeader>{row.region}</Table.RowHeader>
								<Table.Cell numeric>{row.revenue.toLocaleString('en-US')}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.RowHeader>Total</Table.RowHeader>
							<Table.Cell numeric>{total.toLocaleString('en-US')}</Table.Cell>
						</Table.Row>
					</Table.Footer>
				</Table.Root>
			</div>
		</Preview>
		<p class="cap">
			Click Revenue three times: ascending, descending, then back to the original order.
		</p>
	</section>

	<section id="sorting" class="sec">
		<h2 class="sec__h">Sorting is yours</h2>
		<p class="warn">
			This component does not sort your data. <code class="ic">Head sortable</code> renders the
			button and sets <code class="ic">aria-sort</code>; you apply the order.
		</p>
		<p class="sec__p">
			That is not laziness. A component cannot know whether the rows are even on this machine, how
			sorting interacts with your pagination, or which locale the text should be compared in — and
			<code class="ic">'á' &lt; 'b'</code> is true in Spanish and false in a plain codepoint sort. A built-in
			sort would be wrong in all three ways and hard to override in each.
		</p>
		<Code code={sortingCode} label="Sorting in application code" />
		<p class="sec__p">
			The cycle is <strong>none → ascending → descending → none</strong>. The third state exists on
			purpose: the order rows arrived in is often meaningful, and a two-state toggle throws it away
			permanently.
		</p>
		<p class="sec__p">
			Keep <code class="ic">aria-sort</code> on <strong>one</strong> column, and only when you have actually
			applied it. Announcing a sort you did not apply is a lie assistive technology has no way to check.
		</p>
	</section>

	<section id="no-grid" class="sec">
		<h2 class="sec__h">Why not role="grid"</h2>
		<p class="sec__p">
			<code class="ic">Root</code> is a plain <code class="ic">&lt;table&gt;</code> with no role
			override. <code class="ic">role="grid"</code> promises a full keyboard interaction model — arrow
			keys moving a focus cursor between cells, Home, End, Ctrl+Home — and a screen reader switches into
			that mode as soon as it sees the role.
		</p>
		<p class="sec__p">
			So claiming it without implementing it is worse than not claiming it: the user is put into a
			navigation mode where the keys do nothing. If you need a spreadsheet, you need a real grid
			implementation, not this component with a role attribute.
		</p>
	</section>

	<section id="scroll" class="sec">
		<h2 class="sec__h">The scroll container</h2>
		<p class="sec__p">
			<code class="ic">Root</code> renders the horizontal scroll container itself, because a wide table
			that scrolls the whole page instead of itself is the single most common table defect.
		</p>
		<p class="sec__p">
			Pass <code class="ic">scrollLabel</code>. A scroll container that is not focusable cannot be
			scrolled without a pointer — the columns past the right edge are simply unreachable by
			keyboard. Focusability needs a name, though, so <code class="ic">tabindex</code> is only added when
			you provide one: an unnamed focusable region is announced as nothing at all.
		</p>
		<p class="sec__p">
			<code class="ic">scrollLabel</code> is <strong>not</strong> the table's name — that is what
			<code class="ic">Caption</code> is for.
		</p>
		<p class="sec__p">
			<code class="ic">stickyHeader</code> caps the container with
			<code class="ic">--sve-table-max-height</code> (24rem by default). Without a bounded height there
			is nothing for the header to stick inside and the page scrolls instead.
		</p>
	</section>

	<section id="selection" class="sec">
		<h2 class="sec__h">Selected rows</h2>
		<p class="sec__p">
			<code class="ic">Row selected</code> styles the row and sets
			<code class="ic">data-selected</code>. It does <strong>not</strong> set
			<code class="ic">aria-selected</code>, which is only valid inside a
			<code class="ic">grid</code>, <code class="ic">listbox</code> or
			<code class="ic">treegrid</code> — on a plain <code class="ic">&lt;tr&gt;</code> it is ignored,
			and validators report it as an error.
		</p>
		<p class="sec__p">
			Selection also has to be <em>operable</em>, so put a real <code class="ic">Checkbox</code> in
			the first cell and let <code class="ic">selected</code> follow its state. Styling alone tells sighted
			users and nobody else.
		</p>
	</section>

	<section id="numbers" class="sec">
		<h2 class="sec__h">Numeric columns</h2>
		<p class="sec__p">
			Pass <code class="ic">numeric</code> to both the <code class="ic">Head</code> and its
			<code class="ic">Cell</code>s. Numbers are compared by reading down the column, which only
			works when the digits line up: right alignment aligns the units place, and
			<code class="ic">tabular-nums</code> stops a proportional font from giving
			<code class="ic">1</code> less width than <code class="ic">8</code>.
		</p>
		<p class="sec__p">
			Format the number yourself — <code class="ic">Intl.NumberFormat</code> with the user's locale. Thousands
			separators and decimal marks are not universal, and a table is exactly where that shows.
		</p>
	</section>

	<section id="a11y" class="sec">
		<h2 class="sec__h">Accessibility</h2>
		<ul class="sec__p">
			<li>
				Give it a <code class="ic">Caption</code>. A table announced as just "table" is useless on a
				page with more than one. It must be the first child of the table. Use
				<code class="ic">visuallyHidden</code> when a heading above already says it — that hides the picture,
				not the name.
			</li>
			<li>
				Give the identifying cell of each row a <code class="ic">RowHeader</code>. That is what
				turns "4.2%" into "Bounce rate, Argentina, 4.2%" — without it the value has a column but no
				subject.
			</li>
			<li>
				Put totals in <code class="ic">Footer</code>, not as a last body row. It is not data, and a
				screen reader user should be told when the rows stop.
			</li>
			<li>Pass <code class="ic">scrollLabel</code> so the overflow is reachable by keyboard.</li>
			<li>
				Sortable headers are real <code class="ic">&lt;button&gt;</code>s inside the cell, because a
				clickable <code class="ic">&lt;th&gt;</code> is neither focusable nor operable by keyboard.
				The arrow glyph is <code class="ic">aria-hidden</code> — <code class="ic">aria-sort</code> already
				carries the direction.
			</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Table.Root</code></p>
		<PropsTable component="TableRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Table.Head</code> — a column header.
		</p>
		<PropsTable component="TableHead" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Table.Cell</code></p>
		<PropsTable component="TableCell" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Table.Row</code></p>
		<PropsTable component="TableRow" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Table.Caption</code></p>
		<PropsTable component="TableCaption" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Header</code>, <code class="ic">Body</code>,
			<code class="ic">Footer</code> and <code class="ic">RowHeader</code> each take
			<code class="ic">class</code> plus their native attributes.
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
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.warn {
		margin: 0 0 16px;
		padding: 12px 14px;
		border-left: 3px solid var(--doc-primary-text);
		background: var(--doc-surface-2);
		border-radius: 0 8px 8px 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.demo {
		width: 100%;
	}
	.cap {
		margin: 12px 0 0;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
</style>
