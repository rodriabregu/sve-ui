<script lang="ts">
	import { Carousel, Card, Text, Heading } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.carousel;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'multiple', label: 'More than one at a time' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'no-loop', label: 'Why it does not loop' },
		{ id: 'no-autoplay', label: 'Why it does not auto-rotate' },
		{ id: 'props', label: 'Props' }
	];

	const slides = ['Kilimanjaro', 'Aconcagua', 'Denali', 'Elbrus', 'Vinson'];
	// The indicators need only the position, and `{#each slides as _, i}` leaves
	// an unused binding behind.
	const indices = slides.map((_, i) => i);

	const usageCode = `<script>
  import { Carousel } from 'sve-ui';
<\u002fscript>

<Carousel.Root label="Mountains">
  <Carousel.Viewport>
    {#each slides as slide (slide)}
      <Carousel.Slide>{slide}</Carousel.Slide>
    {/each}
  </Carousel.Viewport>

  <Carousel.Previous />
  <Carousel.Next />

  <Carousel.Indicators>
    {#each indices as i (i)}
      <Carousel.Indicator index={i} />
    {/each}
  </Carousel.Indicators>
</Carousel.Root>`;

	const multipleCode = `<!-- Three at a time. The controls stay honest because they
     are disabled from the measured scroll extent, not the index. -->
<Carousel.Root label="Mountains" style="--sve-carousel-slide-size: 33.333%;">
  …
</Carousel.Root>`;

	const verticalCode = `<Carousel.Root orientation="vertical" label="Mountains">
  <Carousel.Viewport>…</Carousel.Viewport>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>`;

	const driveCode = `<script>
  import { Carousel } from 'sve-ui';

  // If you genuinely need rotation, you own the pause button.
  let api = $state();
<\u002fscript>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Built on CSS scroll-snap, not transforms. Touch swiping, trackpad flicks, momentum and the
			browser's own arrow-key scrolling all come from the platform — there is no gesture code here,
			and no new dependency.
		</p>
		<p class="sec__p">
			<code class="ic">label</code> is required: the root is a labelled region, so a screen reader user
			can find the whole carousel and skip past it in one move. Each slide is announced as "slide, 3 of
			5" unless you give it a better name.
		</p>
		<Preview code={usageCode}>
			<div style="max-width: 380px; width: 100%;">
				<Carousel.Root label="Mountains">
					<Carousel.Viewport>
						{#each slides as slide (slide)}
							<Carousel.Slide>
								<Card.Root>
									<Card.Content>
										<Heading level={3} size="sm">{slide}</Heading>
									</Card.Content>
								</Card.Root>
							</Carousel.Slide>
						{/each}
					</Carousel.Viewport>
					<div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
						<Carousel.Previous />
						<Carousel.Indicators>
							{#each indices as i (i)}
								<Carousel.Indicator index={i} />
							{/each}
						</Carousel.Indicators>
						<Carousel.Next />
					</div>
				</Carousel.Root>
			</div>
		</Preview>
	</section>

	<section id="multiple" class="sec">
		<h2 class="sec__h">More than one at a time</h2>
		<p class="sec__p">
			Set <code class="ic">--sve-carousel-slide-size</code> on the root. The controls are disabled from
			the measured scroll extent rather than from the slide index, which matters here: with three slides
			visible the last index is reachable while there is still track left to scroll, and a control disabled
			then would be lying.
		</p>
		<Preview code={multipleCode}>
			<div style="max-width: 380px; width: 100%;">
				<Carousel.Root label="Mountains, three at a time" style="--sve-carousel-slide-size: 40%;">
					<Carousel.Viewport>
						{#each slides as slide (slide)}
							<Carousel.Slide>
								<Card.Root>
									<Card.Content><Text size="sm">{slide}</Text></Card.Content>
								</Card.Root>
							</Carousel.Slide>
						{/each}
					</Carousel.Viewport>
					<div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
						<Carousel.Previous />
						<Carousel.Next />
					</div>
				</Carousel.Root>
			</div>
		</Preview>
	</section>

	<section id="vertical" class="sec">
		<h2 class="sec__h">Vertical</h2>
		<p class="sec__p">
			The arrow glyphs and the snap axis follow <code class="ic">orientation</code>.
		</p>
		<Preview code={verticalCode}>
			<div style="max-width: 260px; width: 100%;">
				<Carousel.Root orientation="vertical" label="Mountains, vertical">
					<Carousel.Viewport style="max-height: 8rem;">
						{#each slides as slide (slide)}
							<Carousel.Slide style="height: 8rem;">
								<Card.Root>
									<Card.Content><Text size="sm">{slide}</Text></Card.Content>
								</Card.Root>
							</Carousel.Slide>
						{/each}
					</Carousel.Viewport>
					<div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
						<Carousel.Previous />
						<Carousel.Next />
					</div>
				</Carousel.Root>
			</div>
		</Preview>
	</section>

	<section id="no-loop" class="sec">
		<h2 class="sec__h">Why it does not loop</h2>
		<p class="sec__p">
			An infinite track makes "slide 3 of 5" meaningless — there is no third of five on a ring — and
			it removes the only honest position affordance a carousel has: a
			<code class="ic">Previous</code> or <code class="ic">Next</code> that goes flat at the boundary.
			A sighted user loses a scrollbar; everyone else loses the ability to know they have reached the
			end.
		</p>
		<p class="sec__p">
			Position is also <em>read</em> from the scroll container on every scroll rather than remembered,
			because a swipe, a flick and the arrow keys are all drivers this component cannot intercept. A stored
			index would disagree with the screen after any of them, and the slide label would start lying.
		</p>
	</section>

	<section id="no-autoplay" class="sec">
		<h2 class="sec__h">Why it does not auto-rotate</h2>
		<p class="sec__p">
			Auto-rotation is only acceptable with all of: a visible pause control, stopping on hover,
			stopping on focus, and honouring <code class="ic">prefers-reduced-motion</code>. That chain is
			exactly what gets half-built, and content that moves on its own is one of the most documented
			accessibility failures on the web — it steals attention from the rest of the page and it moves
			the target out from under anyone who reads or clicks slowly.
		</p>
		<p class="sec__p">
			So it is not built in. <code class="ic">useCarousel()</code> exposes
			<code class="ic">next()</code>, <code class="ic">prev()</code> and
			<code class="ic">goTo()</code>, so a consumer who genuinely needs rotation can drive it — and
			owns the pause button that has to come with it.
		</p>
		<Preview code={driveCode}>
			<Text size="sm">The controls above are the whole API. Rotation is yours to justify.</Text>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Each part also takes its native element's attributes via prop spreading.</p>
		<PropsTable component="CarouselRoot" />
		<PropsTable component="CarouselSlide" />
		<PropsTable component="CarouselPrevious" />
		<PropsTable component="CarouselIndicator" />
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
