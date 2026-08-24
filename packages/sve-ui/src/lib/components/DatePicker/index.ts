/**
 * DatePicker namespace — sve-ui styled wrappers over bits-ui DatePicker.
 *
 * A segmented field plus a calendar popover, sharing one value. That pairing is
 * the point: someone who knows the date types it in three keystrokes, and
 * someone choosing "the second Tuesday" opens the calendar. Ship only the
 * calendar and the fast path is slow; ship only the field and browsing is
 * impossible.
 *
 * Compose:
 *   Root > Label
 *        > Input > (Segment per part) + Trigger
 *        > Content > Calendar > Header/Grid/... (exactly as on Calendar)
 *
 * Almost everything here is a component you already have. Bits re-exports the
 * identical modules, so we re-export our styled versions of them:
 *   Input, Label, Segment  -> DateField
 *   the calendar chrome    -> Calendar
 *   Arrow, Close           -> Popover
 * Only Root, Trigger, Content and Calendar are picker-specific. A field inside a
 * picker therefore behaves and looks exactly like a standalone one.
 *
 * Dates are `DateValue` from `@internationalized/date`, a **peerDependency**.
 * Pass `calendarLabel` (Bits defaults it to the literal word "Event") and
 * `locale` (it drives both the segment order and the calendar's first day of
 * week). Give the icon-only Trigger an `aria-label`.
 */

import { Popover as BitsPopover } from 'bits-ui';
import type { Component } from 'svelte';
import type { PopoverArrowProps, PopoverCloseProps } from 'bits-ui';

// Picker-specific
export { default as Root } from './DatePickerRoot.svelte';
export { default as Trigger } from './DatePickerTrigger.svelte';
export { default as Content } from './DatePickerContent.svelte';
export { default as Calendar } from './DatePickerCalendar.svelte';

// The field half — DateField's components, which Bits re-exports here.
export { Label, Input, Segment } from '../DateField/index.js';

// The calendar half — Calendar's components.
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
  Cell,
  Day,
  MonthSelect,
  YearSelect
} from '../Calendar/index.js';

// Popover's floating extras, re-exported for a pointer arrow and a close button.
export const Arrow: Component<PopoverArrowProps> =
  BitsPopover.Arrow as Component<PopoverArrowProps>;
export const Close: Component<PopoverCloseProps> =
  BitsPopover.Close as Component<PopoverCloseProps>;
