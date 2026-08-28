---
'sve-ui': patch
---

Docs: every prop table is now generated from the types.

Twenty-seven pages hand-wrote their rows, which drifts the moment a prop changes.
Closing that needed three things the generator could not do:

- **Inherited Bits props**, resolved through the TypeScript checker rather than
  the AST. Six components had zero generated coverage because they declare almost
  nothing of their own and forward everything.
- **The handful of HTML attributes that are a component's whole point** —
  `Input.value`, `Label.for`, `Button.disabled`, `LinkPreview.Trigger.href`. The
  declaration-file filter drops the other two hundred correctly and these
  wrongly. They are labelled `html` rather than `bits-ui`, so a reader is not sent
  to the wrong documentation.
- **The sixty re-exported parts with no `.svelte` file.** `Dialog.Root`,
  `Tooltip.Provider`, `Select.Root` and the rest exist only as
  `export const Root = BitsDialog.Root`, because Root renders nothing visual.

Result: 1,181 documented props, none hand-written, and `check-docs-coverage` now
fails the build if a page starts writing its own again.

No library code changed.
