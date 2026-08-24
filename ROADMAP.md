# sve-ui — 2026 Rebuild Roadmap

> **Status:** Planning → Phase 0 not started
> **Branch:** `feat/2026-rebuild`
> **Last updated:** 2026-06-20

This document is the source of truth for reviving **sve-ui** to 2026 standards. It records the decisions made, the validated stack, the target architecture, and the phased execution plan. Read this before contributing.

---

## 1. Goal

Build `sve-ui` into a **production-grade, npm-publishable, open-source, maintained library of ready-made, accessible Svelte 5 components** — in the spirit of HeroUI/NextUI, for the Svelte ecosystem.

**Positioning / wedge:** the only fully-**styled**, fully-**accessible** (built on Bits UI) Svelte 5 component library that requires **no Tailwind and no config** in the consumer's project — install, import, done; theme via CSS custom properties. Most of the field (shadcn-svelte, SV5UI, Flowbite) requires Tailwind in the consumer project; we don't.

> **Scope pivot (2026-06-20):** the original sve-ui was Chakra-style *layout primitives*. The actual vision is a *component library* (Dialog, Select, Combobox, Tabs, Toast, …) where the value is accessibility + behavior, not layout. The old component code is **not reused** (layout primitives survive only as a minimal internal layer; theme tokens survive as a starting palette). All of Phase 0 infrastructure remains valid. `API-CONTRACT.md` is now historical reference for the old primitives.

---

## 2. Why a rewrite (not an incremental migration)

The current code is a dead-end on two axes:

**Stack (Feb 2024, last commit):** Svelte 3.54, SvelteKit 1.5, Vite 4, Vitest 0.25, `eslint-plugin-svelte3` (unmaintained). Svelte 3 → 5 is a **paradigm shift** (`export let` → `$props()`, `on:click` → `onclick`, `SvelteComponentTyped` removed), not an update.

**Design debt:**
- `Box.svelte` builds styles by string concatenation (24 props, no variant system, theme tokens not wired in).
- `.svelte.d.ts` files are hand-written and committed — these are *generated* by `svelte-package`; the committed ones have already drifted.
- The only test is `expect(1 + 2).toBe(3)`.
- `Button` uses an `onClick` prop instead of native events, hardcodes `#007bff`, and carries an unresolved TODO.
- `docs/` is a second SvelteKit app nested inside the repo with its own lockfile — not a workspace.

---

