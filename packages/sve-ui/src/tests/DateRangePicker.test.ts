import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import DateRangePickerFixture from './DateRangePickerFixture.svelte';

describe('DateRangePicker', () => {
	it('renders two fields worth of segments', () => {
		const { getAllByRole } = render(DateRangePickerFixture, { props: {} });
		expect(getAllByRole('spinbutton').length).toBe(6);
	});

	it('is named from the Root, which Bits leaves unnamed', () => {
		const { getByRole } = render(DateRangePickerFixture, { props: {} });
		// Same gap as the range FIELD: the group has no name of its own, so the
		// fixture wires aria-labelledby the way the docs say to.
		expect(getByRole('group', { name: /Stay dates/ })).toBeTruthy();
	});

	it('reuses the RANGE calendar inside the popover, not the single one', async () => {
		const { getByRole, baseElement } = render(DateRangePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));

		await waitFor(() => {
			// Cell and Day come from RangeCalendar because they carry the range
			// states; the chrome around them is Calendar's.
			expect(baseElement.querySelector('.sve-range-calendar')).not.toBeNull();
			expect(baseElement.querySelector('.sve-calendar__header')).not.toBeNull();
			expect(baseElement.querySelector('.sve-range-day')).not.toBeNull();
		});
	});

	it('shows the shared range as a band with two endpoints', async () => {
		const { getByRole, baseElement } = render(DateRangePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));

		await waitFor(() => {
			expect(
				(
					baseElement.querySelector('.sve-range-day[data-selection-start]') as HTMLElement
				)?.textContent?.trim()
			).toBe('10');
			expect(
				(
					baseElement.querySelector('.sve-range-day[data-selection-end]') as HTMLElement
				)?.textContent?.trim()
			).toBe('14');
			// 11, 12, 13 between them.
			expect(baseElement.querySelectorAll('.sve-range-day[data-range-middle]').length).toBe(3);
		});
	});

	it('reuses the same popover panel DatePicker uses', async () => {
		const { getByRole, baseElement } = render(DateRangePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));
		// Bits re-exports DatePicker's Content here, so it is literally the same
		// panel — one styled implementation for both pickers.
		await waitFor(() =>
			expect(baseElement.querySelector('[data-slot="date-picker-content"]')).not.toBeNull()
		);
	});

	it('picking in the calendar updates the shared range', async () => {
		const { getByRole, baseElement, getByTestId } = render(DateRangePickerFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Open calendar' }));
		await waitFor(() => expect(baseElement.querySelector('.sve-range-day')).not.toBeNull());

		const pick = (label: string) =>
			Array.from(baseElement.querySelectorAll('.sve-range-day')).find(
				(d) => d.textContent?.trim() === label && !d.hasAttribute('data-outside-month')
			) as HTMLElement;

		await fireEvent.click(pick('5'));
		await fireEvent.click(pick('8'));

		await waitFor(() => expect(getByTestId('range').textContent).toBe('2026-01-05..2026-01-08'));
	});
});
