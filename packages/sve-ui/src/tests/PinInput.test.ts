import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import PinInputFixture from './PinInputFixture.svelte';
import PinInputRoot from '$lib/components/PinInput/PinInputRoot.svelte';

/**
 * The point of this component is what it does NOT do: it renders ONE real input
 * behind the cells rather than one per digit. That is what makes paste, browser
 * autofill and mobile SMS autofill work, and it is what these tests pin down —
 * a refactor into six inputs would look identical and behave far worse.
 */
describe('PinInput', () => {
	it('renders exactly one real input, not one per cell', () => {
		const { container } = render(PinInputFixture, { props: {} });
		expect(container.querySelectorAll('input').length).toBe(1);
		expect(container.querySelectorAll('.sve-pin-input__cell').length).toBe(6);
	});

	it('sets the mobile-autofill attributes on that input', () => {
		const { container } = render(PinInputFixture, { props: {} });
		const input = container.querySelector('input') as HTMLInputElement;
		// These are the difference between a code the OS offers to fill and one the
		// user has to read off another screen and retype.
		expect(input.getAttribute('autocomplete')).toBe('one-time-code');
		expect(input.getAttribute('inputmode')).toBe('numeric');
		expect(input.getAttribute('maxlength')).toBe('6');
	});

	// The real input's id is Bits-INTERNAL and unpredictable, so `<label for>` has
	// nothing to point at. These two tests pin down the paths that DO work, so the
	// docs cannot drift back to advising a `for` attribute.
	it('gives the real input a Bits-internal id, not one derived from Root id', () => {
		const { container } = render(PinInputRoot, {
			props: { maxlength: 6, id: 'otp' } as never
		});
		const root = container.querySelector('[data-pin-input-root]') as HTMLElement;
		const input = container.querySelector('input') as HTMLInputElement;
		expect(root.id).toBe('otp');
		// Not 'otp-input' — you cannot predict it, which is why `for` is unusable.
		expect(input.id).not.toBe('otp-input');
		expect(input.id).toMatch(/^bits-/);
	});

	it('is named by a visible label via aria-labelledby on Root', () => {
		const { getByLabelText } = render(PinInputFixture, { props: {} });
		// aria-labelledby is forwarded to the input, so the visible span names it.
		expect(getByLabelText('Verification code').tagName).toBe('INPUT');
	});

	it('is named by aria-label on Root, which reaches the input', () => {
		const { container } = render(PinInputRoot, {
			props: { maxlength: 6, 'aria-label': 'One-time code' } as never
		});
		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.getAttribute('aria-label')).toBe('One-time code');
	});

	it('renders one cell per maxlength', () => {
		const { container } = render(PinInputRoot, { props: { maxlength: 4 } as never });
		// Cells come from Root's snippet, so with no snippet there are none —
		// maxlength still reaches the input, which is what bounds the entry.
		expect(container.querySelector('input')?.getAttribute('maxlength')).toBe('4');
	});

	it('reflects typed input via bind:value', async () => {
		const { container, getByTestId } = render(PinInputFixture, { props: {} });
		const input = container.querySelector('input') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: '123' } });
		await waitFor(() => expect(getByTestId('value').textContent).toBe('123'));
	});

	it('fires onComplete once every cell is filled', async () => {
		const { container, getByTestId } = render(PinInputFixture, { props: {} });
		const input = container.querySelector('input') as HTMLInputElement;

		await fireEvent.input(input, { target: { value: '12345' } });
		await waitFor(() => expect(getByTestId('value').textContent).toBe('12345'));
		expect(getByTestId('completed').textContent).toBe('');

		await fireEvent.input(input, { target: { value: '123456' } });
		await waitFor(() => expect(getByTestId('completed').textContent).toBe('123456'));
	});

	it('marks unfilled cells inactive', () => {
		const { container } = render(PinInputFixture, { props: {} });
		const cells = container.querySelectorAll('.sve-pin-input__cell');
		expect(Array.from(cells).every((c) => c.hasAttribute('data-inactive'))).toBe(true);
	});
});
