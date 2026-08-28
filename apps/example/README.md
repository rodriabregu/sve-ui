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

## Every export, on purpose

The first version of this app rendered **10 of 62 exports**, and it showed:
`PinInput` shipped displaying nothing you typed, and the date pickers shipped
opening a transparent panel. Both were reported by users. Both had passing unit
tests and a generated docs page. Neither had ever been rendered here.

So coverage is now the build. `scripts/check-coverage.mjs` runs as part of
`pnpm check` and fails when any export is not rendered by some screen — because
a new component lands uncovered by default, and a one-time sweep does not hold.

The screens:

| Screen      | What it is for                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `/`         | Projects — the form with server-side errors, `Table` with app-applied sorting, `Busy`          |
| `/booking`  | Everything date and time, as both pickers **and** bare segmented fields                        |
| `/browse`   | Navigation, overlays and lists — Menubar, Toolbar, Command in a Sheet, ContextMenu, Pagination |
| `/security` | `PinInput`, the toggle controls, and the destructive-action dialogs                            |

`prerender = true` lives on `+layout.ts`, not on a `+page.ts` per route. It used
to be per route, which meant `/browse` compiled, produced no HTML, and got
covered up by the SPA fallback — seventeen components with their SSR path
silently skipped.

## On `workspace:*`

This depends on the workspace copy, so it type-checks against the code as it is
and demonstrates current practice. It does **not** verify what a consumer
downloads.

That was a deliberate second choice. Depending on the published package —
`"sve-ui": "npm:sve-ui@^0.11.0"`, where the `npm:` prefix forces pnpm to resolve
from the registry instead of linking the workspace — is the more honest shape, and
it is what would let StackBlitz open this directory on its own.

It does not work here, for a reason worth writing down: pnpm enforces a
`minimumReleaseAge` supply-chain policy, and rejects a version published within
the cutoff.

```
sve-ui@0.11.0 was published at 2026-08-28T00:43:06Z,
within the minimumReleaseAge cutoff
```

So every release would break this app's install for about a day. Relaxing the
policy to suit our own package would trade a real supply-chain guard for
convenience, which is not a trade worth making for an example.

Verifying the published artifact stays with the guards that actually inspect it:
`check-package-files` reads the real tarball, `check-treeshake` bundles a consumer
entry, and `check-css-coverage` catches rules that do not travel. Each was written
after a packaging bug shipped, and none of them would have been caught by an
example app.

## Running it

```bash
pnpm install
pnpm --filter example dev
```