## 3. Decisions log

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Fresh monorepo + rewrite in Svelte 5; keep public API as contract | Svelte 3→5 is a rewrite anyway; current code has base-level design flaws |
| D2 | Monorepo tooling: **pnpm workspaces + Turborepo** | Task caching + pipelines for build/test/CI; Vercel-blessed path |
| D3 | Package name stays **`sve-ui`** (unscoped, published) | Keep existing npm identity |
| D4 | Styling: **Svelte scoped `<style>` + CSS custom properties (tokens)** in the library core. **No Tailwind in published components.** | A distributed lib must not force its styling layer on consumers; CSS vars are themeable, zero-config, zero-runtime |
| D5 | **Tailwind 4 only in `apps/docs`** | Tailwind is great for the docs site, wrong for shippable components |
| D6 | Linting: **hybrid** — Oxlint for `.ts`/`.js`, `eslint-plugin-svelte` for `.svelte` | Oxlint (June 2026) only lints `<script>` blocks, not Svelte templates; a11y/template rules still need ESLint |
| D7 | Formatting: **Prettier + `prettier-plugin-svelte`** | Oxfmt has the same Svelte-template limitation as Oxlint |
| D8 | Testing: **Vitest + `@testing-library/svelte`** + axe for a11y | Behavior-first component tests; replaces the placeholder test |
| D9 | Releases: **Changesets** with public access + npm provenance | Standard semver + automated changelog for OSS |
| D10 | Adopt internal **config packages** (`typescript-config`, `eslint-config`) | Turbo idiom; cleaner than relative `extends`; cheap, scales |
| D11 | **No** shared `types` package | Library types *are* the public API, exported from `sve-ui`; nothing to share |
| D12 | Tokens stay **inside `sve-ui`**, exposed via subpath `sve-ui/theme` | One consumer today; subpath leaves the seam to extract later without breaking changes |
| D13 | Component packaging via **`@sveltejs/package`** (NOT `tsup`) | Svelte components ship as preprocessed source compiled by the consumer; `tsup` (Turbo guide default) breaks Svelte |
| D14 | **pnpm is the only package manager** — pinned via `packageManager` + Corepack, enforced via `engines` and `only-allow` | Single lockfile, reproducible installs, workspace protocol; no npm/yarn drift |
| D15 | Publish via **npm Trusted Publishing (OIDC)** — no `NPM_TOKEN`; automatic provenance | GA since Jul 2025; short-lived per-workflow credentials, no long-lived secret to leak |
| D16 | Product is a **library of ready-made accessible components** (HeroUI-style), not layout primitives | The value users want is behavior + a11y, not Box/Flex |
| D17 | **Distribution: styled npm package** (not shadcn-style copy-paste registry) | We own the code/quality; consumer just installs; enables zero-config styling |
| D18 | **Foundation: Bits UI** for interactive components | Accessible headless Svelte 5 primitives; never reinvent focus traps/ARIA. Non-interactive components are plain styled Svelte |
| D19 | **Component pattern: styled presentational wrapper over Bits UI container** | Bits UI = behavior/a11y (container); our component = style/variants (presentational) |
| D20 | Styling stays **scoped CSS + CSS custom properties, no Tailwind in core** — this is the wedge | Field requires Tailwind in consumer project; we don't → zero-config, themeable |

**Monorepo principle:** don't abstract until there are at least two real consumers of the same code. Config has two (lib + docs) → justified. Types has none → skip. Tokens has ~one → keep inside with a seam.

---

## 4. Validated stack (npm registry, June 2026)

Versions confirmed against the live npm registry. **Pin these after scaffolding, before the first install.** Re-validate peer-dependency compatibility with Context7 (see §8).

| Package | Version | Notes |
|---|---|---|
| `svelte` | 5.56.3 | runes |
| `@sveltejs/kit` | 2.66.0 | docs app |
| `@sveltejs/package` | 2.5.8 | library packaging |
| `@sveltejs/vite-plugin-svelte` | 7.1.2 | ⚠️ confirm Vite 8 peer support |
| `vite` | 8.0.16 | ⚠️ do not force; let the Svelte toolchain pull its supported Vite |
| `vitest` | 4.1.9 | |
| `@testing-library/svelte` | 5.3.1 | |
| `bits-ui` | 2.18.1 | foundation for interactive components; peer `svelte: ^5.33.0`, `@internationalized/date: ^3.8.1` |
| `turbo` | 2.9.18 | |
| `@changesets/cli` | 2.31.0 | |
| `oxlint` | 1.70.0 | `.ts`/`.js` only |
| `eslint` | 10.5.0 | flat config |
| `eslint-plugin-svelte` | 3.19.0 | `.svelte` templates |
| `typescript-eslint` | 8.61.1 | ⚠️ confirm TS 6 support range |
| `prettier` | 3.8.4 | |
| `prettier-plugin-svelte` | 4.1.1 | |
| `tailwindcss` | 4.3.1 | docs only |
| `publint` | 0.3.21 | |
| `@arethetypeswrong/cli` | 0.18.3 | |
| `typescript` | 6.0.3 | ⚠️ new major; confirm `svelte-check` support |
| `@storybook/sveltekit` | 10.4.6 | confirm Svelte 5 adapter |

---

## 5. Target architecture

