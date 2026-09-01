/**
 * InputGroup namespace — an `Input` with addons attached to it, rendered as one
 * control.
 *
 * Custom, not a Bits UI wrapper: there is no behaviour here, only the styling
 * problem that makes people give up and hand-roll it. An addon placed next to a
 * bordered input is two boxes touching. This moves the border and the focus ring
 * onto the wrapper and strips them from the input, so the addon reads as part of
 * the field.
 *
 * Compose:
 *   Root > Addon?  (prefix)
 *        > Input
 *        > Addon?  (suffix)
 *
 * The addon's side comes from where you put it. There is no `side` prop, because
 * DOM order already says it and a prop that could disagree with the layout is a
 * prop that will.
 *
 * What it does NOT do:
 *
 *   - It is not a form control and takes no ARIA role. The `<input>` inside is
 *     still the only thing in the accessibility tree, and it still needs a real
 *     label — use `Field`.
 *   - It does not label the input. `Addon` is `aria-hidden` by default because a
 *     `$` or a magnifier is a hint for the eye; the information belongs in the
 *     input's accessible name. `decorative={false}` puts an addon back in the
 *     tree, but an addon still cannot BE the label.
 *   - It does not size the input for you. Pass the same `size` to both, so the
 *     addon's padding matches the field's height.
 *
 * A button addon works — put a `Button variant="ghost"` where an `Addon` would
 * go — and `:focus-within` keeps the ring around the whole group when it is
 * focused.
 */

export { default as Root } from './InputGroupRoot.svelte';
export { default as Addon } from './InputGroupAddon.svelte';
