/**
 * DropdownMenu namespace — sve-ui styled wrappers over bits-ui DropdownMenu primitives.
 *
 * Root, Trigger, Sub, SubTrigger, SubContent, CheckboxItem, RadioItem, RadioGroup:
 *   re-exported as-is (behavior-only, Bits UI owns ARIA + keyboard).
 * Content, Item, Separator, Group, Label: styled wrappers adding --sve-* token styles.
 * Content wraps Portal + Bits Content internally (consumers don't manage portaling).
 *
 * Confirmed Bits UI 2.x API:
 *   import { DropdownMenu } from 'bits-ui'
 *   DropdownMenu.Root / Trigger / Content / Item / Separator / Group /
 *   GroupHeading / Sub / SubTrigger / SubContent / CheckboxItem / RadioItem /
 *   RadioGroup / Portal
 */

import { DropdownMenu as BitsDropdownMenu } from 'bits-ui';
import type { Component } from 'svelte';
import type {
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuArrowProps,
} from 'bits-ui';

// Behavior re-exports — cast to portable Component types to avoid referencing
// bits-ui internal types (OnChangeFn) in the exported declaration.
export const Root: Component<DropdownMenuRootProps> = BitsDropdownMenu.Root as Component<DropdownMenuRootProps>;
export const Trigger: Component<DropdownMenuTriggerProps> = BitsDropdownMenu.Trigger as Component<DropdownMenuTriggerProps>;
export const Sub: Component<DropdownMenuSubProps> = BitsDropdownMenu.Sub as Component<DropdownMenuSubProps>;
export const SubTrigger: Component<DropdownMenuSubTriggerProps> = BitsDropdownMenu.SubTrigger as Component<DropdownMenuSubTriggerProps>;
export const SubContent: Component<DropdownMenuSubContentProps> = BitsDropdownMenu.SubContent as Component<DropdownMenuSubContentProps>;
export const CheckboxItem: Component<DropdownMenuCheckboxItemProps> = BitsDropdownMenu.CheckboxItem as Component<DropdownMenuCheckboxItemProps>;
export const RadioItem: Component<DropdownMenuRadioItemProps> = BitsDropdownMenu.RadioItem as Component<DropdownMenuRadioItemProps>;
export const RadioGroup: Component<DropdownMenuRadioGroupProps> = BitsDropdownMenu.RadioGroup as Component<DropdownMenuRadioGroupProps>;

// Arrow: bits-ui floating-ui arrow for visual pointer; positioning is automatic.
export const Arrow: Component<DropdownMenuArrowProps> = BitsDropdownMenu.Arrow as Component<DropdownMenuArrowProps>;

// Styled wrappers
export { default as Content } from './DropdownMenuContent.svelte';
export { default as Item } from './DropdownMenuItem.svelte';
export { default as Separator } from './DropdownMenuSeparator.svelte';
export { default as Group } from './DropdownMenuGroup.svelte';
export { default as Label } from './DropdownMenuLabel.svelte';
