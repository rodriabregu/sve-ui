/**
 * DateRangePicker namespace — sve-ui styled wrappers over bits-ui
 * DateRangePicker.
 *
 * Two segmented fields plus a range calendar, sharing one value.
 *
 * Compose:
 *   Root > Label
 *        > Input type="start" > (Segment per part)
 *        > Input type="end"   > (Segment per part) + Trigger
 *        > Content > Calendar > Header/Grid/... with RangeCalendar's Cell + Day
 *
 * Almost all of it is re-exported from namespaces you already have, because Bits
 * re-exports the identical modules:
 *   Label, Input       -> DateRangeField (Input takes the required `type`)
 *   Segment            -> DateField
 *   Content            -> DatePicker (literally the same panel)
 *   calendar chrome    -> Calendar
 *   Cell, Day          -> RangeCalendar (they carry the range states)
 *   Arrow, Close       -> Popover
 * Only Root, Trigger and Calendar are specific to this picker.
 *
 * Set `numberOfMonths={2}`: a range that crosses a month boundary is the common
 * case, and one month makes the user page back and forth to see both ends of
 * their own selection.
 *
 * NAME THE ROOT — like the range field, its group has no accessible name of its
 * own. Pass `aria-labelledby` or `aria-label`.
 *
 * Dates are `DateValue` from `@internationalized/date`, a **peerDependency**.
 */

// Picker-specific
export { default as Root } from './DateRangePickerRoot.svelte';
export { default as Trigger } from './DateRangePickerTrigger.svelte';
export { default as Calendar } from './DateRangePickerCalendar.svelte';

// The same popover panel DatePicker uses — Bits re-exports its Content here.
export { Content, Arrow, Close } from '../DatePicker/index.js';

// The field half: two Inputs and one Label from the range field, segments from
// the single-value field.
export { Label, Input } from '../DateRangeField/index.js';
export { Segment } from '../DateField/index.js';

// The calendar chrome.
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

// Range-aware Cell and Day, which carry data-selection-start / range-middle /
// highlighted.
export { Cell, Day } from '../RangeCalendar/index.js';
