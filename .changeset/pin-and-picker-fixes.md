---
'sve-ui': patch
---

Fix two visible bugs, both reported by using the components.

**`PinInput` never showed what you typed.** Bits' `Cell` renders
`<div {...props}>{@render children?.()}</div>` and nothing else — the character
is the consumer's to draw — and our wrapper was self-closing. The value updated
correctly and every box stayed blank, in every published version. Cells now render
their character, plus a caret placeholder for the cell the cursor is in, since the
real input is visually hidden and cannot show its own.

**The date pickers opened a transparent panel.** `.sve-picker__content` had only a
radius and a shadow and leant on the calendar inside for its background — while
telling that calendar to drop its frame, on the stated grounds that "the panel
already provides the border and shadow". It did not. On top of that, the picker's
calendar referenced `.sve-calendar` without importing that class's rules, so
route-level code splitting left the page without them. The result was dates
floating over the page behind them.

A floating panel now supplies its own surface: it cannot depend on its content for
one, because the content is whatever the caller puts there.

**Six shared stylesheets were inert.** The `.css` files extracted in `0.9.2` kept
their `:global(…)` wrapper. That is Svelte `<style>` syntax; in a plain stylesheet
it is an invalid selector and the browser drops the rule. So the unstyled-trigger
fix those files were written for had not actually taken effect.

`check-css-coverage` now catches all three shapes: it no longer counts a
contextual override as a declaration, and it rejects `:global()` in a plain
stylesheet.
