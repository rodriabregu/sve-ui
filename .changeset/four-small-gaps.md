---
'sve-ui': minor
---

Four new components: `Kbd`, `ButtonGroup`, `Empty` and `InputGroup`.

These are the first components added since the library finished wrapping every
one of Bits UI's 41 primitives, so all four are hand-built. They were chosen by
diffing the catalog against shadcn-svelte: each one is a gap people currently fill
with a hand-rolled div, and none needs a new dependency.

**`Kbd`** — a keycap. `label` is the part that matters: `⌘`, `⇧` and `⌥` are
punctuation to a screen reader, and some voices skip them entirely, so a shortcut
rendered as glyphs alone can be announced as nothing at all. With a label the
glyph is hidden from the accessibility tree and the word is announced instead.
The library shipped `Command`, a command palette, with no way to draw the shortcut
it advertises.

**`ButtonGroup`** — attaches independent buttons into one control, collapsing the
doubled border between them and lifting whichever has focus so its ring is never
clipped by a neighbour. `label` or `labelledby` is required: it renders
`role="group"`, and a role without a name tells a screen reader there is a
boundary here and then cannot say what for. Use `Toolbar` when the whole bar
should be one tab stop, and `ToggleGroup` when the buttons carry a value.

**`Empty`** — the state a list, table or result set is in with nothing to show.
Three defaults, each usually got wrong: `Media` is always `aria-hidden` because
the icon restates the title; `Title` renders a `<p>` rather than a heading, so an
empty state inside a card cannot inject "No results" into the document outline;
and `announce` is opt-in, for the case that actually needs it — results replaced
by emptiness after a search, which is a change the user caused and cannot see.

**`InputGroup`** — an `Input` with prefix and suffix addons, drawn as one control.
The group owns the border and the `:focus-within` ring and the input owns neither,
which is what makes an addon read as part of the field instead of a box beside it.
`Addon` is `aria-hidden` by default and cannot be the label: a `$` is a hint for
the eye, and the meaning belongs in the input's accessible name.

Also in this release, both found by tightening a guard rather than by reading code:

- `apps/example`'s coverage guard accepted a namespace member as proof of a
  top-level export, so `\bEmpty\b` matched `Command.Empty`. With that fixed it
  reported the standalone `Calendar` as never rendered — true for months, and now
  rendered on the booking screen. A calendar inside a picker is a different mount.
- A test asserting `Empty.Root` is not a live region by default was measuring its
  own fixture's default. Flipping the component default to `true` left it green.
  Caught by mutation, and the fixture now renders the prop genuinely absent.
