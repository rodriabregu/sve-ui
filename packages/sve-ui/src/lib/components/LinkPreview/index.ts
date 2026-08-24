/**
 * LinkPreview namespace — sve-ui styled wrappers over bits-ui LinkPreview
 * (the "hover card" pattern).
 *
 * IMPORTANT — this is hover-only enrichment. The card opens on pointer hover
 * and never on focus, so keyboard and touch users never see it. Everything
 * inside it must be reachable another way; treat it as a shortcut, never as the
 * only path to information or an action.
 *
 * Root, Trigger, Arrow: re-exported as-is (behaviour + positioning from Bits).
 * Content: styled wrapper; renders Portal internally so consumers do not manage
 * portaling.
 */

import { LinkPreview as BitsLinkPreview } from 'bits-ui';
import type { Component } from 'svelte';
import type { LinkPreviewRootProps, LinkPreviewTriggerProps, LinkPreviewArrowProps } from 'bits-ui';

// Behaviour re-exports — cast to portable Component types so the emitted
// declaration does not reference bits-ui internals (OnChangeFn).
export const Root: Component<LinkPreviewRootProps> =
	BitsLinkPreview.Root as Component<LinkPreviewRootProps>;
export const Trigger: Component<LinkPreviewTriggerProps> =
	BitsLinkPreview.Trigger as Component<LinkPreviewTriggerProps>;
export const Arrow: Component<LinkPreviewArrowProps> =
	BitsLinkPreview.Arrow as Component<LinkPreviewArrowProps>;

export { default as Content } from './LinkPreviewContent.svelte';
