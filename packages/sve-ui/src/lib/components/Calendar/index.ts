/**
 * Calendar namespace — sve-ui styled wrappers over bits-ui Calendar.
 *
 * Compose:
 *   Root > Header > (PrevButton + Heading + NextButton)
 *        > Grid > GridHead > GridRow > HeadCell
 *               > GridBody > GridRow > Cell > Day
 *
 * Bits owns everything hard here: the roving grid, arrow-key navigation across
 * weeks and months, PageUp/PageDown, Home/End, the aria-labelled grid, and the
 * calendar arithmetic itself.
 *
 * DATES ARE `DateValue`, NOT `Date`. They come from `@internationalized/date`,
 * which is a **peerDependency** of this package: the consumer constructs the
 * values, so there must be exactly one copy of that library or the objects stop
 * lining up. Install it alongside sve-ui if you use any date component.
 *
 * `locale` is not cosmetic — it changes month names, which day the week starts
 * on, and the numeral system. Pass the user's locale rather than assuming.
 *
 * `MonthSelect` and `YearSelect` are optional but worth adding for any range
 * wider than a few months: paging one month at a time to reach a birth year is
 * not navigation.
 *
 * Grid, GridBody, GridHead, GridRow, HeadCell, Header, Heading, PrevButton,
 * NextButton, MonthSelect and YearSelect are SHARED with RangeCalendar — Bits
 * re-exports the identical `calendar/components/*` modules to both, so one
 * styled implementation serves each.
 */

export { default as Root } from './CalendarRoot.svelte';
export { default as Header } from './CalendarHeader.svelte';
export { default as Heading } from './CalendarHeading.svelte';
export { default as PrevButton } from './CalendarPrevButton.svelte';
export { default as NextButton } from './CalendarNextButton.svelte';
export { default as Grid } from './CalendarGrid.svelte';
export { default as GridHead } from './CalendarGridHead.svelte';
export { default as GridBody } from './CalendarGridBody.svelte';
export { default as GridRow } from './CalendarGridRow.svelte';
export { default as HeadCell } from './CalendarHeadCell.svelte';
export { default as Cell } from './CalendarCell.svelte';
export { default as Day } from './CalendarDay.svelte';
export { default as MonthSelect } from './CalendarMonthSelect.svelte';
export { default as YearSelect } from './CalendarYearSelect.svelte';
