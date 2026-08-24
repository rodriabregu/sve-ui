/**
 * PinInput namespace — sve-ui styled wrappers over bits-ui PinInput
 * (one-time codes, PINs).
 *
 * Compose: Root > (snippet giving `cells`) > Cell per cell.
 *
 * The important part is what Bits does NOT do: it renders ONE real input behind
 * the cells rather than one input per digit. That is what makes paste, browser
 * autofill and mobile SMS autofill work, means the user never tabs between
 * boxes, and lets a screen reader announce a single field instead of six.
 * Building this from six inputs looks the same and behaves far worse.
 *
 * `maxlength` is required — it is the number of cells. `value` is bindable, and
 * `onComplete` fires when every cell is filled, so you can submit without
 * making the user hunt for a button.
 *
 * NAMING IT: `<label for>` does NOT work. `id` lands on the wrapper div and
 * the real input gets a Bits-internal id you cannot predict, so there is
 * nothing to point `for` at. The spread reaches the input, so name it from
 * Root: `aria-label` for a plain name, or `aria-labelledby` pointing at your
 * own visible label element. Verified against the rendered DOM.
 */

export { default as Root } from './PinInputRoot.svelte';
export { default as Cell } from './PinInputCell.svelte';
