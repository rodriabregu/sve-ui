<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setCarouselContext, type Orientation } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label'> {
		orientation?: Orientation;
		/**
		 * The carousel's accessible name, e.g. "Product photos".
		 *
		 * Required, and it is not decoration. The root is a labelled region so a
		 * screen reader user can find and skip the whole thing in one move; an
		 * unnamed region is an obstacle they have to read through to identify.
		 */
		label?: string;
		/** Id of an existing visible heading, as an alternative to `label`. */
		labelledby?: string;
		/** Extra classes merged onto the root element. */
		class?: string;
		children: Snippet;
	}

	let {
		orientation = 'horizontal',
		label,
		labelledby,
		class: cls,
		children,
		...rest
	}: Props = $props();

	let viewport = $state<HTMLElement | undefined>(undefined);
	let active = $state(0);
	let count = $state(0);
	let scrollStart = $state(0);
	let scrollMax = $state(0);

	const horizontal = $derived(orientation === 'horizontal');

	function slides(): HTMLElement[] {
		if (!viewport) return [];
		return [...viewport.querySelectorAll<HTMLElement>('[data-sve-carousel-slide]')];
	}

	/*
		Position is READ from the scroll container rather than tracked in state.

		A carousel built on scroll-snap has three drivers a component cannot
		intercept: a touch swipe, a trackpad flick, and the arrow keys the browser
		already handles on a scrollable box. A remembered index would silently
		disagree with what is on screen after any of them, and the "3 of 7" label
		would start lying.
	*/
	function measure() {
		if (!viewport) return;

		const items = slides();
		count = items.length;

		const pos = horizontal ? viewport.scrollLeft : viewport.scrollTop;
		scrollStart = pos;
		scrollMax = horizontal
			? viewport.scrollWidth - viewport.clientWidth
			: viewport.scrollHeight - viewport.clientHeight;

		let nearest = 0;
		let best = Infinity;
		for (let i = 0; i < items.length; i++) {
			const offset = horizontal
				? items[i].offsetLeft - viewport.offsetLeft
				: items[i].offsetTop - viewport.offsetTop;
			const distance = Math.abs(offset - pos);
			if (distance < best) {
				best = distance;
				nearest = i;
			}
		}
		active = nearest;
	}

	$effect(() => {
		if (!viewport) return;
		const el = viewport;

		measure();
		el.addEventListener('scroll', measure, { passive: true });

		// Slides appearing, leaving, or changing size all move the snap points.
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		for (const s of slides()) ro.observe(s);

		const mo = new MutationObserver(() => {
			measure();
			for (const s of slides()) ro.observe(s);
		});
		mo.observe(el, { childList: true, subtree: true });

		return () => {
			el.removeEventListener('scroll', measure);
			ro.disconnect();
			mo.disconnect();
		};
	});

	function goTo(index: number) {
		const items = slides();
		if (!viewport || index < 0 || index >= items.length) return;

		const target = horizontal
			? items[index].offsetLeft - viewport.offsetLeft
			: items[index].offsetTop - viewport.offsetTop;

		// Someone who asked the system to reduce motion did not ask for a slide to
		// glide past; jumping there is the same information without the movement.
		const reduced =
			typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

		viewport.scrollTo({
			[horizontal ? 'left' : 'top']: target,
			behavior: reduced ? 'auto' : 'smooth'
		});
	}

	setCarouselContext({
		get orientation() {
			return orientation;
		},
		get active() {
			return active;
		},
		get count() {
			return count;
		},
		// Compared against the measured extent, not the index: with more than one
		// slide visible at a time the last index is reachable while scrolling is not
		// finished, and a control disabled then is a control that lies.
		get canScrollPrev() {
			return scrollStart > 1;
		},
		get canScrollNext() {
			return scrollStart < scrollMax - 1;
		},
		setViewport(el) {
			viewport = el;
		},
		goTo,
		prev() {
			goTo(active - 1);
		},
		next() {
			goTo(active + 1);
		}
	});

	const className = $derived(
		['sve-carousel', `sve-carousel--${orientation}`, cls].filter(Boolean).join(' ')
	);
</script>

<div
	class={className}
	role="region"
	aria-roledescription="carousel"
	aria-label={labelledby ? undefined : label}
	aria-labelledby={labelledby}
	{...rest}
>
	{@render children()}
</div>

<style>
	.sve-carousel {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-3);
	}

	.sve-carousel--horizontal,
	.sve-carousel--vertical {
		/* Orientation is carried on the viewport and the slides; the root only
		   needs the hook so a consumer can target either arrangement. */
		width: 100%;
	}
</style>
