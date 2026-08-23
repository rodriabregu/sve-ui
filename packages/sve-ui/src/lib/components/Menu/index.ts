/**
 * Shared styled menu parts — INTERNAL, not exported as a public namespace.
 *
 * Bits re-exports the same `menu/components/*` files under both DropdownMenu
 * and ContextMenu (verified: Item, Group, GroupHeading, Separator,
 * CheckboxItem, RadioItem, RadioGroup, Sub, SubTrigger, SubContent, Arrow are
 * byte-identical modules). Only Root, Trigger and Content differ.
 *
 * So these wrappers are written once and re-exported by both namespaces. The
 * menu context comes from whichever Root wraps them, which is why a single
 * implementation works. Duplicating them would mean two copies of the same CSS
 * drifting apart.
 *
 * `Menu` alone is not usable — it has no Root — which is why it stays internal.
 */

export { default as Item } from './MenuItem.svelte';
export { default as Group } from './MenuGroup.svelte';
export { default as Label } from './MenuLabel.svelte';
export { default as Separator } from './MenuSeparator.svelte';
