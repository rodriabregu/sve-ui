---
'sve-ui': minor
---

Add Calendar and RangeCalendar.

**`@internationalized/date` is now a peerDependency.** Install it alongside `sve-ui` if you use any date component:

```
pnpm add sve-ui @internationalized/date
```

Dates are `DateValue` objects from that library, not JavaScript `Date`s. You construct the values, so there must be exactly one copy — two copies means objects that stop lining up. bits-ui already declared it as a hard peer and bits-ui is our dependency, so this only makes explicit what was already required.

- **`Calendar`** namespace (14 parts) — `Root > Header > (PrevButton + Heading + NextButton)` and `Grid > GridHead/GridBody > GridRow > Cell > Day`, plus optional `MonthSelect` and `YearSelect`. Bits owns the roving grid, arrow-key navigation across weeks and months, PageUp/PageDown, Home/End, and the calendar arithmetic. `value` (the selection) and `placeholder` (the month on screen) are separate and both bindable — paging months must not change what is selected.

- **`RangeCalendar`** namespace — same composition, `value` is `{ start, end }`. Bits handles the two-step pick and normalises a backwards selection, so clicking the end first does the sensible thing rather than producing an inverted range. `minDays`/`maxDays` bound the span and `excludeDisabled` refuses a range that would straddle an unavailable date.

  `Header`, `Heading`, the nav buttons, `Grid`, `GridHead`, `GridBody`, `GridRow`, `HeadCell`, `MonthSelect` and `YearSelect` are the **same components** `Calendar` uses — Bits re-exports the identical modules to both namespaces, so there is one styled implementation rather than two copies of the same CSS. Only `Root`, `Cell` and `Day` are range-specific.

### Two things the API does not make obvious

**Pass `calendarLabel`.** Bits builds the root's accessible name as `` `${calendarLabel} ${month} ${year}` `` and defaults the first part to the literal word `"Event"` — so an unset calendar announces as "Event January 2026", which tells the user nothing about what they are picking. Pass "Departure date", "Due date", "Booking".

**The nav buttons' `aria-label` cannot be overridden.** Bits hardcodes `"Previous"` and `"Next"` and merges its own props last, so one you pass is discarded. Both behaviours were verified against the rendered DOM and the Bits source, and are asserted in tests.

### Styling that carries meaning

`isDateDisabled` (out of range) and `isDateUnavailable` (exists but taken — a fully booked day) are different answers and are styled differently: disabled fades out, unavailable stays readable and is struck through. Collapsing both into one grey blur throws away information the user needs. `data-today` gets a ring rather than a fill, so today stays legible when it is also the selected day. Range endpoints are filled with the span between them tinted and inner corners squared, so a range reads as one band with two handles.

`locale` changes month names, **which day the week starts on**, and the numeral system — pass the user's locale rather than hardcoding Monday-first or Sunday-first.

One gotcha worth repeating from the docs: key the weekday `each` by **index**, not by the label. Narrow weekday names are not unique — "T" is both Tuesday and Thursday — and keying by label throws.
