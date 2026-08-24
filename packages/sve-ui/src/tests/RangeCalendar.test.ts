import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import RangeCalendarFixture from './RangeCalendarFixture.svelte';

/**
 * The interesting property is the SHARING: Header, Heading, Prev/NextButton,
 * Grid, GridHead, GridBody, GridRow, HeadCell, MonthSelect and YearSelect are
 * literally Calendar's components — Bits re-exports the identical
 * `calendar/components/*` modules to both namespaces. Only Root, Cell and Day
 * are range-specific. These tests prove the shared chrome picks up the
 * RangeCalendar context rather than trusting the import paths.
 */
describe('RangeCalendar', () => {
  it('renders as an application region named by calendarLabel', () => {
    const { getByRole } = render(RangeCalendarFixture, { props: {} });
    expect(getByRole('application', { name: 'Stay dates January 2026' })).toBeTruthy();
  });

  it('wires the SHARED chrome to the range-calendar root, not the calendar one', () => {
    const { container } = render(RangeCalendarFixture, { props: {} });
    // Bits derives its data attributes from the surrounding Root, so these prove
    // the reused components resolved the right context.
    expect(container.querySelector('[data-range-calendar-root]')).not.toBeNull();
    expect(container.querySelector('[data-range-calendar-header]')).not.toBeNull();
    expect(container.querySelector('[data-range-calendar-grid]')).not.toBeNull();
    expect(container.querySelector('[data-calendar-root]')).toBeNull();
  });

  it('still applies the shared calendar styling to the reused parts', () => {
    const { container } = render(RangeCalendarFixture, { props: {} });
    // One styled implementation, so the two calendars cannot drift visually.
    expect(container.querySelector('.sve-calendar__header')).not.toBeNull();
    expect(container.querySelector('.sve-calendar__grid')).not.toBeNull();
    expect(container.querySelectorAll('.sve-calendar__head-cell').length).toBe(7);
  });

  it('marks the two endpoints of the range', () => {
    const { container } = render(RangeCalendarFixture, { props: {} });
    const start = container.querySelector('.sve-range-day[data-selection-start]');
    const end = container.querySelector('.sve-range-day[data-selection-end]');
    expect(start?.textContent?.trim()).toBe('10');
    expect(end?.textContent?.trim()).toBe('14');
  });

  it('marks the days between as range-middle, not as separate selections', () => {
    const { container } = render(RangeCalendarFixture, { props: {} });
    const middle = Array.from(
      container.querySelectorAll('.sve-range-day[data-range-middle]')
    ).map((d) => d.textContent?.trim());
    // 11, 12, 13 — the span reads as one band with two handles.
    expect(middle).toEqual(['11', '12', '13']);
  });

  it('starts a new range on click and reflects it via bind:value', async () => {
    const { container, getByTestId } = render(RangeCalendarFixture, { props: {} });
    const days = Array.from(container.querySelectorAll('.sve-range-day'));
    const fifth = days.find(
      (d) => d.textContent?.trim() === '5' && !d.hasAttribute('data-outside-month')
    ) as HTMLElement;
    await fireEvent.click(fifth);

    // First click of a new range sets the start and clears the end.
    await waitFor(() => expect(getByTestId('range').textContent).toContain('2026-01-05'));
  });

  it('completes the range on a second click', async () => {
    const { container, getByTestId } = render(RangeCalendarFixture, { props: {} });
    const pick = (label: string) =>
      Array.from(container.querySelectorAll('.sve-range-day')).find(
        (d) => d.textContent?.trim() === label && !d.hasAttribute('data-outside-month')
      ) as HTMLElement;

    await fireEvent.click(pick('3'));
    await fireEvent.click(pick('7'));

    await waitFor(() =>
      expect(getByTestId('range').textContent).toBe('2026-01-03..2026-01-07')
    );
  });
});
