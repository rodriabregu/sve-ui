/**
 * DateRangeField namespace — sve-ui styled wrappers over bits-ui DateRangeField.
 *
 * Compose: Root > Label + Input > (a Segment per part, from the `segments`
 * snippet Input hands you).
 *
 * This is a segmented field, not a text input. Bits gives every segment
 * spinbutton ARIA — `aria-valuenow`, `aria-valuetext`, `aria-label` — so arrow
 * keys adjust it and a screen reader announces "month, 12" instead of reading a
 * formatted string. Numbers typed into a segment fill it and advance, and the
 * value is only committed once every segment is filled, so there is no
 * half-parsed state to guard against.
 *
 * That is the argument over the native input: the same keyboard model, with
 * markup and styling you control and identical rendering across browsers.

 * `value` is `{ start, end }`, and you render TWO Inputs — one
 * `type="start"` and one `type="end"`. `type` is REQUIRED; there is no single
 * input that holds a range.
 *
 * The ROOT is the `role="group"`, but Bits gives it NO accessible name — it
 * points each Input's `aria-labelledby` at your Label, and the Inputs carry no
 * role, so nothing exposed ends up labelled. Verified in the rendered DOM.
 *
 * So pass `aria-labelledby` (at your Label's id) or `aria-label` on Root
 * yourself, otherwise the field announces as an unnamed group. On the
 * single-value field the Input IS the group and Bits labels it, so this gap is
 * specific to ranges.
 *
 * Put a visual separator between them yourself, marked `aria-hidden` — a dash
 * read aloud between two dates adds nothing.
 *
 * `locale` decides the SEGMENT ORDER (month/day/year vs day/month/year), so the
 * wrong one rearranges the field rather than merely relabelling it. `granularity`
 * decides which segments exist at all.
 *
 * Dates are `DateValue` from `@internationalized/date`, a **peerDependency**.
 * Always render a `Label`.
 */

export { default as Root } from './DateRangeFieldRoot.svelte';
export { default as Label } from './DateRangeFieldLabel.svelte';
export { default as Input } from './DateRangeFieldInput.svelte';

// The Segment is shared with DateField: Bits re-exports the identical
// module to both namespaces, so one styled implementation serves each.
export { Segment } from '../DateField/index.js';
