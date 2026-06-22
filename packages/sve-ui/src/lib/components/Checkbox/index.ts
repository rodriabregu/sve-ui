/**
 * Checkbox namespace — sve-ui styled wrapper over the bits-ui Checkbox primitive.
 *
 * Root: styled box + check/indeterminate indicator (Bits owns ARIA
 * role="checkbox", keyboard, and state). `bind:checked` and `bind:indeterminate`
 * are forwarded to the Bits root.
 */

export { default as Root, type Size as CheckboxSize } from './CheckboxRoot.svelte';
