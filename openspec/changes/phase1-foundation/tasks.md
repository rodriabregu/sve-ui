# Tasks: phase1-foundation

> **Change:** phase1-foundation
> **Phase:** tasks
> **Status:** complete
> **Depends on:** spec.md, design.md

---

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 900–1 200 (new files dominant) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → Packaging + Theme foundation / PR 2 → ThemeProvider + Variant helper / PR 3 → Button + Dialog + Wiring |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending (user decision required) |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| WU-1 | package.json rewrite + delete old code + `pnpm install` | PR 1 | Base: main; enables test runner |
| WU-2 | Token system: palette, tokens, theme.css, theme/index.ts | PR 1 | Can land with WU-1; no runtme deps |
| WU-3 | ThemeProvider (context + component + tests) | PR 2 | Base: PR 1 branch |
| WU-4 | `defineVariants` helper + unit tests | PR 2 | Can be parallel with WU-3 |
| WU-5 | Button rewrite + tests | PR 3 | Base: PR 2 branch |
| WU-6 | Dialog styled wrappers + tests | PR 3 | Can be parallel with WU-5 |
| WU-7 | lib/index.ts wiring + full chain validation | PR 3 | Must follow WU-5 and WU-6 |

---

## Ordering Note (strict TDD — provisional)

`pnpm install` must run before any test command is valid. The canonical order is:

1. **First**: packaging tasks (WU-1) — make the test runner real.
2. **Then**: TDD per unit — write failing test → implement → green — for each of: `defineVariants`, `Button`, `Dialog`.
3. Theme files (WU-2) have no test runner dependency; they can be authored before install, but tests only run after.

---

## Phase 1 — Packaging Cleanup (WU-1) [sequential, must be first]

- [ ] 1.1 Rewrite `packages/sve-ui/package.json`: update `exports` to add `.`, `./theme`, and `./theme.css` entries per spec §4.1; set `peerDependencies: { "svelte": "^5" }`; add `dependencies: { "bits-ui": "^2.18.1" }`; replace all `devDependencies` with catalog-protocol entries (Vitest, `@testing-library/svelte`, `@sveltejs/package`, `svelte-check`, etc.); update `scripts` (`build`, `package`, `check`, `test`). Done when: JSON is valid and all keys match spec §4.1–§4.2.
- [ ] 1.2 Delete old Svelte 3 component directories and their hand-written `.d.ts` files: `Box`, `Center`, `Circle`, `CodeExample`, `Flex`, `Grid`, `GridItem`, `Icons`, `Loaders`, `Spacer`, `Square`, `Text`. Also delete `Button/Button.svelte.d.ts` and `Button/Button.svelte` (will be rewritten). Done when: `packages/sve-ui/src/lib/components/` contains only the empty `Button/` and `Dialog/` directories.
- [ ] 1.3 Run `pnpm install` from monorepo root. Done when: exits 0 with no peer-dependency warnings for `sve-ui`. This is the gate that makes the test runner real.
- [ ] 1.4 Validate ESLint flat-config keys: confirm `packages/sve-ui` eslint config uses only flat-config-compatible keys (no `eslint-plugin-svelte3`, no v8-only `overrides[]`). Update if needed. Done when: `eslint --print-config` exits 0.

---

## Phase 2 — Theme Token System (WU-2) [parallel with Phase 1 authoring, runs after 1.3]

- [ ] 2.1 Create `packages/sve-ui/src/lib/theme/palette.ts`: export scale objects (50–900 stops) for each semantic family (primary, secondary, success, warning, danger, default). Done when: every family has at least 9 named stops and the file compiles with `tsc --noEmit`.
- [ ] 2.2 Create `packages/sve-ui/src/lib/theme/tokens.ts`: export `lightTokens` and `darkTokens` as typed `SveTheme` objects; export the `SveTheme` interface (colors, spacing, radius, typography per spec §1.2–§1.3); export `themeToVars(partial: Partial<SveTheme>): string` helper that serializes to an inline `style` string of `--sve-*` vars. Done when: `SveTheme` has all six color roles × four sub-tokens + spacing, radius, typography; `themeToVars` returns a non-empty string for a partial input.
- [ ] 2.3 Create `packages/sve-ui/src/lib/theme/theme.css`: declare all `--sve-*` tokens at `:root` (light values); add `@media (prefers-color-scheme: dark)` + `:root.dark` block with dark values. All six color roles × sub-tokens + `--sve-space-*`, `--sve-radius-*`, `--sve-font-*` must be present. Done when: file validates as valid CSS with no undefined references.
- [ ] 2.4 Update `packages/sve-ui/src/lib/theme/index.ts`: re-export `lightTokens`, `darkTokens`, `SveTheme`, `themeToVars`, and the palette scales; remove all old flat-theme exports. Done when: the module surface matches spec §1.5.

