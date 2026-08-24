---
'sve-ui': minor
---

Add the `Stack` and `Flex` layout primitives.

- **`Stack`** — vertical flow. `<Stack gap={4}>` is `display: flex; flex-direction: column; gap: 1rem`, with `align` defaulting to `stretch` so stacked form fields fill the width.
- **`Flex`** — the general case. `direction`, `gap`, `align`, `justify`, `wrap`. `align` defaults to `center` rather than the CSS default of `stretch`, because a row of mixed-height things — a label beside a button, an icon beside text — almost always wants centring and `stretch` visibly breaks it.

Both take `as` so the markup stays semantic (`ul`, `fieldset`, `nav`) instead of wrapping a div around the real element, and both reset list styling so `as="ul"` does not render bullets.

**The narrow API is the feature.** `gap` is a spacing **token key** (`gap={4}`), not an arbitrary length, and there is no `margin`, `padding`, `width` or colour prop. Margin belongs to the parent — a component that sets its own outer margin cannot be reused in a layout that spaces things differently — and constraining the gap is what keeps rhythm consistent instead of letting every screen invent its own spacing.

This library already shipped the other version of this idea: the pre-1.0 `Box` took seventeen style props with duplicate aliases (`p`/`padding`, `m`/`margin`, `w`/`width`) and concatenated inline style strings. It had reinvented CSS with a worse syntax, and it was dropped rather than ported. When you want something `Stack` or `Flex` does not express, reach for CSS — that is the boundary working, not a gap in the component.

Also exports `StackGap`, `StackAlign`, `StackAs`, `FlexGap`, `FlexDirection`, `FlexAlign`, `FlexJustify`, `FlexAs`.
