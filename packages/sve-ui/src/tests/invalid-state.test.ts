import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import InvalidFixture from './InvalidFixture.svelte';

/**
 * `Field` sets `aria-invalid` on whatever control it is given, and until this
 * change only `Input` and `Textarea` could SHOW it. Ten controls announced
 * themselves as invalid while looking exactly like a correct one, so a sighted
 * user read an error message with no indication of which control it was about.
 *
 * Two rules are asserted here, and they differ per control on purpose:
 *
 *   1. The invalid class is always applied. It is what a sighted user sees.
 *   2. `aria-invalid` is applied ONLY where the rendered role supports it.
 *      Roles were read off the built pages, not assumed: `Select.Trigger` and
 *      `Toggle` render a plain `<button>`, and ARIA does not support the
 *      attribute there, so AT may ignore it.
 *
 * On that second point: axe does NOT flag `aria-invalid` on a button. I checked
 * by injecting it and watching the suite still pass, so an earlier claim that it
 * would be caught was simply wrong. Nothing but this test enforces the omission,
 * which is exactly why it is asserted here.
 */

/** base class -> whether the rendered role supports aria-invalid */
const CONTROLS: Array<[string, boolean, string]> = [
	['sve-checkbox', true, 'role=checkbox'],
	['sve-switch', true, 'role=switch'],
	['sve-radio-group', true, 'role=radiogroup'],
	['sve-combobox__input', true, 'role=combobox'],
	['sve-rating-group', true, 'role=slider'],
	['sve-select__trigger', false, 'plain <button>'],
	['sve-toggle', false, 'plain <button>'],
	['sve-slider', false, 'container; the thumb is the slider'],
	['sve-pin-input', false, 'container; Bits owns the inputs']
];

describe('invalid state across the form controls', () => {
	it('applies no invalid class when valid', () => {
		const { container } = render(InvalidFixture, { invalid: false });
		for (const [base] of CONTROLS) {
			expect(container.querySelector(`.${base}--invalid`), base).toBeNull();
		}
	});

	for (const [base, ariaSupported, role] of CONTROLS) {
		it(`marks ${base} visually invalid`, () => {
			const { container } = render(InvalidFixture, { invalid: true });
			// Without this the control looks correct while announcing itself broken.
			expect(container.querySelector(`.${base}--invalid`)).not.toBeNull();
		});

		it(`${ariaSupported ? 'sets' : 'omits'} aria-invalid on ${base} (${role})`, () => {
			const { container } = render(InvalidFixture, { invalid: true });
			const el = container.querySelector(`.${base}--invalid`)!;
			if (ariaSupported) {
				expect(el.getAttribute('aria-invalid')).toBe('true');
			} else {
				// Not an oversight: ARIA does not list this state for the role, so AT
				// may ignore it, and no tool will catch a regression here.
				expect(el.hasAttribute('aria-invalid')).toBe(false);
			}
		});
	}

	it('never sets aria-invalid when valid', () => {
		const { container } = render(InvalidFixture, { invalid: false });
		expect(container.querySelectorAll('[aria-invalid="true"]')).toHaveLength(0);
	});
});
