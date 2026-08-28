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

### 2. The prop generator — DONE, and every page is now generated

Three rounds, each of which had to measure before it could act.

**Round one: inherited Bits props.** The generator read the AST only, so it saw
literally-declared members and nothing else. Most components are thin Bits
wrappers declaring almost nothing of their own, which is why six pages had **0%**
coverage. Now resolved with the real TypeScript checker: one `ts.Program` over
virtual `.ts` files placed beside each component, so relative imports and the
`bits-ui` lookup resolve exactly as for the real file.

The hard part was never reading the type, it was subtracting the HTML attribute
surface — `ComponentProps<typeof Popover.Content>` includes every `div`
attribute. The filter is by **declaration file**: kept only when declared inside
`bits-ui`. Only `style` needed an exception. `dir` was in that exception briefly
and should not have been — it decides which arrow key moves forward in a Bits
menu, so it is behaviour.

**Round two: the five HTML attributes that ARE the point.** An `Input` without
`value` in its table, or a `Label` without `for`, documents everything except the
reason the component exists. `HTML_PROPS_WORTH_KEEPING` is keyed by component so
it stays a handful of exceptions rather than a globally resurrected attribute set.
Those rows are labelled `html`, not `bits-ui` — saying otherwise would send a
reader to the wrong docs.

**Round three: the sixty re-exported parts with no `.svelte` file.**
`Dialog.Root`, `Tooltip.Provider`, `Select.Root` and fifty-seven others exist only
as `export const Root = BitsDialog.Root`, because Root renders nothing visual.
Reading `.svelte` files documented nothing for them. The generator now includes
every namespace `index.ts` as a Program root and resolves the props type off the
exported symbol, which handles both the bare and the explicitly-annotated form.

- [x] **All 70 pages generated. Zero hand-written `PropRow[]` left** — down from
      27, and each of the three rounds was needed to get there.
- [x] **1,181 prop rows across the docs**, 743 labelled `bits-ui`, 11 `html`, and
      no page with a Props heading and no rows.
- [x] `check-docs-coverage` now **forbids** a hand-written table. That check could
      not be enabled before: it would have failed on pages with no correct
      alternative, and _a guard that forces you to do the wrong thing is worse
      than no guard_. `extra` and `omit` stay available for prose the generator
      cannot produce.

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

### 4. Coverage is not measured at all — DONE

Worth noting how this item was nearly lost: it vanished from this file in the
skill-publishing change, because that edit replaced a text range that happened to
contain it. Nothing caught it — a document has no tests — and it surfaced only
when the headings were listed and jumped from 3 to 5.

- [x] Vitest v8 coverage: `pnpm --filter sve-ui test:coverage`. Scoped to
      `src/lib/**`, so fixtures and tests cannot inflate the number.
- [x] **No threshold set, deliberately.** One picked before reading the report
      just codifies today's blind spots as the target.

First reading, and what it bought: statements 94.6%, **branches 84.4%**. The
worst-covered files were the form controls — and closing the invalid-state gap
below lifted branches to **89.8%**, because the files with the least coverage
were exactly the ones missing the feature. That is the whole argument for
measuring: it pointed at the same place the ARIA audit did, from a different
direction.

### 5. `Button` has no loading state — DONE

- [x] `loading` shows a spinner, sets `aria-busy`, and blocks activation
- [x] It stays **focusable**. `disabled` was the obvious choice and the wrong
      one: a disabled element loses focus, so a keyboard user who just pressed
      Enter is dropped to the top of the document with no idea anything happened
- [x] Children stay on screen so the button keeps its width; the spinner is
      `aria-hidden` and a clipped `loadingLabel` is what gets announced; motion
      respects `prefers-reduced-motion`

### 5b. The invalid state was a promise nothing could keep — DONE

`Field` sets `aria-invalid` on whatever control it is given, and only `Input` and
`Textarea` could show it. **Ten controls announced themselves invalid while
looking exactly like a correct one**, so a sighted user read an error message with
no indication of which control it was about.

