---
'sve-ui': minor
---

Add DateField, TimeField, DateRangeField, and TimeRangeField — the segmented date and time inputs.

Compose `Root > Label + Input`, rendering a `Segment` per part from the snippet `Input` gives you. Values are `DateValue`/`TimeValue` from `@internationalized/date`, which is a peerDependency.

**These are not text inputs with a mask.** Every part is its own `role="spinbutton"` with `aria-valuenow`, `aria-valuetext` and its own `aria-label`, so arrow keys adjust it and a screen reader announces "month, 12" rather than reading a formatted string. Typed numbers fill the focused segment and advance, and the value only commits once *every* segment is filled — so there is no half-parsed intermediate state to guard against. Separators are rendered as `data-segment="literal"` with `aria-hidden`, otherwise the field would announce "slash" between the parts.

The `Segment` is shared: Bits re-exports the identical module to the range namespaces, so `DateRangeField` reuses `DateField`'s and `TimeRangeField` reuses `TimeField`'s. One styled implementation, no drift.

### `locale` reorders the field, it does not relabel it

`en-US` renders month / day / year; `en-GB` renders day / month / year. Passing the wrong locale means a user typing their own date format silently enters the wrong date. That is a correctness bug rather than a preference, and it is asserted in the tests.

`granularity` decides which segments exist at all. On `TimeField`, leave `hourCycle` unset so it follows the locale — a 12-hour clock adds a `dayPeriod` (AM/PM) segment and bounds the hour at 1–12, a 24-hour clock has neither.

### The range fields leave their group unnamed

Verified in the rendered DOM: on a range field the **Root** carries `role="group"` with **no accessible name**. Bits points each `Input`'s `aria-labelledby` at your `Label`, but the Inputs carry no role, so nothing exposed to assistive technology ends up labelled — the field announces as an anonymous group.

**Pass `aria-labelledby` (at your Label's id) or `aria-label` on `Root`.** Both reach the element, and both the gap and the fix are asserted so this cannot regress quietly. The single-value fields do not have this problem: there the `Input` *is* the group and Bits labels it.

Range fields also take **two** `Input`s, one `type="start"` and one `type="end"` — `type` is required, there is no single input that holds a range. Mark your visual separator `aria-hidden`.

`TimeField` values are `TimeValue` (`Time | CalendarDateTime | ZonedDateTime`), which is deliberately **not** the same as `DateValue`: `@internationalized/date` keeps clock times and calendar dates as separate types.

One authoring note: key the segment `each` by **index**. Segment parts repeat — there are multiple `literal` separators — so keying by `part` throws.
