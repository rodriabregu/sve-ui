---
'sve-ui': patch
---

Declare `sideEffects` so bundlers can drop what you do not import.

The field was missing, so a consumer importing a single `Button` was shipping the
whole catalog's CSS. Measured against 0.6.0, a Button-only bundle was **34 KB of
JS and 52 KB of CSS covering 42 components** — Calendar, Sheet, Toolbar, Command
and the rest. It is now **2.2 KB of JS and CSS for 2**.

The value is `["**/*.css"]`, deliberately not `false`. `sve-ui/theme.css` is an
exported subpath that consumers import for its effect alone, and a blanket
`false` lets bundlers drop that import, taking every `--sve-*` token with it.

A new `check-treeshake` step in the package script bundles a Button-only entry
against the built output and fails if the rest of the library comes along, so the
regression cannot return unnoticed.
