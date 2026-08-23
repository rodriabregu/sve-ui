<script lang="ts">
	import { Flex } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.flex;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'defaults', label: 'Why align defaults to center' },
		{ id: 'wrap', label: 'Wrapping' },
		{ id: 'vs-stack', label: 'Flex vs Stack' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Flex } from 'sve-ui';
<\u002fscript>

<Flex gap={3} justify="between">
  <Heading level={3}>Title</Heading>
  <Button size="sm">Action</Button>
</Flex>`;

	const wrapCode = `<!-- worth turning on for anything that must survive a narrow screen -->
<Flex gap={2} wrap>
  {#each tags as tag (tag)}
    <Badge>{tag}</Badge>
  {/each}
</Flex>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			The general flex primitive: <code class="ic">direction</code>,
			<code class="ic">gap</code> (a spacing token key), <code class="ic">align</code>,
			<code class="ic">justify</code> and <code class="ic">wrap</code>. Same discipline as
			<a href="/components/stack">Stack</a> — no margin, padding, width or colour props.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Flex gap={3} justify="between">
					<div class="box">Left</div>
					<div class="box">Right</div>
				</Flex>
			</div>
		</Preview>
	</section>

	<section id="defaults" class="sec">
		<h2 class="sec__h">Why align defaults to center</h2>
		<p class="sec__p">
			CSS defaults <code class="ic">align-items</code> to
			<code class="ic">stretch</code>. That is rarely what you want in a row: a label beside a button,
			or an icon beside text, gets visibly stretched to the tallest sibling's height.
		</p>
		<p class="sec__p">
			So <code class="ic">Flex</code> defaults to <code class="ic">center</code>, which is right for a
			row of mixed-height things. Pass <code class="ic">align="stretch"</code> when you genuinely want
			the CSS behaviour — equal-height cards in a row, for instance.
		</p>
	</section>

	<section id="wrap" class="sec">
		<h2 class="sec__h">Wrapping</h2>
		<p class="sec__p">
			<code class="ic">wrap</code> is off by default, matching CSS. Turn it on for anything whose item
			count you do not control — a tag list, filter chips, breadcrumbs. Without it those overflow off
			the side of a phone rather than reflowing.
		</p>
		<Preview code={wrapCode} align="start">
			<div class="demo">
				<Flex gap={2} wrap>
					{#each ['svelte', 'runes', 'accessible', 'bits-ui', 'tokens', 'dark mode'] as tag (tag)}
						<span class="box">{tag}</span>
					{/each}
				</Flex>
			</div>
		</Preview>
	</section>

	<section id="vs-stack" class="sec">
		<h2 class="sec__h">Flex vs Stack</h2>
		<p class="sec__p">
			<a href="/components/stack">Stack</a> is the vertical case with a narrower API and
			<code class="ic">align="stretch"</code> as its default, which is what stacked form fields want.
			Use it whenever the direction is vertical — <code class="ic">Flex direction="column"</code> works
			but says less about intent.
		</p>
		<p class="sec__p">
			And for anything genuinely two-dimensional, use CSS Grid directly. Neither of these tries to
			wrap it, which is why the pre-1.0 <code class="ic">Grid</code> and
			<code class="ic">GridItem</code> components are gone.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Plus every native attribute of the element you render, via prop spreading.</p>
		<PropsTable component="Flex" />
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
	.box {
		padding: 8px 12px; border-radius: 8px;
		background: var(--doc-surface-2);
		border: 1px solid var(--doc-border);
		font-size: 13px; color: var(--doc-fg-muted);
	}
	.demo { width: 100%; max-width: 420px; }
</style>
