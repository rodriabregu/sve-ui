/**
 * Toolbar namespace — sve-ui styled wrappers over bits-ui Toolbar.
 *
 * Bits owns `role="toolbar"` and roving focus, which is the reason to use it
 * over a plain row of buttons: the whole toolbar is ONE tab stop and arrow keys
 * move between controls. A twelve-button toolbar then costs a keyboard user one
 * Tab instead of twelve.
 *
 * Pick the right part for the job — the semantics are not interchangeable:
 *   Button    — performs an action
 *   Link      — NAVIGATES; stays a real anchor, so middle-click and
 *               open-in-new-tab keep working
 *   Group     — a toggle group; `type` is required and sets the shape of `value`
 *   GroupItem — one toggle inside a Group
 *
 * Give Root an `aria-label`, and icon-only controls their own.
 */

export { default as Root } from './ToolbarRoot.svelte';
export { default as Button } from './ToolbarButton.svelte';
export { default as Link } from './ToolbarLink.svelte';
export { default as Group } from './ToolbarGroup.svelte';
export { default as GroupItem } from './ToolbarGroupItem.svelte';
