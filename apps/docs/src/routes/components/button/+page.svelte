<script lang="ts">
	import { Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.button;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'variant', type: `'solid' | 'outline' | 'ghost' | 'flat'`, default: `'solid'` },
		{
			prop: 'color',
			type: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'`,
			default: `'default'`
		},
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'disabled', type: 'boolean', default: 'false' },
		{ prop: 'onclick', type: '(e: MouseEvent) => void', description: 'Standard click handler.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Button label / content.' }
	];

	const usageCode = `<script>
  import { Button } from 'sve-ui';
<\/script>

<Button color="primary">Ship it</Button>`;

	const variantsCode = `<Button variant="solid" color="primary">Solid</Button>
<Button variant="outline" color="primary">Outline</Button>
<Button variant="ghost" color="primary">Ghost</Button>
<Button variant="flat" color="primary">Flat</Button>`;

	const colorsCode = `<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
<Button color="default">Default</Button>`;

	const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

	const statesCode = `<Button color="primary">Default</Button>
<Button color="primary" disabled>Disabled</Button>
<Button color="primary">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
    stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  With icon
</Button>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import the component and use it. No setup, no config — it ships fully styled.
		</p>
		<Preview code={usageCode}>
			<Button color="primary">Ship it</Button>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">Four visual treatments via the <code class="ic">variant</code> prop.</p>
		<Preview code={variantsCode}>
			<Button variant="solid" color="primary">Solid</Button>
			<Button variant="outline" color="primary">Outline</Button>
			<Button variant="ghost" color="primary">Ghost</Button>
			<Button variant="flat" color="primary">Flat</Button>
		</Preview>
	</section>

	<section id="colors" class="sec">
		<h2 class="sec__h">Colors</h2>
		<p class="sec__p">Semantic tones, all driven by <code class="ic">--sve-*</code> tokens.</p>
		<Preview code={colorsCode}>
			<Button color="primary">Primary</Button>
			<Button color="success">Success</Button>
			<Button color="warning">Warning</Button>
			<Button color="danger">Danger</Button>
			<Button color="default">Default</Button>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop.</p>
		<Preview code={sizesCode}>
			<Button color="primary" size="sm">Small</Button>
			<Button color="primary" size="md">Medium</Button>
			<Button color="primary" size="lg">Large</Button>
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">Disabled is fully styled and non-interactive. Icons compose inline.</p>
		<Preview code={statesCode}>
			<Button color="primary">Default</Button>
			<Button color="primary" disabled>Disabled</Button>
			<Button color="primary">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
				With icon
			</Button>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;button&gt;</code> attribute via prop spreading.
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
