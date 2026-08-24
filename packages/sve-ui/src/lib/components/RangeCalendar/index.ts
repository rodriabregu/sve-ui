/**
 * RangeCalendar namespace — sve-ui styled wrappers over bits-ui RangeCalendar.
 *
 * Compose exactly like Calendar; only the selection model differs. Bits handles
 * the two-step interaction: first click sets the start, second sets the end, and
 * hovering between them previews the span. It normalises a backwards selection,
 * so clicking the end first does the sensible thing rather than producing an
 * inverted range.
 *
 * `value` is `{ start, end }` of `DateValue`s from `@internationalized/date` —
 * a **peerDependency**, so install it alongside sve-ui.
 *
 * `minDays`/`maxDays` bound the span, and `excludeDisabled` refuses a range that
 * would straddle an unavailable date. That last one matters for booking flows,
 * where "three nights including the one that is already taken" is not a valid
 * answer.
 *
 * Header, Heading, PrevButton, NextButton, Grid, GridHead, GridBody, GridRow,
 * HeadCell, MonthSelect and YearSelect are the SAME components Calendar uses —
 * Bits re-exports the identical `calendar/components/*` modules to both
 * namespaces, so there is one styled implementation rather than two copies of
 * the same CSS drifting apart. Only Root, Cell and Day are specific to ranges.
 */

// Range-specific
export { default as Root } from './RangeCalendarRoot.svelte';
export { default as Cell } from './RangeCalendarCell.svelte';
export { default as Day } from './RangeCalendarDay.svelte';

// Shared with Calendar
export {
  Header,
  Heading,
  PrevButton,
  NextButton,
  Grid,
  GridHead,
  GridBody,
  GridRow,
  HeadCell,
  MonthSelect,
  YearSelect
} from '../Calendar/index.js';
