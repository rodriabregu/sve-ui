# Design: Phase 1 Foundation

## Technical Approach

Build four primitives — token theme, `<ThemeProvider>`, a typed variant helper, and the
authoring pattern — then prove them with `Button` (runes-only) and `Dialog` (styled
presentational over Bits UI). Styling is scoped Svelte `<style>` reading `--sve-*` CSS
custom properties only; no Tailwind, no runtime style engine (D4/D20). The existing
Chakra-style raw colors in `src/lib/theme/*` are kept as a *starting palette* but
restructured into semantic-token-over-scale form; the Svelte 3 components are not reused.

## Architecture Decisions

### Decision: SSR theming strategy

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Media-query only (`prefers-color-scheme`) | Zero JS, no FOUC, but consumer cannot toggle | Rejected as sole strategy |
| Class-only (`.dark` on root) | Toggleable, but SSR must know the class or it flashes | Rejected as sole strategy |
| **Both: `.dark`/`.light` class wins, `@media` is the fallback** | Slightly more CSS | **Chosen** |

**Choice**: Ship both light and dark var sets. Default resolution follows
`@media (prefers-color-scheme: dark)`; an explicit `.dark`/`.light` class on the scope
root overrides it. `<ThemeProvider colorScheme="system" \| "light" \| "dark">` controls the class.
Vars are emitted at `:root` from the static `theme.css` (shipped via `sve-ui/theme`), so
**server render and first paint already carry correct values without JS** — by default the
provider only sets a class and a Svelte context, never the raw vars at runtime.

**Optional scoped overrides (synthesis decision)**: an optional `theme?: Partial<SveTheme>`
prop lets a consumer override tokens for a subtree. When provided, the provider renders those
overrides as **inline CSS variables on its wrapper element** (`style="--sve-...: ..."`). This
is SSR-safe (Svelte renders the inline style on the server) and zero-cost when the prop is
omitted (no inline style, pure static `:root`). This reconciles the spec's scoped-theming
requirement with the static-`:root` default.

**FOUC avoidance**: for `scheme="system"` no script is needed (media query handles it). For
an explicit/persisted choice, the provider exposes an optional `headSnippet` (a tiny inline
script string the consumer drops in `app.html` / `<svelte:head>`) that reads a cookie or
`localStorage` and sets the class **before** hydration. Cookie is recommended for SvelteKit
SSR so the server can render the right class too. **Rationale**: the heavy lifting is static
CSS, so the only thing that can flash is the *class*, and that is the smallest possible
inline-script surface.

### Decision: Variant helper API shape

**Choice**: An in-house CVA-like `defineVariants` (no new dependency — `clsx`/`cva` add a dep
for ~30 lines we control). It returns a resolver mapping `variant × color × size` to a class
string; the actual visual values live in scoped CSS keyed by `data-*` attributes, so the
helper emits *class names + data attributes*, not inline styles. **Rationale**: keeps style
in the stylesheet (themeable, zero-runtime), keeps logic typed and centralized, kills the old
`Box.svelte` string-concatenation anti-pattern.

```ts
// src/lib/internal/variants.ts
type VariantSchema = Record<string, Record<string, string>>;
interface Config<S extends VariantSchema> {
  base?: string;
  variants: S;
  defaultVariants?: { [K in keyof S]?: keyof S[K] };
}
type Props<S extends VariantSchema> = { [K in keyof S]?: keyof S[K] } & { class?: string };
export function defineVariants<S extends VariantSchema>(
  config: Config<S>
): (props?: Props<S>) => string; // returns merged class string
```

```svelte
<!-- Button.svelte -->
<script lang="ts">
  import { defineVariants } from '$lib/internal/variants';
  const button = defineVariants({
    base: 'sve-button',
    variants: {
      variant: { solid: 'sve-button--solid', outline: 'sve-button--outline', ghost: 'sve-button--ghost' },
      color:   { primary: 'sve-c-primary', secondary: 'sve-c-secondary', success: 'sve-c-success', warning: 'sve-c-warning', danger: 'sve-c-danger', default: 'sve-c-default' },
      size:    { sm: 'sve-button--sm', md: 'sve-button--md', lg: 'sve-button--lg' }
    },
    defaultVariants: { variant: 'solid', color: 'primary', size: 'md' }
  });
  let { variant, color, size, class: cls, children, ...rest } = $props();
  const className = $derived(button({ variant, color, size, class: cls }));
</script>
<button class={className} {...rest}>{@render children?.()}</button>
```

### Decision: Bits UI Dialog integration

**Choice**: Compose, do not blanket re-export. Our `Dialog` namespace wraps Bits UI parts:
`Root`/`Trigger`/`Close` are re-exported as-is (behavior-only, no styling needed);
`Overlay`/`Content`/`Title`/`Description` are **styled wrappers** that forward `props`+`children`
to the Bits part and add `class`/`data-*` from scoped CSS. `Portal` is used internally by our
`Content` so consumers don't manage portaling. **Rationale**: Bits owns focus trap, ARIA,
escape/scroll-lock (D18/D19); we own only paint. SSR/portal: Bits portals to `<body>` on the
client only and renders nothing on the server, so it is SSR-safe; styling is via the static
`theme.css` vars, no runtime injection. Confirmed against Bits UI 2.18.1 Dialog part surface
(Root/Trigger/Portal/Overlay/Content/Title/Description/Close).

