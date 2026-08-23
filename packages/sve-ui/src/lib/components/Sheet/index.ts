/**
 * Sheet namespace — a Dialog anchored to an edge of the viewport.
 *
 * This is NOT a separate Bits primitive. It composes bits-ui Dialog, so it
 * inherits the focus trap, ESC handling, scroll lock and ARIA rather than
 * reimplementing any of it. What Sheet adds is placement: `side` pins the panel
 * to an edge and `size` sets its thickness on the axis it grows along.
 *
 * Reach for Sheet over Dialog when the content is a secondary surface the user
 * moves through — a nav drawer, a filter panel, a detail pane. Use Dialog when
 * the content is a focused, self-contained task.
 *
 * Root, Trigger, Close: re-exported from Dialog (behaviour only).
 * Overlay, Content, Title, Description: styled wrappers.
 * Content renders Portal + Overlay internally.
 *
 * `Title` is required — Bits points the sheet's `aria-labelledby` at it.
 */

import { Dialog as BitsDialog } from 'bits-ui';

// Behaviour-only re-exports — a Sheet is opened and closed exactly like a Dialog
export const Root = BitsDialog.Root;
export const Trigger = BitsDialog.Trigger;
export const Close = BitsDialog.Close;

// Styled wrappers
export { default as Overlay } from './SheetOverlay.svelte';
export {
  default as Content,
  type Side as SheetSide,
  type Size as SheetSize,
} from './SheetContent.svelte';
export { default as Title } from './SheetTitle.svelte';
export { default as Description } from './SheetDescription.svelte';
