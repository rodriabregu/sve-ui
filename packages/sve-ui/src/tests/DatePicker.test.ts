import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import DatePickerFixture from './DatePickerFixture.svelte';

/**
 * A picker is a field and a calendar sharing ONE value. That sharing is the
 * whole point — someone who knows the date types it, someone browsing opens the
 * calendar — so it is what these assert, not that the parts render.
 */
describe('DatePicker', () => {
	it('renders the field half with its segments', () => {
		const { getAllByRole, getByRole } = render(DatePickerFixture, { props: {} });
		expect(getAllByRole('spinbutton').length).toBe(3);
		expect(getByRole('button', { name: 'Open calendar' })).toBeTruthy();
	});

	it('keeps the calendar closed until the trigger is used', () => {
		const { baseElement } = render(DatePickerFixture, { props: {} });
		expect(baseElement.querySelector('.sve-picker__content')).toBeNull();
	});

	it('shows the bound value in the field segments', () => {
		const { container } = render(DatePickerFixture, { props: {} });
		const month = container.querySelector('[data-segment="month"]') as HTMLElement;
		// Not "Empty" — the field reflects the shared value without the calendar
		// ever being opened.
		expect(month.getAttribute('aria-valuetext')).not.toBe('Empty');
	});

	it('opens the calendar popover on trigger click', async () => {
		const { getByRole, baseElement, getByTestId } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));

		await waitFor(() => {
			expect(baseElement.querySelector('.sve-picker__content')).not.toBeNull();
			expect(getByTestId('open').textContent).toBe('true');
		});
	});

	it('reuses the styled Calendar chrome inside the popover', async () => {
		const { getByRole, baseElement } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));

		await waitFor(() => {
			// Same components a standalone Calendar uses — Bits re-exports the
			// identical modules here, so the two cannot look different.
			expect(baseElement.querySelector('.sve-calendar__header')).not.toBeNull();
			expect(baseElement.querySelector('table.sve-calendar__grid')).not.toBeNull();
			expect(baseElement.querySelectorAll('.sve-calendar__day').length).toBeGreaterThan(27);
		});
	});

	it('names the calendar from calendarLabel', async () => {
		const { getByRole } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));
		// Without calendarLabel this announces as "Event January 2026".
		await waitFor(() =>
			expect(getByRole('application', { name: 'Departure date January 2026' })).toBeTruthy()
		);
	});

	it('marks the shared value as selected in the calendar', async () => {
		const { getByRole, baseElement } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));

		await waitFor(() => {
			const selected = baseElement.querySelectorAll('.sve-calendar__day[data-selected]');
			// The field and the calendar are ONE value, not two synced ones.
			expect(selected.length).toBe(1);
			expect(selected[0].textContent?.trim()).toBe('15');
		});
	});

	it('picking in the calendar updates the shared value', async () => {
		const { getByRole, baseElement, getByTestId } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));
		await waitFor(() => expect(baseElement.querySelector('.sve-calendar__day')).not.toBeNull());

		const days = Array.from(baseElement.querySelectorAll('.sve-calendar__day'));
		const twentieth = days.find(
			(d) => d.textContent?.trim() === '20' && !d.hasAttribute('data-outside-month')
		) as HTMLElement;
		await fireEvent.click(twentieth);

		await waitFor(() => expect(getByTestId('value').textContent).toBe('2026-01-20'));
	});

	it('closes on Escape', async () => {
		const { getByRole, getByTestId } = render(DatePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));
		await waitFor(() => expect(getByTestId('open').textContent).toBe('true'));

		await fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
		await waitFor(() => expect(getByTestId('open').textContent).toBe('false'));
	});
});
