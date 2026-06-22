<script lang="ts">
	import { Code } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.code;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'with-label', label: 'With label' },
		{ id: 'copy-disabled', label: 'Copy disabled' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'code', type: 'string', description: 'The code string to display and copy. SSR-safe — no DOM scraping.' },
		{ prop: 'label', type: 'string', description: 'Optional header label, e.g. a filename or language tag.' },
		{ prop: 'copyable', type: 'boolean', default: 'true', description: 'Show the copy-to-clipboard button.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root element.' }
	];

	const usageCode = `<script>
  import { Code } from 'sve-ui';
<\/script>

<Code code="const greeting = 'hello world';" />`;

	const withLabelCode = `<Code
  label="App.svelte"
  code={snippet}
/>`;

	const copyDisabledCode = `<Code
  code="export const prerender = true;"
  copyable={false}
/>`;

	const snippetCode = `import { Button } from 'sve-ui';

<Button color="primary">Ship it</Button>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import the component and pass a <code class="ic">code</code> string. The copy button is included
			by default — no setup required.
		</p>
		<Preview code={usageCode}>
			<Code code="const greeting = 'hello world';" />
		</Preview>
	</section>

	<section id="with-label" class="sec">
		<h2 class="sec__h">With label</h2>
		<p class="sec__p">
			Pass a <code class="ic">label</code> to show a header bar with a filename or language tag.
		</p>
		<Preview code={withLabelCode}>
			<Code label="App.svelte" code={snippetCode} />
		</Preview>
	</section>

	<section id="copy-disabled" class="sec">
		<h2 class="sec__h">Copy disabled</h2>
		<p class="sec__p">
			Set <code class="ic">copyable={false}</code> to render a plain read-only block with no toolbar.
		</p>
		<Preview code={copyDisabledCode}>
			<Code code="export const prerender = true;" copyable={false} />
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading.
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
