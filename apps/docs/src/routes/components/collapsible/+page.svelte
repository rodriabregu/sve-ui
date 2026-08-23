<script lang="ts">
	import { Collapsible, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.collapsible;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'controlled', label: 'Controlled' },
		{ id: 'vs-accordion', label: 'Collapsible vs Accordion' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Collapsible } from 'sve-ui';
<\u002fscript>

<Collapsible.Root>
  <Collapsible.Trigger>Shipping details</Collapsible.Trigger>
  <Collapsible.Content>Ships in 2-3 business days.</Collapsible.Content>
</Collapsible.Root>`;

	const controlledCode = `<script>
  let open = $state(false);
<\u002fscript>

<Collapsible.Root bind:open>
  <Collapsible.Trigger>{open ? 'Hide' : 'Show'} details</Collapsible.Trigger>
  <Collapsible.Content>Panel body.</Collapsible.Content>
</Collapsible.Root>`;

	let open = $state(false);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			One region that expands and collapses. Bits renders the trigger as a real
			<code class="ic">&lt;button&gt;</code> and wires
			<code class="ic">aria-expanded</code> plus <code class="ic">aria-controls</code> pointing at the
			panel — so the trigger already carries its own state and target. Your job is the label.
		</p>
		<Preview code={usageCode} align="start">
			<div class="stack">
				<Collapsible.Root>
					<Collapsible.Trigger>Shipping details</Collapsible.Trigger>
					<Collapsible.Content>
						<Text size="sm">Ships in 2-3 business days. Free over $50.</Text>
					</Collapsible.Content>
				</Collapsible.Root>
			</div>
		</Preview>
	</section>

	<section id="controlled" class="sec">
		<h2 class="sec__h">Controlled</h2>
		<p class="sec__p">
			<code class="ic">open</code> is bindable, so you can read the state to change the label or
			drive something else on the page.
		</p>
		<Preview code={controlledCode} align="start">
			<div class="stack">
				<Collapsible.Root bind:open>
					<Collapsible.Trigger>{open ? 'Hide' : 'Show'} details</Collapsible.Trigger>
					<Collapsible.Content>
						<Text size="sm">Panel body content.</Text>
					</Collapsible.Content>
				</Collapsible.Root>
				<p class="cap">open: {open}</p>
			</div>
		</Preview>
	</section>

	<section id="vs-accordion" class="sec">
		<h2 class="sec__h">Collapsible vs Accordion</h2>
		<p class="sec__p">
			<code class="ic">Collapsible</code> is one independent region.
			<a href="/components/accordion">Accordion</a> is a set of regions that know about each other —
			it can enforce that only one is open at a time and gives you arrow-key navigation between
			triggers.
		</p>
		<p class="sec__p">
			A row of Collapsibles is not an Accordion. It has no shared state and no keyboard relationship
			between the triggers, so if the panels belong to one set, reach for Accordion.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Collapsible.Root</code> — <code class="ic">open</code> is bindable.</p>
		<PropsTable component="CollapsibleRoot" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Collapsible.Trigger</code></p>
		<PropsTable component="CollapsibleTrigger" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Collapsible.Content</code></p>
		<PropsTable component="CollapsibleContent" />
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
	.stack {
		display: flex; flex-direction: column; gap: 14px;
		width: 100%; max-width: 420px;
	}
	.cap { margin: 0; font-size: 12.5px; color: var(--doc-fg-subtle); }
</style>
