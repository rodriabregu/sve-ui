# Phase 1 Foundation — theming, variants, authoring pattern, packaging, validation slice

Establish the reusable foundation that every sve-ui component will be built on — a CSS-variable theming system (light + dark), a typed variant helper, the container/presentational authoring pattern over Bits UI, and a modern library package contract — then prove the whole architecture end-to-end with two components (`Button`, `Dialog`). This is the load-bearing layer beneath the component waves; nothing downstream can ship correctly until it exists. It directly serves the wedge (D20): fully styled, fully accessible Svelte 5 components that need **no Tailwind and no config** in the consumer project.

> Source of truth: `ROADMAP.md` (decisions D1–D20, §4 stack, Phase 1). This proposal does not re-derive those decisions; it scopes the first executable slice of Phase 1.

## Why now

Phase 0 (skeleton, tooling, config packages, `Box` validation gate) is committed. The next blocking step before any component wave is the **foundation**: without theming, a variant system, an agreed authoring pattern, and a publishable package contract, every component built afterward would either reinvent these primitives or bake in the wrong assumptions. Building one component wave before the foundation is locked would force a costly rework across dozens of components later. Locking the foundation now, and validating it with the two hardest-to-fake paths (a non-interactive styled component and a Bits-UI-backed interactive one), de-risks everything that follows.

## What success looks like

| Outcome | Demonstrable signal |
|---------|---------------------|
| Theming works | A consumer can wrap UI in `<ThemeProvider>`, see correct light/dark rendering, and override any token via CSS custom properties — zero config |
| Variants are typed | `Button` consumes the variant helper across variant × color × size with full type safety and no `any` |
| Authoring pattern proven | `Button` proves the runes-only path; `Dialog` proves the styled-presentational-over-Bits-UI path (overlay, focus trap, portal, a11y) |
| Package is publishable-shaped | `exports` map (`svelte`/`types`/`default`) + `./theme` subpath resolve correctly; `pnpm install` succeeds |
| Full chain green | `build → svelte-package → types → test` all pass for the validation slice |

## Scope

### In scope

1. **Theming system**
   - `<ThemeProvider>` component that sets CSS custom properties on a scope root; SSR-safe (no flash-of-unstyled-content surprises on hydration).
   - Semantic color tokens: `primary`, `secondary`, `success`, `warning`, `danger`, `default` — mapped to palettes (D-confirmed semantic model, not raw palette names).
   - **Light + dark themes shipped out of the box** (class-based `.dark` and/or media-query strategy).
   - Documented override mechanism (consumer overrides tokens via CSS variables).
   - CSS variable namespace: `--sve-*`.
   - Tokens re-exported via the `sve-ui/theme` subpath (D12).

2. **Typed variant system**
   - A reusable, type-safe helper for component variants across axes: **variant × color × size**.
   - Consumed by all components (validated here by `Button`).

3. **Component authoring pattern**
   - Interactive components: styled **presentational** wrapper over Bits UI **container** (container/presentational, D19).
   - Non-interactive components: plain styled Svelte 5 (runes).
   - Scoped `<style>` + CSS vars. **No Tailwind in the core** (D20 — the wedge).

4. **Library packaging**
   - Modernize `packages/sve-ui/package.json`: `exports` map (`svelte`/`types`/`default`) + `./theme` subpath; `peerDependencies: { svelte: "^5" }`; `bits-ui` 2.18.1 as a dependency; devDeps via the pnpm catalog; `@sveltejs/package` (D13).
   - First `pnpm install`.

5. **Validation slice (proves both halves of the architecture)**
   - `Button` — non-interactive path: runes + variants + scoped styles + test.
   - `Dialog` — Bits-UI-backed path: overlay, focus trap, portal, a11y + test.
   - Confirm full chain green: build → `svelte-package` → types → test.

### Out of scope (explicit non-goals)

| Non-goal | Where it belongs |
|----------|------------------|
| Component waves (Input, Card, Select, Badge, etc.) | Phase 1.5 |
| Docs app modernization | Phase 3 |
| CI / release workflows | Phase 4 |
| Minimal internal layout layer (Box/Stack/Flex) | Phase 1.5 (minimal internal layer) |

These are deliberately excluded so the foundation can be reviewed and validated in isolation. `Button` and `Dialog` exist here **only as validation slices**, not as the start of the waves — they prove the architecture, they are not the architecture's output.

## Approach (high level)

| In-scope item | Approach | Rationale |
|---------------|----------|-----------|
| Theming | `<ThemeProvider>` writes `--sve-*` custom properties onto a scope root; semantic tokens map to palette values; light/dark via class and/or media query; SSR-safe so server render and hydration agree | CSS variables are zero-runtime and themeable without forcing a styling layer on consumers (D4/D20) |
| Variants | A single typed helper resolving `variant × color × size` to scoped class/style state, exported for all components | One source of truth for variant logic; avoids per-component string concatenation (the old `Box.svelte` anti-pattern) |
| Authoring pattern | Two reference implementations: runes-only (`Button`) and presentational-over-Bits-UI-container (`Dialog`) | Bits UI owns behavior/a11y (container); our component owns style/variants (presentational) — never reinvent focus traps/ARIA (D18/D19) |
| Packaging | Rewrite `package.json` exports/peer/deps per the ROADMAP §5 export contract; run first `pnpm install`; validate resolution | Establishes the public API surface and `sve-ui/theme` subpath seam before components depend on it (D11/D12/D13) |
| Validation slice | Build both components, then run the full chain build → `svelte-package` → types → test | Two end-to-end paths are the cheapest way to catch foundation gaps before the waves multiply the cost |

## Risks and open questions

| Risk | Impact | Mitigation / note |
|------|--------|-------------------|
| SSR theming flash-of-unstyled-content | Dark-mode users see a light flash on load | ThemeProvider must emit correct CSS-var state before hydration; design decision deferred to spec/design (class vs media-query default, inline critical vars) |
| Bits UI 2.18.1 version/API currency | Dialog wrapper could target a stale API surface | Confirm Bits UI 2.18.1 Dialog API (overlay/portal/focus-trap props) at design time; peers `svelte ^5.33.0`, `@internationalized/date ^3.8.1` already validated in ROADMAP §8 |
| Strict TDD provisional until install | `strict_tdd: true` is provisional because `node_modules` is not yet installed | First `pnpm install` confirms the test runner (`pnpm test` → vitest). Until install succeeds, treat TDD enforcement as provisional |
| Light/dark strategy choice (class vs media-query) | Affects override mechanism and SSR design | Open question for the spec — confirm default strategy and documented override path |
| Variant helper API shape | Locks the contract every component depends on | Settle the helper's type signature in the spec/design before `Button` consumes it |

## Next step

Run `sdd-spec` and `sdd-design` (they can proceed in parallel from this proposal). The spec captures the theming token contract, variant helper contract, package export contract, and validation-slice acceptance criteria; the design resolves the SSR theming strategy, the Bits UI Dialog integration, and the variant helper API shape.
