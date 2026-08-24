import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe/matchers';
import A11yFixture from './A11yFixture.svelte';

// vitest-axe 0.1.0 ships its types as `declare global namespace Vi`, which
// Vitest 4 no longer merges into the `vitest` module's Assertion. Augment the
// `vitest` module directly so `toHaveNoViolations` is typed, and register the
// matcher at runtime.
declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
	interface Assertion<T = any> extends AxeMatchers {}
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(axeMatchers);

/**
 * Automated a11y coverage with axe-core over every component, used in its
 * intended accessible configuration (see A11yFixture.svelte).
 *
 * jsdom limitations:
 * - color-contrast cannot run in jsdom (no layout/computed styles); axe skips
 *   it automatically. Contrast is verified separately in design review and is
 *   an e2e/browser-mode concern.
 * - Page-structure rules (region/landmark/page-has-heading-one) are disabled:
 *   they assert document-level structure that isolated components do not own.
 */
const AXE_OPTIONS = {
	rules: {
		// jsdom has no layout/computed styles and no canvas → color-contrast both
		// cannot run and throws on getContext. Disable it (covered in design review).
		'color-contrast': { enabled: false },
		region: { enabled: false },
		'landmark-one-main': { enabled: false },
		'page-has-heading-one': { enabled: false }
	}
} as const;

describe('accessibility (axe)', () => {
	/*
		An explicit timeout, not the 5s default. This one test mounts EVERY component
		in the library at once and runs a full axe sweep over the result, so its cost
		grows with the catalog — around 60 components now. On a loaded machine (a
		parallel `turbo run lint check test build`) it crossed 5s and failed as a
		timeout, which reads like a flaky assertion but is nothing of the kind: the
		work simply does not fit the default budget.

		The alternatives were worse. Retrying would hide it, and splitting the
		fixture would trade whole-page coverage — where landmark and live-region
		conflicts BETWEEN components actually surface — for a faster number.
	*/
	it('every component passes axe when used as intended', async () => {
		const { container } = render(A11yFixture);
		const results = await axe(container, AXE_OPTIONS);
		expect(results).toHaveNoViolations();
	}, 60_000);
});
