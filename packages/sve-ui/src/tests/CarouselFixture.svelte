<script lang="ts">
	import * as Carousel from '$lib/components/Carousel/index.js';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		label?: string;
		labelledby?: string;
		count?: number;
		/** Names the first slide, to exercise the label override. */
		firstLabel?: string;
	}

	let { orientation, label = 'Mountains', labelledby, count = 3, firstLabel }: Props = $props();

	const slides = $derived(Array.from({ length: count }, (_, i) => `slide-${i}`));
	const indices = $derived(slides.map((_, i) => i));
</script>

{#if labelledby}
	<h2 id={labelledby}>Peaks</h2>
{/if}
<Carousel.Root {orientation} label={labelledby ? undefined : label} {labelledby}>
	<Carousel.Viewport>
		{#each slides as s, i (s)}
			<Carousel.Slide label={i === 0 ? firstLabel : undefined}>{s}</Carousel.Slide>
		{/each}
	</Carousel.Viewport>
	<Carousel.Previous />
	<Carousel.Next />
	<Carousel.Indicators>
		{#each indices as i (i)}
			<Carousel.Indicator index={i} />
		{/each}
	</Carousel.Indicators>
</Carousel.Root>
