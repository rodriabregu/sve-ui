<script lang="ts">
	import { Textarea, Label } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.textarea;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'resize', label: 'Resize' },
		{ id: 'invalid', label: 'Invalid state' },
		{ id: 'binding', label: 'Binding' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'variant', type: `'outline' | 'filled'`, default: `'outline'` },
		{
			prop: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Applies the danger styling and sets aria-invalid on the textarea.'
		},
		{
			prop: 'resize',
			type: `'none' | 'vertical' | 'horizontal' | 'both'`,
			default: `'vertical'`,
			description: 'Which axes the user may drag to resize. Maps to the CSS resize property.'
		},
		{ prop: 'rows', type: 'number', default: '3', description: 'Initial visible line count.' },
		{ prop: 'value', type: 'string', description: 'Bindable via bind:value.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the textarea.' }
	];

	const usageCode = `<script>
  import { Textarea, Label } from 'sve-ui';
<\u002fscript>

<Label for="bio">Bio</Label>
<Textarea id="bio" placeholder="Tell us about yourself" />`;

	const sizesCode = `<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`;

	const variantsCode = `<Textarea variant="outline" placeholder="Outline" />
<Textarea variant="filled" placeholder="Filled" />`;

	const resizeCode = `<Textarea resize="none" placeholder="Not resizable" />
<Textarea resize="vertical" placeholder="Vertical only (default)" />
<Textarea resize="both" placeholder="Both axes" />`;

	const invalidCode = `<Label for="notes">Notes</Label>
<Textarea id="notes" invalid aria-describedby="notes-error" />
<p id="notes-error">Notes cannot be empty.</p>`;

	const bindingCode = `<script>
  let bio = $state('');
<\u002fscript>

<Textarea bind:value={bio} />
<p>{bio.length} characters</p>`;

	let bio = $state('');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Textarea</code> is a styled native <code class="ic">&lt;textarea&gt;</code> —
			no Bits UI primitive behind it, because the platform already gives you everything. Pair it
			with
			<a href="/components/label">Label</a> so it has an accessible name.
		</p>
		<Preview code={usageCode} align="start">
			<div class="field">
				<Label for="bio-demo">Bio</Label>
				<Textarea id="bio-demo" placeholder="Tell us about yourself" />
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			Three sizes from the <code class="ic">size</code> prop. Unlike
			<a href="/components/input">Input</a>, height is driven by
			<code class="ic">rows</code> rather than a fixed value — sizes change padding and font size.
		</p>
		<Preview code={sizesCode} align="start">
			<div class="stack">
				<Textarea size="sm" placeholder="Small" />
				<Textarea size="md" placeholder="Medium" />
				<Textarea size="lg" placeholder="Large" />
			</div>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			<code class="ic">outline</code> is a bordered transparent field;
			<code class="ic">filled</code> sits on a surface token with no border.
		</p>
		<Preview code={variantsCode} align="start">
			<div class="stack">
				<Textarea variant="outline" placeholder="Outline" />
				<Textarea variant="filled" placeholder="Filled" />
			</div>
		</Preview>
	</section>

	<section id="resize" class="sec">
		<h2 class="sec__h">Resize</h2>
		<p class="sec__p">
			The default is <code class="ic">vertical</code> — users can grow the field without breaking
			your layout. Use <code class="ic">none</code> when the surrounding layout cannot absorb a resize.
		</p>
		<Preview code={resizeCode} align="start">
			<div class="stack">
				<Textarea resize="none" placeholder="Not resizable" />
				<Textarea resize="vertical" placeholder="Vertical only (default)" />
				<Textarea resize="both" placeholder="Both axes" />
			</div>
		</Preview>
	</section>

	<section id="invalid" class="sec">
		<h2 class="sec__h">Invalid state</h2>
		<p class="sec__p">
			<code class="ic">invalid</code> paints the danger border and sets
			<code class="ic">aria-invalid</code>. It does not announce why — point
			<code class="ic">aria-describedby</code> at your error message so screen readers get the reason,
			not just the state.
		</p>
		<Preview code={invalidCode} align="start">
			<div class="field">
				<Label for="notes-demo">Notes</Label>
				<Textarea id="notes-demo" invalid aria-describedby="notes-demo-error" />
				<p id="notes-demo-error" class="err">Notes cannot be empty.</p>
			</div>
		</Preview>
	</section>

	<section id="binding" class="sec">
		<h2 class="sec__h">Binding</h2>
		<p class="sec__p">
			<code class="ic">value</code> is bindable, so <code class="ic">bind:value</code> works exactly like
			it does on a native textarea.
		</p>
		<Preview code={bindingCode} align="start">
			<div class="field">
				<Textarea bind:value={bio} placeholder="Type here" />
				<p class="count">{bio.length} characters</p>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;textarea&gt;</code> attribute via prop spreading —
			<code class="ic">id</code>, <code class="ic">name</code>, <code class="ic">maxlength</code>,
			<code class="ic">required</code>, <code class="ic">readonly</code>, and the event handlers.
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
	.sec__p a {
		color: var(--doc-primary-text);
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
	.err,
	.count {
		margin: 0;
		font-size: 13px;
		color: var(--doc-fg-muted);
	}
</style>
