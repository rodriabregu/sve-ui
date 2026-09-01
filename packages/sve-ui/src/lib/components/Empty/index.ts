/**
 * Empty namespace — the state a list, table or search result set is in when it
 * has nothing to show.
 *
 * Custom, not a Bits UI wrapper: there is no behaviour to buy here. The value is
 * getting three decisions right by default, each of which is usually got wrong:
 *
 *   - **The media is `aria-hidden`.** An icon above "No results" restates the
 *     title. Left in the tree it announces the same thing twice, or nothing.
 *   - **The title is a `<p>`, not a heading.** An empty state inside a card or a
 *     table cell has no section of its own, and injecting an `<h3>` puts "No
 *     results" in the document outline. Pass `level` when the surrounding
 *     structure genuinely warrants one.
 *   - **Announcing is opt-in.** `Root announce` sets `role="status"`, for the
 *     case that matters: results replaced by emptiness after a search. On first
 *     paint it would interrupt the heading above it.
 *
 * Compose:
 *   Root > Media
 *        > Title
 *        > Description
 *        > Actions
 *
 * Everything but Root is optional. A bare `Root > Title` is a legitimate empty
 * state; reach for the rest when there is something more to say.
 */

export { default as Root } from './EmptyRoot.svelte';
export { default as Media } from './EmptyMedia.svelte';
export { default as Title } from './EmptyTitle.svelte';
export { default as Description } from './EmptyDescription.svelte';
export { default as Actions } from './EmptyActions.svelte';
