/**
 * Menubar namespace — sve-ui styled wrappers over bits-ui Menubar.
 *
 * Compose: Root > Menu > (Trigger + Content > Item/Group/Label/Separator).
 * `Menu` groups one trigger with its panel; a menubar holds several.
 *
 * Bits owns `role="menubar"` and the behaviour that distinguishes a menubar
 * from a row of dropdowns: arrow keys move between top-level menus, and once
 * one is open, hovering a sibling switches to it without a second click.
 *
 * Item, Group, Label and Separator are the SHARED menu parts, also used by
 * DropdownMenu and ContextMenu — Bits re-exports identical `menu/components/*`
 * modules to all three, so one styled implementation serves them all. The parts
 * stay context-aware: Bits derives its data attributes from the surrounding
 * Root, so the same wrapper emits `data-menubar-item` here.
 *
 * Give Root an `aria-label`.
 */

import { Menubar as BitsMenubar } from 'bits-ui';
import type { Component, ComponentProps } from 'svelte';

// bits-ui does NOT re-export its Menubar*Props types from the package root
// (unlike DropdownMenu and Popover), so derive them from the components
// themselves. This is also the pattern the .svelte wrappers use.
type MenuProps = ComponentProps<typeof BitsMenubar.Menu>;
type SubProps = ComponentProps<typeof BitsMenubar.Sub>;
type SubTriggerProps = ComponentProps<typeof BitsMenubar.SubTrigger>;
type SubContentProps = ComponentProps<typeof BitsMenubar.SubContent>;
type CheckboxItemProps = ComponentProps<typeof BitsMenubar.CheckboxItem>;
type RadioItemProps = ComponentProps<typeof BitsMenubar.RadioItem>;
type RadioGroupProps = ComponentProps<typeof BitsMenubar.RadioGroup>;
type ArrowProps = ComponentProps<typeof BitsMenubar.Arrow>;

// Behaviour re-exports — cast to portable Component types so the emitted
// declaration does not reference bits-ui internals (OnChangeFn).
export const Menu: Component<MenuProps> = BitsMenubar.Menu as Component<MenuProps>;
export const Sub: Component<SubProps> = BitsMenubar.Sub as Component<SubProps>;
export const SubTrigger: Component<SubTriggerProps> =
  BitsMenubar.SubTrigger as Component<SubTriggerProps>;
export const SubContent: Component<SubContentProps> =
  BitsMenubar.SubContent as Component<SubContentProps>;
export const CheckboxItem: Component<CheckboxItemProps> =
  BitsMenubar.CheckboxItem as Component<CheckboxItemProps>;
export const RadioItem: Component<RadioItemProps> =
  BitsMenubar.RadioItem as Component<RadioItemProps>;
export const RadioGroup: Component<RadioGroupProps> =
  BitsMenubar.RadioGroup as Component<RadioGroupProps>;
export const Arrow: Component<ArrowProps> = BitsMenubar.Arrow as Component<ArrowProps>;

// Styled wrappers unique to the menubar
export { default as Root } from './MenubarRoot.svelte';
export { default as Trigger } from './MenubarTrigger.svelte';
export { default as Content } from './MenubarContent.svelte';

// Shared with DropdownMenu and ContextMenu
export { Item, Group, Label, Separator } from '../Menu/index.js';
