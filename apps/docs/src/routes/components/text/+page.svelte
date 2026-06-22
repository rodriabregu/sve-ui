<script lang="ts">
	import { Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.text;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'tones', label: 'Tones' },
		{ id: 'as-element', label: 'As element' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{
			prop: 'as',
			type: `'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'li' | 'code' | 'blockquote' | …`,
			default: `'p'`,
			description: 'HTML element to render.'
		},
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, description: 'Text size.' },
		{ prop: 'weight', type: `'normal' | 'medium' | 'bold'`, description: 'Font weight.' },
		{
			prop: 'color',
			type: `'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'`,
			default: `'inherit'`
		},
		{ prop: 'align', type: `'left' | 'center' | 'right' | 'justify'`, description: 'Text alignment.' },
		{ prop: 'truncate', type: 'boolean', default: 'false', description: 'Truncate with ellipsis on overflow.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Text content.' }
	];

	const usageCode = `<script>
  import { Text } from 'sve-ui';
<\/script>

<Text>Body copy, ready to go.</Text>`;

	const sizesCode = `<Text size="lg">Large — size lg</Text>
<Text size="md">Medium — size md (token default)</Text>
<Text size="sm">Small — size sm</Text>`;

	const tonesCode = `<Text color="primary" weight="bold">Primary bold</Text>
<Text color="success" weight="medium">Success medium</Text>
<Text color="danger">Danger</Text>
<Text color="warning">Warning</Text>
<Text color="secondary">Secondary</Text>`;

	const asCode = `<!-- Render as a label element -->
<Text as="label" size="sm" weight="medium">Email address</Text>

<!-- Render as inline code -->
<Text as="code" size="sm" color="default">npm install sve-ui</Text>

<!-- Render as strong with semantic weight -->
<Text as="strong" weight="bold">Important notice.</Text>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			A polymorphic text primitive. Renders as <code class="ic">&lt;p&gt;</code> by default; swap the
			element via the <code class="ic">as</code> prop without changing any styling.
		</p>
		<Preview code={usageCode}>
			<Text>Body copy, ready to go.</Text>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			Three sizes via the <code class="ic">size</code> prop, mapped to
			<code class="ic">--sve-font-size-*</code> tokens.
		</p>
		<Preview code={sizesCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<Text size="lg">Large — size lg</Text>
				<Text size="md">Medium — size md (token default)</Text>
				<Text size="sm">Small — size sm</Text>
			</div>
		</Preview>
	</section>

	<section id="tones" class="sec">
		<h2 class="sec__h">Tones</h2>
		<p class="sec__p">
			Semantic color tokens via the <code class="ic">color</code> prop. Combine with
			<code class="ic">weight</code> for emphasis.
		</p>
		<Preview code={tonesCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<Text color="primary" weight="bold">Primary bold</Text>
				<Text color="success" weight="medium">Success medium</Text>
				<Text color="danger">Danger</Text>
				<Text color="warning">Warning</Text>
				<Text color="secondary">Secondary</Text>
			</div>
		</Preview>
	</section>

	<section id="as-element" class="sec">
		<h2 class="sec__h">As element</h2>
		<p class="sec__p">
			Render as any semantic HTML element via the <code class="ic">as</code> prop. The component
			carries the right styles regardless of the underlying tag.
		</p>
		<Preview code={asCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
				<Text as="label" size="sm" weight="medium">Email address</Text>
				<Text as="code" size="sm" color="default">npm install sve-ui</Text>
				<Text as="strong" weight="bold">Important notice.</Text>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native HTML attribute for the rendered element via prop spreading.
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
