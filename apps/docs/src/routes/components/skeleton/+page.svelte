<script lang="ts">
	import { Skeleton, Card, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.skeleton;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'sizing', label: 'Sizing' },
		{ id: 'composition', label: 'Composition' },
		{ id: 'a11y', label: 'Accessibility' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{
			prop: 'variant',
			type: `'text' | 'circle' | 'rect'`,
			default: `'text'`,
			description: 'Shape preset: one line of text, an avatar circle, or a content block.'
		},
		{
			prop: 'width',
			type: 'string',
			description: 'Any CSS length. Defaults to 100% (2.5rem for circle).'
		},
		{
			prop: 'height',
			type: 'string',
			description: "Any CSS length. Defaults to the variant's intrinsic height."
		},
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root element.' }
	];

	const usageCode = `<script>
  import { Skeleton } from 'sve-ui';
<\u002fscript>

<Skeleton width="14rem" />`;

	const variantsCode = `<Skeleton variant="text" width="14rem" />
<Skeleton variant="circle" />
<Skeleton variant="rect" width="14rem" />`;

	const sizingCode = `<Skeleton variant="circle" width="3rem" height="3rem" />
<Skeleton variant="rect" width="100%" height="10rem" />
<Skeleton variant="text" width="60%" />`;

	const compositionCode = `<div role="status" aria-busy="true" aria-label="Loading profile">
  <Skeleton variant="circle" width="3rem" height="3rem" />
  <Skeleton variant="text" width="12rem" />
  <Skeleton variant="text" width="8rem" />
  <Skeleton variant="rect" height="6rem" />
</div>`;

	const a11yCode = `<!-- The skeleton is aria-hidden. Announce the state on the region. -->
<section role="status" aria-busy={loading} aria-label="Loading results">
  {#if loading}
    <Skeleton variant="text" />
  {:else}
    <ResultsList {results} />
  {/if}
</section>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Skeleton</code> is a shimmering placeholder you render in place of content
			that has not arrived yet. It is one element with no sub-parts — you compose several to sketch
			the shape of the real layout.
		</p>
		<Preview code={usageCode} align="start">
			<Skeleton width="14rem" />
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			Three shape presets. <code class="ic">text</code> is <code class="ic">1em</code> tall so it
			inherits the surrounding font size; <code class="ic">circle</code> is a fixed avatar square
			with a full radius; <code class="ic">rect</code> is a content block.
		</p>
		<Preview code={variantsCode} align="start">
			<div class="stack">
				<Skeleton variant="text" width="14rem" />
				<Skeleton variant="circle" />
				<Skeleton variant="rect" width="14rem" />
			</div>
		</Preview>
	</section>

	<section id="sizing" class="sec">
		<h2 class="sec__h">Sizing</h2>
		<p class="sec__p">
			<code class="ic">width</code> and <code class="ic">height</code> take any CSS length and win
			over the variant defaults. Use percentages for ragged text lines — that is what makes a
			skeleton read as text rather than as a bar chart.
		</p>
		<Preview code={sizingCode} align="start">
			<div class="stack">
				<Skeleton variant="circle" width="3rem" height="3rem" />
				<Skeleton variant="rect" width="100%" height="10rem" />
				<Skeleton variant="text" width="60%" />
			</div>
		</Preview>
	</section>

	<section id="composition" class="sec">
		<h2 class="sec__h">Composition</h2>
		<p class="sec__p">
			Mirror the real layout. A skeleton that does not match the shape of what loads causes a
			visible jump when the content lands — which is worse than showing nothing.
		</p>
		<Preview code={compositionCode} align="start">
			<Card.Root>
				<Card.Content>
					<div role="status" aria-busy="true" aria-label="Loading profile" class="profile">
						<div class="profile__head">
							<Skeleton variant="circle" width="3rem" height="3rem" />
							<div class="profile__lines">
								<Skeleton variant="text" width="12rem" />
								<Skeleton variant="text" width="8rem" />
							</div>
						</div>
						<Skeleton variant="rect" height="6rem" />
					</div>
				</Card.Content>
			</Card.Root>
		</Preview>
	</section>

	<section id="a11y" class="sec">
		<h2 class="sec__h">Accessibility</h2>
		<p class="sec__p">
			The skeleton element is always <code class="ic">aria-hidden</code> — a screen reader reading
			out a grid of empty boxes helps nobody. Put the announcement on the region that owns the
			loading state with <code class="ic">role="status"</code> and
			<code class="ic">aria-busy</code>, and swap in the real content when it arrives.
		</p>
		<Preview code={a11yCode} align="start">
			<Text>The region announces the state; the placeholder stays silent.</Text>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading. The
			shimmer animation is disabled automatically under
			<code class="ic">prefers-reduced-motion</code>; the placeholder itself remains.
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
	.stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
		width: 100%;
		max-width: 420px;
	}
	.profile {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		min-width: 260px;
	}
	.profile__head {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.profile__lines {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
</style>