---

## Phase 3 — ThemeProvider (WU-3) [depends on Phase 2]

- [ ] 3.1 **[RED]** Write failing test `packages/sve-ui/src/lib/ThemeProvider.test.ts`: assert (a) renders a `div.sve-theme` wrapper around children; (b) `colorScheme="dark"` adds class `dark` on the wrapper; (c) `colorScheme="light"` adds class `light`; (d) a `theme` override prop sets an inline `--sve-*` CSS var on the wrapper element. Done when: `vitest run` reports 4 failing tests (module not found).
- [ ] 3.2 Create `packages/sve-ui/src/lib/context.ts`: define the theme context key and `setThemeContext` / `useTheme` functions using Svelte 5 `setContext`/`getContext`. Done when: `useTheme()` returns typed `{ colorScheme: 'light' | 'dark' | 'system' }`.
- [ ] 3.3 **[GREEN]** Create `packages/sve-ui/src/lib/ThemeProvider.svelte` using the synthesis model: `<div class="sve-theme" data-scheme={colorScheme} class:dark class:light style={styleVars}>{@render children?.()}</div>`; uses `$props()` runes; calls `setThemeContext`; derives `styleVars` via `themeToVars` only when `theme` prop is present. Done when: the 4 tests from 3.1 pass.

---

## Phase 4 — Variant Helper (WU-4) [parallel with Phase 3, depends on Phase 2 types]

- [ ] 4.1 **[RED]** Write failing test `packages/sve-ui/src/lib/internal/variants.test.ts`: assert (a) `defineVariants` returns a function; (b) calling resolver with no args returns default class string (`solid primary md`); (c) explicit `{ variant: 'ghost', color: 'danger', size: 'sm' }` returns the correct merged class string; (d) extra `class` prop is appended. Done when: 4 failing tests.
- [ ] 4.2 **[GREEN]** Create `packages/sve-ui/src/lib/internal/variants.ts`: implement `defineVariants<S extends VariantSchema>(config: Config<S>): (props?: Props<S>) => string` per the design §Variant helper API. No external deps. Done when: the 4 tests from 4.1 pass.
- [ ] 4.3 **[REFACTOR]** Review `variants.ts` for any implicit `any` or escape hatches; ensure the public type surface satisfies spec §3.3 (compile-time error on invalid axis value). Done when: `tsc --noEmit` emits an error for a call with `color: 'rainbow'` in a test fixture.

---

## Phase 5 — Button Component (WU-5) [depends on Phase 4]

- [ ] 5.1 **[RED]** Write failing test `packages/sve-ui/src/lib/components/button/Button.test.ts`: cover spec §5.1 scenarios E/F/K — (a) renders `<button>` with correct classes for `solid+primary+lg`; (b) `disabled` attribute is set and `onclick` not called when `disabled=true`; (c) snippet children rendered as label; (d) no Tailwind class present in output. Done when: 4 failing tests.
- [ ] 5.2 **[GREEN]** Rewrite `packages/sve-ui/src/lib/components/Button/Button.svelte`: use `$props()` runes; compose `defineVariants` for `variant × color × size`; forward `onclick` and all native button attributes via `{...rest}`; scoped `<style>` that reads `--sve-*` tokens for all visual states including `disabled` (`cursor: not-allowed`). No Tailwind. Done when: all 4 tests from 5.1 pass.

---

## Phase 6 — Dialog Component (WU-6) [parallel with Phase 5, depends on Phase 2]

