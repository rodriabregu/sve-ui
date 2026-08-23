<script lang="ts">
	import { Meter } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.meter;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'range', label: 'Custom range' },
		{ id: 'tones', label: 'Sizes and tones' },
		{ id: 'vs-progress', label: 'Meter vs Progress' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Meter } from 'sve-ui';
<\u002fscript>

<Meter value={70} aria-label="Disk usage" />`;

	const rangeCode = `<!-- 5 within 0..20 fills a quarter -->
<Meter value={5} max={20} aria-label="Storage used, in GB" />`;

	const tonesCode = `<Meter size="sm" value={25} color="success" aria-label="Low" />
<Meter size="md" value={60} color="warning" aria-label="Moderate" />
<Meter size="lg" value={92} color="danger" aria-label="Critical" />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			A meter reports where a value sits inside a known range. Bits owns
			<code class="ic">role="meter"</code> and the <code class="ic">aria-value*</code> attributes;
			the accessible <strong>name</strong> is yours, so pass
			<code class="ic">aria-label</code> or <code class="ic">aria-labelledby</code>.
		</p>
		<Preview code={usageCode} align="start">
			<div class="stack">
				<Meter value={70} aria-label="Disk usage" />
				<p class="cap">70 of 100</p>
			</div>
		</Preview>
	</section>

	<section id="range" class="sec">
		<h2 class="sec__h">Custom range</h2>
		<p class="sec__p">
			<code class="ic">min</code> and <code class="ic">max</code> set the bounds. Put the real unit in
			the label — "Storage used, in GB" is far more useful than "Storage".
		</p>
		<Preview code={rangeCode} align="start">
			<div class="stack">
				<Meter value={5} max={20} aria-label="Storage used, in GB" />
				<p class="cap">5 GB of 20 GB</p>
			</div>
		</Preview>
	</section>

	<section id="tones" class="sec">
		<h2 class="sec__h">Sizes and tones</h2>
		<p class="sec__p">
			The tone is yours to choose, and it should follow the reading. Colour alone is not a signal
			though — a red meter means nothing to someone who cannot see it, so keep the number or a text
			status nearby.
		</p>
		<Preview code={tonesCode} align="start">
			<div class="stack">
				<Meter size="sm" value={25} color="success" aria-label="Low usage" />
				<Meter size="md" value={60} color="warning" aria-label="Moderate usage" />
				<Meter size="lg" value={92} color="danger" aria-label="Critical usage" />
			</div>
		</Preview>
	</section>

	<section id="vs-progress" class="sec">
		<h2 class="sec__h">Meter vs Progress</h2>
		<p class="sec__p">
			Use <code class="ic">Meter</code> for a measurement that simply is what it is — disk usage,
			password strength, a score out of ten. Use
			<a href="/components/progress">Progress</a> for advancement toward completion, where reaching
			the end is the point. A meter at 100% is full; a progress bar at 100% is done.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading. Values
			outside the range are clamped rather than overflowing the track.
		</p>
		<PropsTable component="Meter" />
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
	.sec__p a { color: var(--doc-primary-text); }
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.stack {
		display: flex; flex-direction: column; gap: 14px;
		width: 100%; max-width: 420px;
	}
	.cap { margin: 0; font-size: 12.5px; color: var(--doc-fg-subtle); }
</style>
