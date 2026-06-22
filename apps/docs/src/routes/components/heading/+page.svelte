<script lang="ts">
	import { Heading } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.heading;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'levels', label: 'Levels' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'HTML heading element rendered (h1–h6).' },
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, description: 'Visual size. Decoupled from semantic level.' },
		{ prop: 'weight', type: `'normal' | 'medium' | 'bold'`, default: `'bold'` },
		{
			prop: 'color',
			type: `'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'`,
			default: `'inherit'`
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Heading text content.' }
	];

	const usageCode = `<script>
  import { Heading } from 'sve-ui';
<\/script>

<Heading level={1} size="lg">Ship it</Heading>`;

	const levelsCode = `<!-- Semantic level is independent of visual size -->
<Heading level={1} size="lg">Heading h1</Heading>
<Heading level={2} size="md">Heading h2</Heading>
<Heading level={3} size="sm">Heading h3</Heading>
<Heading level={4}>Heading h4 — no size, inherits</Heading>`;

	const sizesCode = `<Heading level={2} size="lg">Large display heading</Heading>
<Heading level={2} size="md">Medium section heading</Heading>
<Heading level={2} size="sm">Small label heading</Heading>`;

	const colorsCode = `<Heading level={3} size="md" color="primary">Primary</Heading>
<Heading level={3} size="md" color="success">Success</Heading>
<Heading level={3} size="md" color="warning">Warning</Heading>
<Heading level={3} size="md" color="danger">Danger</Heading>
<Heading level={3} size="md" color="secondary">Secondary</Heading>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			A single <code class="ic">Heading</code> component renders any <code class="ic">h1</code>–<code
				class="ic">h6</code
			> element. Visual size is decoupled from the semantic level.
		</p>
		<Preview code={usageCode}>
			<Heading level={1} size="lg">Ship it</Heading>
		</Preview>
	</section>

	<section id="levels" class="sec">
		<h2 class="sec__h">Levels</h2>
		<p class="sec__p">
			The <code class="ic">level</code> prop controls the rendered HTML element for correct document
			structure. Size is set separately.
		</p>
		<Preview code={levelsCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
				<Heading level={1} size="lg">Heading h1</Heading>
				<Heading level={2} size="md">Heading h2</Heading>
				<Heading level={3} size="sm">Heading h3</Heading>
				<Heading level={4}>Heading h4 — no size, inherits</Heading>
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			Three visual sizes via the <code class="ic">size</code> prop, all driven by
			<code class="ic">--sve-font-size-*</code> tokens.
		</p>
		<Preview code={sizesCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
				<Heading level={2} size="lg">Large display heading</Heading>
				<Heading level={2} size="md">Medium section heading</Heading>
				<Heading level={2} size="sm">Small label heading</Heading>
			</div>
		</Preview>
	</section>

	<section id="colors" class="sec">
		<h2 class="sec__h">Colors</h2>
		<p class="sec__p">
			Semantic color tokens via the <code class="ic">color</code> prop. Defaults to
			<code class="ic">inherit</code> so it picks up the parent's foreground color automatically.
		</p>
		<Preview code={colorsCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
				<Heading level={3} size="md" color="primary">Primary</Heading>
				<Heading level={3} size="md" color="success">Success</Heading>
				<Heading level={3} size="md" color="warning">Warning</Heading>
				<Heading level={3} size="md" color="danger">Danger</Heading>
				<Heading level={3} size="md" color="secondary">Secondary</Heading>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native heading attribute via prop spreading.
		</p>
		<PropsTable rows={props} />
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
</style>
