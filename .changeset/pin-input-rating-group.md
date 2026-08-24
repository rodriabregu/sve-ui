---
'sve-ui': minor
---

Add PinInput and RatingGroup — no new dependencies. With these, every Bits UI primitive except the date and time family is now wrapped.

- **`PinInput`** namespace (`Root`, `Cell`) — one-time codes and PINs. `maxlength` is required and sets the number of cells; `value` is bindable and `onComplete` fires once every cell is filled.

  The cells look like separate boxes but they are not: Bits renders **one** real input behind them. That is the whole reason to use this rather than rolling your own — paste fills every cell at once, mobile SMS autofill works (`autocomplete="one-time-code"`), there is no tabbing between boxes, and a screen reader announces one field instead of six. `pasteTransformer` lets you strip hyphens and spaces before they reach the cells.

  **`<label for>` does not work here.** The `id` you pass lands on the wrapper `<div>`, and the real input gets a Bits-internal id you cannot predict, so a `for` attribute has nothing to point at and you ship an unnamed field. Name it from Root instead — `aria-label`, or `aria-labelledby` pointing at your own visible label element. Verified against the rendered DOM and pinned by a test.

- **`RatingGroup`** namespace (`Root`, `Item`) — star ratings. `value` is bindable, `size` is sm/md/lg, and `name` includes it in a form submission.

  Bits gives Root `role="slider"` with the `aria-value*` attributes, so arrow keys adjust the rating and the whole control is one tab stop; the items are `role="presentation"`, carrying `data-state` of active, partial or inactive, so half-star readings are expressible. A hand-rolled row of clickable icons looks identical and is unusable by keyboard.

  Set **both** `aria-label` and `aria-valuetext` on Root. Pass `aria-valuetext` as a function — `(value, max) => \`${value} of ${max} stars\`` — otherwise the rating is announced as a bare number, and "3" says nothing about the scale a sighted user gets for free.

Also exports `RatingGroupSize`.

### Fixed

The docs registry was missing entries for `range-calendar`, `date-range-field`, `date-range-picker`, `time-field` and `time-range-field`, so the "coming soon" list — and the count on the components index — understated what is left to build.
