import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import DateFieldFixture from './DateFieldFixture.svelte';

/**
 * The point of a segmented field over `<input type="date">` is the keyboard and
 * screen-reader model, so that is what these assert — not that it renders.
 */
describe('DateField', () => {
	it('exposes each part as a spinbutton, not one text input', () => {
		const { container, getAllByRole } = render(DateFieldFixture, { props: {} });
		expect(container.querySelector('input')).toBeNull();
		// month, day, year — each individually addressable and adjustable.
		expect(getAllByRole('spinbutton').length).toBe(3);
	});

	it('names the group from the Label via aria-labelledby', () => {
		const { getByRole } = render(DateFieldFixture, { props: {} });
		// Verified in the DOM: the Label is a <div>, and Bits associates it by
		// pointing the Input's aria-labelledby at it rather than using `for`.
		expect(getByRole('group', { name: /Departure date/ })).toBeTruthy();
	});

	it('gives each segment its own label and value range', () => {
		const { container } = render(DateFieldFixture, { props: {} });
		const month = container.querySelector('[data-segment="month"]') as HTMLElement;
		// A screen reader says "month, 12" rather than reading a formatted string.
		expect(month.getAttribute('aria-label')).toContain('month');
		expect(month.getAttribute('aria-valuemin')).toBe('1');
		expect(month.getAttribute('aria-valuemax')).toBe('12');
	});

	it('marks unfilled segments as Empty, which is what the placeholder style targets', () => {
		const { container } = render(DateFieldFixture, { props: {} });
		const month = container.querySelector('[data-segment="month"]') as HTMLElement;
		// Bits emits no `data-placeholder` — the empty state is aria-valuetext.
		expect(month.getAttribute('aria-valuetext')).toBe('Empty');
		expect(month.hasAttribute('data-placeholder')).toBe(false);
	});

	it('renders the separators as hidden literals', () => {
		const { container } = render(DateFieldFixture, { props: {} });
		const literals = container.querySelectorAll('[data-segment="literal"]');
		expect(literals.length).toBeGreaterThan(0);
		// Not focusable, and not read out — otherwise the field announces "slash".
		for (const l of literals) {
			expect(l.getAttribute('aria-hidden')).toBe('true');
			expect(l.hasAttribute('role')).toBe(false);
		}
	});

	it('increments a segment with ArrowUp', async () => {
		const { container } = render(DateFieldFixture, { props: {} });
		const month = container.querySelector('[data-segment="month"]') as HTMLElement;
		month.focus();
		await fireEvent.keyDown(month, { key: 'ArrowUp' });

		await waitFor(() => expect(month.getAttribute('aria-valuetext')).not.toBe('Empty'));
	});

	it('does not commit a value until every segment is filled', async () => {
		const { container, getByTestId } = render(DateFieldFixture, { props: {} });
		const month = container.querySelector('[data-segment="month"]') as HTMLElement;
		month.focus();
		await fireEvent.keyDown(month, { key: 'ArrowUp' });

		// One segment set is not a date — there is no half-parsed state to guard.
		await waitFor(() => expect(month.getAttribute('aria-valuetext')).not.toBe('Empty'));
		expect(getByTestId('value').textContent).toBe('');
	});

	it('adds time segments when granularity asks for them', () => {
		const { getAllByRole } = render(DateFieldFixture, {
			props: { granularity: 'minute' as const }
		});
		// day granularity gives 3 segments; minute adds hour + minute (+ dayPeriod
		// in a 12-hour locale), so the count has to grow.
		expect(getAllByRole('spinbutton').length).toBeGreaterThan(3);
	});

	it('reorders the segments for the locale, not just their labels', () => {
		const us = render(DateFieldFixture, { props: { locale: 'en-US' } });
		const usFirst = us.container.querySelector('[data-segment]') as HTMLElement;
		expect(usFirst.dataset.segment).toBe('month');

		const gb = render(DateFieldFixture, { props: { locale: 'en-GB' } });
		const gbFirst = gb.container.querySelector('[data-segment]') as HTMLElement;
		// en-GB is day-first: the locale rearranges the field, it does not merely
		// relabel it. Passing the wrong one is a correctness bug.
		expect(gbFirst.dataset.segment).toBe('day');
	});
});
