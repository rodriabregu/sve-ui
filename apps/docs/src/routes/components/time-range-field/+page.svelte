<script lang="ts">
	import { TimeRangeField } from 'sve-ui';
	import { Time } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['time-range-field'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'naming', label: 'You must name the Root' },
		{ id: 'shared', label: 'Shared with Time Field' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { TimeRangeField } from 'sve-ui';
<\u002fscript>

<!-- aria-labelledby on the ROOT is required: Bits leaves the group unnamed -->
<TimeRangeField.Root bind:value locale={userLocale} aria-labelledby="range-label">
  <TimeRangeField.Label id="range-label">Opening hours</TimeRangeField.Label>

  <TimeRangeField.Input type="start">
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (i)}
        <TimeRangeField.Segment {part}>{value}</TimeRangeField.Segment>
      {/each}
    {/snippet}
  </TimeRangeField.Input>

  <span aria-hidden="true">–</span>

  <TimeRangeField.Input type="end">
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (i)}
        <TimeRangeField.Segment {part}>{value}</TimeRangeField.Segment>
      {/each}
    {/snippet}
  </TimeRangeField.Input>
</TimeRangeField.Root>`;

	let value = $state({ start: undefined as Time | undefined, end: undefined as Time | undefined });
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">value</code> is <code class="ic">{'{ start, end }'}</code>, and you render
			<strong>two</strong> Inputs — one <code class="ic">type="start"</code> and one
			<code class="ic">type="end"</code>. <code class="ic">type</code> is required; there is no single
			input that holds a range.
		</p>
		<p class="sec__p">
			Put the visual separator between them yourself and mark it
			<code class="ic">aria-hidden</code> — a dash read aloud between two times adds nothing.
		</p>
		<Preview code={usageCode} align="start">
			<TimeRangeField.Root bind:value locale="en-US" aria-labelledby="demo-range-label">
				<TimeRangeField.Label id="demo-range-label">Opening hours</TimeRangeField.Label>
				<div class="row">
					<TimeRangeField.Input type="start">
						{#snippet children({ segments })}
							{#each segments as { part, value: sv }, i (i)}
								<TimeRangeField.Segment {part}>{sv}</TimeRangeField.Segment>
							{/each}
						{/snippet}
					</TimeRangeField.Input>
					<span aria-hidden="true">–</span>
					<TimeRangeField.Input type="end">
						{#snippet children({ segments })}
							{#each segments as { part, value: sv }, i (i)}
								<TimeRangeField.Segment {part}>{sv}</TimeRangeField.Segment>
							{/each}
						{/snippet}
					</TimeRangeField.Input>
				</div>
			</TimeRangeField.Root>
		</Preview>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">You must name the Root</h2>
		<p class="warn">
			Bits gives the range Root <code class="ic">role="group"</code> with
			<strong>no accessible name</strong>. Without your help the field announces as an anonymous
			group.
		</p>
		<p class="sec__p">
			Verified in the rendered DOM: Bits points each <code class="ic">Input</code>'s
			<code class="ic">aria-labelledby</code> at your Label, but the Inputs carry no role — so
			nothing exposed to assistive technology ends up labelled. On the single-value
			<a href="/components/time-field">Time Field</a> the Input <em>is</em> the group and Bits does label
			it, so this gap is specific to ranges.
		</p>
		<p class="sec__p">
			Pass <code class="ic">aria-labelledby</code> pointing at your Label's id, or
			<code class="ic">aria-label</code>. Both reach the root element, and both directions are
			asserted in the tests so this cannot regress quietly.
		</p>
	</section>

	<section id="shared" class="sec">
		<h2 class="sec__h">Shared with Time Field</h2>
		<p class="sec__p">
			<code class="ic">Segment</code> is the <strong>same component</strong>
			<a href="/components/time-field">Time Field</a> uses — Bits re-exports the identical module to both
			namespaces, so one styled implementation serves each and the two cannot drift apart. Everything
			in that page's "why not a native input" section applies here too.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">TimeRangeField.Root</code> — <code class="ic">value</code> and
			<code class="ic">placeholder</code> are bindable.
		</p>
		<PropsTable component="TimeRangeFieldRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Input</code> takes a required <code class="ic">type</code> of
			<code class="ic">"start"</code> or <code class="ic">"end"</code>.
			<code class="ic">Label</code> and <code class="ic">Segment</code> take
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
	.row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
