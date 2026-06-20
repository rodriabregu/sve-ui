# sve-ui — Public API Contract (v0.1.2 baseline)

> **Purpose:** Snapshot of the existing public API, captured from the real `export let` declarations in the `src/lib` source before the Svelte 5 rewrite. This is the verification target for Phase 1: the rewrite must consciously **preserve** or **break** each item below — nothing drifts by accident.
>
> Since the rebuild is an API-breaking `1.0.0`, "Normalization notes" mark debt we intend to fix deliberately. Anything not marked must keep working.

Source of truth: `src/lib/index.ts` exports + each component's `<script>`.

---

## Exported entry points (`src/lib/index.ts`)

Components: `Button`, `CodeExample`, `Box`, `Flex`, `Center`, `Spacer`, `Square`, `Circle`, `Grid`, `GridItem`, `Text`, `DotPulse`, `DotSpinner`, `DotWave`.
Icons: `VerifiedIcon`, `HomeIcon`.
Each component also exports its `*Props` type.

> ⚠️ The `Icons/` folder also contains `arrowUpCircle`, `arrowDownCircle`, `arrowLeftCircle`, `arrowRightCircle` — **defined but NOT exported**. Decide in rewrite whether to expose them.

---

## Layout primitives

### `Box` (base primitive)
| Prop | Type | Default |
|---|---|---|
| `as` | string | `'div'` |
| `p` / `padding` | number | `0` |
| `m` / `margin` | number | `0` |
| `w` / `width` | string | `''` |
| `h` / `height` | string | `''` |
| `bg` / `backgroundColor` | string | `'transparent'` |
| `color` | string | `'inherit'` |
| `border` | string | `'none'` |
| `br` / `borderRadius` | string | `''` |
| `d` / `display` | string | `''` |
| `fontSize` | number | `1` |
| `style` | string | `''` |
| `textAlign` | string | `''` |
| `alignItems` | string | `''` |
| `justifyContent` | string | `''` |
| `justifyItems` | string | `''` |

Slot: default. Spreads `$$restProps`. Renders via `<svelte:element this={as}>`.

**Normalization:** kill the alias duplication (`p`/`padding`, `m`/`margin`, `w`/`width`, `h`/`height`, `bg`/`backgroundColor`, `br`/`borderRadius`, `d`/`display`) — pick one canonical name per prop. Replace inline style-string concatenation with scoped styles + CSS custom properties wired to the theme tokens.

### `Flex` (wraps `Box`)
| Prop | Type | Default |
|---|---|---|
| `dir` / `direction` | string | `'row'` |
| `justify` | string | `'flex-start'` |
| `align` | string | `'stretch'` |
| `wrap` | string | `'nowrap'` |
| `gap` | number (rem) | `0` |
| `d` / `display` | string | `''` |
| `style` | string | `''` |

Slot: default. **Normalization:** drop `dir`/`direction` and `d`/`display` duplication.

### `Center` (wraps `Box`)
| Prop | Type | Default |
|---|---|---|
| `width` | string | `'100%'` |
| `height` | string | `'100%'` |

Slot: default. Flex-centers its content.

### `Square` (wraps `Box`)
| Prop | Type | Default |
|---|---|---|
| `size` | string | `'1rem'` |

Slot: default. Equal width/height.

### `Circle` (wraps `Square`)
| Prop | Type | Default |
|---|---|---|
| `size` | string | `'1rem'` |

Slot: default. `borderRadius: 100%`.

### `Spacer` (wraps `Box`)
| Prop | Type | Default |
|---|---|---|
| `size` | **number** (rem) | `1` |

No slot. **Normalization:** `size` type is inconsistent across the lib — `Square`/`Circle` use a string (`'1rem'`), `Spacer` uses a number (`1`), loaders use a `theme.spacing` key. Unify the convention.

### `Grid`
| Prop | Type | Default |
|---|---|---|
| `columns` | number | `1` |
| `gap` | number (rem) | `1` |
| `flow` | string | `'row'` |

Slot: default. Spreads `$$restProps`.

### `GridItem`
| Prop | Type | Default |
|---|---|---|
| `colStart` | string | `'auto'` |
| `colEnd` | string | `'auto'` |
| `rowStart` | string | `'auto'` |
| `rowEnd` | string | `'auto'` |
| `area` | string | `''` |
| `justifySelf` | CSS justify-self union | `'auto'` |
| `alignSelf` | CSS align-self union | `'auto'` |

