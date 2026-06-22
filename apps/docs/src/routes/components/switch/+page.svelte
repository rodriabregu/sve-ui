<script lang="ts">
	import { Switch } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.switch;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'checked', type: 'boolean', default: 'false', description: 'Bindable toggle state.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' }
	];

	let switchOn = $state(true);

	const usageCode = `<script>
  import { Switch } from 'sve-ui';
  let switchOn = $state(true);
<\/script>

<Switch.Root bind:checked={switchOn} />`;

	const sizesCode = `<Switch.Root size="sm" />
<Switch.Root size="md" />
<Switch.Root size="lg" />`;

	const statesCode = `<Switch.Root checked />
<Switch.Root />
<Switch.Root checked disabled />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Bind <code class="ic">checked</code> for two-way state. The switch is fully keyboard and
			screen-reader accessible out of the box.
		</p>
		<Preview code={usageCode}>
			<Switch.Root bind:checked={switchOn} />
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes from the <code class="ic">size</code> prop.</p>
		<Preview code={sizesCode}>
			<Switch.Root size="sm" />
			<Switch.Root size="md" />
			<Switch.Root size="lg" />
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">
			Checked on, checked off, and disabled. The <code class="ic">disabled</code> prop blocks all
			interaction while keeping the current visual state.
		</p>
		<Preview code={statesCode}>
			<Switch.Root checked />
			<Switch.Root />
			<Switch.Root checked disabled />
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus all Bits <code class="ic">Switch.Root</code> props via prop spreading.
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
