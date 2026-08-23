<script lang="ts">
	import { Separator, Text, Heading } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.separator;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'orientation', label: 'Orientation' },
		{ id: 'decorative', label: 'Decorative' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Separator } from 'sve-ui';
<\u002fscript>

<Separator />`;

	const orientationCode = `<!-- Horizontal (default) -->
<Separator />

<!-- Vertical: the parent needs a height or align-items: stretch -->
<div style="display: flex; height: 2rem;">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
</div>`;

	const decorativeCode = `<!-- Structural: announced as a separator -->
<Separator />

<!-- Purely visual: role="none", invisible to assistive tech -->
<Separator decorative />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Separator</code> wraps the Bits UI Separator primitive, so it ships the right
			semantics — <code class="ic">role="separator"</code> plus
			<code class="ic">aria-orientation</code> — instead of a bare styled
			<code class="ic">&lt;div&gt;</code>. Reach for it when the divider means something: a break
			between two groups of content.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Heading level={3}>Account</Heading>
				<Text>Manage your profile and preferences.</Text>
				<Separator />
				<Heading level={3}>Billing</Heading>
				<Text>Invoices, plans, and payment methods.</Text>
			</div>
		</Preview>
	</section>

	<section id="orientation" class="sec">
		<h2 class="sec__h">Orientation</h2>
		<p class="sec__p">
			A vertical separator is <code class="ic">1px</code> wide and stretches to fill its parent, so
			the parent needs a resolved height — a flex row with
			<code class="ic">align-items: stretch</code> is the usual answer.
		</p>
		<Preview code={orientationCode} align="start">
			<div class="demo">
				<Separator />
				<nav class="row" aria-label="Sections">
					<Text>Docs</Text>
					<Separator orientation="vertical" />
					<Text>Components</Text>
					<Separator orientation="vertical" />
					<Text>Blog</Text>
				</nav>
			</div>
		</Preview>
	</section>

	<section id="decorative" class="sec">
		<h2 class="sec__h">Decorative</h2>
		<p class="sec__p">
			Not every line is meaningful. If the divider is pure decoration — a rule under a heading that
			already communicates the break — set <code class="ic">decorative</code> so it reports
			<code class="ic">role="none"</code> and stops adding noise to the accessibility tree. Both
			render identically.
		</p>
		<Preview code={decorativeCode} align="start">
			<div class="demo">
				<Text>Structural separator below:</Text>
				<Separator />
				<Text>Decorative separator below:</Text>
				<Separator decorative />
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading. The colour
			comes from the <code class="ic">--sve-color-default-border</code> token, so it follows the
			active theme with no extra work.
		</p>
		<PropsTable component="Separator" />
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
	.demo {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		max-width: 420px;
	}
	.row {
		display: flex;
		align-items: stretch;
		gap: 12px;
		height: 1.75rem;
	}
</style>
