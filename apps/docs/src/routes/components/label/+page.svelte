<script lang="ts">
	import { Label, Input, Checkbox } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.label;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'required', label: 'Required marker' },
		{ id: 'nesting', label: 'Nesting the control' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{
			prop: 'required',
			type: 'boolean',
			default: 'false',
			description:
				'Renders a decorative asterisk (aria-hidden). The control itself must still carry required or aria-required.'
		},
		{
			prop: 'for',
			type: 'string',
			description: 'Native attribute — must match the id of the control it names.'
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the label.' }
	];

	const usageCode = `<script>
  import { Label, Input } from 'sve-ui';
<\u002fscript>

<Label for="email">Email address</Label>
<Input id="email" type="email" />`;

	const sizesCode = `<Label size="sm">Small label</Label>
<Label size="md">Medium label</Label>
<Label size="lg">Large label</Label>`;

	const requiredCode = `<Label for="name" required>Full name</Label>
<Input id="name" required />`;

	const nestingCode = `<Label>
  <Checkbox.Root />
  Subscribe to the newsletter
</Label>`;

	let subscribed = $state(false);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Label</code> wraps the Bits UI Label primitive, which owns the click-to-focus
			behaviour and stops double-click text selection from leaking into the control. Point
			<code class="ic">for</code>
			at the control's <code class="ic">id</code> — that association is what gives the field its accessible
			name.
		</p>
		<Preview code={usageCode} align="start">
			<div class="field">
				<Label for="email-demo">Email address</Label>
				<Input id="email-demo" type="email" />
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			Three sizes matched to the form-control scale, so a
			<code class="ic">sm</code> label sits naturally above a <code class="ic">sm</code> input.
		</p>
		<Preview code={sizesCode} align="start">
			<div class="stack">
				<Label size="sm">Small label</Label>
				<Label size="md">Medium label</Label>
				<Label size="lg">Large label</Label>
			</div>
		</Preview>
	</section>

	<section id="required" class="sec">
		<h2 class="sec__h">Required marker</h2>
		<p class="sec__p">
			<code class="ic">required</code> renders an asterisk that is
			<code class="ic">aria-hidden</code> — it is a visual affordance, nothing more. Screen readers
			learn the field is required from the control's own
			<code class="ic">required</code> attribute, so set both.
		</p>
		<Preview code={requiredCode} align="start">
			<div class="field">
				<Label for="name-demo" required>Full name</Label>
				<Input id="name-demo" required />
			</div>
		</Preview>
	</section>

	<section id="nesting" class="sec">
		<h2 class="sec__h">Nesting the control</h2>
		<p class="sec__p">
			You can also nest the control inside the label and skip
			<code class="ic">for</code> entirely. This is the tidiest option for checkboxes and switches, where
			the label text is the hit target you actually want.
		</p>
		<Preview code={nestingCode} align="start">
			<Label>
				<Checkbox.Root bind:checked={subscribed} />
				Subscribe to the newsletter
			</Label>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;label&gt;</code> attribute via prop spreading. The
			<code class="ic">Textarea</code>, <code class="ic">Input</code>,
			<code class="ic">Select</code> and <code class="ic">Slider</code> components all pair with it the
			same way.
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
	.stack,
	.field {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 420px;
	}
	.stack {
		align-items: flex-start;
	}
</style>
