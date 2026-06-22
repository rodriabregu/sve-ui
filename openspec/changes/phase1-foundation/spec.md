# Spec — phase1-foundation

> **Change:** phase1-foundation
> **Phase:** spec
> **Status:** complete
> **Source:** Derived from `proposal.md` + `ROADMAP.md` (§4, §5, D1–D20)

This document captures **what must be true** after phase1-foundation is applied. It does not specify how — implementation decisions belong in the design document. Every requirement is verifiable.

---

## 1. Theming Token Contract

### 1.1 Namespace

All CSS custom properties emitted by the theming system MUST use the `--sve-` prefix exclusively. No `--sve-*` variable may be emitted outside of the theming system.

### 1.2 Semantic Color Tokens

The following six semantic color roles MUST be defined as CSS custom properties:

| Semantic role | CSS variable (example — exact palette value set in design) |
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
- The mechanism for selecting light vs dark (class-based, media-query, or explicit prop) is decided in the design document, but BOTH modes MUST be available out of the box in v1.

### 1.5 `sve-ui/theme` Subpath Export Shape

The `./theme` subpath export MUST resolve to a module that re-exports:

- All semantic color token definitions (as typed constants or objects, not just CSS strings).
- The default light-theme token map.
- The default dark-theme token map.
- TypeScript types for the token map structure.

---

## 2. `<ThemeProvider>` Contract

### 2.1 Props

`ThemeProvider` MUST accept:

| Prop | Type | Required | Behavior |
|---|---|---|---|
| `theme` | `Partial<SveTheme>` | No | Deep-merges consumer overrides onto the default theme before writing CSS vars |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | No | Controls which token set is active; defaults to `'system'` |
| `class` | `string` | No | Forwarded to the scope root element |
| `children` (snippet) | `Snippet` | Yes | Slotted content rendered inside the scoped root |

`SveTheme` is a typed interface generated from the token contract (§1.2 + §1.3).

### 2.2 Behavior (synthesis model — see design)

- The full set of default `--sve-*` custom properties MUST be available globally at `:root` via the static `theme.css` (shipped through `sve-ui/theme`). This is the zero-runtime, SSR-safe default; `ThemeProvider` is NOT required for tokens to be present.
- `ThemeProvider` MUST render a wrapper element around `children` and:
  - set a `colorScheme` class/data-attribute on it (`light`/`dark`/`system`) to control which token set is active for that subtree;
  - when (and only when) a `theme` override prop is provided, write those overrides as **inline CSS custom properties on the wrapper element** (`style="--sve-…: …"`). When `theme` is omitted, no inline vars are written (pure static `:root`).
- Applying a `ThemeProvider` with a `theme` override to a subtree MUST override only the tokens within that subtree without affecting sibling or ancestor trees (inline vars cascade to descendants only).
- Partial `theme` overrides MUST NOT reset un-overridden tokens — un-overridden tokens continue to inherit the `:root`/ancestor values via the CSS cascade.
- Consumer CSS that directly references a `--sve-*` variable MUST always win where its specificity/cascade applies (standard CSS cascade).

### 2.3 SSR Safety

- The server render and the hydration pass MUST produce identical DOM output (same CSS variable values on the scope root).
- On first paint, the correct theme token values MUST already be applied — no flash-of-unstyled-content (FOUC) or theme-flash for either light or dark mode.
- ThemeProvider MUST NOT rely on `window`, `document`, or any browser-only API during SSR; any browser-specific logic MUST be deferred to `onMount` or equivalent lifecycle boundary.
- The strategy for FOUC elimination (inline critical CSS, `prefers-color-scheme` in SSR render, or class injection) is decided in the design document.

### 2.4 Consumer Override Mechanism

- A consumer MUST be able to override any single `--sve-*` token by writing a CSS custom property at any ancestor scope, without modifying ThemeProvider's `theme` prop.
- The override MUST be scoped — it MUST NOT leak to other ThemeProvider instances on the same page.

---

## 3. Typed Variant Helper Contract

