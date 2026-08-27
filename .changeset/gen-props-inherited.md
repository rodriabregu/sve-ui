---
'sve-ui': patch
---

Docs: the prop tables now document props inherited from Bits UI.

Most components here are thin Bits wrappers whose `Props` reads
`extends Omit<ComponentProps<typeof Bits.Root>, …>` and declares almost nothing
of its own — every real prop is inherited and forwarded through the spread. The
generator read the AST only, so six documented components had **zero** generated
coverage and their tables had to be written by hand.

It now resolves the heritage clause with the TypeScript checker, pulling
descriptions from Bits' own JSDoc. `pagination` went from 2 documented props to
18; `menubar` from 4 to 50.

No library code changed. Published only because the docs are part of what the
package promises.