Found by running the audit item 7 asks for — `rg` across the components for each
ARIA state — the same method that found the `aria-describedby` gap.

- [x] `invalid` on all ten, always applying the styling
- [x] `aria-invalid` only where the rendered role supports it, and the roles were
      **read off the built pages** rather than assumed: `Select.Trigger` and
      `Toggle` render plain `<button>`s

One correction worth keeping: I wrote in five JSDoc comments that axe rejects
`aria-invalid` on a button. **It does not.** I injected it and the suite still
passed. The decision stands on the spec, but nothing enforces it except the test
that now asserts it, and the comments say so instead of claiming a tool has our
back.

### 6. Nothing helps with the guidance `Field` itself gives — DONE

`Field`'s docs said "on a failed submit, move focus to the first invalid
control", and the library shipped nothing to do it. The second time a
recommendation was written down and the work left to the consumer; the first was
`Button` not being able to be a link.

- [x] `focusFirstInvalidField({ root, scroll })`, exported from `sve-ui`
- [x] Awaits `tick()` internally — it is called right after the state change that
      produced the errors, so without that the DOM does not carry them yet. The
      easiest thing to get wrong, so it is handled rather than documented.
- [x] Returns `false` when nothing was focused, so a caller can fall back when a
      submit failed for a reason no field owns
- [x] Reports to the console when it finds an invalid field whose control was
      never wired, or one that cannot take focus. Focus silently going nowhere
      leaves a form looking broken with no clue why.
- [x] The docs section that used to give the advice now gives the code

**A correction worth keeping.** I justified matching on the `Field` wrapper by
claiming an `[aria-invalid="true"]` query would miss a `Select.Trigger`, since
its own `invalid` prop omits the attribute. **That is false** — I probed it, and
the query matched the button, because `Field` puts `aria-invalid` into the props
you spread. The marker is still right, for reasons I had to actually work out: it
focuses the _labelled_ control rather than whatever inner element matched, and it
only ever moves focus into a field this library wired. Both are now asserted.

That is twice in two days I nearly shipped a confident false justification (the
other was "axe rejects `aria-invalid` on a button"). Probing the claim took one
throwaway test each time.

### 7. Ask the same question of the rest of the catalog — RUN ONCE, KEEP RUNNING

The audit is `rg` across the components for each ARIA state, then a probe for
anything it flags. It has now found three gaps for the cost of a few commands:
`aria-describedby` in zero components, the invalid state ten controls could not
show, and this.

**`required` was landing as dead markup.** `Field` puts it in the props you
spread, and where that reaches a real input the browser handles it, while Bits
translates it on checkbox, switch, radiogroup and rating group. Everywhere else
it did nothing:

| Control                                          | was                                       | now                          |
| ------------------------------------------------ | ----------------------------------------- | ---------------------------- |
| `Slider`                                         | on the container, which is not the slider | `aria-required` on the thumb |
| `Select.Trigger`, `Toggle`, `DatePicker.Trigger` | a dead native attribute on a `<button>`   | swallowed                    |

- [x] `required` audited and fixed
- [x] **axe's rules are not symmetric between attributes** — it rejects
      `aria-required` on a button and _accepts_ `aria-invalid`. Probed separately
      rather than generalised, and asserted in a test so the decision does not
      rest on a comment.
- [x] The `Field` page documents which controls can be announced as required

Closed since:

- [x] **`DateField` / `TimeField` and their range variants** now announce
      `required`. It reaches the segments through context and becomes
      `aria-required` on each editable one — `role="spinbutton"` supports it,
      unlike the button roles elsewhere. Literal separators are left alone.
- [x] **`DatePicker` / `DateRangePicker` style their disabled trigger.** Bits sets
      `data-disabled` and nothing styled it, so a disabled picker looked enabled.
      Found by extending the audit to `disabled` — where **7 of the 8 components
      it flagged were false positives**, because they style `data-disabled` and my
      first pattern only looked for `:disabled`. Worth checking before claiming.

