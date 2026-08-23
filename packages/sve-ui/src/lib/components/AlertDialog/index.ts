/**
 * AlertDialog namespace — sve-ui styled wrappers over bits-ui AlertDialog.
 *
 * Use this instead of Dialog when the user must make a decision before
 * continuing, and one of the outcomes is destructive. The differences are
 * behavioural, not decorative:
 *
 *   - `role="alertdialog"`, so assistive technology announces it as an
 *     interruption rather than a panel.
 *   - Clicking the backdrop does NOT dismiss it. Bits omits
 *     `onInteractOutside` on Content, so a stray click cannot resolve a
 *     destructive choice.
 *   - Cancel receives initial focus, so pressing Enter never destroys anything.
 *
 * Title is required — Bits points the dialog's `aria-labelledby` at it.
 *
 * Root, Trigger, Portal: re-exported as-is (behaviour only).
 * Overlay, Content, Title, Description, Action, Cancel: styled wrappers.
 * Content renders Portal + Overlay internally, so consumers never manage
 * portaling.
 */

import { AlertDialog as BitsAlertDialog } from 'bits-ui';

// Behaviour-only re-exports
export const Root = BitsAlertDialog.Root;
export const Trigger = BitsAlertDialog.Trigger;

// Styled wrappers
export { default as Overlay } from './AlertDialogOverlay.svelte';
export { default as Content } from './AlertDialogContent.svelte';
export { default as Title } from './AlertDialogTitle.svelte';
export { default as Description } from './AlertDialogDescription.svelte';
export {
  default as Action,
  type Color as AlertDialogActionColor,
} from './AlertDialogAction.svelte';
export { default as Cancel } from './AlertDialogCancel.svelte';