```
sve-ui/
├── package.json              # root, private, workspace scripts via turbo
├── pnpm-workspace.yaml
├── turbo.json                # pipelines + cache (build, test, lint)
├── .prettierrc               # single root prettier config
├── eslint.config.js          # root flat config (composes @repo/eslint-config)
├── .changeset/
├── .github/
│   ├── workflows/            # ci.yml + release.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── LICENSE                   # MIT (rename from misspelled LICENCE)
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── packages/
│   ├── sve-ui/               # THE LIBRARY (published as "sve-ui")
│   │   ├── src/lib/
│   │   │   ├── components/   # Svelte 5 components
│   │   │   └── theme/        # tokens → exported via sve-ui/theme
│   │   └── package.json      # exports map + svelte-package
│   ├── typescript-config/    # private: base.json, svelte-lib.json, svelte-app.json
│   └── eslint-config/        # private: composable flat config (lib vs app)
└── apps/
    └── docs/                 # SvelteKit 2 + Svelte 5 + Tailwind 4 (landing + docs)
```

**Package export contract (`packages/sve-ui/package.json`):**
```jsonc
{
  "exports": {
    ".":       { "types": "./dist/index.d.ts", "svelte": "./dist/index.js", "default": "./dist/index.js" },
    "./theme": { "types": "./dist/theme/index.d.ts", "svelte": "./dist/theme/index.js", "default": "./dist/theme/index.js" }
  },
  "peerDependencies": { "svelte": "^5" }
}
```

---

## 6. Phased roadmap

Phases 0 → 1 → 2 are **sequential and blocking**. Phases 3–5 can overlap once the core exists.

### Phase 0 — Skeleton & tooling
- [x] Root monorepo: `package.json` (private), `pnpm-workspace.yaml`, `turbo.json`, `.gitignore`, single root lockfile
- [x] `packages/typescript-config` (base + svelte-lib + svelte-app presets)
- [x] `packages/eslint-config` (flat config, composable lib/app) — ESLint 10 + `eslint-plugin-svelte` + `typescript-eslint`
- [x] Oxlint for `.ts`/`.js` (`.oxlintrc.json`); Prettier + `prettier-plugin-svelte` at root
- [x] Migrate `docs/` → `apps/docs`; scaffold `packages/sve-ui` (library template)
- [x] Pin all versions per §4; verify peer-deps (Context7)
- [x] **Housekeeping:** rename `LICENCE` → `LICENSE`; delete hand-written `.svelte.d.ts`
- [x] **Validation gate:** rewrite **`Box`** in Svelte 5 + a test, build via `svelte-package`, confirm the whole chain (build → package → types → test) green before rewriting the rest

### Phase 1 — Foundation + first vertical slice
- [x] Modernize `packages/sve-ui/package.json`: `exports` map (`svelte`/`types`/`default`) + `sve-ui/theme` subpath; `peerDependencies: { svelte: "^5" }`; `bits-ui` as dependency; devDeps via catalog; `@sveltejs/package`
- [x] **Theming system** (the heart): tokens → CSS custom properties at `:root`, light/dark, documented override mechanism. Re-export via `sve-ui/theme`
- [x] **Typed variant system** (size/color/variant) — reusable helper for all components
- [x] First install (`pnpm install`); validate eslint flat-config keys
- [x] **Validation gate (two slices):**
  - `Button` — non-interactive path: Svelte 5 runes + variants + scoped styles + test
  - `Dialog` — Bits-UI-backed path: styled wrapper proves the foundation integration end-to-end
- [x] Confirm full chain green: build → `svelte-package` → types → test

