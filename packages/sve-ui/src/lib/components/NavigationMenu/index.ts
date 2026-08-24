/**
 * NavigationMenu namespace — sve-ui styled wrappers over bits-ui NavigationMenu.
 *
 * Compose: Root > List > Item > (Trigger + Content) or Link, with an optional
 * Viewport after the List.
 *
 * This is the right primitive for SITE navigation. Its triggers open on hover
 * after `delayDuration` AND on click or Enter, so the menu works for pointer,
 * keyboard and touch alike — which is exactly where Menubar (a desktop-app
 * pattern that assumes hover) falls down on the web.
 *
 * Root renders a <nav> landmark: give it an `aria-label`. Mark the current page
 * with `active` on its Link, which makes Bits report `aria-current="page"`.
 *
 * Viewport is optional. Adding one gives every Content panel a single shared
 * container, so switching menus resizes one surface instead of swapping boxes;
 * Bits publishes the measured size as
 * `--bits-navigation-menu-viewport-width/height`.
 *
 * bits-ui does not re-export its NavigationMenu*Props types from the package
 * root, so the behaviour re-exports below derive them with `ComponentProps`.
 */

import { NavigationMenu as BitsNavigationMenu } from 'bits-ui';
import type { Component, ComponentProps } from 'svelte';

type ItemProps = ComponentProps<typeof BitsNavigationMenu.Item>;
type SubProps = ComponentProps<typeof BitsNavigationMenu.Sub>;
type IndicatorProps = ComponentProps<typeof BitsNavigationMenu.Indicator>;

// Behaviour re-exports — cast to portable Component types so the emitted
// declaration does not reference bits-ui internals (OnChangeFn).
export const Item: Component<ItemProps> = BitsNavigationMenu.Item as Component<ItemProps>;
export const Sub: Component<SubProps> = BitsNavigationMenu.Sub as Component<SubProps>;
export const Indicator: Component<IndicatorProps> =
	BitsNavigationMenu.Indicator as Component<IndicatorProps>;

// Styled wrappers
export { default as Root } from './NavigationMenuRoot.svelte';
export { default as List } from './NavigationMenuList.svelte';
export { default as Trigger } from './NavigationMenuTrigger.svelte';
export { default as Content } from './NavigationMenuContent.svelte';
export { default as Link } from './NavigationMenuLink.svelte';
export { default as Viewport } from './NavigationMenuViewport.svelte';
