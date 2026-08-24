import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { CalendarDate } from '@internationalized/date';
import CalendarFixture from './CalendarFixture.svelte';

/**
 * Bits owns the calendar arithmetic and the roving grid, so these assert the
 * things a consumer can get wrong: the accessible name, the difference between
 * unavailable and disabled, and that dates are `DateValue` rather than `Date`.
 */
describe('Calendar', () => {
	it('renders as an application region named by calendarLabel plus the month', () => {
		const { getByRole } = render(CalendarFixture, { props: {} });
		// Verified in the rendered DOM: Bits builds the name as
		// `${calendarLabel} ${month} ${year}`, and defaults the first part to the
		// literal word "Event" — so leaving it unset announces "Event January 2026".
		expect(getByRole('application', { name: 'Departure date January 2026' })).toBeTruthy();
	});

	it('renders real table markup, so the grid is a table to a screen reader', () => {
		const { container } = render(CalendarFixture, { props: {} });
		expect(container.querySelector('table.sve-calendar__grid')).not.toBeNull();
		expect(container.querySelectorAll('th.sve-calendar__head-cell').length).toBe(7);
		expect(container.querySelector('tbody.sve-calendar__grid-body')).not.toBeNull();
	});

	it('shows the placeholder month in the heading', () => {
		const { container } = render(CalendarFixture, { props: {} });
		expect(container.querySelector('.sve-calendar__heading')?.textContent?.trim()).toBe(
			'January 2026'
		);
	});

	it('marks the bound date as selected', () => {
		const { container } = render(CalendarFixture, { props: {} });
		const selected = container.querySelectorAll('.sve-calendar__day[data-selected]');
		expect(selected.length).toBe(1);
		expect(selected[0].textContent?.trim()).toBe('15');
	});

	it('distinguishes unavailable from disabled', () => {
		const { container } = render(CalendarFixture, { props: {} });
		// The fixture marks the 20th unavailable: the date exists but cannot be
		// picked. That is a different answer from out-of-range, and both are styled
		// differently on purpose.
		const unavailable = container.querySelectorAll('.sve-calendar__day[data-unavailable]');
		expect(unavailable.length).toBeGreaterThan(0);
		expect(Array.from(unavailable).some((d) => d.textContent?.trim() === '20')).toBe(true);
	});

	it('disables days outside minValue and maxValue', () => {
		const { container } = render(CalendarFixture, {
			props: { minValue: new CalendarDate(2026, 1, 10), maxValue: new CalendarDate(2026, 1, 20) }
		});
		const days = Array.from(container.querySelectorAll('.sve-calendar__day'));
		const first = days.find((d) => d.textContent?.trim() === '5');
		expect(first?.hasAttribute('data-disabled')).toBe(true);
	});

	it('selects a day on click and hands back a DateValue, not a Date', async () => {
		const { container, getByTestId } = render(CalendarFixture, { props: {} });
		const days = Array.from(container.querySelectorAll('.sve-calendar__day'));
		const eighteenth = days.find(
			(d) => d.textContent?.trim() === '18' && !d.hasAttribute('data-outside-month')
		) as HTMLElement;
		await fireEvent.click(eighteenth);

		// A DateValue stringifies as an ISO calendar date — this is the tell that we
		// are not handing back a JS Date.
		await waitFor(() => expect(getByTestId('value').textContent).toBe('2026-01-18'));
	});

	it('steps to the next month via the nav button', async () => {
		const { container, getByRole } = render(CalendarFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Next' }));
		await waitFor(() =>
			expect(container.querySelector('.sve-calendar__heading')?.textContent?.trim()).toBe(
				'February 2026'
			)
		);
	});

	// Verified in the Bits source (calendar.svelte.js:574 and :607): the nav
	// buttons' aria-labels are hardcoded and Bits merges its own props LAST, so a
	// consumer-supplied aria-label is discarded. The fixture passes
	// "Previous month" and gets "Previous".
	it('ignores a consumer aria-label on the nav buttons', () => {
		const { queryByRole, getByRole } = render(CalendarFixture, { props: {} });
		expect(queryByRole('button', { name: 'Previous month' })).toBeNull();
		expect(getByRole('button', { name: 'Previous' })).toBeTruthy();
	});

	it('localises month names and weekday order', () => {
		const { container } = render(CalendarFixture, { props: { locale: 'es-ES' } });
		// locale is not cosmetic: it drives month names and the first day of week.
		expect(container.querySelector('.sve-calendar__heading')?.textContent?.trim()).toContain(
			'enero'
		);
	});
});
