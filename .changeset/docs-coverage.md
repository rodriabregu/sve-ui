---
'sve-ui': patch
---

Guard against a component nobody can find.

`check-docs-coverage` asserts that every export has a registry entry, every
component marked ready has a docs page, and every one of them appears in the
agent skill's catalog.

The drift it prevents is not hypothetical: `Collapsible` was missing from the
skill for a whole pull request, and `Busy` for a release. Both were caught by a
person noticing, which is not a system. It found the `Busy` gap on its first run.

No library code changed.
