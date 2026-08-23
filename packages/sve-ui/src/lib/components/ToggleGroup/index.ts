/**
 * ToggleGroup namespace — sve-ui styled wrappers over bits-ui ToggleGroup.
 *
 * Root: segmented container. `type` is REQUIRED and decides the shape of
 * `value` — "single" gives a string, "multiple" gives a string[]. Bits owns the
 * group role, roving focus and arrow-key navigation.
 * Item: one segment, keyed by `value`.
 *
 * Use a single `Toggle` instead when there is only one independent on/off
 * button with no set to belong to.
 */

export { default as Root, type Size as ToggleGroupSize } from './ToggleGroupRoot.svelte';
export { default as Item } from './ToggleGroupItem.svelte';
