<script lang="ts">
	import { Spinner } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.spinner;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{
			prop: 'color',
			type: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'`,
			default: `'default'`
		},
		{
			prop: 'label',
			type: 'string',
			default: `'Loading'`,
			description: 'Accessible label exposed as aria-label on the status span.'
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root element.' }
	];

	const usageCode = `<script>
  import { Spinner } from 'sve-ui';
<\/script>

<Spinner color="primary" />`;

	const sizesCode = `<Spinner size="sm" color="primary" />
<Spinner size="md" color="primary" />
<Spinner size="lg" color="primary" />`;

	const colorsCode = `<Spinner size="md" color="primary" />
<Spinner size="md" color="success" />
<Spinner size="md" color="warning" />
<Spinner size="md" color="danger" />
<Spinner size="md" color="default" />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import <code class="ic">Spinner</code> and drop it anywhere you need an indeterminate loading
			indicator. It ships as a single component — no sub-parts.
		</p>
		<Preview code={usageCode}>
			<Spinner color="primary" />
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop: <code class="ic">sm</code> (16 px), <code class="ic">md</code> (24 px), and <code class="ic">lg</code> (40 px).</p>
		<Preview code={sizesCode}>
			<Spinner size="sm" color="primary" />
			<Spinner size="md" color="primary" />
			<Spinner size="lg" color="primary" />
		</Preview>
	</section>

	<section id="colors" class="sec">
		<h2 class="sec__h">Colors</h2>
		<p class="sec__p">Semantic tones via the <code class="ic">color</code> prop — all driven by <code class="ic">--sve-*</code> tokens through <code class="ic">currentColor</code>.</p>
		<Preview code={colorsCode}>
			<Spinner size="md" color="primary" />
			<Spinner size="md" color="success" />
			<Spinner size="md" color="warning" />
			<Spinner size="md" color="danger" />
			<Spinner size="md" color="default" />
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;span&gt;</code> attribute via prop spreading.
			The <code class="ic">role="status"</code> and <code class="ic">aria-label</code> are always
			applied — override <code class="ic">label</code> to localise the accessible name.
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
