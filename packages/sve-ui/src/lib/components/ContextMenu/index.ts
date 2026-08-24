/**
 * ContextMenu namespace — sve-ui styled wrappers over bits-ui ContextMenu.
 *
 * Trigger is the right-click REGION, not a button: it wraps the content the
 * menu acts on.
 *
 * IMPORTANT — a context menu is a shortcut, never the only route to an action.
 * Right-click is undiscoverable, and touch devices have no right-click at all,
 * so every action offered here must also be reachable from a visible control.
 *
 * Item, Group, Label and Separator are SHARED with DropdownMenu: Bits
 * re-exports the identical `menu/components/*` modules under both namespaces,
 * so one styled implementation serves each. Bits derives its data attributes
 * from the surrounding Root, so the same wrapper emits
 * `data-context-menu-item` here and `data-dropdown-menu-item` there.
 */

import { ContextMenu as BitsContextMenu } from 'bits-ui';
import type { Component } from 'svelte';
import type {
	ContextMenuRootProps,
	ContextMenuSubProps,
	ContextMenuSubTriggerProps,
	ContextMenuSubContentProps,
	ContextMenuCheckboxItemProps,
	ContextMenuRadioItemProps,
	ContextMenuRadioGroupProps,
	ContextMenuArrowProps
} from 'bits-ui';

// Behaviour re-exports — cast to portable Component types so the emitted
// declaration does not reference bits-ui internals (OnChangeFn).
export const Root: Component<ContextMenuRootProps> =
	BitsContextMenu.Root as Component<ContextMenuRootProps>;
export const Sub: Component<ContextMenuSubProps> =
	BitsContextMenu.Sub as Component<ContextMenuSubProps>;
export const SubTrigger: Component<ContextMenuSubTriggerProps> =
	BitsContextMenu.SubTrigger as Component<ContextMenuSubTriggerProps>;
export const SubContent: Component<ContextMenuSubContentProps> =
	BitsContextMenu.SubContent as Component<ContextMenuSubContentProps>;
export const CheckboxItem: Component<ContextMenuCheckboxItemProps> =
	BitsContextMenu.CheckboxItem as Component<ContextMenuCheckboxItemProps>;
export const RadioItem: Component<ContextMenuRadioItemProps> =
	BitsContextMenu.RadioItem as Component<ContextMenuRadioItemProps>;
export const RadioGroup: Component<ContextMenuRadioGroupProps> =
	BitsContextMenu.RadioGroup as Component<ContextMenuRadioGroupProps>;
export const Arrow: Component<ContextMenuArrowProps> =
	BitsContextMenu.Arrow as Component<ContextMenuArrowProps>;

// Styled wrappers unique to this menu
export { default as Trigger } from './ContextMenuTrigger.svelte';
export { default as Content } from './ContextMenuContent.svelte';

// Shared with DropdownMenu
export { Item, Group, Label, Separator } from '../Menu/index.js';
