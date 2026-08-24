/**
 * RatingGroup namespace — sve-ui styled wrappers over bits-ui RatingGroup.
 *
 * Compose: Root > (snippet giving `items`) > Item per item.
 *
 * Bits gives Root a slider role with the aria-value* attributes, so arrow keys
 * adjust the rating: this is a real input, not a row of clickable icons. Each
 * item carries `data-state` of active / partial / inactive, so half-star
 * readings are expressible.
 *
 * Two things you must supply, because Bits cannot invent them:
 *   - a NAME, via `aria-label` on Root.
 *   - `aria-valuetext`, ideally as a function
 *     `(value, max) => \`${value} of ${max} stars\``. Without it the rating is
 *     announced as a bare number, and "3" says nothing about the scale.
 *
 * Pass `name` to include it in a form submission; Bits then renders a hidden
 * input. `value` is bindable.
 */

export {
  default as Root,
  type Size as RatingGroupSize,
} from './RatingGroupRoot.svelte';
export { default as Item } from './RatingGroupItem.svelte';
