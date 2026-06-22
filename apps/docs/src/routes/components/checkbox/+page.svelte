<script lang="ts">
	import { Checkbox } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.checkbox;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable checked state.' },
		{
			prop: 'indeterminate',
			type: 'boolean',
			default: 'false',
			description: 'Shows the mixed/indeterminate visual.'
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' }
	];

	let checkboxOn = $state(true);

	const usageCode = `<script>
  import { Checkbox } from 'sve-ui';
  let checked = $state(true);
<\u002fscript>

<label class="flex items-center gap-2">
  <Checkbox.Root bind:checked />
  <span>Accept terms</span>
</label>`;

	const sizesCode = `<label class="flex items-center gap-2">
  <Checkbox.Root size="sm" />
  <span>Small</span>
</label>
<label class="flex items-center gap-2">
  <Checkbox.Root size="md" />
  <span>Medium</span>
</label>
<label class="flex items-center gap-2">
  <Checkbox.Root size="lg" />
  <span>Large</span>
</label>`;

	const statesCode = `<label class="flex items-center gap-2">
  <Checkbox.Root checked />
  <span>Checked</span>
</label>
<label class="flex items-center gap-2">
  <Checkbox.Root indeterminate />
  <span>Indeterminate</span>
</label>
<label class="flex items-center gap-2">
  <Checkbox.Root disabled />
  <span>Disabled</span>
</label>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Use <code class="ic">Checkbox.Root</code> inside a label element. Bind to
			<code class="ic">checked</code> for two-way state.
		</p>
		<Preview code={usageCode}>
			<label class="flex items-center gap-2">
				<Checkbox.Root bind:checked={checkboxOn} />
				<span>Accept terms</span>
			</label>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop.</p>
		<Preview code={sizesCode}>
			<label class="flex items-center gap-2">
				<Checkbox.Root size="sm" />
				<span>Small</span>
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root size="md" />
				<span>Medium</span>
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root size="lg" />
				<span>Large</span>
			</label>
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">
			<code class="ic">indeterminate</code> renders the mixed state. Both
			<code class="ic">indeterminate</code> and <code class="ic">disabled</code> are fully
			accessible.
		</p>
		<Preview code={statesCode}>
			<label class="flex items-center gap-2">
				<Checkbox.Root checked />
				<span>Checked</span>
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root indeterminate />
				<span>Indeterminate</span>
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root disabled />
				<span>Disabled</span>
			</label>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus all Bits <code class="ic">Checkbox.Root</code> props via prop spreading.
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