Still open:

- [x] **Result announcements — DONE.** Bits filters the Command list and
      announced nothing, so a screen reader user typed and the list shrank in
      silence. `Command.Status` is a polite, atomic, visually hidden region fed by
      intercepting Bits' `onStateChange` (the caller's handler still runs, first).

      The `delay` is the design, not a detail: without it, typing "button" fires
      six announcements and the user hears a torrent instead of an answer. Each
      keystroke restarts the wait. It stays silent until the search is non-empty,
      because the count of an unfiltered list is not news.

      `label` takes a function of the count, because the default is English and a
      count needs the app's language and plural rules.

      **`Combobox` deliberately gets no component**: Bits does not filter there,
      the consumer does, so they already know the count. Documented as a pattern
      rather than wrapped in API that adds nothing.

- [ ] `aria-busy` beyond `Button` and `Skeleton`: nothing that loads content from
      a network can say it is loading. Needs a real async case to design against,
      not a guess.
- [ ] Run the sweep again after every batch of components, not once.

### 7b. A styling regression I shipped, and the guard for it — DONE

Extending the audit to CSS found a bug **I introduced in 0.6.1** and that shipped
for four versions.

Svelte compiles styles per component, so a rule written in
`DatePickerTrigger.svelte` lives only there — and `DateRangePicker.Trigger`
reuses the same class. A consumer importing only `DateRangePicker` got a
completely **unstyled trigger**. `RangeCalendar` lost its cell and day styles the
same way. Five classes across three namespaces.

It was invisible until `sideEffects` was declared and tree-shaking started
actually working. **The fix for one problem uncovered another that had been
hiding behind it** — before, all the CSS came along, so nothing was ever missing.

- [x] Shared rules moved into plain `.css` files that every component using them
      imports. That survives tree-shaking precisely because `sideEffects` is
      `["**/*.css"]` and not `false` — the same decision paying off twice.
- [x] `check-css-coverage` enforces it: a component referencing `sve-foo` must
      declare it in its own `<style>`, import a `.css` that declares it, or find
      it elsewhere in its own namespace (which is safe, since namespaces are
      imported wholesale). Proven to fail by removing the shared import.
- [x] Deliberate hook classes with no rules anywhere are allowlisted in the
      script with a reason, so the guard stays actionable.

**Both audits were needed.** The empirical one (bundle each namespace, diff used
classes against emitted CSS) found the cross-namespace cases. The static one
found five more, all intra-namespace — which turned out to be safe, and taught me
the actual invariant the guard should encode. Neither alone would have got there.

### 8. Build something real with it — DONE, and it paid immediately

`apps/example`. Not a showcase: a small app with **latency** — a stub API with
700–900ms responses and server-side validation returning field-keyed errors.

That difference is the whole point. The docs site renders everything
synchronously from a static registry, which is why it never surfaced anything
about loading states.

- [x] It exercises what only a real form has: errors arriving from a server
      rather than a keystroke, `focusFirstInvalidField` on a failed submit,
      `Button loading` in flight, `Table` with sorting the app applies via
      `Intl.Collator`, `Toast` on success, the theme class on `<body>`
- [x] It is in the CI pipeline, so a broken public API breaks the build
- [x] **It found `Busy` within an hour** — see below

On `workspace:*`: the example type-checks against the code as it is and
demonstrates current practice, so it does **not** verify what a consumer
downloads. Nothing here is trying to. That job belongs to `check-package-files`,
`check-treeshake` and `check-css-coverage`, each written after a packaging bug
shipped, and none of which an example app would have caught.

### 8b. The example was covering 10 components out of 62 — DONE

Item 8 declared success too early. The example was real, it had latency, it
found `Busy` — and then it missed **two consecutive user-reported bugs**:
`PinInput` displayed nothing you typed, and the date pickers opened a
transparent panel. Both components were exported, documented, unit-tested, and
**never once rendered by the example**.

