import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import FieldFixture from './FieldFixture.svelte';

/**
 * Before this component existed, `aria-describedby` appeared in ZERO of the
 * library's components: there was no accessible way to attach a description or a
 * validation message to any control. Every consumer had to generate ids and wire
 * them by hand, which is the same shape of gap as `Button` being unable to be a
 * link — the library forced you to do it yourself or do it wrong.
 *
 * So these tests are about the wiring, not the markup.
 */
describe('Field', () => {
	afterEach(() => vi.restoreAllMocks());

	it('points the label at the control', () => {
		const { getByLabelText } = render(FieldFixture);
		// Resolved by accessible name the way assistive technology does it, so
		// this fails if `for` and `id` ever stop matching.
		expect(getByLabelText('Email')).toBeTruthy();
	});

	it('gives the control an id even with no description or error', () => {
		const { container } = render(FieldFixture);
		const input = container.querySelector('input')!;
		expect(input.id).not.toBe('');
	});

	it('omits aria-describedby entirely when there is nothing to describe', () => {
		const { container } = render(FieldFixture);
		// An empty or dangling `aria-describedby` is invalid and announces
		// nothing, so the attribute must be absent rather than blank.
		expect(container.querySelector('input')!.hasAttribute('aria-describedby')).toBe(false);
	});

	it('describes the control by the description, and the ids resolve', () => {
		const { container } = render(FieldFixture, { description: 'We never share it.' });
		const input = container.querySelector('input')!;
		const ids = input.getAttribute('aria-describedby')!.split(' ');
		expect(ids).toHaveLength(1);
		// The point of the whole component: every referenced id exists.
		for (const id of ids) expect(container.querySelector(`#${id}`)).not.toBeNull();
		expect(container.querySelector(`#${ids[0]}`)!.textContent).toContain('We never share it.');
	});

	it('names the error before the description', () => {
		const { container } = render(FieldFixture, {
			description: 'We never share it.',
			error: 'Enter a valid email address.'
		});
		const input = container.querySelector('input')!;
		const ids = input.getAttribute('aria-describedby')!.split(' ');
		expect(ids).toHaveLength(2);
		for (const id of ids) expect(container.querySelector(`#${id}`)).not.toBeNull();
		// When a field is wrong, that is what the user needs to hear first.
		expect(container.querySelector(`#${ids[0]}`)!.textContent).toContain('valid email');
	});

	it('derives aria-invalid from the error, with no separate prop to desync', () => {
		const valid = render(FieldFixture, { description: 'help' });
		expect(valid.container.querySelector('input')!.hasAttribute('aria-invalid')).toBe(false);
		valid.unmount();

		// There is deliberately no `invalid` prop: styling and aria cannot
		// disagree with the message the user is reading.
		const bad = render(FieldFixture, { error: 'Required.' });
		expect(bad.container.querySelector('input')!.getAttribute('aria-invalid')).toBe('true');
	});

	it('marks the control required and the label with it', () => {
		const { container } = render(FieldFixture, { required: true });
		expect(container.querySelector('input')!.required).toBe(true);
		expect(container.querySelector('label')).not.toBeNull();
	});

	it('leaves required off when not asked', () => {
		const { container } = render(FieldFixture);
		expect(container.querySelector('input')!.required).toBe(false);
	});

	it('generates distinct ids per instance', () => {
		const a = render(FieldFixture, { description: 'x' });
		const b = render(FieldFixture, { description: 'y' });
		const idA = a.container.querySelector('input')!.id;
		const idB = b.container.querySelector('input')!.id;
		// Two fields on one page must not collide, or the second label steals
		// the first control.
		expect(idA).not.toBe(idB);
	});

	it('reports loudly when the control ignores the props', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(FieldFixture, { unwired: true, description: 'help' });
		// The one way to misuse this API is to forget the spread, and nothing
		// breaks visibly when you do — the label just points at nothing.
		expect(spy).toHaveBeenCalled();
		expect(String(spy.mock.calls[0][0])).toContain('no element has that id');
	});

	it('stays quiet when the props are spread', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(FieldFixture, { description: 'help' });
		expect(spy).not.toHaveBeenCalled();
	});
});
