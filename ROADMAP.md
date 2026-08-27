# sve-ui — Roadmap

Current: **`0.7.0`** on npm. 59 components, 561 tests, automated axe + SSR
suites, tree-shaking and `.d.ts` budgets enforced in CI.

The 2026 rebuild is **done** — its record, decision log and architecture notes
are in [`docs/REBUILD-2026.md`](docs/REBUILD-2026.md). This document is what
comes after, and it is ordered by evidence rather than by ambition.

---

## How this list was built

Every item below traces to something that actually happened, not to a checklist
of good practices. That matters, because the three real defects found so far
were all invisible to code review and all surfaced the same way:

| Defect                                                                                                   | How it was found                                      | Not found by                 |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------- |
| `Button` could not be a link, so the docs site used `window.location.href` six times and died without JS | an outside bug report (#41) that blamed the site      | reading the code, for months |
| Importing one `Button` shipped the CSS of 42 components                                                  | building a throwaway consumer and weighing the bundle | any test, lint or type check |
| `aria-describedby` existed in **zero** of 59 components                                                  | `rg aria-describedby` returning nothing               | 561 passing tests            |

**None of them appear in a diff. They appear when you ask the published package
what it actually does.** So the work below is weighted towards measurement and
outside use, not towards more components.

---

## Now — known broken or missing, with evidence

### 1. The agent skill is not in the published package — DONE

`files` was `["dist"]` and the tarball had **zero** skill files, while the docs
site described the skill as something the package ships and told people to
`cp -r sve-ui/skills/...` — a path an installed copy never had.

- [x] `skills/` moved into the package and added to `files`; it documents the
      package, so it belongs with it
- [x] `scripts/check-package-files.mjs` asks `npm pack --dry-run --json` for the
      real file list and fails if a promised path is not packed. Proven to fail.
- [x] The package README now mentions it — it never did — and the install
      command points at `node_modules/sve-ui/skills/sve-ui-usage`

### 2. The prop generator cannot see forwarded Bits props — CORRECTED

This item used to read "27 docs pages still hand-write their prop tables", as if
those pages were behind. **They are not, and porting them would have deleted most
of each component's documented API.** Measured coverage of the hand-written rows
against what the generator produces:

| Page                                                                           | Generated coverage | Props the generator cannot see                                              |
| ------------------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------- |
| `menubar`, `pagination`, `pin-input`, `rating-group`, `toolbar`, `radio-group` | **0%**             | `count`, `perPage`, `onComplete`, `loop`, `orientation`, `onValueChange`, … |
| `command`                                                                      | 12%                | `label`, `shouldFilter`, `filter`, `onSelect`, …                            |
| `tabs`                                                                         | 14%                | `value`, `onValueChange`, `activationMode`, …                               |
| `checkbox`, `switch`                                                           | 50–66%             | `checked`, `indeterminate`                                                  |
| `alert-dialog`, `combobox`, `context-menu`, `link-preview`, `select`           | no entry at all    | the whole surface                                                           |
| `card`                                                                         | 100%               | —                                                                           |

The cause is structural, not sloppiness. Those wrappers declare
`interface Props extends Omit<ComponentProps<typeof Bits.Root>, …>` and almost
nothing of their own, and the generator reads literally-declared members. Every
real prop is **inherited from Bits and forwarded through the spread**, so the
generator is blind to it. Namespace pages lose specific props the same way:
`DialogTitle.level`, `PopoverContent.side`, `TooltipContent.sideOffset`.

So the drift risk is real but the fix is not a port. Two options, and this needs
a decision before any work:

- **Teach the generator to expand inherited Bits types** via the TypeScript
  checker. The actual fix, and it makes every page portable. The hard part is not
  reading the type, it is subtracting the HTML attribute surface —
  `ComponentProps<typeof Popover.Content>` includes every `div` attribute, and a
  naive expansion produces useless 200-row tables.
- **Keep hand-written rows for what is forwarded**, using `PropsTable`'s existing
  `extra`, and guard only that the generated half is used where it exists.
  Cheaper, leaves a seam.

- [ ] Decide between the two
- [ ] Only then: port, and forbid bare `PropRow[]` in CI

### 3. No visual regression coverage — PARTLY DONE

- [x] `apps/docs/scripts/check-render.mjs` — a structural render guard over all
      **65** prerendered pages, wired into CI after `build`. It compares a digest
      (ordered element skeleton plus attribute names, values and text dropped)
      against a committed baseline, so copy edits are free while a changed tag,
      lost attribute or reordered element fails. Normalises the things that churn
      every build: Svelte scope hashes derived from source text, chunk names,
      Bits ids, the SvelteKit token. **Both halves proven**: a copy-only edit
      passes; injecting one element reports `~ components/badge.html (+2 elements)`.
      Its first version used a flat `readdir`, covered 3 of 65 pages and reported
      success, so it now walks recursively and refuses to run on fewer than 20.
- [ ] **Screenshot diffing is deliberately still open.** It needs its own change
      because of one concrete problem: baselines generated on macOS do not match
      Linux CI font rendering, so they have to be produced in the CI image or a
      pinned container. That is infrastructure plus a binary-baseline review
      workflow, and bolting it on here would have meant doing it badly.

---

## Next — API gaps of the kind that keep getting found

`Button.href` and `Field` were the same bug twice: **the library did not let you
do the correct thing, so consumers did the incorrect thing, and it came back
looking like their fault.** These are the remaining candidates of that shape.

### 5. `Button` has no loading state

Not a single mention of `loading` in the component. Every consumer therefore
hand-rolls it: a `Spinner` inside, `disabled` while pending, and almost certainly
no `aria-busy` and no announcement — so a screen reader user presses submit and
is told nothing happened.

- [ ] `loading` on `Button`: swaps in the spinner, sets `aria-busy`, keeps the
      button focusable, and keeps its width so the layout does not jump
- [ ] Decide whether it implies `disabled` (it should block activation, but a
      `disabled` button loses focus, which strands the keyboard user)

### 6. Nothing helps with the guidance `Field` itself gives

`Field`'s docs say: on a failed submit, move focus to the first invalid control.
That is the correct WCAG technique, and the library ships **nothing** to help do
it. I wrote the instruction and left the work to the consumer.

- [ ] A small documented helper, or an error-summary pattern with a worked
      example — a form-level component only if the example proves one is needed

### 7. Ask the same question of the rest of the catalog

`rg aria-describedby` finding nothing is the cheapest audit in this project's
history and it found the largest gap. Run that class of check deliberately
instead of waiting for the next issue.

- [ ] Sweep for controls that cannot be labelled, described, marked busy or
      marked invalid
- [ ] Write each finding down even when not fixing it, so the next report has
      somewhere to land

---

## Later — adoption, where the remaining unknowns are

### 8. Build something real with it

Internal dogfooding has already proved insufficient. The docs site was written
by the same person as the library and **still** shipped six JS-only navigation
buttons and a hardcoded "13 components" while the registry held 58.

An outside consumer found more in one issue than months of internal use.

- [ ] A small real app — auth, a form with server validation, a data table, a
      dark-mode toggle
- [ ] Every workaround it forces becomes an issue here

### 9. A playground people can reach

- [ ] StackBlitz / a live editor on the docs site, so "does this work" does not
      require an install

### 10. Registry and skill generated from types

The registry and the skill are hand-maintained prose. They drift, and their
drifting is invisible.

- [ ] Generate what can be generated from component types and variants
- [ ] Keep the hand-written parts: the _reasoning_ in the skill is the valuable
      half and no generator will produce it

---

## Decided against — kept so they stop being re-proposed

|                                             | Why                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Storybook**                               | The `/components` pages cover the workshop need. Revisit only if authoring friction actually appears — it has not in 59 components.                                                                                                                                                                                             |
| **`Box`**                                   | The pre-1.0 version took seventeen style props with duplicate aliases and concatenated inline styles. It had reinvented CSS with a worse syntax. Reach for CSS instead; that boundary is working.                                                                                                                               |
| **Porting the docs nav onto `Sidebar`**     | `--doc-*` are literal hex values kept deliberately separate so the docs chrome does not move when the showcased theme changes. A ported nav would take `--sve-*` and diverge from the header and footer around it. The attempt still paid for itself: it produced `Provider`'s `display: contents` default and `Item disabled`. |
| **An MCP server**                           | Evaluated and deferred. `llms.txt` plus the agent skill covers the need; shadcn's MCP earns its keep through copy-paste install, which this library does not do.                                                                                                                                                                |
| **A second runtime dependency for `Toast`** | Not needed. Enter/exit come from Svelte and respect `prefers-reduced-motion`.                                                                                                                                                                                                                                                   |

---

## Standing rules earned the hard way

- **A guard is not a guard until you have watched it fail.** Two written in this
  repo passed while measuring nothing: one matched `.js` while vite emitted
  `.mjs` and reported `0 B`; one used a silent `if x in s` and dropped a
  component from the skill for a whole PR. Break every new guard on purpose
  before trusting it.
- **Version-bump PRs never run CI.** GitHub does not trigger workflows on PRs
  opened with `GITHUB_TOKEN`, so the one PR that publishes to npm is the only one
  that skips validation. Check out `changeset-release/main` and run
  `turbo run build lint check test --force` before merging it.
- **`mergeStateStatus: CLEAN` does not mean checks passed.** It means nothing is
  blocking. A PR has read CLEAN here with zero checks ever run.
- **Verify against the published tarball, not the repo.** `declare const X: any`
  shipped in `0.4.0`; the skill is missing from the package today. The repo
  being right is not evidence.
- **Turbo caches `lint`.** A cache hit hid a real failure. Use
  `npx turbo run … --force` when the result matters.