### 3.1 Input Axes

The helper MUST accept exactly three orthogonal axes:

| Axis | Allowed values |
|---|---|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'flat'` (minimum set; design may add) |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'default'` (matches §1.2) |
| `size` | `'sm' \| 'md' \| 'lg'` |

### 3.2 Output

Given a resolved (or partially-resolved) `{ variant, color, size }` input, the helper MUST return a **merged class string** — the scoped CSS class names (base + per-axis) to apply to the root element. All visual values live in scoped CSS keyed by those classes (and/or `data-*` attributes the component applies); the helper does NOT emit inline styles.

> ARIA attributes are NOT the helper's responsibility — they are applied by each component, since they are component-specific (e.g. a Button's `disabled`, a Switch's `aria-checked`), not variant-derived.

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

## 5. Validation Slice Acceptance Criteria

### 5.1 `Button` Component

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

**Test requirements:**

- A Vitest unit test MUST exist at `packages/sve-ui/src/lib/components/button/Button.test.ts` (or equivalent path).
- The test MUST cover: renders without error; applies correct class for each `variant` × `color` × `size` combination (spot-check minimum 3 combinations); `disabled` state; `onclick` handler invocation; content projection.
- All tests for `Button` MUST pass.

### 5.2 `Dialog` Component

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
- These requirements are satisfied transitively through the Bits UI container; they MUST be verified in tests nonetheless.

**Test requirements:**

- A Vitest unit test MUST exist at `packages/sve-ui/src/lib/components/dialog/Dialog.test.ts` (or equivalent path).
- The test MUST cover: renders trigger without error; dialog is not visible before trigger activation; dialog is visible and has `role="dialog"` after trigger activation; Escape key closes the dialog; overlay click closes the dialog; focus is trapped inside the dialog while open.
- All tests for `Dialog` MUST pass.

### 5.3 Full Chain Acceptance

The following command sequence (or turbo-equivalent) MUST all complete with exit code 0 and no errors after phase1-foundation is applied:

1. `pnpm install` — dependency installation
2. `pnpm build` (turbo pipeline) — Vite + `svelte-package` compilation
3. Type check — `svelte-check` or `tsc --noEmit` on `packages/sve-ui`
4. `pnpm test` — Vitest test suite for `packages/sve-ui`

No step MAY depend on a step that follows it in this sequence; the chain MUST be runnable top-to-bottom in a clean environment.

---

## 6. Explicit Non-Goals (Scope Boundary)

The following are out of scope for phase1-foundation and MUST NOT appear in any deliverable of this change:

- Any component other than `Button` and `Dialog`.
- Documentation app changes (`apps/docs`).
- CI/CD workflows (`.github/workflows`).
- Storybook setup.
- The internal layout layer (`Box`, `Stack`, `Flex`).
- Changesets or release configuration.
- A11y automation (axe-core integration) — out of scope until Phase 2.

---

## 7. Assumptions — RESOLVED by design + reconciliation

The proposal's open questions were resolved in the design and the spec/design reconciliation (synthesis ThemeProvider model confirmed by the user):

| Question | Resolution |
|---|---|
| Light/dark strategy | Static `--sve-*` at `:root`; dark via class (`.dark` on the ThemeProvider wrapper, scoped) with `@media (prefers-color-scheme)` as fallback for `colorScheme="system"`. Both modes ship in v1. |
| ThemeProvider element / scope root | Wraps `children` in a `<div class="sve-theme">`. Default tokens come from `:root` (static); the provider only sets the `colorScheme` class + Svelte context, and — only when a `theme` prop is given — writes scoped overrides as **inline CSS vars on the wrapper** (synthesis). |
| Variant helper shape | Pure TypeScript factory `defineVariants(config) → (props?) => string` returning a merged **class string** (not an object). |
| Bits UI Dialog API | Composed over Bits UI 2.18.1 `Dialog` parts (`Root`/`Trigger`/`Portal`/`Overlay`/`Content`/`Title`/`Description`/`Close`); `Root`/`Trigger`/`Close` re-exported as-is, `Overlay`/`Content`/`Title`/`Description` styled wrappers. Runtime confirmation gate = first install + Dialog test. |