Slot: default.

---

## Content

### `Text`
| Prop | Type | Default |
|---|---|---|
| `as` | element union (`p`,`span`,`h1`–`h6`,`a`,`code`,`div`,…) | `'p'` |
| `color` | string | `'black'` |
| `fontWeight` | `keyof theme.fontWeights` | `'normal'` |
| `fontSize` | `keyof theme.fontSizes` | `'md'` |
| `fontStyle` | string | `'normal'` |
| `textDecoration` | string | `'none'` |
| `letterSpacing` | `keyof theme.letterSpacings` | `'normal'` |
| `lineHeight` | string | `'normal'` |
| `textAlign` | string | `'left'` |

Slot: default. **Normalization:** `color` default `'black'` should derive from a token, not be hardcoded.

### `Button`
| Prop | Type | Default |
|---|---|---|
| `label` | string | `'Button'` |
| `onClick` | `() => void` | `() => {}` |
| `color` | string (`'blue'`/`'red'`/`'green'`) | `'blue'` |
| `size` | `ButtonSize` = `'xsm'\|'sm'\|'md'\|'lg'\|'xl'\|'xxl'\|'xxxl'` | `'md'` |
| `disabled` | boolean | `false` |
| `style` | string | `''` |
| `bg` | string | `''` |
| `p` | string | `'3'` |

Slot: default (falls back to `label`). Exports `ButtonSize` type.

**Normalization (high priority):** replace the `onClick` prop with the native `onclick` event (Svelte 5). Replace hardcoded color classes (`#007bff`, etc.) with a token-based, typed **variant system** (variant × color × size). Remove the unresolved TODO comment. Reconcile the drift between `Button.svelte` and the hand-written `Button.svelte.d.ts`.

### `CodeExample`
| Prop | Type | Default |
|---|---|---|
| `typeCodeLabel` | string | `'Sve-UI'` |
| `basic` | `Boolean` | `false` |

Slot: default. Has a copy-to-clipboard button. **Normalization:** type is `Boolean` (object wrapper) — should be primitive `boolean`. Uses `document.querySelector` — must be SSR-safe in the rewrite.

---

## Loaders

All three share the same prop shape; only the default `speed` differs.

| Component | `size` (`keyof theme.spacing`) | `color` | `speed` |
|---|---|---|---|
| `DotPulse` | `14` | `'white'` | `'1.2'` |
| `DotWave` | `14` | `'white'` | `'1'` |
| `DotSpinner` | `14` | `'white'` | `'0.9'` |

No slots. Driven by `--sve-size`, `--sve-color`, `--sve-speed` CSS vars (already token-aware — good pattern to keep).

---

## Theme (`src/lib/theme`)

Exported `theme` object:
- `colors`: `primary` `#F56565`, `secondary` `#ED8936`, `tertiary` `#ECC94B`, `dark` `#2D3748`, `light` `#EDF2F7`
- `spacing`: `px`, `0.5`–`96` (rem scale)
- `sizes`: `largeSizes` (`3xs`–`8xl`, `prose`, `max`/`min`/`full`) + `spacing` + `container` (`sm`–`xl`)
- `radius`: `none`, `sm`–`3xl`, `full`
- `breakpoints`: `base`, `sm`–`2xl` (em)
- `fonts`: `heading`, `body`
- `fontSizes`: `6xs`–`10xl`
- `fontWeights`: `hairline`(100)–`black`(900)
- `letterSpacings`: `tighter`–`widest`
- `lineHeights`: `normal`, `none`, named + numeric

**Rewrite plan:** this object becomes the single source of truth → emitted as CSS custom properties, consumed by components, and re-exported via the `sve-ui/theme` subpath.

---

## Cross-cutting normalization summary

1. Box/Flex alias prop duplication → one canonical name each.
2. `size` type unified across Square/Circle/Spacer/loaders.
3. `Button.onClick` prop → native `onclick`; color classes → token variant system.
4. Inline style-string concatenation → scoped styles + CSS vars from tokens.
5. `CodeExample` `Boolean` → `boolean`; make clipboard SSR-safe.
6. Mixed `lang="ts"`/plain JS → all TypeScript.
7. Hand-written `.svelte.d.ts` → generated by `svelte-package`.
8. Decide on the 4 unexported arrow icons.
9. `Text`/`Button` hardcoded colors → tokens.
