# Living Spec: Foundation — sve-ui v1 Theming, Variants, Authoring Pattern, Package Contract

**Source**: Phase 1 Foundation SDD (phase1-foundation, 2026-06-20)
**Status**: Current (shipped)
**Branch**: feat/2026-rebuild (commit aea7b00)
**Test Coverage**: 34/34 tests passing

---

## 1. Theming Token Contract

### 1.1 Namespace

All CSS custom properties emitted by the theming system MUST use the `--sve-` prefix exclusively. No `--sve-*` variable may be emitted outside of the theming system.

### 1.2 Semantic Color Tokens

The following six semantic color roles MUST be defined as CSS custom properties:

| Semantic role | CSS variable |
|---|---|
| `primary` | `--sve-color-primary` |
| `secondary` | `--sve-color-secondary` |
| `success` | `--sve-color-success` |
| `warning` | `--sve-color-warning` |
| `danger` | `--sve-color-danger` |
| `default` | `--sve-color-default` |

Each role MUST also expose foreground (text-on-color), surface (background), border, and hover variants as sub-tokens — at minimum:

- `--sve-color-{role}` — primary fill
- `--sve-color-{role}-foreground` — text/icon on that fill
- `--sve-color-{role}-surface` — light tinted background
- `--sve-color-{role}-border` — border or outline color

Exact palette hex values are resolved in the design document. The spec mandates the role and sub-token shape, not the raw values.

### 1.3 Required Token Categories

The theming system MUST include all of the following categories, each exposed as `--sve-*` custom properties:

| Category | Example tokens |
|---|---|
| Colors | Semantic roles (§1.2) |
| Spacing | `--sve-space-1` … `--sve-space-16` (4px base unit or equivalent scale) |
| Border radius | `--sve-radius-none`, `--sve-radius-sm`, `--sve-radius-md`, `--sve-radius-lg`, `--sve-radius-full` |
| Typography | `--sve-font-family-sans`, `--sve-font-size-sm/md/lg`, `--sve-font-weight-normal/medium/bold`, `--sve-line-height-tight/normal/relaxed` |

### 1.4 Light and Dark Theme Values

- MUST provide a complete set of token values for **light mode** (default).
- MUST provide a complete set of token values for **dark mode**.
- Both sets MUST cover every token defined in §1.2 and §1.3.
- The mechanism for selecting light vs dark (class-based, media-query, or explicit prop) is:
  - **Static `--sve-*` at `:root`** (light values, no runtime).
  - **Dark mode via class** (`.dark` on the `ThemeProvider` wrapper, scoped) with `@media (prefers-color-scheme: dark)` as fallback for `colorScheme="system"`.
  - Both modes ship in v1 and are available out of the box.

### 1.5 `sve-ui/theme` Subpath Export Shape

The `./theme` subpath export MUST resolve to a module that re-exports:

- All semantic color token definitions as typed constants (`lightTokens`, `darkTokens`).
- The default light-theme token map.
- The default dark-theme token map.
- TypeScript types for the token map structure (`SveTheme`, `PartialSveTheme`).
- A convenience export: `tokens = { light: lightTokens, dark: darkTokens }`.

---

## 2. `<ThemeProvider>` Component Contract

### 2.1 Props

`ThemeProvider` MUST accept:

| Prop | Type | Required | Behavior |
|---|---|---|---|
| `theme` | `Partial<SveTheme>` | No | Deep-merges consumer overrides onto the default theme; when present, writes overrides as inline CSS custom properties on the scope root |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | No | Controls which token set is active; defaults to `'system'` |
| `class` | `string` | No | Forwarded to the scope root element |
| `children` (snippet) | `Snippet` | Yes | Slotted content rendered inside the scoped root |

`SveTheme` is a typed interface generated from the token contract (§1.2 + §1.3).

### 2.2 Behavior (Synthesis Model)

