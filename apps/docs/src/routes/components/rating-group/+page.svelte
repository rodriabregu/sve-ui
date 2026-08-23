<script lang="ts">
	import { RatingGroup } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['rating-group'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'valuetext', label: 'Always set aria-valuetext' },
		{ id: 'slider', label: 'It is a slider, not buttons' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{ prop: 'max', type: 'number', description: 'How many items. Also the aria-valuemax.' },
		{ prop: 'aria-valuetext', type: 'string | ((value, max) => string)', description: 'Spoken value. Pass the function form so the scale is announced, not just a number.' },
		{ prop: 'onValueChange', type: '(value: number) => void' },
		{ prop: 'name', type: 'string', description: 'Include it in a form submission; Bits renders a hidden input.' },
		{ prop: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'` },
		{ prop: 'disabled', type: 'boolean', default: 'false' },
		{ prop: 'required', type: 'boolean', default: 'false' }
	];

	const usageCode = `<script>
  import { RatingGroup } from 'sve-ui';
  let rating = $state(3);
<\u002fscript>

<RatingGroup.Root
  bind:value={rating}
  max={5}
  aria-label="Rating"
  aria-valuetext={(v, max) => \`\${v} of \${max} stars\`}
>
  {#snippet children({ items })}
    {#each items as item (item.index)}
      <RatingGroup.Item index={item.index}>★</RatingGroup.Item>
    {/each}
  {/snippet}
</RatingGroup.Root>`;

	let rating = $state(3);
	let big = $state(4);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Root hands you an <code class="ic">items</code> array through a snippet — each with an
			<code class="ic">index</code> and a <code class="ic">state</code> of
			<code class="ic">active</code>, <code class="ic">partial</code> or
			<code class="ic">inactive</code> — so the icon is yours to choose. Half-star readings are
			expressible through <code class="ic">partial</code>.
		</p>
		<Preview code={usageCode}>
			<div class="field">
				<RatingGroup.Root
					bind:value={rating}
					max={5}
					aria-label="Rating"
					aria-valuetext={(v, max) => `${v} of ${max} stars`}
				>
					{#snippet children({ items })}
						{#each items as item (item.index)}
							<RatingGroup.Item index={item.index}>★</RatingGroup.Item>
						{/each}
					{/snippet}
				</RatingGroup.Root>
				<p class="cap">value: {rating} — try the arrow keys</p>
			</div>
		</Preview>
	</section>

	<section id="valuetext" class="sec">
		<h2 class="sec__h">Always set aria-valuetext</h2>
		<p class="sec__p">
			Pass the <strong>function</strong> form:
			<code class="ic">{'(v, max) => `${v} of ${max} stars`'}</code>. Without it the rating is
			announced as a bare number, and "3" tells the user nothing — three out of five? out of ten? A
			rating is meaningless without its scale, and that is precisely what a sighted user gets for free
			from seeing five stars.
		</p>
		<p class="sec__p">
			Root also needs a <strong>name</strong> via <code class="ic">aria-label</code>. Bits supplies the
			role and the numeric values; it cannot invent what is being rated.
		</p>
		<Preview code={`<RatingGroup.Root size="lg" max={5} aria-label="Overall quality" />`}>
			<RatingGroup.Root
				bind:value={big}
				max={5}
				size="lg"
				aria-label="Overall quality"
				aria-valuetext={(v, max) => `${v} of ${max} stars`}
			>
				{#snippet children({ items })}
					{#each items as item (item.index)}
						<RatingGroup.Item index={item.index}>★</RatingGroup.Item>
					{/each}
				{/snippet}
			</RatingGroup.Root>
		</Preview>
	</section>

	<section id="slider" class="sec">
		<h2 class="sec__h">It is a slider, not buttons</h2>
		<p class="sec__p">
			Bits gives Root <code class="ic">role="slider"</code> with the
			<code class="ic">aria-value*</code> attributes, so the arrow keys adjust the rating and the whole
			control is one tab stop. The items are
			<code class="ic">role="presentation"</code> — decorative, with the value living on the Root.
		</p>
		<p class="sec__p">
			That is why you name and describe the Root and not each star. It is also why a hand-rolled row
			of clickable icons is not the same component: it looks identical and is unusable by keyboard.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">RatingGroup.Root</code> — <code class="ic">value</code> is bindable.</p>
		<PropsTable component="RatingGroupRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">RatingGroup.Item</code> takes <code class="ic">index</code> from the snippet
			plus <code class="ic">class</code>.
		</p>
		<PropsTable component="RatingGroupItem" />
	</section>
</DocPage>

<style>
	.sec { margin-bottom: 48px; scroll-margin-top: 84px; }
	.sec__h {
		font-size: 21px; font-weight: 700; letter-spacing: -0.02em;
		color: var(--doc-fg); margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px; font-size: 14.5px; line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.field { display: flex; flex-direction: column; gap: 8px; }
	.cap { margin: 0; font-size: 12.5px; color: var(--doc-fg-subtle); }
</style>
