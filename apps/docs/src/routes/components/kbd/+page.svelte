<script lang="ts">
	import { Kbd, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.kbd;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'chords', label: 'Chords' },
		{ id: 'spoken', label: 'Spoken labels' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Kbd } from 'sve-ui';
<\u002fscript>

<Kbd>Esc</Kbd>`;

	const chordsCode = `<Kbd label="Command">&#8984;</Kbd>
<Kbd>K</Kbd>`;

	const spokenCode = `<!-- Announced as "Shift", drawn as the glyph -->
<Kbd label="Shift">&#8679;</Kbd>

<!-- No label needed: already reads correctly -->
<Kbd>Enter</Kbd>`;

	const shortcutCode = `<Button variant="outline" aria-keyshortcuts="Meta+K">
  Search
  <Kbd size="sm" label="Command">&#8984;</Kbd><Kbd size="sm">K</Kbd>
</Button>`;

	const sizesCode = `<Kbd size="sm">Tab</Kbd>
<Kbd size="md">Tab</Kbd>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			One <code class="ic">Kbd</code> per key. It renders a real
			<code class="ic">&lt;kbd&gt;</code> element.
		</p>
		<Preview code={usageCode}>
			<Kbd>Esc</Kbd>
		</Preview>
	</section>

	<section id="chords" class="sec">
		<h2 class="sec__h">Chords</h2>
		<p class="sec__p">
			The HTML spec allows nesting <code class="ic">&lt;kbd&gt;</code> to group a chord, but every renderer
			draws a box per element — so a nested chord shows a box around boxes. Render one per key instead
			and let the layout separate them.
		</p>
		<Preview code={chordsCode}>
			<span style="display: inline-flex; gap: 4px; align-items: center;">
				<Kbd label="Command">&#8984;</Kbd><Kbd>K</Kbd>
			</span>
		</Preview>
	</section>

	<section id="spoken" class="sec">
		<h2 class="sec__h">Spoken labels</h2>
		<p class="sec__p">
			<code class="ic">&#8984;</code>, <code class="ic">&#8679;</code> and
			<code class="ic">&#8997;</code> are punctuation to a screen reader: some voices skip them,
			others read a name nobody recognises. Pass <code class="ic">label</code> and the glyph is hidden
			from the accessibility tree while the word is announced in its place. Plain letters and words need
			no label.
		</p>
		<Preview code={spokenCode}>
			<span style="display: inline-flex; gap: 8px; align-items: center;">
				<Kbd label="Shift">&#8679;</Kbd>
				<Kbd>Enter</Kbd>
			</span>
		</Preview>
		<p class="sec__p" style="margin-top: 16px;">
			The keycap is a picture of a key — it does not tell assistive technology that pressing it does
			anything. That belongs on the control, as
			<code class="ic">aria-keyshortcuts</code>.
		</p>
		<Preview code={shortcutCode}>
			<Button variant="outline" aria-keyshortcuts="Meta+K">
				Search
				<Kbd size="sm" label="Command">&#8984;</Kbd><Kbd size="sm">K</Kbd>
			</Button>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			Use <code class="ic">sm</code> inside a button or a menu row, <code class="ic">md</code> in body
			copy.
		</p>
		<Preview code={sizesCode}>
			<span style="display: inline-flex; gap: 8px; align-items: center;">
				<Kbd size="sm">Tab</Kbd>
				<Kbd size="md">Tab</Kbd>
			</span>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;kbd&gt;</code> attribute via prop spreading.
		</p>
		<PropsTable component="Kbd" />
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
