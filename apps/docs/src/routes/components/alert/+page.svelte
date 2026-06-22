<script lang="ts">
	import { Alert } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.alert;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'props', label: 'Props' }
	];

	const rootProps: PropRow[] = [
		{
			prop: 'color',
			type: `'default' | 'primary' | 'success' | 'warning' | 'danger'`,
			default: `'default'`
		},
		{
			prop: 'variant',
			type: `'subtle' | 'solid' | 'outline'`,
			default: `'subtle'`
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root element.' },
		{ prop: 'children', type: 'Snippet', description: 'Alert content (Title + Description).' }
	];

	const titleProps: PropRow[] = [
		{
			prop: 'as',
			type: 'string',
			default: `'p'`,
			description: 'HTML element to render as.'
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the title element.' },
		{ prop: 'children', type: 'Snippet', description: 'Title text.' }
	];

	const descriptionProps: PropRow[] = [
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the description element.' },
		{ prop: 'children', type: 'Snippet', description: 'Description text.' }
	];

	const usageCode = `<script>
  import { Alert } from 'sve-ui';
<\/script>

<Alert.Root color="primary">
  <Alert.Title>Heads up</Alert.Title>
  <Alert.Description>New components are available in this release.</Alert.Description>
</Alert.Root>`;

	const colorsCode = `<Alert.Root color="primary" variant="subtle">
  <Alert.Title>Info</Alert.Title>
  <Alert.Description>New components are available in this release.</Alert.Description>
</Alert.Root>
<Alert.Root color="success" variant="subtle">
  <Alert.Title>Success</Alert.Title>
  <Alert.Description>Your data has been saved successfully.</Alert.Description>
</Alert.Root>
<Alert.Root color="warning" variant="subtle">
  <Alert.Title>Warning</Alert.Title>
  <Alert.Description>Please review your input before submitting.</Alert.Description>
</Alert.Root>
<Alert.Root color="danger" variant="subtle">
  <Alert.Title>Error</Alert.Title>
  <Alert.Description>Something went wrong. Please try again.</Alert.Description>
</Alert.Root>`;

	const variantsCode = `<Alert.Root color="primary" variant="subtle">
  <Alert.Title>Subtle</Alert.Title>
  <Alert.Description>Soft background, no border.</Alert.Description>
</Alert.Root>
<Alert.Root color="primary" variant="outline">
  <Alert.Title>Outline</Alert.Title>
  <Alert.Description>Transparent background, colored border.</Alert.Description>
</Alert.Root>
<Alert.Root color="primary" variant="solid">
  <Alert.Title>Solid</Alert.Title>
  <Alert.Description>Full color background with contrasting text.</Alert.Description>
</Alert.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import the <code class="ic">Alert</code> namespace and compose
			<code class="ic">Alert.Root</code>, <code class="ic">Alert.Title</code>, and
			<code class="ic">Alert.Description</code>. No setup required.
		</p>
		<Preview code={usageCode} align="start">
			<Alert.Root color="primary">
				<Alert.Title>Heads up</Alert.Title>
				<Alert.Description>New components are available in this release.</Alert.Description>
			</Alert.Root>
		</Preview>
	</section>

	<section id="colors" class="sec">
		<h2 class="sec__h">Colors</h2>
		<p class="sec__p">Five semantic tones via the <code class="ic">color</code> prop, all driven by <code class="ic">--sve-*</code> tokens.</p>
		<Preview code={colorsCode} align="start">
			<Alert.Root color="primary" variant="subtle">
				<Alert.Title>Info</Alert.Title>
				<Alert.Description>New components are available in this release.</Alert.Description>
			</Alert.Root>
			<Alert.Root color="success" variant="subtle">
				<Alert.Title>Success</Alert.Title>
				<Alert.Description>Your data has been saved successfully.</Alert.Description>
			</Alert.Root>
			<Alert.Root color="warning" variant="subtle">
				<Alert.Title>Warning</Alert.Title>
				<Alert.Description>Please review your input before submitting.</Alert.Description>
			</Alert.Root>
			<Alert.Root color="danger" variant="subtle">
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>Something went wrong. Please try again.</Alert.Description>
			</Alert.Root>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">Three visual treatments via the <code class="ic">variant</code> prop.</p>
		<Preview code={variantsCode} align="start">
			<Alert.Root color="primary" variant="subtle">
				<Alert.Title>Subtle</Alert.Title>
				<Alert.Description>Soft background, no border.</Alert.Description>
			</Alert.Root>
			<Alert.Root color="primary" variant="outline">
				<Alert.Title>Outline</Alert.Title>
				<Alert.Description>Transparent background, colored border.</Alert.Description>
			</Alert.Root>
			<Alert.Root color="primary" variant="solid">
				<Alert.Title>Solid</Alert.Title>
				<Alert.Description>Full color background with contrasting text.</Alert.Description>
			</Alert.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Alert.Root</code> — plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading.
		</p>
		<PropsTable rows={rootProps} />

		<p class="sec__p" style="margin-top: 24px;">
			<code class="ic">Alert.Title</code>
		</p>
		<PropsTable rows={titleProps} />

		<p class="sec__p" style="margin-top: 24px;">
			<code class="ic">Alert.Description</code>
		</p>
		<PropsTable rows={descriptionProps} />
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
