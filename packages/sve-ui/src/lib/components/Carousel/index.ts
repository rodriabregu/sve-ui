/**
 * Carousel namespace — a scrolling track of slides with controls.
 *
 * Custom, not a Bits UI wrapper: Bits ships no carousel. Built on CSS
 * scroll-snap rather than transforms, which is what buys touch swiping, trackpad
 * flicks, momentum and the browser's own arrow-key scrolling for free — and
 * keeps the runtime dependency count at one.
 *
 * Compose:
 *   Root > Viewport > Slide+
 *        > Previous
 *        > Next
 *        > Indicators > Indicator+
 *
 * Position is READ from the scroll container on every scroll, never remembered.
 * A swipe, a flick and the arrow keys are all drivers the component cannot
 * intercept, and a stored index would disagree with the screen after any of
 * them — which would make the "3 of 7" slide label a lie.
 *
 * What it does NOT do, and these are decisions rather than gaps:
 *
 *   - **It does not loop.** An infinite track makes "slide 3 of 7" meaningless
 *     and removes the only honest position affordance there is: a Previous or
 *     Next that goes flat at the boundary. If wrapping is genuinely wanted,
 *     `goTo` is exported and the consumer owns the lie.
 *   - **It does not auto-rotate.** Auto-rotation is only acceptable with a
 *     visible pause control, and stopping on hover, and stopping on focus, and
 *     honouring `prefers-reduced-motion`. That chain is exactly what gets
 *     half-built, and content that moves on its own is one of the most
 *     documented accessibility failures on the web. `next()` is available for
 *     anyone who wants to drive it — along with the obligation to ship the pause
 *     button.
 *   - **It does not make the viewport a tab stop.** A scrollable box is already
 *     arrow-scrollable, and an unnamed tab stop in front of the slides' own
 *     links buys nothing.
 *
 * Sizing: set `--sve-carousel-slide-size` on the Root to show more than one
 * slide at a time (`33.333%` for three). Previous and Next are disabled from the
 * measured scroll extent, not from the index, so they stay honest when several
 * slides are visible at once.
 */

export { default as Root } from './CarouselRoot.svelte';
export { default as Viewport } from './CarouselViewport.svelte';
export { default as Slide } from './CarouselSlide.svelte';
export { default as Previous } from './CarouselPrevious.svelte';
export { default as Next } from './CarouselNext.svelte';
export { default as Indicators } from './CarouselIndicators.svelte';
export { default as Indicator } from './CarouselIndicator.svelte';
export { useCarousel, type CarouselContext, type Orientation } from './context.js';
