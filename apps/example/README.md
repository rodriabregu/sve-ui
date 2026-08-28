# example

A small real app built with `sve-ui`, kept in the repo because **internal
dogfooding was demonstrably not enough**.

The docs site is written by the same person as the library and still shipped six
JavaScript-only navigation buttons and a hardcoded "13 components" against a
registry of 58. An outside bug report found more in one issue than months of
internal use.

## What it exercises that the docs site cannot

The docs site renders everything synchronously from a static registry. This one
has **latency**: a stub API with 700–900ms responses and server-side validation
that returns field-keyed errors.

That difference is not cosmetic. It is what surfaced `Busy`: writing the loading
branch, there was no way to say "this region is loading". `Spinner` is decorative
and `aria-busy` existed on two components out of sixty, so a screen reader user
got a second of silence and then a table appearing with no warning.

It also exercises the paths that only exist in a real form:

- `Field` with errors that arrive from a server, not from a keystroke
- `focusFirstInvalidField` on a failed submit
- `Button loading` while the request is in flight
- `Table` with sorting the **app** applies, using `Intl.Collator`
- `Toast` on success
- The theme class on `<body>`, because overlays portal there

## On `workspace:*`

This depends on the workspace copy, so it type-checks against the code as it is
and demonstrates current best practice. That means it does **not** verify what a
consumer downloads.

Nothing here is trying to: that job belongs to the guards in the package —
`check-package-files` inspects the real tarball, `check-treeshake` bundles a
consumer entry, and `check-css-coverage` catches rules that do not travel. Those
were each written after a packaging bug shipped, and none of them would have been
caught by an example app.
