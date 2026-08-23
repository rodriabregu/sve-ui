<script lang="ts">
	import { TimeField } from 'sve-ui';
	import { Time } from '@internationalized/date';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['time-field'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why not a native input' },
		{ id: 'hourcycle', label: 'The 12/24 hour clock' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { TimeField } from 'sve-ui';
<\u002fscript>

<TimeField.Root bind:value locale={userLocale}>
  <TimeField.Label>Pickup time</TimeField.Label>
  <TimeField.Input>
    {#snippet children({ segments })}
      <!-- key by INDEX: segment parts repeat (two "literal" separators) -->
      {#each segments as { part, value }, i (i)}
        <TimeField.Segment {part}>{value}</TimeField.Segment>
      {/each}
    {/snippet}
  </TimeField.Input>
</TimeField.Root>`;

	let value = $state<Time | undefined>(undefined);
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
			<TimeField.Root bind:value locale="en-US">
				<TimeField.Label>Pickup time</TimeField.Label>
				<TimeField.Input>
					{#snippet children({ segments })}
						{#each segments as { part, value: sv }, i (i)}
							<TimeField.Segment {part}>{sv}</TimeField.Segment>
						{/each}
					{/snippet}
				</TimeField.Input>
			</TimeField.Root>
		</Preview>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why not a native input</h2>
		<p class="sec__p">
			This is not a text input with a mask. Every part is its own
			<code class="ic">role="spinbutton"</code> with
			<code class="ic">aria-valuenow</code>, <code class="ic">aria-valuetext</code> and its own
			<code class="ic">aria-label</code> — so arrow keys adjust it and a screen reader announces
			"month, 12" instead of reading a formatted string.
		</p>
		<p class="sec__p">
			Typed numbers fill the focused segment and advance to the next, and the value is only committed
			once <strong>every</strong> segment is filled — so there is no half-parsed intermediate state to
			guard against in your code.
		</p>
		<p class="sec__p">
			So the trade against <code class="ic">&lt;input type="time"&gt;</code>
			is: the same keyboard model, with markup and styling you control and identical rendering across
			browsers instead of whatever each vendor decided.
		</p>
		<p class="sec__p">
			The separators are rendered too, as <code class="ic">data-segment="literal"</code> with
			<code class="ic">aria-hidden</code> — otherwise the field would announce "slash" between the
			parts. Key your <code class="ic">each</code> by <strong>index</strong>: segment parts repeat, so
			keying by <code class="ic">part</code> throws.
		</p>
	</section>

	<section id="hourcycle" class="sec">
		<h2 class="sec__h">The 12/24 hour clock</h2>
		<p class="sec__p">
			Leave <code class="ic">hourCycle</code> unset and it follows the locale, which is almost always
			what you want — most of the world is on a 24-hour clock, so hardcoding
			<code class="ic">12</code> is a US-shaped assumption.
		</p>
		<p class="sec__p">
			It also changes the structure: a 12-hour clock adds a
			<code class="ic">dayPeriod</code> (AM/PM) segment and bounds the hour at 1–12, while a 24-hour
			clock has no dayPeriod and bounds it at 0–23. Both are asserted in the tests.
		</p>
	</section>


	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">TimeField.Root</code> — <code class="ic">value</code> and <code class="ic">placeholder</code> are bindable.</p>
		<PropsTable component="TimeFieldRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Label</code>, <code class="ic">Input</code> and
			<code class="ic">Segment</code> take <code class="ic">class</code> plus their native
			attributes. <code class="ic">Segment</code> needs the <code class="ic">part</code> from the
			snippet.
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
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
</style>
