/**
 * Command namespace — sve-ui styled wrappers over bits-ui Command
 * (the command-palette / cmdk pattern).
 *
 * Compose: Root > Input + List > Viewport > (Empty | Loading | Group >
 * GroupHeading + GroupItems > Item).
 *
 * `Viewport` is REQUIRED, not decorative. Bits takes the Input's
 * `aria-controls` from the Viewport's id and uses it as the insertion element
 * when sorting filtered items — omit it and the combobox is invalid ARIA
 * (axe: aria-required-attr) with no element to point at. Found by running axe
 * over a Command without one.
 *
 * Bits owns the filtering, the scoring and arrow-key navigation between visible
 * items, and it keeps focus in the Input while the highlight moves — so the user
 * types and navigates without ever leaving the field.
 *
 * Things worth getting right:
 *   - `label` on Root names the SEARCH FIELD (it renders a hidden <label> the
 *     Input references) — not the palette as a whole. The LIST is named by
 *     `ariaLabel` on `Command.List`, which Bits defaults to "Suggestions...";
 *     pass your own so the list says what it holds.
 *   - Always render an `Empty`. A palette that goes silently blank reads as
 *     broken rather than as "no results".
 *   - Use `Loading` for async results instead of `Empty`. "No results" and
 *     "still loading" are different answers, and conflating them tells the user
 *     to stop typing when they should wait.
 *   - Add `keywords` to an Item for synonyms not in its label — "trash" on a
 *     Delete item.
 *   - Set `shouldFilter={false}` when you filter server-side, then render only
 *     the items you want shown.
 *
 * To open it in a modal, wrap the whole thing in a Dialog.
 *
 * bits-ui does not re-export its Command*Props types from the package root, so
 * the behaviour re-exports below derive them with `ComponentProps`.
 */

import { Command as BitsCommand } from 'bits-ui';
import type { Component, ComponentProps } from 'svelte';

type ViewportProps = ComponentProps<typeof BitsCommand.Viewport>;
type GroupItemsProps = ComponentProps<typeof BitsCommand.GroupItems>;
type LinkItemProps = ComponentProps<typeof BitsCommand.LinkItem>;

// Behaviour re-exports — cast to portable Component types so the emitted
// declaration does not reference bits-ui internals.
export const Viewport: Component<ViewportProps> = BitsCommand.Viewport as Component<ViewportProps>;
export const GroupItems: Component<GroupItemsProps> =
	BitsCommand.GroupItems as Component<GroupItemsProps>;
// LinkItem is an Item that navigates — a real anchor, so middle-click and
// open-in-new-tab keep working.
export const LinkItem: Component<LinkItemProps> = BitsCommand.LinkItem as Component<LinkItemProps>;

// Styled wrappers
export { default as Root } from './CommandRoot.svelte';
export { default as Input } from './CommandInput.svelte';
export { default as List } from './CommandList.svelte';
export { default as Item } from './CommandItem.svelte';
export { default as Group } from './CommandGroup.svelte';
export { default as GroupHeading } from './CommandGroupHeading.svelte';
export { default as Empty } from './CommandEmpty.svelte';
export { default as Separator } from './CommandSeparator.svelte';
export { default as Loading } from './CommandLoading.svelte';