---

## 8. Acceptance Scenarios

### Scenario A — ThemeProvider applies light tokens on mount

```
Given a Svelte application renders <ThemeProvider> with default props
When the component mounts in light mode (colorScheme = 'system', prefers-color-scheme: light)
Then the scope root element has CSS variable --sve-color-primary set to the light palette value
And --sve-color-default-foreground is set to the light foreground value
And all --sve-space-* and --sve-radius-* tokens are present on the scope root
```

### Scenario B — ThemeProvider switches to dark mode

```
Given a Svelte application renders <ThemeProvider colorScheme="dark">
When the component renders (server or client)
Then the scope root element has CSS variable --sve-color-primary set to the dark palette value
And the light palette values are NOT applied to that scope root
```

### Scenario C — Consumer token override wins

```
Given a page has <ThemeProvider> with default theme
When a child element's CSS sets --sve-color-primary to #ff0000 on itself or an ancestor
Then that element displays #ff0000 for primary-colored content
And other elements not in that ancestor chain continue to display the ThemeProvider value
```

### Scenario D — SSR produces no FOUC

```
Given a SvelteKit app renders <ThemeProvider> on the server
When the HTML response reaches the browser before any JS executes
Then the correct --sve-* token values are already present in the HTML (inline or in a <style> block)
And no visible color change occurs when the client-side JS hydrates
```

### Scenario E — Button variant resolves correctly

```
Given <Button variant="solid" color="primary" size="lg">Save</Button> is rendered
When the component mounts
Then the root <button> element has the CSS class(es) that correspond to solid + primary + lg
And the rendered output does not contain any Tailwind utility classes
And the button's accessible name is "Save"
```

### Scenario F — Button disabled state

```
Given <Button disabled>Submit</Button> is rendered
When a user attempts to click it
Then the native disabled attribute is present on the <button> element
And the onclick handler is NOT invoked
And the element has cursor: not-allowed styling
```

### Scenario G — Dialog opens, traps focus, closes on ESC

```
Given a page renders <Dialog> with a trigger button "Open dialog" and dialog content including a text input
When the user clicks "Open dialog"
Then the dialog panel appears with role="dialog" and aria-modal="true"
And focus moves to the first focusable element inside the dialog
When the user presses Tab repeatedly
Then focus cycles only within the dialog (does not reach elements outside)
When the user presses Escape
Then the dialog closes
And focus returns to the "Open dialog" trigger button
```

### Scenario H — Dialog closes on overlay click

```
Given the dialog is open (see Scenario G)
When the user clicks the overlay backdrop (outside the dialog panel)
Then the dialog closes
And focus returns to the trigger that opened it
```

### Scenario I — Package exports resolve correctly

```
Given a consumer project has "sve-ui" installed
When the consumer writes: import { Button } from 'sve-ui'
Then the import resolves to dist/index.js (svelte condition)
And TypeScript resolves types from dist/index.d.ts
When the consumer writes: import { tokens } from 'sve-ui/theme'
Then the import resolves to dist/theme/index.js
And TypeScript resolves types from dist/theme/index.d.ts
```

### Scenario J — Full build chain passes

```
Given a clean checkout with no node_modules
When the developer runs: pnpm install && pnpm build && pnpm test
Then all three commands exit with code 0
And dist/ contains index.js, index.d.ts, theme/index.js, theme/index.d.ts
And publint reports zero errors against dist/
And all Button and Dialog tests pass
```

### Scenario K — Variant helper type safety

```
Given the variant helper is imported and called with an invalid color value
  e.g. resolveVariant({ variant: 'solid', color: 'rainbow', size: 'md' })
When TypeScript compiles the file
Then the compiler emits a type error for 'rainbow' not assignable to the color union
And no runtime error occurs when calling with valid values
```