Measured coverage: **10 of 62 exports**. Building something real was not the
lesson. _Using every part of it_ was.

- [x] `/browse` added — Menubar, Toolbar, NavigationMenu, Combobox, Command in a
      Sheet, ContextMenu, Popover, LinkPreview, Accordion, Collapsible,
      ScrollArea, Pagination, Skeleton, AspectRatio, Textarea, Stack, Flex
- [x] The bare date fields added to `/booking` — `DateField`, `DateRangeField`,
      `TimeRangeField`, `RangeCalendar`. Typed entry and calendar entry are
      different components with different failure modes
- [x] `ThemeProvider` now actually used, with a `theme` override, instead of the
      example hand-writing CSS vars
- [x] Coverage is **62 of 62**, and `check-example-coverage` keeps it there:
      every new export lands uncovered by default, so the sweep is the build.
      Both of its failure paths were proven by breaking them on purpose

**What it found immediately:**

1. **`/browse` was never prerendered.** `prerender = true` lived in one
   `+page.ts` per route, so the new route compiled, produced no HTML, and the
   SPA fallback hid it. Seventeen components had their SSR path silently
   skipped. Fixed at the cause: prerender now sits on `+layout.ts`, so a new
   route is server-rendered by default rather than by remembering.
2. Five API misuses in my own code, caught by `svelte-check` in minutes:
   `Heading size="xl"` and `Text color="muted"` do not exist,
   `DateRangePicker.Input` needs `type` and needs two of them, and `Card` has no
   `Title` part.

On that last one: `Card.Header` exists and `Card.Title` does not, which is
**correct** — `Title` is the part that supplies an accessible name via
`aria-labelledby`, and only the labelled regions have it (`Alert`,
`AlertDialog`, `Dialog`, `Sheet`). `Header` is a structural slot. The instinct
to write `Card.Title` comes from shadcn, not from this library's logic. Worth a
line in the Card docs, not an API change.

### 8c. Two naming findings, deliberately not acted on

Measured across the catalog: nine components use a base class that does not
match their name. **Seven are deliberate sharing** — the whole date family
(`DateField`, `DatePicker`, `DateRangeField`, `DateRangePicker`, `TimeField`,
`TimeRangeField`) shares `sve-field` because they are the same segmented input,
and `RangeCalendar` shares `sve-calendar`. That is the shared-stylesheet
design working.

Two are not:

- **`NavigationMenu` renders `sve-nav-menu`** — the only pure abbreviation in
  the catalog. A consumer targeting `.sve-navigation-menu` finds nothing.
- **`Field` renders `sve-field-group`** because the date family had already
  taken `sve-field`. The component with the most obvious claim to the name lost
  it to a collision.

Both are renames of a **public class name**, which for a styled library is a
breaking change. Pre-1.0 is the moment to do it if it is done at all, but it is
a decision, not a defect, so it is recorded here rather than quietly applied.

### 7c. `aria-busy` beyond two components — DONE

Writing the example's loading branch, there was **no way to express "this region
is loading"**. `Spinner` is decorative and announces nothing; `aria-busy` existed
on two components out of sixty. A screen reader user got a second of silence and
then a table appearing, with no warning either way.

`Busy` sets `aria-busy` — so a screen reader can hold off reading a half-built
region — and pairs it with a polite live region, because `aria-busy` announces
nothing on its own.

- [x] `doneLabel` names the **result**, not the event: "3 projects loaded" beats
      "Done", which says the wait is over and nothing about what arrived
- [x] Omitting it is documented as the wrong choice — the user is told it is
      loading and never told it finished — but left as the caller's
- [x] The loading message waits 400ms first. A response that arrives in 80ms does
      not need narrating. If the wait beats the delay, **only the completion is
      announced**, which is the right outcome.

This is the first component in the library found by _use_ rather than by auditing
or by planning, which is the argument for item 8 in one sentence.

