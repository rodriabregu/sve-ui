<script lang="ts">
	import { DateField } from 'sve-ui';
	import { CalendarDate } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['date-field'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why not a native input' },
		{ id: 'locale', label: 'Locale reorders the field' },
		{ id: 'granularity', label: 'Granularity' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { DateField } from 'sve-ui';
<\u002fscript>

<DateField.Root bind:value locale={userLocale}>
  <DateField.Label>Departure date</DateField.Label>
  <DateField.Input>
    {#snippet children({ segments })}
      <!-- key by INDEX: segment parts repeat (two "literal" separators) -->
      {#each segments as { part, value }, i (i)}
        <DateField.Segment {part}>{value}</DateField.Segment>
      {/each}
    {/snippet}
  </DateField.Input>
</DateField.Root>`;

	let value = $state<CalendarDate | undefined>(undefined);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Root</code> &gt; <code class="ic">Label</code> +
			<code class="ic">Input</code>, and render a <code class="ic">Segment</code> per part from the
			snippet <code class="ic">Input</code> hands you. Values are
			<code class="ic">DateValue</code> objects from
			<code class="ic">@internationalized/date</code>, a peerDependency.
		</p>
		<Preview code={usageCode} align="start">
			<DateField.Root bind:value locale="en-US">
				<DateField.Label>Departure date</DateField.Label>
				<DateField.Input>
					{#snippet children({ segments })}
						{#each segments as { part, value: sv }, i (i)}
							<DateField.Segment {part}>{sv}</DateField.Segment>
						{/each}
					{/snippet}
				</DateField.Input>
			</DateField.Root>
		</Preview>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why not a native input</h2>
		<p class="sec__p">
			This is not a text input with a mask. Every part is its own
			<code class="ic">role="spinbutton"</code> with
			<code class="ic">aria-valuenow</code>, <code class="ic">aria-valuetext</code> and its own
			<code class="ic">aria-label</code> — so arrow keys adjust it and a screen reader announces "month,
			12" instead of reading a formatted string.
		</p>
		<p class="sec__p">
			Typed numbers fill the focused segment and advance to the next, and the value is only
			committed once <strong>every</strong> segment is filled — so there is no half-parsed intermediate
			state to guard against in your code.
		</p>
		<p class="sec__p">
			So the trade against <code class="ic">&lt;input type="date"&gt;</code>
			is: the same keyboard model, with markup and styling you control and identical rendering across
			browsers instead of whatever each vendor decided.
		</p>
		<p class="sec__p">
			The separators are rendered too, as <code class="ic">data-segment="literal"</code> with
			<code class="ic">aria-hidden</code> — otherwise the field would announce "slash" between the
			parts. Key your <code class="ic">each</code> by <strong>index</strong>: segment parts repeat,
			so keying by <code class="ic">part</code> throws.
		</p>
	</section>

	<section id="locale" class="sec">
		<h2 class="sec__h">Locale reorders the field</h2>
		<p class="warn">
			<code class="ic">locale</code> decides the segment <strong>order</strong>, not just the
			labels.
		</p>
		<p class="sec__p">
			<code class="ic">en-US</code> renders month / day / year;
			<code class="ic">en-GB</code> renders day / month / year. Passing the wrong locale does not merely
			relabel the field — it rearranges it, and a user typing their own date format into the wrong order
			silently enters the wrong date. That is a correctness bug, not a preference, and it is asserted
			in the tests.
		</p>
	</section>

	<section id="granularity" class="sec">
		<h2 class="sec__h">Granularity</h2>
		<p class="sec__p">
			<code class="ic">granularity</code> decides which segments exist at all.
			<code class="ic">day</code> (the default) gives a plain date;
			<code class="ic">minute</code> adds hour and minute segments, plus AM/PM in a 12-hour locale. Ask
			for the smallest unit you actually need — every extra segment is another thing the user has to fill.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">DateField.Root</code> — <code class="ic">value</code> and
			<code class="ic">placeholder</code> are bindable.
		</p>
		<PropsTable component="DateFieldRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Label</code>, <code class="ic">Input</code> and
			<code class="ic">Segment</code> take <code class="ic">class</code> plus their native
			attributes. <code class="ic">Segment</code> needs the <code class="ic">part</code> from the snippet.
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
</style>
