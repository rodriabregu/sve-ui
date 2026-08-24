---
'sve-ui': minor
---

Add DatePicker and DateRangePicker. **This completes the date and time family — every Bits UI primitive is now wrapped.**

A picker is a segmented field plus a calendar popover **sharing one value**, and that pairing is the point: someone who knows the date types it in three keystrokes, someone choosing "the second Tuesday" opens the calendar. Ship only the calendar and the fast path is slow; ship only the field and browsing is impossible. They share one value rather than two synced ones, so typing moves the calendar's selection and picking a day fills the segments with no reconciliation code on your side.

Put the `Trigger` inside the `Input`, after the segments. It is usually icon-only, so give it an `aria-label`.

### Almost entirely reused

Only `Root`, `Trigger`, `Content` and `Calendar` are picker-specific. Everything else is re-exported from namespaces that already exist, because Bits re-exports the identical modules:

| Part | Comes from |
|---|---|
| `Input`, `Label`, `Segment` | `DateField` |
| the calendar chrome | `Calendar` |
| `Arrow`, `Close` | `Popover` |
| `Cell`, `Day` (range only) | `RangeCalendar` — they carry the range states |
| `Content` (range only) | `DatePicker` — literally the same panel |

So a field inside a picker behaves and looks exactly like a standalone one, not by convention but because it *is* the same component. This is the payoff from the earlier sharing work: two full-featured pickers cost seven new files.

Everything documented on those pages applies here — `locale` reorders the segments and sets the calendar's first day of week, `calendarLabel` must be passed (Bits defaults it to the literal word "Event"), and the calendar's nav buttons have hardcoded aria-labels.

### `DateRangePicker` specifics

Two `Input`s, one `type="start"` and one `type="end"`. Set `numberOfMonths={2}`: a range crossing a month boundary is the common case, and one month forces the user to page back and forth to see both ends of their own selection.

**Name the Root.** Like the range *field*, the range picker's group carries no accessible name of its own — pass `aria-labelledby` pointing at your Label's id, or `aria-label`.

`value`, `placeholder` and `open` are bindable on both.
