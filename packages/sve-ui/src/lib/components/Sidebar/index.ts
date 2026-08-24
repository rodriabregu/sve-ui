/**
 * Sidebar namespace — a composable app-shell navigation panel.
 *
 * Custom, not a Bits UI wrapper: Bits ships no sidebar, and there is no hard
 * behaviour to buy here. What a sidebar needs is a landmark, a labelled list, a
 * shared collapsed state and a toggle that announces itself — all of which the
 * platform gives us directly.
 *
 * Compose:
 *   Provider > Trigger
 *            > Root > Header
 *                   > Content > Group > GroupLabel + Menu > Item
 *                   > Footer
 *            > (your main content)
 *
 * `Provider` owns the state and provides the context; `Root` is the `<aside>`.
 * They are separate parts because Svelte context reaches DESCENDANTS, not
 * siblings — with the state on Root, a Trigger in a top bar next to the sidebar
 * would never see it, and with `collapsible="offcanvas"` the Trigger has to be
 * outside or collapsing hides the only way back.
 *
 * `collapsed` is bindable on Provider — persist it, because a sidebar that
 * forgets on every navigation is worse than one that never collapsed. `Item` and
 * `GroupLabel` adapt from context without being told.
 *
 * `collapsible` decides what collapsing looks like:
 *   `icon`      — narrows to a rail; labels hide, items stay reachable
 *   `offcanvas` — slides out entirely
 *   `none`      — not collapsible
 *
 * NO JS MEDIA QUERY. The collapsed presentation is one CSS class, deliberately:
 * a library that swaps the markup for a drawer below some breakpoint hardcodes
 * that breakpoint, cannot know it during SSR, and flashes the wrong layout on
 * hydration. `collapsible="offcanvas"` plus the app's own breakpoint gets the
 * same result, and the app keeps control of when it happens.
 *
 * Accessibility notes worth reading before shipping:
 *   - `Root` is a named `<aside>`; an app shell usually has more than one
 *     complementary region.
 *   - Point each `Group`'s `aria-labelledby` at its `GroupLabel` id. A visual
 *     heading assistive technology cannot connect to its items is decoration.
 *   - Give icon-only `Item`s a `label`. On a collapsed rail it becomes the
 *     accessible name; without it the rail is a column of unnamed links.
 *   - `Trigger` can live anywhere inside the Provider, and with `offcanvas` it
 *     MUST be outside the sidebar itself — otherwise collapsing hides the only
 *     way back.
 *
 * Size it with `--sve-sidebar-width` and `--sve-sidebar-width-icon`.
 */

export { default as Provider } from './SidebarProvider.svelte';
export { default as Root } from './SidebarRoot.svelte';
export { default as Trigger } from './SidebarTrigger.svelte';
export { default as Header } from './SidebarHeader.svelte';
export { default as Content } from './SidebarContent.svelte';
export { default as Footer } from './SidebarFooter.svelte';
export { default as Group } from './SidebarGroup.svelte';
export { default as GroupLabel } from './SidebarGroupLabel.svelte';
export { default as Menu } from './SidebarMenu.svelte';
export { default as Item } from './SidebarItem.svelte';

export {
  useSidebar,
  type SidebarContext,
  type Collapsible as SidebarCollapsible,
  type Side as SidebarSide
} from './context.js';