### Phase 1.5 — Component waves (built on the foundation)
Ship in prioritized waves; each component = tests + a11y + docs page + Storybook story.
- [x] **Wave 1 (core):** Button, Input, Card, Badge, Avatar, Alert, Spinner, Text/Heading
- [x] **Wave 2 (overlays, Bits UI):** Dialog/Modal, Dropdown Menu, Tooltip, Popover — **except Toast**, which is blocked on the external-dep decision below and moved to Wave 4
- [x] **Wave 3 (forms, Bits UI):** Select, Combobox, Checkbox, Radio Group, Switch, Slider, Tabs, Accordion
- [x] **Wave 4a (low-risk batch, 2026-08-22):** Textarea (native), Label (Bits), Skeleton (custom), Separator (Bits) — no new dependencies
- [x] **Wave 4b (advanced): COMPLETE.** Date Picker, Command/Search, Table, Pagination and Toast all shipped. The three Toast decisions were resolved (see below), which closes the last open component question in the roadmap.
- [x] **Sidebar (composable app-shell nav):** `Sidebar.Provider/Root/Trigger/Header/Content/Footer/Group/GroupLabel/Menu/Item` + collapsed state via context + `collapsible` of icon|offcanvas|none. Custom (Bits ships none).
  - **Provider is separate from Root** because Svelte context reaches descendants, not siblings — with the state on Root a Trigger in a top bar never sees it, and `offcanvas` REQUIRES the Trigger to be outside the panel. A test caught this.
  - **No JS media query.** The collapsed presentation is one CSS class. A library that swaps markup for a drawer below some breakpoint hardcodes that breakpoint, cannot know it during SSR, and flashes the wrong layout on hydration. The app keeps control.
  - **FINDING — the docs sidebar is NOT this component, and the dogfood note below was wrong to assume it was.** Objective test: to use `Sidebar.Root` as the docs panel you must override `display`, `flex-direction`, `width`, `border`, `background`, `overflow` AND the collapse mechanism (width vs display) — i.e. nearly everything the component provides, which is fighting it rather than using it. They are different components: an app-shell panel with fixed regions and an icon rail, versus a sticky docs TOC that becomes a disclosure on mobile.
  - The genuinely reusable overlap is `Group`/`GroupLabel`/`Menu`/`Item`. Porting only those is viable but switches the nav's token source from `--doc-*` to `--sve-*`, so it needs visual review on a preview deploy and belongs in its own PR. **Open item, not done.**
  - The attempt was still worth it: it surfaced two real design defects, both fixed. `Provider` was imposing `display: flex` on its children (now opt-in via `shell`, `display: contents` otherwise), and `Item` could only render an `<a>` (now takes `disabled` to render a `<span>`, since a link that goes nowhere takes a tab stop and lies about what will happen).
- [x] **Table (styled data table):** `Table.Root/Caption/Header/Body/Footer/Row/Head/RowHeader/Cell`. Custom (Bits ships none). **This was the last component in the registry — every entry is now `ready` except Toast.**
  - **It does not sort your data.** `Head sortable` renders the button and sets `aria-sort`; the app applies the order. A component cannot know whether the rows are local, how sorting interacts with pagination, or which locale the text compares in — a built-in sort would be wrong in all three ways and hard to override in each. The cycle is none → asc → desc → none, because the order rows arrived in is often meaningful and a two-state toggle throws it away permanently.
  - **No `role="grid"`.** That role promises arrow-key cell navigation, and a screen reader switches into that mode the moment it sees it. Claiming it without implementing it is worse than not claiming it: the user lands in a navigation mode where the keys do nothing.
  - **`Row selected` sets `data-selected`, not `aria-selected`** — the latter is only valid inside grid/listbox/treegrid and is reported as an error on a plain `<tr>`. Selection also has to be operable, so it pairs with a consumer-supplied `Checkbox`.
  - `Root` owns the horizontal scroll container, since a wide table that scrolls the page instead of itself is the most common table defect. `scrollLabel` adds `role="region"` + `tabindex="0"` together — a scroll container that is not focusable is unreachable by keyboard, but an unnamed focusable region announces nothing, so it is all three or none.
  - This required the library's **first `svelte-ignore`** (`a11y_no_noninteractive_tabindex`). The rule assumes a focusable non-interactive element is a mistake; a named scrollable region is the documented WAI-ARIA exception, and the compiler cannot see that role, name and tabindex are set together. Rationale is written at the call site.
