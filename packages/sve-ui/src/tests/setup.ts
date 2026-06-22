import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';

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