### 9. A playground people can reach — DONE, with its limits stated

`/playground` on the docs site. A whole **flow**, which is the thing the
component pages cannot show: each of those demonstrates one component in
isolation, and none of them shows what happens when a submit fails, where focus
lands, or what a screen reader is told while a request is in flight.

Deliberately a different artifact from `apps/example`. That one is a consumer
smoke test whose job is to break the build; this one exists to be clicked by
someone deciding whether to install anything.

**What I could not deliver, and why** — these are worth writing down rather than
leaving as an unexplained gap:

- **An in-page editor.** Needs the Svelte compiler client-side. Buildable, but I
  cannot visually verify the result from here, and the component pages already
  show live previews next to their source.
- **StackBlitz opening `apps/example` directly.** Requires the example to resolve
  standalone, i.e. to depend on the published package. Blocked by pnpm's
  `minimumReleaseAge` policy: `sve-ui@0.11.0 was published ... within the
minimumReleaseAge cutoff`. Every release would break the example's install for
  about a day. Relaxing the policy for our own package trades a real
  supply-chain guard for convenience.
- **A second Vercel deployment.** Needs dashboard configuration, which is not in
  the repo and not verifiable from here.

### 10. Registry and skill generated from types — DONE, reframed by measuring

The item asked for generation. Measuring first said generation is the wrong tool:
the slugs and groups could be generated, and the blurbs and the reasoning cannot.
The reasoning is the valuable half — no generator produces "a link that goes
nowhere takes a tab stop and lies".

So the prose stays hand-written and `check-docs-coverage` asserts none of it is
missing:

- every export from `lib/index.ts` has a registry entry
- every `ready` entry has a docs page
- every `ready` entry appears in the agent skill's catalog

- [x] **It found a real gap on its first run**: `Busy` was in `SKILL.md` and
      absent from the catalog. Fixed.
- [x] Proven to fail in both directions — removing a page, and adding an export
      with no entry.
- [x] Non-component exports are allowlisted **with a reason** each, so the list
      cannot quietly absorb a component someone forgot.

The drift is not hypothetical: `Collapsible` was missing from the skill for a
whole pull request, and `Busy` for a release. Both were caught by a person
noticing, which is not a system.

**My first version of the check reported 19 false positives out of 19**, because
it compared the display name ("Alert Dialog") and the skill uses the code
identifier ("AlertDialog"). Worth recording, because a guard that cries wolf
nineteen times gets switched off.

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
- **An exported component the example never renders has not been used by
  anyone.** Two shipped bugs sat in components with passing unit tests, a
  generated docs page, and zero real renders. Coverage of the public API is the
  thing to measure, not the existence of a demo app.
- **A route that is not prerendered is a route whose SSR path never runs.** It
  compiles, it type-checks, the SPA fallback serves it, and nothing tells you.
  Put the prerender flag where new routes inherit it.
- **Audit findings need the same allowlist the guard has.** An ad-hoc sweep of
  the built HTML reported five unstyled classes and one missing component. All
  six were false positives — documented styling hooks, a scope marker whose
  tokens live on `:root`, and a class named `sve-nav-menu` rather than
  `sve-navigation-menu`. The guard was right every time. Check the guard before
  believing the sweep.
- **`turbo run lint check test build` is NOT what CI runs.** CI adds
  `format:check`, `check:render` and `gen:props:check` on top. A green turbo run
  is not a green CI run, and this exact gap let a docs edit reach CI and fail
  there. Validate with the workflow's step list.
- **A baseline updater that reads build output can bless a stale build.**
  `check:render:update` reported "baseline updated for 67 pages" and changed
  nothing, because the build predated the edit; the next CI run failed on the
  same page. It now refuses when any source is newer than the oldest built page,
  and that refusal was proven by touching a file.
- **Turbo caches `lint`.** A cache hit hid a real failure. Use
  `npx turbo run … --force` when the result matters.