- The full set of default `--sve-*` custom properties MUST be available globally at `:root` via the static `theme.css` (shipped through `sve-ui/theme`). This is the zero-runtime, SSR-safe default; `ThemeProvider` is NOT required for tokens to be present.
- `ThemeProvider` MUST render a wrapper element around `children` and:
  - Set a `colorScheme` class/data-attribute on it (`light`/`dark`/`system`) to control which token set is active for that subtree.
  - When (and only when) a `theme` override prop is provided, write those overrides as **inline CSS custom properties on the wrapper element** (`style="--sve-…: …"`).
  - When `theme` is omitted, no inline vars are written (pure static `:root`).
- Applying a `ThemeProvider` with a `theme` override to a subtree MUST override only the tokens within that subtree without affecting sibling or ancestor trees (inline vars cascade to descendants only).
- Partial `theme` overrides MUST NOT reset un-overridden tokens — un-overridden tokens continue to inherit the `:root`/ancestor values via the CSS cascade.
- Consumer CSS that directly references a `--sve-*` variable MUST always win where its specificity/cascade applies (standard CSS cascade).

### 2.3 SSR Safety

- The server render and the hydration pass MUST produce identical DOM output (same CSS variable values on the scope root).
- On first paint, the correct theme token values MUST already be applied — no flash-of-unstyled-content (FOUC) or theme-flash for either light or dark mode.
- ThemeProvider MUST NOT rely on `window`, `document`, or any browser-only API during SSR; any browser-specific logic MUST be deferred to `onMount` or equivalent lifecycle boundary.
- Persisted dark-mode preference (cookie/localStorage) requires a tiny inline script in `app.html` (`headSnippet`) to set the class before hydration. This is a documented optional add-on for Phase 2.

### 2.4 Consumer Override Mechanism

- A consumer MUST be able to override any single `--sve-*` token by writing a CSS custom property at any ancestor scope, without modifying ThemeProvider's `theme` prop.
- The override MUST be scoped — it MUST NOT leak to other ThemeProvider instances on the same page.

---

## 3. Typed Variant Helper Contract

### 3.1 Input Axes

The helper MUST accept exactly three orthogonal axes:

| Axis | Allowed values |
|---|---|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'flat'` (minimum set; may extend) |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'default'` (matches §1.2) |
| `size` | `'sm' \| 'md' \| 'lg'` |

### 3.2 Output

Given a resolved (or partially-resolved) `{ variant, color, size }` input, the helper MUST return a **merged class string** — the scoped CSS class names (base + per-axis) to apply to the root element. All visual values live in scoped CSS keyed by those classes (and/or `data-*` attributes the component applies); the helper does NOT emit inline styles.

ARIA attributes are NOT the helper's responsibility — they are applied by each component, since they are component-specific (e.g. a Button's `disabled`, a Switch's `aria-checked`), not variant-derived.

### 3.3 Type Safety

- The helper's signature MUST be fully typed with no `any` or `unknown` escapes in the public surface.
- Passing an axis value outside the defined union MUST produce a TypeScript compile-time error.
- Default values MUST be defined so that calling the helper with no arguments (or partial arguments) resolves to the `{ variant: 'solid', color: 'default', size: 'md' }` baseline without runtime errors.
- All component consumers of the helper MUST use the same exported types — no per-component re-declaration of variant axes.

### 3.4 Extensibility

- The helper MUST be a standalone exportable function (or factory) — not a Svelte component or a global store.
- It MUST be importable from the main `sve-ui` entry point.

---

## 4. Package Export Contract

### 4.1 `exports` Map Shape

`packages/sve-ui/package.json` MUST contain an `exports` map with at minimum the following entries, each resolving all three conditions:

```jsonc
{
  "exports": {
    ".": {
      "types":   "./dist/index.d.ts",
      "svelte":  "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./theme": {
      "types":   "./dist/theme/index.d.ts",
      "svelte":  "./dist/theme/index.js",
      "default": "./dist/theme/index.js"
    }
  }
}
```

No additional subpaths are required in phase1-foundation.

### 4.2 Peer and Direct Dependencies

- `peerDependencies` MUST declare `{ "svelte": "^5" }`.
- `bits-ui` at `^2.18.1` MUST appear in `dependencies` (not `devDependencies` or `peerDependencies`), because Dialog depends on it and consumers receive it transitively.
- All tooling (Vitest, `@testing-library/svelte`, `@sveltejs/package`, etc.) MUST appear in `devDependencies` and MUST use the pnpm catalog (`catalog:`) protocol where catalog entries are defined.

