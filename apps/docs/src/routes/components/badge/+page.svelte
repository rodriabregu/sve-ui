<script lang="ts">
	import { Badge } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.badge;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'variant', type: `'subtle' | 'solid' | 'outline'`, default: `'subtle'` },
		{
			prop: 'color',
			type: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'`,
			default: `'default'`
		},
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Badge label content.' }
	];

	const usageCode = `<script>
  import { Badge } from 'sve-ui';
<\/script>

<Badge color="primary">New</Badge>`;

	const variantsCode = `<Badge color="primary" variant="subtle">Subtle</Badge>
<Badge color="primary" variant="solid">Solid</Badge>
<Badge color="primary" variant="outline">Outline</Badge>`;

	const colorsCode = `<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="danger">Danger</Badge>
<Badge color="default">Default</Badge>`;

	const sizesCode = `<Badge color="primary" size="sm">Small</Badge>
<Badge color="primary" size="md">Medium</Badge>
<Badge color="primary" size="lg">Large</Badge>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import and drop in. No setup required — styles ship with the package.
		</p>
		<Preview code={usageCode}>
			<Badge color="primary">New</Badge>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			Three visual styles via the <code class="ic">variant</code> prop: <code class="ic">subtle</code>
			(default), <code class="ic">solid</code>, and <code class="ic">outline</code>.
		</p>
		<Preview code={variantsCode}>
			<Badge color="primary" variant="subtle">Subtle</Badge>
			<Badge color="primary" variant="solid">Solid</Badge>
			<Badge color="primary" variant="outline">Outline</Badge>
		</Preview>
	</section>

	<section id="colors" class="sec">
		<h2 class="sec__h">Colors</h2>
		<p class="sec__p">Semantic tones, all driven by <code class="ic">--sve-*</code> tokens.</p>
		<Preview code={colorsCode}>
			<Badge color="primary">Primary</Badge>
			<Badge color="secondary">Secondary</Badge>
			<Badge color="success">Success</Badge>
			<Badge color="warning">Warning</Badge>
			<Badge color="danger">Danger</Badge>
			<Badge color="default">Default</Badge>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop.</p>
		<Preview code={sizesCode}>
			<Badge color="primary" size="sm">Small</Badge>
			<Badge color="primary" size="md">Medium</Badge>
			<Badge color="primary" size="lg">Large</Badge>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;span&gt;</code> attribute via prop spreading.
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