- [x] **Toast (transient notifications) — the LAST component. The registry is now complete.** `toast` (imperative) + `Toast.Viewport` (declarative, required). Custom, no new runtime dependency.
  - **The three blocking decisions, resolved:** (1) imperative trigger — YES, but paired with a declarative mount point; (2) swipe + stacked animation — NOT in v1; (3) a second runtime dependency — NO.
  - **Why imperative, when everything else here is declarative:** a toast reports an EVENT, not state. State lives in the component tree; the event happens in a `catch`. The argument that actually settles it is not ergonomics — an imperative call is reachable from code that is not a component at all (a `fetch` wrapper, an interceptor, a `load` function), where a context-based API cannot be used. And the declarative alternative does not save you the hard part, it relocates it: ids, timers, the queue, the limit, and removing a toast only after its exit animation are *the* toast.
  - **`Toast.Viewport` is required and declarative**, so the app — not the library — owns position, count and the region name. Without it, calls queue into a list nothing renders. Imperative trigger, declarative placement.
  - **The queue is the library's ONLY mutable module state.** On a server that is shared across requests, so a toast enqueued during SSR would appear in a different user's HTML. Enqueuing on the server is refused and reported via `console.error` — reported, not thrown, because a toast is not essential to the page and a blank screen is the worse trade. Covered by `Toast.ssr.test.ts`, which runs in a real `node` environment (`@vitest-environment node`) since jsdom always has a `window`.
  - **A toast with an `action` defaults to `duration: Infinity`.** A control the user can lose a race against is not a control. An explicit `duration` still overrides it.
  - **Politeness is fixed at `polite`, deliberately not configurable.** `assertive` interrupts whatever is being read, and anything that earns an interruption is too important to auto-dismiss — that is an inline `Alert` or an `AlertDialog`.
  - Timers pause on hover AND on focus: someone reading with a screen reader, or tabbing toward the action, is not moving a pointer.
  - **axe caught a real error:** `role="region"` is not allowed on `<ol>`, which already carries an implicit `list` role. Restructured to a named `<section>` (which *is* a region) wrapping an `<ol aria-live="polite">`.
  - Each dismiss button is named with its toast's title — three toasts means three buttons, and three identical names give no way to tell which closes what.
  - Needed an `Element.prototype.animate` stub in `src/tests/setup.ts`: jsdom has no Web Animations API and Svelte 5 runs every `transition:` through it. The stub reports an already-finished animation, which is the right shape since jsdom cannot paint an intermediate frame.
  - Second `eslint-disable` in the library (`svelte/prefer-svelte-reactivity`): the timer `Map` is bookkeeping, never rendered and never read by a `$derived`, so a `SvelteMap` would add proxy overhead and a reactive dependency for nothing. Rationale is at the call site.
- [ ] Minimal internal layout layer (Box/Stack/Flex) — building blocks, not headline

#### Coverage principle — anchor the roadmap to the Bits UI catalog
Because every styled component wraps a Bits UI primitive, **the Bits UI catalog IS our low-effort backlog**: anything Bits already ships is a styling job, not a behavior/a11y job. Bits UI provides 41 primitives; map every one to a `sve-ui` component before reaching for custom builds.

- [ ] **Remaining Bits UI primitives to wrap (surfaced as `soon` in /components):** Alert Dialog, Aspect Ratio, Calendar, Collapsible, Date Field, Date Picker, Link Preview (hover card), Menubar, Meter, Navigation Menu, PIN Input, Progress, Rating Group, Scroll Area, Toggle, Toggle Group, Toolbar, Range Calendar, Date/Time Range variants — **Label and Separator wrapped in Wave 4a**
- [x] **Custom (non-Bits) components: all shipped.** Toast, Table, Sidebar, Breadcrumb, Sheet, Pagination, Stack and Flex; Textarea and Skeleton in Wave 4a. Carousel (embla) was never scoped and is not in the registry — decide whether it belongs before adding it back.
- [x] **Gap found 2026-06-21:** Textarea and Alert Dialog were missing from the plan entirely — added. Textarea shipped in Wave 4a (2026-08-22); Alert Dialog still open.

### Phase 2 — Testing
- [x] Vitest + `@testing-library/svelte` (+ jsdom/browser); delete the `1+2` test
- [x] One test per component: render, props, variants, events
- [x] Automated a11y (axe) in component tests