### 4.3 Install and Build Validation

- `pnpm install` from the monorepo root MUST complete without errors or peer-dependency warnings related to `sve-ui`.
- `pnpm run build` (or the equivalent turbo pipeline) MUST produce a `dist/` directory inside `packages/sve-ui/` containing:
  - `dist/index.js` and `dist/index.d.ts` (main entry)
  - `dist/theme/index.js` and `dist/theme/index.d.ts` (theme subpath)
  - Generated `.svelte.d.ts` files for each exported component (produced by `svelte-package`, NOT hand-written)
- `publint` run against `packages/sve-ui/dist` MUST report zero errors.

---

## 5. Component Validation Slice

This foundation is validated by two reference implementations:

### 5.1 `Button` Component (Runes-Only Path)

`Button` is the non-interactive validation path (Svelte 5 runes + variant helper + scoped styles).

**Functional requirements:**

- MUST render as a native `<button>` element by default.
- MUST accept and apply `variant`, `color`, and `size` props via the typed variant helper (§3).
- MUST forward native `onclick` and other standard HTML button attributes to the underlying element.
- MUST render into a disabled visual + functional state when `disabled` prop is `true` (`disabled` attribute set; `cursor: not-allowed`).
- MUST render slotted/snippet content as its label — no hardcoded label text.
- MUST apply only scoped CSS styles; MUST NOT emit any Tailwind utility classes.

**Accessibility requirements:**

- MUST produce a valid accessible name at all times (either from content or an `aria-label` prop).
- MUST preserve native `<button>` focus management and keyboard activation (Enter/Space).
- When `disabled` is true, MUST set `disabled` attribute (not just `aria-disabled`) so native focus management prevents interaction.

### 5.2 `Dialog` Component (Bits UI Integration Path)

`Dialog` is the Bits-UI-backed validation path (styled presentational wrapper over a Bits UI container).

**Functional requirements:**

- MUST be composed as a styled presentational wrapper over `bits-ui`'s `Dialog` primitive — the behavior/a11y layer comes from Bits UI; sve-ui owns only style and variant application.
- MUST open when its trigger is activated and close when dismissed.
- Dismiss mechanisms MUST include: clicking the overlay backdrop, pressing the Escape key, and an explicit close action within the dialog content.
- MUST render in a **portal** (appended outside the normal DOM tree, e.g. directly on `document.body`) to avoid z-index and overflow clipping issues.
- MUST apply all `--sve-*` token-based styles to its overlay, panel, and internal elements — no hardcoded color or spacing values.

**Accessibility requirements:**

- MUST have `role="dialog"` on the panel element.
- MUST set `aria-modal="true"` on the panel element.
- MUST have an accessible label (either `aria-label` or `aria-labelledby` pointing to a heading inside the dialog).
- MUST trap focus within the dialog while open — Tab and Shift+Tab cycle only among focusable elements inside.
- MUST return focus to the trigger element upon close.

### 5.3 Full Chain Acceptance

The following command sequence (or turbo-equivalent) MUST all complete with exit code 0 and no errors after phase1-foundation is applied:

1. `pnpm install` — dependency installation
2. `pnpm build` (turbo pipeline) — Vite + `svelte-package` compilation
3. Type check — `svelte-check` or `tsc --noEmit` on `packages/sve-ui`
4. `pnpm test` — Vitest test suite for `packages/sve-ui`

All steps MUST be runnable top-to-bottom in a clean environment.

---

## 6. Known Issues (Phase 1) — Follow-Ups for Phase 2+

### 6.1 FOUC / Persisted Dark Mode

**Issue**: ThemeProvider supports `colorScheme="dark"` but does not automatically load a persisted preference from `localStorage` or a cookie. For users with a persisted dark-mode preference, a Flash of Unstyled Content (FOUC) occurs if the default is light.

