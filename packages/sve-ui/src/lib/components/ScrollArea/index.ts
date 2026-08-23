/**
 * ScrollArea namespace — sve-ui styled wrappers over bits-ui ScrollArea.
 *
 * Compose: Root > Viewport (your content) + one Scrollbar per axis, each
 * containing a Thumb.
 *
 * Put the height or width constraint on Root — the Viewport fills it and does
 * the actual scrolling.
 *
 * Bits keeps the Viewport a real scroll container, so wheel, touch and keyboard
 * scrolling all keep working; only the scrollbar chrome is restyled. Note that
 * the default `type="hover"` hides the scrollbar until the pointer enters,
 * which removes the visual hint that more content exists — prefer
 * `type="always"` when the overflow is not otherwise obvious.
 */

export {
  default as Root,
  type Type as ScrollAreaType,
} from './ScrollAreaRoot.svelte';
export { default as Viewport } from './ScrollAreaViewport.svelte';
export { default as Scrollbar } from './ScrollAreaScrollbar.svelte';
export { default as Thumb } from './ScrollAreaThumb.svelte';
