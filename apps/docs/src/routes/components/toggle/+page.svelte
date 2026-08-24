<script lang="ts">
	import { Toggle } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.toggle;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'vs-switch', label: 'Toggle vs Switch' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Toggle } from 'sve-ui';
  let bold = $state(false);
<\u002fscript>

<Toggle bind:pressed={bold} aria-label="Bold">B</Toggle>`;

	const variantsCode = `<Toggle variant="outline" aria-label="Bold">B</Toggle>
<Toggle variant="ghost" aria-label="Italic">I</Toggle>`;

	const sizesCode = `<Toggle size="sm" aria-label="Small">S</Toggle>
<Toggle size="md" aria-label="Medium">M</Toggle>
<Toggle size="lg" aria-label="Large">L</Toggle>`;

	let bold = $state(false);
	let italic = $state(true);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Toggle</code> is a two-state button. Bits renders a real
			<code class="ic">&lt;button&gt;</code> and owns <code class="ic">aria-pressed</code>, so the
			state is announced without any work on your side. An icon-only toggle carries no text, so it
			needs an <code class="ic">aria-label</code> — otherwise it has no accessible name at all.
		</p>
		<Preview code={usageCode}>
			<Toggle bind:pressed={bold} aria-label="Bold">B</Toggle>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			<code class="ic">outline</code> keeps a visible border when off;
			<code class="ic">ghost</code> shows nothing until hovered or pressed. Both use the primary tone
			for the on state.
		</p>
		<Preview code={variantsCode}>
			<div class="row">
				<Toggle variant="outline" aria-label="Bold outline">B</Toggle>
				<Toggle variant="ghost" bind:pressed={italic} aria-label="Italic ghost">I</Toggle>
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes matched to the Button scale, so they line up in a toolbar.</p>
		<Preview code={sizesCode}>
			<div class="row">
				<Toggle size="sm" aria-label="Small">S</Toggle>
				<Toggle size="md" aria-label="Medium">M</Toggle>
				<Toggle size="lg" aria-label="Large">L</Toggle>
			</div>
		</Preview>
	</section>

	<section id="vs-switch" class="sec">
		<h2 class="sec__h">Toggle vs Switch</h2>
		<p class="sec__p">
			They are not interchangeable, and the difference is about when the change takes effect. A
			<a href="/components/switch">Switch</a> is a setting — flipping it applies immediately, like
			turning on notifications. A <code class="ic">Toggle</code> is a button that stays pressed —
			bold in a text editor, a filter that is active. If the control belongs in a toolbar next to
			other buttons, you want <code class="ic">Toggle</code>. If it belongs in a settings form, you
			want <code class="ic">Switch</code>.
		</p>
		<p class="sec__p">
			Need several related toggles where only one can be active? That is
			<a href="/components/toggle-group">Toggle Group</a>, not a row of
			<code class="ic">Toggle</code>s.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;button&gt;</code> attribute via prop spreading.
			<code class="ic">pressed</code> is bindable.
		</p>
		<PropsTable component="Toggle" />
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
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
