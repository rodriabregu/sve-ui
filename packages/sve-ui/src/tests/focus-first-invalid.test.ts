import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { focusFirstInvalidField } from '$lib/components/Field/focus.js';
import FocusInvalidFixture from './FocusInvalidFixture.svelte';

/**
 * `Field`'s documentation says: on a failed submit, move focus to the first
 * invalid control. That is the correct WCAG technique, and the library shipped
 * nothing to help do it — the second time a recommendation was written down and
 * the work left to the consumer (the first was `Button` not being able to be a
 * link). This is the missing half.
 */
describe('focusFirstInvalidField', () => {
	afterEach(() => vi.restoreAllMocks());

	it('focuses nothing and reports false when the form is valid', async () => {
		const { getByTestId } = render(FocusInvalidFixture);
		// A caller needs to know, so it can fall back when a submit failed for a
		// reason no single field owns.
		expect(await focusFirstInvalidField({ root: getByTestId('form') })).toBe(false);
	});

	it('focuses the first invalid field in DOCUMENT order, not prop order', async () => {
		const { getByTestId, getByLabelText } = render(FocusInvalidFixture, {
			emailError: 'Enter a valid email address.',
			nameError: 'Required.'
		});

		expect(await focusFirstInvalidField({ root: getByTestId('form') })).toBe(true);
		// Name comes first in the markup, so it wins even though the email error
		// was passed first.
		expect(document.activeElement).toBe(getByLabelText('Name'));
	});

	it('skips valid fields to reach a later broken one', async () => {
		const { getByTestId, getByLabelText } = render(FocusInvalidFixture, {
			emailError: 'Enter a valid email address.'
		});

		await focusFirstInvalidField({ root: getByTestId('form') });
		expect(document.activeElement).toBe(getByLabelText('Email'));
	});

	it('finds a Select, whose own invalid prop omits aria-invalid', async () => {
		const { getByTestId } = render(FocusInvalidFixture, { fruitError: 'Pick one.' });

		// A Select whose trigger is a plain <button>: its own `invalid` prop omits
		// `aria-invalid`, and it still gets focused, because the marker is on the
		// Field wrapper rather than on the control's ARIA state.
		//
		// An `[aria-invalid="true"]` query would ALSO have found it here — I
		// probed it rather than assuming, and it matched the BUTTON, because Field
		// puts the attribute into the props you spread. The marker wins for
		// different reasons: it focuses the labelled control rather than whatever
		// inner element matched, and it only matches fields this library wired.
		expect(await focusFirstInvalidField({ root: getByTestId('form') })).toBe(true);
		expect((document.activeElement as HTMLElement).tagName).toBe('BUTTON');
	});

	it('focuses the labelled control, not merely something aria-invalid', async () => {
		const { getByTestId } = render(FocusInvalidFixture, { fruitError: 'Pick one.' });
		const form = getByTestId('form');

		await focusFirstInvalidField({ root: form });
		const focused = document.activeElement as HTMLElement;

		// The focused element is the one the label points at, which is what makes
		// the announcement complete.
		const label = form.querySelector(`label[for="${focused.id}"]`);
		expect(label).not.toBeNull();
		expect(label!.textContent).toContain('Fruit');
	});

	it('reads the error and the label through the focused control', async () => {
		const { getByTestId, getByLabelText, container } = render(FocusInvalidFixture, {
			nameError: 'Required.'
		});

		await focusFirstInvalidField({ root: getByTestId('form') });
		const focused = document.activeElement as HTMLElement;
		expect(focused).toBe(getByLabelText('Name'));

		// This is why focusing is the fix rather than a live region: the label, the
		// error and the description are announced together, once.
		const ids = focused.getAttribute('aria-describedby')!.split(' ');
		expect(ids.length).toBeGreaterThan(0);
		for (const id of ids) {
			expect(container.querySelector(`#${id}`)!.textContent).toContain('Required.');
		}
	});

	it('does not wait for the caller to flush the DOM itself', async () => {
		// The helper awaits `tick()` internally. It is called right after the state
		// change that produced the errors, so without that the DOM would not carry
		// them yet — the single easiest thing to get wrong here.
		const { getByTestId, getByLabelText } = render(FocusInvalidFixture, { nameError: 'Required.' });
		expect(await focusFirstInvalidField({ root: getByTestId('form') })).toBe(true);
		expect(document.activeElement).toBe(getByLabelText('Name'));
	});

	it('scopes the search to the given root', async () => {
		render(FocusInvalidFixture, { nameError: 'Required.' });
		const detached = document.createElement('div');
		expect(await focusFirstInvalidField({ root: detached })).toBe(false);
	});

	it('searches the document when given no root', async () => {
		const { getByLabelText } = render(FocusInvalidFixture, { nameError: 'Required.' });
		expect(await focusFirstInvalidField()).toBe(true);
		expect(document.activeElement).toBe(getByLabelText('Name'));
	});

	it('reports loudly when the control was never wired up', async () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { getByTestId } = render(FocusInvalidFixture, {
			fruitError: 'Pick one.',
			unwired: true
		});

		// Focus silently going nowhere leaves the form looking broken with no clue
		// why, so the failure is reported rather than swallowed.
		expect(await focusFirstInvalidField({ root: getByTestId('form') })).toBe(false);
		expect(spy).toHaveBeenCalled();
		expect(String(spy.mock.calls.at(-1)?.[0])).toContain('focusFirstInvalidField');
	});
});
