import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { axe } from 'vitest-axe';
import RequiredFixture from './RequiredFixture.svelte';

/**
 * `Field` takes `required` and puts it in the props you spread. Where that lands
 * on a real `<input>` the browser handles it, and Bits translates it to
 * `aria-required` on checkbox, switch, radiogroup and rating group.
 *
 * On the rest it was landing as dead markup:
 *
 *   - `Select.Trigger`, `Toggle`, `DatePicker.Trigger` render a `<button>`,
 *     where a native `required` attribute does nothing at all.
 *   - `Slider` renders a container; the `role="slider"` element is the thumb, so
 *     the attribute was on the wrong element entirely.
 *
 * The fix differs per control on purpose, and the split is measured, not assumed
 * — see the axe test at the bottom.
 */
describe('required across the form controls', () => {
	it('marks the slider thumb, not its container', () => {
		const { container } = render(RequiredFixture, { required: true });
		const thumb = container.querySelector('.sve-slider__thumb')!;
		// The thumb carries role="slider", and axe accepts aria-required there.
		expect(thumb.getAttribute('aria-required')).toBe('true');
		expect(container.querySelector('.sve-slider')!.hasAttribute('aria-required')).toBe(false);
	});

	it('leaves the slider thumb alone when not required', () => {
		const { container } = render(RequiredFixture, { required: false });
		expect(container.querySelector('.sve-slider__thumb')!.hasAttribute('aria-required')).toBe(
			false
		);
	});

	for (const [label, selector] of [
		['Select.Trigger', '.sve-select__trigger'],
		['Toggle', '.sve-toggle']
	] as const) {
		it(`emits no dead required attribute on ${label}`, () => {
			const { container } = render(RequiredFixture, { required: true });
			const el = container.querySelector(selector)!;
			// Neither form: native `required` is inert on a button, and
			// `aria-required` is an axe violation there.
			expect(el.hasAttribute('required')).toBe(false);
			expect(el.hasAttribute('aria-required')).toBe(false);
		});
	}

	it('still lets the native controls use the real attribute', () => {
		const { container } = render(RequiredFixture, { required: true });
		// Nothing clever needed here — the browser already does the right thing.
		expect(container.querySelector('input.sve-input')!.hasAttribute('required')).toBe(true);
	});

	it('keeps Bits translating it on a checkbox', () => {
		const { container } = render(RequiredFixture, { required: true });
		expect(container.querySelector('.sve-checkbox')!.getAttribute('aria-required')).toBe('true');
	});

	/*
		The decision above rests on axe's rules differing per attribute, which is
		the sort of claim I have twice written down while being wrong. So it is
		asserted here rather than trusted: if axe ever starts allowing
		`aria-required` on a button, this fails and the swallowing can be revisited.
	*/
	it('axe rejects aria-required on a button but accepts aria-invalid', async () => {
		const host = document.createElement('div');
		host.innerHTML = '<button aria-required="true">x</button>';
		document.body.appendChild(host);
		const required = await axe(host, { runOnly: ['aria-allowed-attr'] });
		expect(required.violations.length).toBeGreaterThan(0);
		host.remove();

		const host2 = document.createElement('div');
		host2.innerHTML = '<button aria-invalid="true">x</button>';
		document.body.appendChild(host2);
		const invalid = await axe(host2, { runOnly: ['aria-allowed-attr'] });
		// Not symmetric, which is exactly why each was probed separately.
		expect(invalid.violations.length).toBe(0);
		host2.remove();
	});
});
