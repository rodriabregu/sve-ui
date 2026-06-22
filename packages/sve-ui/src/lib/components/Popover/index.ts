/**
 * Popover namespace — sve-ui styled wrappers over bits-ui Popover primitives.
 *
 * Root, Trigger, Close: re-exported as-is (behavior-only, Bits UI owns ARIA + positioning).
 * Content: styled wrapper adding --sve-* token styles.
 * Content wraps Portal + Bits Content internally (consumers don't manage portaling).
 * Arrow: re-exported as-is for consumers who want a pointer arrow on the popover.
 *
 * Confirmed Bits UI 2.x API:
 *   import { Popover } from 'bits-ui'
 *   Popover.Root / Trigger / Close / Content / Arrow / Portal
 */

import { Popover as BitsPopover } from 'bits-ui';
import type { Component } from 'svelte';
import type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverCloseProps,
  PopoverArrowProps,
} from 'bits-ui';

// Behavior re-exports — cast to portable Component types to avoid referencing
// bits-ui internal types (OnChangeFn) in the exported declaration.
export const Root: Component<PopoverRootProps> = BitsPopover.Root as Component<PopoverRootProps>;
export const Trigger: Component<PopoverTriggerProps> = BitsPopover.Trigger as Component<PopoverTriggerProps>;
export const Close: Component<PopoverCloseProps> = BitsPopover.Close as Component<PopoverCloseProps>;
// Arrow: bits-ui floating-ui arrow for visual pointer; positioning is automatic.
export const Arrow: Component<PopoverArrowProps> = BitsPopover.Arrow as Component<PopoverArrowProps>;

export { default as Content } from './PopoverContent.svelte';