**Scope**: Phase 2 — implement optional `headSnippet` helper and cookie/localStorage integration. The static `:root` default already prevents flash for the initial system preference; persisted toggle requires the optional script.

**Test**: Manual verification; not covered by unit tests (Phase 2 e2e scope).

### 6.2 Button `:active` State Non-Primary Colors

**Issue**: Button CSS for `:active` state only provides explicit rules for the `primary` color. Other colors (secondary, success, warning, danger, default) fall back to the browser default `:active` styling.

**Scope**: Phase 1.5+ — extend Button's scoped `<style>` to provide `:active` rules for all color variants.

**Impact**: Minor visual inconsistency; does not affect accessibility or functionality.

### 6.3 Dialog Overlay-Click Dismiss (e2e Scope)

**Issue**: Unit tests verify that the Escape key dismisses the dialog and structural overlay invariants hold. Full overlay-click-to-dismiss requires Playwright e2e testing because jsdom's DismissibleLayer uses a 10ms debounce + composed-path inspection that cannot be simulated in jsdom.

**Scope**: Phase 1 e2e via Playwright (apps/docs or dedicated e2e suite).

**Test Status**: Escape dismiss ✅; overlay click dismiss → Playwright required.

### 6.4 Test Files and Fixtures in dist/

**Issue**: `svelte-package` copies `*.test.*` files and fixture components from `src/tests/` into `dist/`. These are not reachable via the exports map but inflate package size.

**Scope**: Phase 1.5 — configure `.sveltepkg` exclusion rules in `svelte.config.js` or add `files` allowlist to `package.json`.

**Impact**: Package size; no functional impact (unreachable via public API).

---

## 7. Conformance Checkpoints (v1.0)

| Requirement | Status | Notes |
|---|---|---|
| All `--sve-*` at `:root` | PASS | Static theme.css; light mode default |
| Light + dark token sets | PASS | Both available; class-based selection |
| ThemeProvider component | PASS | Synthesis model (optional scoped overrides) |
| `defineVariants` helper | PASS | Full type safety; no `any` |
| Button component | PASS | 34/34 tests; no Tailwind; scoped styles |
| Dialog component | PASS | Bits UI composition; 34/34 tests; focus trap (unit), escape dismiss (unit), overlay structure (unit) |
| Package exports | PASS | `.` + `./theme` subpaths; `publint` 0 errors |
| Full build chain | PASS | install → build → check → test all green |

---

## 8. Architecture Decisions Rationale

### Why CSS Variables (No Runtime Style Engine)

Decision D4/D20 from ROADMAP: CSS custom properties are zero-runtime, zero-config, and themeable without forcing a styling layer on consumers. The entire default theme is available at `:root` with no JavaScript required.

### Why Synthesis Model for ThemeProvider

The `ThemeProvider` uses a hybrid approach:
- **Default**: Static `:root` CSS variables (SSR-safe, no runtime).
- **Optional scoped overrides**: Inline vars on the wrapper only when a `theme` prop is provided.

This reconciles the need for scoped theming (component-local token customization) with the simplicity of static `:root`-based defaults.

### Why Bits UI (Not Hand-Rolled Dialog)

Decision D18/D19 from ROADMAP: Bits UI owns the hard parts (focus trap, ARIA, escape/scroll lock, a11y). sve-ui owns only the painted surface. This prevents re-inventing accessibility and avoids sync-with-standards issues.

### Why defineVariants (Not a Dependency)

`defineVariants` is an in-house CVA-like helper. It adds ~50 lines of typed TypeScript and kills the old `Box.svelte` string-concatenation anti-pattern. Adding a dependency for the same functionality (cva, clsx) would add runtime overhead and vendor lock-in for no gain.

---

## 9. Next Phases

- **Phase 1.5**: Input, Card, Select, Badge, and internal layout layer (Box, Stack, Flex); extend Button `:active`; Dialog e2e via Playwright.
- **Phase 2**: Docs app modernization; FOUC elimination (headSnippet + persisted scheme).
- **Phase 3**: CI/CD workflows, release pipeline, changelog/changesets.
- **Phase 4**: Storybook integration, design-to-code tooling.