### Phase 3 — Docs & component workshop
- [ ] Storybook 10 inside `packages/sve-ui` (Svelte 5) — NOT started. The `/components` docs pages cover the workshop need for now; revisit only if authoring friction shows up.
- [x] `apps/docs` on SvelteKit 2 + Svelte 5 + Tailwind 4; consumes `sve-ui/theme`
- [ ] Auto-generated prop tables from types — still hand-written `PropRow[]` arrays per page. Real drift risk as the catalog grows.

### Phase 4 — Release & CI/CD (open source)
- [x] Changesets (public access)
- [x] `ci.yml`: lint (oxlint + eslint) + `svelte-check` + test + build + `publint` + `attw`
- [x] `release.yml`: changesets + **npm Trusted Publishing (OIDC, no `NPM_TOKEN`)**; provenance automatic (see §10)
- [x] Configure the Trusted Publisher for `sve-ui` on npmjs.com (workflow filename must match `release.yml` exactly)
- [x] Deploy `apps/docs` to Vercel

### Phase 5 — Open-source polish
- [x] README, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue/PR templates
- [ ] Badges (npm, license, Svelte 5) done; **CI and coverage badges still missing**. `keywords` not yet refined.
- [ ] Migration notes for `0.1.x` consumers (documented breaking changes) — NOT written.

---

## 7. Scaffolding commands (reference)

Run from repo root. `sv create` / `storybook init` are interactive — flags minimize prompts. **Nothing pins versions here; pin per §4 before the first install.**

```sh
# Tooling
corepack enable && corepack prepare pnpm@latest --activate

# Library package (library template configures svelte-package)
pnpm dlx sv create packages/sve-ui --template library --types ts --no-install

# Docs app + Tailwind
pnpm dlx sv create apps/docs --template minimal --types ts --no-install
pnpm dlx sv add --cwd apps/docs tailwindcss

# Testing
pnpm dlx sv add --cwd packages/sve-ui vitest
pnpm add -D -F sve-ui @testing-library/svelte @testing-library/jest-dom jsdom

# Lint / format (hybrid)
pnpm dlx sv add --cwd packages/sve-ui prettier eslint
pnpm add -Dw oxlint

# Releases
pnpm dlx @changesets/cli init

# Packaging validation
pnpm add -D -F sve-ui publint @arethetypeswrong/cli

# Component workshop
pnpm dlx storybook@latest init --cwd packages/sve-ui
```

---

## 8. Compatibility checks — RESOLVED ✅ (verified against npm registry peerDependencies, 2026-06-20)

1. **Vite 8** ✅ — `@sveltejs/vite-plugin-svelte@7.1.2` peer: `vite: ^8.0.0`, `svelte: ^5.46.4`; `@sveltejs/kit@2.66.0` peer includes `^8.0.0`. Vite 8 is supported.
2. **TypeScript 6** ✅ (with ceiling) — `typescript-eslint@8.61.1` peer: `typescript: >=4.8.4 <6.1.0`. TS 6.0.x is in range; bump typescript-eslint when TS 6.1 lands. Its `eslint` peer includes `^10.0.0`.
3. **Storybook 10** ✅ — `@storybook/sveltekit@10.4.6` peer: `svelte: ^5.0.0`, `vite: ^8.0.0`.

---

## 9. Open-source notes

