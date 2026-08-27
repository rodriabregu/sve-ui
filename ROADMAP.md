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

### 1. The agent skill is not in the published package

`packages/sve-ui/package.json` declares `"files": ["dist"]`, and the published
tarball contains **zero** skill files. `skills/sve-ui-usage/` exists, is
maintained, is referenced from the docs site — and no one who runs
`pnpm add sve-ui` ever receives it.

The skill's whole purpose is that a consumer's agent generates correct `sve-ui`
code. Right now it only helps agents working _inside this repo_.

- [ ] Add `skills` to `files`, or publish it as a separate entry point
- [ ] Reference it from the package README, which currently does not mention it
- [ ] Verify against the published tarball, not the repo

### 2. Twenty-seven docs pages still hand-write their prop tables

The generator (`apps/docs/scripts/gen-props.mjs`) reads real `interface Props`
via the TypeScript AST, and 43 pages consume it through `<PropsTable component>`.
**27 pages still declare their own `PropRow[]` arrays.**

The CI drift guard checks that `props.json` matches the components. It does
**not** check that pages use `props.json`. So those 27 can document props that no
longer exist, indefinitely, with CI green — which is precisely the drift risk the
old roadmap flagged and only half closed.

- [ ] Port the remaining 27 pages
- [ ] Fail CI when any page under `routes/components` declares `PropRow[]`

### 3. No visual regression coverage

59 components, most styling in `:global` blocks, and nothing that would notice a
layout change.

The evidence this is needed is concrete: the Prettier sweep touched 291
`.svelte` files, and to gain any confidence I had to **hand-roll a prerendered
HTML differ** — normalise scope hashes, strip the bootstrap script, collapse
whitespace runs without deleting them. Having to improvise that _is_ the finding.
My first version of it was even wrong in a way that would have hidden a real
spacing change.

- [ ] Screenshot diffing over the 64 prerendered pages (Playwright)
- [ ] Keep the HTML-level differ too: it is cheap, deterministic, and catches
      structural changes screenshots blur over

### 4. Coverage is not measured at all

No `coverage` config anywhere. 561 tests and no idea which lines they never
reach. The old roadmap wants a coverage badge; you cannot badge what you do not
measure.

- [ ] Turn on Vitest coverage, publish the number
- [ ] Look at what is uncovered before setting any threshold — a threshold picked
      before reading the report just codifies today's blind spots

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
