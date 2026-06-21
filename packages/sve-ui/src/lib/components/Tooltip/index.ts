/**
 * Tooltip namespace — sve-ui styled wrappers over bits-ui Tooltip primitives.
 *
 * Provider, Root, Trigger: re-exported as-is (behavior-only, Bits UI owns ARIA + timing).
 * Content: styled wrapper adding --sve-* token styles.
 * Content wraps Portal + Bits Content internally (consumers don't manage portaling).
 *
 * Confirmed Bits UI 2.x API:
 *   import { Tooltip } from 'bits-ui'
 *   Tooltip.Provider / Root / Trigger / Content / Portal
 */

import { Tooltip as BitsTooltip } from 'bits-ui';
import type { Component } from 'svelte';
import type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipArrowProps,
} from 'bits-ui';

// Behavior re-exports — cast to portable Component types to avoid referencing
// bits-ui internal $$IsomorphicComponent (Svelte 4 generic pattern) in the exported declaration.
export const Provider: Component<TooltipProviderProps> = BitsTooltip.Provider as Component<TooltipProviderProps>;
export const Root: Component<TooltipRootProps> = BitsTooltip.Root as Component<TooltipRootProps>;
export const Trigger: Component<TooltipTriggerProps> = BitsTooltip.Trigger as Component<TooltipTriggerProps>;
// Arrow: bits-ui floating-ui arrow for visual pointer; positioning is automatic.
export const Arrow: Component<TooltipArrowProps> = BitsTooltip.Arrow as Component<TooltipArrowProps>;

export { default as Content } from './TooltipContent.svelte';
