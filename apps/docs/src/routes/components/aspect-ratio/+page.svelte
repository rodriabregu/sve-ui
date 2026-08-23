<script lang="ts">
	import { AspectRatio } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['aspect-ratio'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'ratios', label: 'Common ratios' },
		{ id: 'why', label: 'Why it matters' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { AspectRatio } from 'sve-ui';
<\u002fscript>

<AspectRatio ratio={16 / 9}>
  <img src={url} alt="Sunset over the harbour" />
</AspectRatio>`;

	const ratiosCode = `<AspectRatio ratio={1}>...</AspectRatio>
<AspectRatio ratio={4 / 3}>...</AspectRatio>
<AspectRatio ratio={16 / 9}>...</AspectRatio>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Pass <code class="ic">ratio</code> as width divided by height —
			<code class="ic">16 / 9</code>, not <code class="ic">1.777</code>. Write the division and the
			intent stays readable. Media inside is stretched to fill the box with
			<code class="ic">object-fit: cover</code>.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<AspectRatio ratio={16 / 9}>
					<div class="ph">16 / 9</div>
				</AspectRatio>
			</div>
		</Preview>
	</section>

	<section id="ratios" class="sec">
		<h2 class="sec__h">Common ratios</h2>
		<p class="sec__p">Square for avatars and thumbnails, 4:3 for photos, 16:9 for video.</p>
		<Preview code={ratiosCode} align="start">
			<div class="grid">
				<AspectRatio ratio={1}><div class="ph">1 / 1</div></AspectRatio>
				<AspectRatio ratio={4 / 3}><div class="ph">4 / 3</div></AspectRatio>
				<AspectRatio ratio={16 / 9}><div class="ph">16 / 9</div></AspectRatio>
			</div>
		</Preview>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why it matters</h2>
		<p class="sec__p">
			The box is reserved <strong>before</strong> the media loads. Without that, the browser has no
			height to allocate, so everything below jumps down the moment the image arrives — the layout
			shift users feel as the page fighting them. Reserving the space is not a styling nicety, it is
			how you stop that.
		</p>
		<p class="sec__p">
			It is purely presentational and adds no ARIA of its own, so the content keeps its own
			semantics — an <code class="ic">&lt;img&gt;</code> inside still needs its
			<code class="ic">alt</code>.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading.</p>
		<PropsTable component="AspectRatio" />
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
	.demo { width: 100%; max-width: 380px; }
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 14px;
		width: 100%;
		max-width: 460px;
	}
	.ph {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: var(--doc-surface-2);
		border: 1px solid var(--doc-border);
		border-radius: 8px;
		font-family: var(--doc-mono);
		font-size: 12px;
		color: var(--doc-fg-muted);
	}
</style>
