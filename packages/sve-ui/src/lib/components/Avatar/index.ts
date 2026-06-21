/**
 * Avatar namespace — sve-ui styled wrappers over bits-ui Avatar primitives.
 *
 * Root: styled wrapper adding size + shape via --sve-* tokens.
 * Image: styled wrapper, forwards img attributes.
 * Fallback: styled wrapper, shown on load error or while loading.
 *
 * Confirmed Bits UI 2.18.1 API:
 *   import { Avatar } from 'bits-ui'
 *   Avatar.Root / Avatar.Image / Avatar.Fallback
 */

export { default as Root } from './AvatarRoot.svelte';
export { default as Image } from './AvatarImage.svelte';
export { default as Fallback } from './AvatarFallback.svelte';
