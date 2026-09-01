/**
 * Resizable namespace — panes with a draggable, keyboard-operable divider.
 *
 * Custom, not a Bits UI wrapper: Bits ships no splitter. Implements the APG
 * window-splitter pattern, which is mostly a keyboard contract — that is the part
 * every hand-rolled divider skips.
 *
 * Compose:
 *   Group > Pane > … > Handle index={0} > Pane > …
 *
 * `Handle index` is the pane on its leading side: the one whose share
 * `aria-valuenow` reports and whose id it points `aria-controls` at.
 *
 * What the handle actually does, none of which is optional:
 *
 *   - `role="separator"` with `tabindex="0"`, `aria-orientation`, and
 *     `aria-valuenow` / `min` / `max`. A separator with a tabindex IS a control,
 *     so `label` is required — "splitter, 40" names a number and not the thing
 *     it sizes.
 *   - Arrow keys move it by `step`, Home and End collapse and expand. A divider
 *     that only answers to a drag is unusable without a pointer.
 *   - `setPointerCapture`, so a drag survives the pointer leaving a hairline
 *     target — which it does immediately.
 *   - A 12px hit area from a pseudo-element, because 1px is the right thing to
 *     look at and an unreasonable thing to hit.
 *
 * A drag moves ONE boundary and touches exactly TWO panes, clamped against both
 * of their limits before anything is applied. Distributing a drag across the
 * whole group is what makes dragging one divider reflow the far side of a layout.
 *
 * What it does NOT do:
 *
 *   - It does not persist sizes. Where that belongs — a cookie, a profile,
 *     `localStorage` — is an application decision, and guessing it wrong is worse
 *     than not guessing.
 *   - It does not collapse to zero by default. `Pane min` defaults to 10; set
 *     `min={0}` if a pane should be able to disappear.
 */

export { default as Group } from './ResizableGroup.svelte';
export { default as Pane } from './ResizablePane.svelte';
export { default as Handle } from './ResizableHandle.svelte';
export { useResizable, type ResizableContext, type Direction } from './context.js';