```ts
// src/lib/components/Dialog/index.ts
export { Root, Trigger, Close } from 'bits-ui'.Dialog; // behavior pass-through
export { default as Overlay } from './DialogOverlay.svelte';
export { default as Content } from './DialogContent.svelte'; // wraps Portal + Bits Content
export { default as Title } from './DialogTitle.svelte';
export { default as Description } from './DialogDescription.svelte';
```

### Decision: Theme token architecture

**Choice**: Two layers. **Palette scales** (`--sve-palette-primary-50..900`) are raw values;
**semantic tokens** reference them (`--sve-color-primary: var(--sve-palette-primary-500)`,
plus `-fg`, `-hover`, `-active`, `-subtle`). Components read only semantic tokens. Naming:
`--sve-<category>-<name>[-<state>]` (e.g. `--sve-color-danger-fg`, `--sve-radius-md`,
`--sve-space-4`). Light/dark differ only at the semantic layer (`:root` light, `:root.dark`
and `@media` dark remap semantics to different scale stops). `sve-ui/theme` exports both the
**JS token object** (typed, for programmatic use/docs) and the **`theme.css`** file (the
`:root` var declarations consumers import once).

### Decision: File/module structure & package.json

`internal/` is not exported; `theme.css` is a real emitted file.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `packages/sve-ui/src/lib/theme/palette.ts` | Create | Scale values (50–900) per semantic family |
| `packages/sve-ui/src/lib/theme/tokens.ts` | Create | Semantic JS token object (typed) |
| `packages/sve-ui/src/lib/theme/theme.css` | Create | `:root` + dark var declarations (`--sve-*`) |
| `packages/sve-ui/src/lib/theme/index.ts` | Modify | Re-export tokens + scales (drop old flat `theme`) |
| `packages/sve-ui/src/lib/internal/variants.ts` | Create | `defineVariants` helper |
| `packages/sve-ui/src/lib/ThemeProvider.svelte` | Create | Sets scheme class + Svelte context; exposes `headSnippet` |
| `packages/sve-ui/src/lib/context.ts` | Create | Theme context key + `useTheme()` |
| `packages/sve-ui/src/lib/components/Button/Button.svelte` | Modify | Rewrite: runes + `defineVariants` + scoped styles |
| `packages/sve-ui/src/lib/components/Dialog/*.svelte` | Create | Styled wrappers over Bits UI parts |
| `packages/sve-ui/src/lib/components/Dialog/index.ts` | Create | Compose/re-export Dialog namespace |
| `packages/sve-ui/src/lib/index.ts` | Modify | Export ThemeProvider, Button, Dialog, variant types |
| `packages/sve-ui/src/lib/components/{Box,Center,...}` | Delete | Old Svelte 3 primitives + hand-written `.d.ts` |
| `packages/sve-ui/package.json` | Modify | exports map + `./theme` subpath; peers/deps; scripts |

## Interfaces / Contracts

```jsonc
// packages/sve-ui/package.json (shape)
{
  "name": "sve-ui", "version": "0.1.2", "type": "module",
  "exports": {
    ".":          { "types": "./dist/index.d.ts", "svelte": "./dist/index.js", "default": "./dist/index.js" },
    "./theme":    { "types": "./dist/theme/index.d.ts", "svelte": "./dist/theme/index.js", "default": "./dist/theme/index.js" },
    "./theme.css":{ "default": "./dist/theme/theme.css" }
  },
  "files": ["dist"],
  "peerDependencies": { "svelte": "^5" },
  "dependencies": { "bits-ui": "2.18.1" },
  "devDependencies": { "@internationalized/date": "^3.8.1", "@sveltejs/package": "2.5.8", "svelte": "5.56.3", "@testing-library/svelte": "5.3.1", "vitest": "4.1.9" },
  "scripts": {
    "build": "vite build && pnpm package",
    "package": "svelte-kit sync && svelte-package && publint",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "test": "vitest run"
  }
}
```

```svelte
<!-- ThemeProvider.svelte (shape) -->
<script lang="ts">
  import { setThemeContext } from '$lib/context';
  import { themeToVars, type SveTheme } from '$lib/theme/tokens';
  let { colorScheme = 'system', theme, class: cls, children } =
    $props<{ colorScheme?: 'system'|'light'|'dark'; theme?: Partial<SveTheme>; class?: string; children?: any }>();
  // Optional scoped overrides → inline CSS vars on the wrapper (SSR-safe; undefined when no theme prop).
  const styleVars = $derived(theme ? themeToVars(theme) : undefined);
  setThemeContext({ get colorScheme() { return colorScheme; } });
</script>
<div
  class={`sve-theme ${cls ?? ''}`}
  data-scheme={colorScheme}
  class:dark={colorScheme === 'dark'}
  class:light={colorScheme === 'light'}
  style={styleVars}
>
  {@render children?.()}
</div>
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `defineVariants` resolution + defaults | Vitest pure-function tests |
| Component | `Button` variant/color/size → classes; renders children | `@testing-library/svelte` |
| Integration | `Dialog` open/close, focus trap, ARIA wiring, portal | `@testing-library/svelte` + Bits behavior |
| Build chain | exports resolve; types emit | `build → svelte-package → check → test`, `publint` |

## Migration / Rollout

No data migration. Old Svelte 3 components deleted in this slice (D1/D17 — not reused). First
`pnpm install` confirms the test runner; until then strict-TDD is provisional.

## Open Questions

- [ ] Cookie name + persistence helper API for the FOUC `headSnippet` (spec-level detail).
- [ ] Final palette stops per semantic family (start from existing 5 raw colors, expand to scales).
