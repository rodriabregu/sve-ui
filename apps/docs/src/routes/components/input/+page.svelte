<script lang="ts">
	import { Input } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.input;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'variant', type: `'outline' | 'filled'`, default: `'outline'` },
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'invalid', type: 'boolean', default: 'false', description: 'Applies error styling.' },
		{ prop: 'value', type: 'string', description: 'Bindable value.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' }
	];

	const usageCode = `<script>
  import { Input } from 'sve-ui';
<\u002fscript>

<Input placeholder="Enter text…" />`;

	const variantsCode = `<Input variant="outline" placeholder="Outline" />
<Input variant="filled" placeholder="Filled" />`;

	const sizesCode = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

	const statesCode = `<Input placeholder="Default" />
<Input placeholder="Invalid" invalid />
<Input placeholder="Disabled" disabled />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import and drop in. Works with all native <code class="ic">&lt;input&gt;</code> attributes via
			prop spreading.
		</p>
		<Preview code={usageCode}>
			<Input placeholder="Enter text…" />
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			Two visual styles via the <code class="ic">variant</code> prop:
			<code class="ic">outline</code> (default) and <code class="ic">filled</code>.
		</p>
		<Preview code={variantsCode}>
			<Input variant="outline" placeholder="Outline" />
			<Input variant="filled" placeholder="Filled" />
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop.</p>
		<Preview code={sizesCode}>
			<Input size="sm" placeholder="Small" />
			<Input size="md" placeholder="Medium" />
			<Input size="lg" placeholder="Large" />
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">
			Use <code class="ic">invalid</code> for error feedback and <code class="ic">disabled</code> to
			block interaction.
		</p>
		<Preview code={statesCode}>
			<Input placeholder="Default" />
			<Input placeholder="Invalid" invalid />
			<Input placeholder="Disabled" disabled />
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;input&gt;</code> attribute via prop spreading.
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