- **License:** MIT (fix the `LICENCE` → `LICENSE` filename typo).
- **Releases:** Changesets with `"access": "public"`; npm **provenance** automatic via Trusted Publishing (§10).
- **Community files:** `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue + PR templates.
- **CI is the contract:** every PR must pass lint + check + test + build + `publint` + `attw`.

---

## 10. Publishing (npm Trusted Publishing / OIDC)

**No `NPM_TOKEN`.** Publishing is automated through GitHub Actions using OIDC trusted publishing (GA since Jul 2025). Short-lived, per-workflow credentials replace long-lived secrets, and provenance attestations are generated automatically.

### Day-to-day flow
1. Per meaningful change, add a changeset — **never bump versions by hand:**
   ```sh
   pnpm changeset            # choose patch/minor/major + write the summary
   ```
2. On merge to `main`, `changesets/action` opens/updates a **"Version Packages"** PR (consumes changesets, bumps `package.json`, updates `CHANGELOG.md`).
3. Merging that PR triggers `changeset publish` → publishes to npm with provenance.

### One-time setup
1. **npmjs.com** → `sve-ui` → Settings → **Trusted Publisher** → point to the GitHub repo + the **exact** workflow filename (`release.yml`).
2. **`release.yml`** permissions:
   ```yaml
   permissions:
     id-token: write       # enables OIDC
     contents: write
     pull-requests: write
   ```
3. Runner must have **npm CLI ≥ 11.5.1** and **Node ≥ 22.14**.

### Requirements & gotchas
- **Cloud GitHub runners only** (self-hosted not supported yet).
- **Workflow filename must match exactly** what's configured on npmjs.com (case-sensitive, with `.yml`) — mismatch causes `E404` (the #1 reported issue).
- **Fallback (only if OIDC unavailable):** granular *automation* token in `NPM_TOKEN` + `--provenance` flag.

### First release decision (defer to Phase 4)
The rebuild is a full API-breaking rewrite — the first release should likely be **`1.0.0`**, not a `0.1.x` bump.

---

## 11. Package manager — pnpm (mandatory)

`pnpm` is the **only** supported package manager. Enforced, not suggested:

- Root `package.json`: `"packageManager": "pnpm@<version>"` (Corepack-pinned) + `"engines": { "pnpm": ">=<major>", "node": ">=22.14" }`.
- A `preinstall` guard (`npx only-allow pnpm`) rejects `npm install` / `yarn`.
- Single `pnpm-lock.yaml` at the root; workspace deps use the `workspace:*` protocol.
- All scripts, CI, and scaffolding commands use `pnpm` / `pnpm dlx` exclusively.

---

## 12. AI / agent ecosystem (future — post-component-coverage)

Make Sve·UI a first-class citizen for AI-assisted development, so agents (Claude
Code, Cursor, etc.) generate correct Sve·UI code instead of guessing. Inspired by
shadcn/ui, which ships both an MCP server and an AI-readable component registry.

- [x] **Sve·UI usage Skill** — packaged at `skills/sve-ui-usage/` (LLM-first
  `SKILL.md` + `references/components.md` catalog). Covers the wedge (no
  Tailwind/config), `theme.css` setup, single-vs-namespace imports, the `child`
  snippet for overlay triggers, the body-class theming gotcha for portaled
  overlays, and the `--sve-*` model. _Remaining: decide distribution — ship under
  the npm package `files` so consumers get `node_modules/sve-ui/skills/`, and/or
  publish an `llms.txt`._
- [x] **`llms.txt`** — served at `/llms.txt`, generated from the component registry
  + guide nav (`apps/docs/src/routes/llms.txt/+server.ts`, prerendered) so it never
  drifts. Static, zero-infra, works with any agent. This is the "static registry"
  that covers ~90% of the MCP value.
- [x] **Sve·UI MCP server — evaluated, DEFERRED (2026-06-22).** Verdict: not now.
  Rationale: shadcn's MCP headline value is browse + **install** components from a
  registry; sve-ui is a styled npm package (D17), NOT a copy-paste registry, so that
  action doesn't exist for us. The remaining need (feed agents the real API) is
  covered by the Skill + `llms.txt` at zero hosting/config cost; an MCP adds a hosted
  service, maintenance, and per-consumer client config for marginal gain. **Revisit
  when:** we want agent _actions_ a static file can't do (scaffold a themed page,
  validate usage, generate compositions), or prop schemas auto-generated from types
  grow large/volatile enough that querying beats a static file.
- [ ] **Skill distribution** (open) — ship `skills/` under the npm package `files` so
  consumers get `node_modules/sve-ui/skills/`, and link `llms.txt` from the package.
- [ ] Auto-generate the registry/skill content from component types + variant
  definitions so it never drifts from the source.
