import { afterEach } from 'vitest';
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
  await new Promise((resolve) => setTimeout(resolve, 50));
});