- [ ] 6.1 **[RED]** Write failing test `packages/sve-ui/src/lib/components/dialog/Dialog.test.ts`: cover spec §5.2 scenarios G/H — (a) trigger renders without error; (b) dialog not in DOM before trigger activation; (c) after trigger click: `role="dialog"` and `aria-modal="true"` present; (d) Escape closes dialog; (e) overlay click closes dialog; (f) focus trapped inside while open. Done when: 6 failing tests (bits-ui not yet wired).
- [ ] 6.2 Create `packages/sve-ui/src/lib/components/Dialog/DialogOverlay.svelte`: styled wrapper over `bits-ui` `Dialog.Overlay`; scoped `<style>` using `--sve-*` tokens for backdrop color and opacity; forwards `class` and `children` props. Done when: component mounts without error in isolation.
- [ ] 6.3 Create `packages/sve-ui/src/lib/components/Dialog/DialogContent.svelte`: styled wrapper that internally uses `bits-ui` `Dialog.Portal` + `Dialog.Content`; adds scoped `<style>` (panel background, border-radius, shadow via `--sve-*`); forwards all relevant props including `aria-label`/`aria-labelledby`. Done when: component renders in a portal.
- [ ] 6.4 Create `packages/sve-ui/src/lib/components/Dialog/DialogTitle.svelte` and `DialogDescription.svelte`: thin styled wrappers over `bits-ui` `Dialog.Title` / `Dialog.Description`; scoped `<style>` for typography via `--sve-*` tokens. Done when: both compile.
- [ ] 6.5 Create `packages/sve-ui/src/lib/components/Dialog/index.ts`: `export { Root, Trigger, Close } from 'bits-ui'` (re-exported from the Dialog namespace); `export { default as Overlay } from './DialogOverlay.svelte'`; `export { default as Content } from './DialogContent.svelte'`; `export { default as Title } from './DialogTitle.svelte'`; `export { default as Description } from './DialogDescription.svelte'`. Done when: barrel compiles cleanly.
- [ ] 6.6 **[GREEN]** Wire Dialog tests from 6.1 against the composed Dialog namespace from 6.5. Done when: all 6 tests pass.

---

## Phase 7 — Wiring + Full Chain Validation (WU-7) [depends on all above]

- [ ] 7.1 Update `packages/sve-ui/src/lib/index.ts`: export `ThemeProvider`; export `Button`; export `* as Dialog from './components/Dialog/index'`; export `defineVariants` and all variant types from `internal/variants.ts`; export `SveTheme` type. Done when: `import { Button, ThemeProvider, Dialog, defineVariants } from 'sve-ui'` resolves without TypeScript error.
- [ ] 7.2 Run `pnpm build` (turbo pipeline: `vite build` + `svelte-package`). Done when: `dist/` contains `index.js`, `index.d.ts`, `theme/index.js`, `theme/index.d.ts`, and `.svelte.d.ts` files per spec §4.3. No hand-written `.d.ts` files should remain in `src/`.
- [ ] 7.3 Run `svelte-check --tsconfig ./tsconfig.json` on `packages/sve-ui`. Done when: exits 0 with zero type errors.
- [ ] 7.4 Run `vitest run` for the full test suite. Done when: all Button, Dialog, ThemeProvider, and variants tests pass (spec §5.3, scenarios E/F/G/H/K).
- [ ] 7.5 Run `publint` against `packages/sve-ui/dist`. Done when: zero errors (spec §4.3, scenario I).
- [ ] 7.6 Verify scenario J end-to-end: `pnpm install && pnpm build && pnpm test` from a clean state exits 0. Done when: all three commands succeed in order.

---

## Dependency Graph

```
Phase 1 (WU-1) ─────────────────────────────────────────────────── (gate: pnpm install)
     │
     ▼
Phase 2 (WU-2) ─────────────────────────────────────────────────── (token system)
     │                     │
     ▼                     ▼
Phase 3 (WU-3)        Phase 4 (WU-4)                              ← parallel
(ThemeProvider)       (defineVariants)
                           │
                           ▼
               Phase 5 (WU-5)  Phase 6 (WU-6)                    ← parallel
               (Button)         (Dialog)
                    │                │
                    └────────┬───────┘
                             ▼
                        Phase 7 (WU-7)                            ← sequential, validates all
```

---

## Spec Traceability

| Task | Spec Requirement |
|------|-----------------|
| 1.1–1.4 | §4.1, §4.2, §4.3 |
| 2.1–2.4 | §1.1–§1.5 |
| 3.1–3.3 | §2.1–§2.4, scenarios A/B/C/D |
| 4.1–4.3 | §3.1–§3.4, scenario K |
| 5.1–5.2 | §5.1, scenarios E/F |
| 6.1–6.6 | §5.2, scenarios G/H |
| 7.1–7.6 | §4.3, §5.3, scenarios I/J |
