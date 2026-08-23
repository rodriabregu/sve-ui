/**
 * Breadcrumb namespace — custom, not a Bits primitive.
 *
 * There is nothing to wrap here: the platform already has the right semantics.
 * A `<nav>` landmark wrapping an ordered list IS a breadcrumb trail, so this
 * ships that markup with tokens applied rather than rebuilding it with ARIA.
 *
 * Compose: Root > List > Item (+ Separator between items).
 *
 * Two details that are easy to get wrong and are handled here:
 *   - The LAST crumb takes `current` on its Link. It then renders as plain text
 *     with `aria-current="page"`, because a link to the page you are already on
 *     is a dead end.
 *   - Separators are decorative (`aria-hidden` + `role="presentation"`), so a
 *     screen reader reads "Home, Projects, Settings" instead of
 *     "Home, slash, Projects, slash, Settings".
 *
 * Root's `label` defaults to "Breadcrumb", which is what lets a screen reader
 * user tell this nav apart from the site's main navigation.
 */

export { default as Root } from './BreadcrumbRoot.svelte';
export { default as List } from './BreadcrumbList.svelte';
export { default as Item } from './BreadcrumbItem.svelte';
export { default as Link } from './BreadcrumbLink.svelte';
export { default as Separator } from './BreadcrumbSeparator.svelte';
