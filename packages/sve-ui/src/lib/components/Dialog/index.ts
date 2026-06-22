/**
 * Dialog namespace — sve-ui styled wrappers over bits-ui Dialog primitives.
 *
 * Root, Trigger, Close: re-exported as-is (behavior-only, Bits UI owns ARIA + focus).
 * Overlay, Content, Title, Description: styled wrappers adding --sve-* token styles.
 * Content wraps Portal + Bits Content internally (consumers don't manage portaling).
 *
 * Confirmed Bits UI 2.18.1 API:
 *   import { Dialog } from 'bits-ui'
 *   Dialog.Root / Dialog.Trigger / Dialog.Close / Dialog.Portal /
 *   Dialog.Overlay / Dialog.Content / Dialog.Title / Dialog.Description
 */

import { Dialog as BitsDialog } from 'bits-ui';

// Behavior-only re-exports from bits-ui (no styling needed)
export const Root = BitsDialog.Root;
export const Trigger = BitsDialog.Trigger;
export const Close = BitsDialog.Close;

// Styled presentational wrappers
export { default as Overlay } from './DialogOverlay.svelte';
export { default as Content } from './DialogContent.svelte';
export { default as Title } from './DialogTitle.svelte';
export { default as Description } from './DialogDescription.svelte';
