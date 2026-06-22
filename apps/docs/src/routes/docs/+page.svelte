<script lang="ts">
	import DocPage from '$lib/docs/DocPage.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { Button, Text } from 'sve-ui';

	const crumb = { href: '/docs', label: 'Docs' };
	const toc: TocEntry[] = [
		{ id: 'what', label: 'What is sve-ui' },
		{ id: 'why', label: 'Why sve-ui' },
		{ id: 'next', label: 'Next steps' }
	];
</script>

<DocPage
	group="Getting started"
	name="Introduction"
	description="A library of ready-made, fully styled and accessible Svelte 5 components — no Tailwind and no config in your project."
	{toc}
	{crumb}
>
	<section id="what" class="sec">
		<h2 class="sec__h">What is sve-ui</h2>
		<p class="sec__p">
			sve-ui is a component library for Svelte 5, built on <a
				class="lnk"
				href="https://bits-ui.com"
				target="_blank"
				rel="noopener">Bits UI</a
			> for behavior and accessibility, and styled with scoped CSS and
			<code class="ic">--sve-*</code> custom properties. You install it, import one stylesheet, and use
			the components — there is no setup step.
		</p>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why sve-ui</h2>
		<ul class="sec__list">
			<li><strong>No Tailwind, no config</strong> in your project — styles ship with the package.</li>
			<li><strong>Accessible by default</strong> — focus traps, ARIA and keyboard nav via Bits UI.</li>
			<li><strong>Themeable</strong> — every color, radius and space is a CSS variable; light & dark included.</li>
			<li><strong>Svelte 5 + runes</strong>, fully typed, tree-shakeable.</li>
		</ul>
	</section>

	<section id="next" class="sec">
		<h2 class="sec__h">Next steps</h2>
		<p class="sec__p">Install the package, then browse the components.</p>
		<div class="sec__cta">
			<Button color="primary" onclick={() => (window.location.href = '/docs/installation')}>
				Installation
			</Button>
			<Button variant="outline" color="default" onclick={() => (window.location.href = '/components')}>
				Browse components
			</Button>
		</div>
		<Text size="sm" class="mt-3" style="color: var(--doc-fg-subtle);">
			Building with an AI agent? See the <a class="lnk" href="/docs/ai-agents">AI &amp; Agents</a> guide.
		</Text>
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
		line-height: 1.6;
		color: var(--doc-fg-muted);
	}
	.sec__list {
		margin: 0;
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.sec__list strong {
		color: var(--doc-fg);
	}
	.sec__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.lnk {
		color: var(--doc-primary-text);
		text-decoration: none;
		font-weight: 500;
	}
	.lnk:hover {
		text-decoration: underline;
	}
</style>
