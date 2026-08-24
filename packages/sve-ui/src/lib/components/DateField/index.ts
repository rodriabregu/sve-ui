/**
 * DateField namespace — sve-ui styled wrappers over bits-ui DateField.
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
 *
 * `locale` decides the SEGMENT ORDER (month/day/year vs day/month/year), so the
 * wrong one rearranges the field rather than merely relabelling it. `granularity`
 * decides which segments exist at all.
 *
 * Dates are `DateValue` from `@internationalized/date`, a **peerDependency**.
 * Always render a `Label`.
 */

export { default as Root } from './DateFieldRoot.svelte';
export { default as Label } from './DateFieldLabel.svelte';
export { default as Input } from './DateFieldInput.svelte';
export { default as Segment } from './DateFieldSegment.svelte';
