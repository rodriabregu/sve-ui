/**
 * Switch namespace — sve-ui styled wrapper over the bits-ui Switch primitive.
 *
 * Root: styled track + thumb (Bits owns ARIA role="switch", keyboard, state).
 * `bind:checked` is forwarded to the Bits root.
 */

export { default as Root, type Size as SwitchSize } from './SwitchRoot.svelte';
