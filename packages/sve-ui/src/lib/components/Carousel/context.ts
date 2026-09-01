import { setContext, getContext } from 'svelte';

const CAROUSEL_CONTEXT_KEY = Symbol('sve-ui:carousel');

export type Orientation = 'horizontal' | 'vertical';

export interface CarouselContext {
	/** Reading direction of the track. */
	readonly orientation: Orientation;
	/** Index of the slide currently snapped into view. */
	readonly active: number;
	/** How many slides the viewport contains. */
	readonly count: number;
	/** Whether there is anything before / after the current position. */
	readonly canScrollPrev: boolean;
	readonly canScrollNext: boolean;
	/** Registers the scroll container so the controls can drive it. */
	setViewport(el: HTMLElement | undefined): void;
	/** Scrolls a slide into view by index. Clamped; out-of-range is a no-op. */
	goTo(index: number): void;
	prev(): void;
	next(): void;
}

/**
 * Shares the carousel's position with its parts.
 *
 * Getters, not a snapshot: `Previous`, `Next` and `Indicator` all read `active`
 * during render, and a plain value would freeze at mount.
 */
export function setCarouselContext(ctx: CarouselContext): void {
	setContext(CAROUSEL_CONTEXT_KEY, ctx);
}

/**
 * Reads the carousel context.
 *
 * Returns undefined outside a `Carousel.Root`. The parts degrade to an inert
 * appearance rather than throwing, so one rendered in isolation still renders.
 */
export function useCarousel(): CarouselContext | undefined {
	return getContext<CarouselContext>(CAROUSEL_CONTEXT_KEY);
}
