/**
 * RadioGroup namespace — sve-ui styled wrappers over bits-ui RadioGroup.
 *
 * Root: styled group container; `bind:value` is forwarded to the Bits root
 * (Bits owns ARIA role="radiogroup", roving focus, and keyboard navigation).
 * Item: styled radio with a selected dot indicator. `value` is required.
 */

export { default as Root } from './RadioGroupRoot.svelte';
export { default as Item } from './RadioGroupItem.svelte';
