import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { axe } from 'vitest-axe';
import SegmentedRequiredFixture from './SegmentedRequiredFixture.svelte';

/**
 * A segmented date field has no single element to mark required. The Root is a
 * wrapper; what a screen reader lands on are the segments, each of which Bits
 * gives `role="spinbutton"` — and axe accepts `aria-required` on that role.
 *
 * Bits emits nothing for `required` here, so before this a `<Field required>`
 * around a date field announced nothing at all. Found by the ARIA-state audit.
 */
describe('required on a segmented field', () => {
	it('marks every editable segment', () => {
		const { container } = render(SegmentedRequiredFixture, { required: true });
		const editable = [...container.querySelectorAll('[role="spinbutton"]')];
		expect(editable.length).toBeGreaterThan(1);
		for (const seg of editable) {
			expect(seg.getAttribute('aria-required')).toBe('true');
		}
	});

	it('leaves the literal separators alone', () => {
		const { container } = render(SegmentedRequiredFixture, { required: true });
		const literals = [...container.querySelectorAll('[data-segment="literal"]')];
		expect(literals.length).toBeGreaterThan(0);
		for (const lit of literals) {
			// Not focusable and carrying no role, so marking them would be noise on
			// elements a user never reaches.
			expect(lit.hasAttribute('aria-required')).toBe(false);
		}
	});

	it('marks nothing when not required', () => {
		const { container } = render(SegmentedRequiredFixture, { required: false });
		expect(container.querySelectorAll('[aria-required="true"]')).toHaveLength(0);
	});

	it('passes axe with the segments marked', async () => {
		const { container } = render(SegmentedRequiredFixture, { required: true });
		// The reason this is allowed at all: spinbutton supports aria-required,
		// unlike the button roles elsewhere in this library.
		const results = await axe(container, { runOnly: ['aria-allowed-attr'] });
		expect(results.violations).toHaveLength(0);
	});
});
