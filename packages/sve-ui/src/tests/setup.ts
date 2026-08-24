import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';

/**
 * jsdom has no ResizeObserver, which Bits UI (Slider, floating content, …) uses.
 * Provide a no-op stub so those components mount in tests.
 */
class ResizeObserverStub {
	observe() {}
	unobserve() {}
	disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

/**
 * jsdom does not implement `Element.prototype.scrollIntoView`. Bits UI's Command
 * calls it to keep the highlighted item in view, which surfaced as 15 unhandled
 * rejections — "TypeError: closestGroupHeader?.scrollIntoView is not a function".
 *
 * They did not fail any test, but vitest warns that unhandled errors can cause
 * false positives, and that noise would hide a real one later. Stub it as a
 * no-op: scroll position is not something jsdom can meaningfully assert anyway.
 */
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
	Element.prototype.scrollIntoView = function scrollIntoViewStub() {};
}

/**
 * jsdom does not implement the Web Animations API, and Svelte 5 runs every
 * `transition:` directive through `Element.prototype.animate`. Without this,
 * mounting anything with a transition throws "element.animate is not a
 * function" — which surfaced from Toast's enter/exit.
 *
 * The stub reports an animation that has already finished. That is the right
 * shape for tests: jsdom cannot lay out or paint, so there is no intermediate
 * frame to assert, and pretending the animation is still running would only
 * make every transition-bearing component hang.
 */
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
	Element.prototype.animate = function animateStub() {
		const animation = {
			currentTime: 0,
			startTime: 0,
			playState: 'finished',
			finished: Promise.resolve(),
			effect: null,
			onfinish: null as (() => void) | null,
			oncancel: null as (() => void) | null,
			play() {},
			pause() {},
			cancel() {},
			finish() {},
			commitStyles() {},
			addEventListener() {},
			removeEventListener() {}
		};
		// Svelte subscribes to `onfinish` after `animate()` returns, so the callback
		// has to be given a turn to be attached before it fires.
		queueMicrotask(() => animation.onfinish?.());
		return animation as unknown as Animation;
	};
}

/**
 * Bits UI's body-scroll-lock schedules `resetBodyStyle` on a ~24ms setTimeout
 * whenever an overlay (Dialog/Popover/etc.) closes or unmounts. If a test file
 * ends with an overlay still open, that timer fires AFTER vitest tears down the
 * jsdom environment, throwing "ReferenceError: document is not defined" and
 * failing the run even though every test passed.
 *
 * Unmount eagerly, then wait past the timer so it runs while `document` still
 * exists. (cleanup() is idempotent with @testing-library's auto-cleanup.)
 */
afterEach(async () => {
	cleanup();
	// Fake timers leak to the next test in a file unless restored, and the wait
	// below is a real `setTimeout` — on fake timers it never fires, so this hook
	// hangs until the hook timeout and the run fails somewhere unrelated to the
	// test that installed them. Restoring here makes that impossible instead of
	// depending on every future test file nesting its own `afterEach` correctly.
	// Safe when fake timers were never installed.
	vi.useRealTimers();
	await new Promise((resolve) => setTimeout(resolve, 50));
});
