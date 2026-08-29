---
'sve-ui': patch
---

Documentation only: the README now lists every component the package exports.

No code changed. This is a release because the README **is** the npm page, and
npm only re-renders it when a version is published — so the fix reaches nobody
until it ships.

What it was: the README listed 18 of 61 exports and described a sixty-component
library as sixteen. `Table`, `Toast`, `Sidebar`, `Combobox`, `Command`, `Select`,
`Tabs`, `Field`, `Busy` and the entire date family — 43 components — were not
named anywhere in the file. Anyone evaluating the package from npm was reading a
catalog missing three quarters of its contents.

All 60 are now listed, grouped the way the documentation site groups them, with
`.*` marking the namespace compositions so the single-versus-namespace import
split is answerable without leaving the page.

`scripts/check-readme-coverage.mjs` now fails the build when an export is missing
from that table, and separately when the stated count disagrees with the exports.
The registry, the docs pages and the agent skill were already guarded; the one
surface a person actually lands on was not, which is exactly why it rotted
unnoticed.
