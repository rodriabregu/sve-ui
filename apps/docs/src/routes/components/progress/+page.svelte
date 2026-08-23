<script lang="ts">
	import { Progress, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.progress;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'indeterminate', label: 'Indeterminate' },
		{ id: 'range', label: 'Custom range' },
		{ id: 'sizes', label: 'Sizes and colors' },
		{ id: 'vs-meter', label: 'Progress vs Meter' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Progress } from 'sve-ui';
<\u002fscript>

<Progress value={40} aria-label="Upload progress" />`;

	const indeterminateCode = `<!-- null means "running, duration unknown" -->
<Progress value={null} aria-label="Syncing" />`;

	const rangeCode = `<!-- 150 within 100..200 fills half the bar -->
<Progress value={150} min={100} max={200} aria-label="Temperature rise" />`;

	const sizesCode = `<Progress size="sm" value={30} color="primary" aria-label="Small" />
<Progress size="md" value={55} color="success" aria-label="Medium" />
<Progress size="lg" value={80} color="danger" aria-label="Large" />`;

	let uploaded = $state(40);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Bits owns <code class="ic">role="progressbar"</code> and the
			<code class="ic">aria-value*</code> attributes. What it cannot invent is the
			<strong>name</strong> — a bar announced as just "progressbar, 40%" tells the user nothing about
			what is progressing. Always pass <code class="ic">aria-label</code>, or
			<code class="ic">aria-labelledby</code> pointing at a visible label.
		</p>
		<Preview code={usageCode} align="start">
			<div class="stack">
				<Progress value={uploaded} aria-label="Upload progress" />
				<div class="row">
					<Button size="sm" variant="outline" onclick={() => (uploaded = Math.max(0, uploaded - 20))}>
						-20
					</Button>
					<Button size="sm" variant="outline" onclick={() => (uploaded = Math.min(100, uploaded + 20))}>
						+20
					</Button>
					<p class="cap">{uploaded}%</p>
				</div>
			</div>
		</Preview>
	</section>

	<section id="indeterminate" class="sec">
		<h2 class="sec__h">Indeterminate</h2>
		<p class="sec__p">
			Pass <code class="ic">value={null}</code> when the duration is genuinely unknown and you get a
			travelling sliver instead of a fill. Use it honestly — reaching for indeterminate because
			measuring progress is inconvenient just hides information the user wanted.
		</p>
		<Preview code={indeterminateCode} align="start">
			<div class="stack">
				<Progress value={null} aria-label="Syncing" />
			</div>
		</Preview>
	</section>

	<section id="range" class="sec">
		<h2 class="sec__h">Custom range</h2>
		<p class="sec__p">
			<code class="ic">min</code> and <code class="ic">max</code> define the range, and the fill is
			computed against it — values outside are clamped rather than overflowing the track.
		</p>
		<Preview code={rangeCode} align="start">
			<div class="stack">
				<Progress value={150} min={100} max={200} aria-label="Temperature rise" />
				<p class="cap">150 within 100..200 fills half the bar</p>
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes and colors</h2>
		<p class="sec__p">
			Three track heights and the semantic tones, all driven by
			<code class="ic">--sve-*</code> tokens through <code class="ic">currentColor</code>.
		</p>
		<Preview code={sizesCode} align="start">
			<div class="stack">
				<Progress size="sm" value={30} color="primary" aria-label="Small example" />
				<Progress size="md" value={55} color="success" aria-label="Medium example" />
				<Progress size="lg" value={80} color="danger" aria-label="Large example" />
			</div>
		</Preview>
	</section>

	<section id="vs-meter" class="sec">
		<h2 class="sec__h">Progress vs Meter</h2>
		<p class="sec__p">
			They look almost identical and mean different things.
			<code class="ic">Progress</code> reports advancement toward completion — it is expected to
			reach the end and then stop existing. <a href="/components/meter">Meter</a> reports a static
			measurement inside a known range: disk usage, password strength, a score. A meter at 100% is
			not "finished", it is full.
		</p>
		<p class="sec__p">
			That distinction is not cosmetic — it is the difference between
			<code class="ic">role="progressbar"</code> and <code class="ic">role="meter"</code>, so
			assistive technology describes them differently.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading. The
			indeterminate animation is disabled under
			<code class="ic">prefers-reduced-motion</code>, which leaves a visible bar rather than a
			moving one.
		</p>
		<PropsTable component="Progress" />
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
	.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
</style>
