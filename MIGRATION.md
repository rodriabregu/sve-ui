# Migrating from `sve-ui` 0.1.x

`0.2.0` was a rewrite, not an upgrade. Almost nothing from `0.1.x` carries over
unchanged, so this is a porting guide rather than a changelog.

The old surface is recorded in [`API-CONTRACT.md`](./API-CONTRACT.md) — a
snapshot taken from the real `export let` declarations before the rewrite. Every
claim below is against that file.

## The hard gate: Svelte 5

`0.1.x` was a Svelte 4 library. Everything from `0.2.0` on is **Svelte 5 only**
(`peerDependencies: { svelte: "^5" }`), built on runes and on
[Bits UI](https://bits-ui.com) for behaviour and accessibility.

There is no compatibility layer and there will not be one. If your app is still
on Svelte 4, stay on `0.1.x` until you migrate the app.

## One-time setup that did not exist before

Import the stylesheet **once** at your app root. Without it, components render
unstyled:

```js
import 'sve-ui/theme.css';
```

Your project needs no Tailwind and no configuration. Theming is done by
overriding `--sve-*` CSS custom properties.

## What happened to each export

### Still here, with a different API

| `0.1.x`                             | Now                                            | What changed                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button`                            | `Button`                                       | The `onClick` **prop** is gone — use the native `onclick`. The `label` prop is gone — pass children. Hardcoded colour strings became a typed `variant` × `color` × `size` system.                                                                                                                                                          |
| `Text`                              | `Text`                                         | Prop set replaced: `fontSize`/`fontWeight`/`textAlign`/`letterSpacing`/`lineHeight`/`fontStyle`/`textDecoration` → `size`, `weight`, `align`, plus `color` and `truncate`. `color` no longer defaults to hardcoded `black`; it derives from tokens.                                                                                        |
| `Flex`                              | `Flex`                                         | Rebuilt with a narrow API. The `dir`/`direction` and `d`/`display` alias pairs are gone, and `gap` is now a **spacing token key** (`gap={4}`) rather than a raw rem number.                                                                                                                                                                |
| `CodeExample`                       | `Code`                                         | Renamed. `typeCodeLabel` → `label`. The `basic` prop is now `copyable`, and it is the **logical inverse**: `basic={true}` hid the copy button, so write `copyable={false}`. Its type is a primitive `boolean` rather than the `Boolean` object wrapper, and the clipboard is SSR-safe — it no longer reaches for `document.querySelector`. |
| `DotPulse`, `DotSpinner`, `DotWave` | `Spinner`                                      | Three components collapsed into one. Use `size` and `color`; the `speed` prop is gone.                                                                                                                                                                                                                                                     |
| `theme` object                      | `lightTokens` / `darkTokens` + `ThemeProvider` | The theme is no longer a JS object you read at runtime. It is emitted as CSS custom properties. Import the token maps from `sve-ui/theme` if you need the values in JS.                                                                                                                                                                    |

### Removed with no direct replacement

| `0.1.x`                    | Do this instead                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Box`                      | Use a plain element and CSS. `Box` accepted 17 style props with duplicate aliases (`p`/`padding`, `m`/`margin`, `w`/`width`, …) and concatenated inline style strings — it had reinvented CSS with a worse syntax. It was dropped deliberately, not overlooked. |
| `Center`                   | `<Flex justify="center" align="center">`                                                                                                                                                                                                                        |
| `Spacer`                   | Use `gap` on `Stack` or `Flex`. Spacer elements make rhythm depend on where you remembered to put them; one `gap` on the parent does not.                                                                                                                       |
| `Square`, `Circle`         | CSS (`width`/`height`/`border-radius`), or `AspectRatio` when you need a ratio box that reserves its space before media loads.                                                                                                                                  |
| `Grid`, `GridItem`         | CSS Grid directly. These wrapped a handful of grid properties and got in the way of the rest.                                                                                                                                                                   |
| `VerifiedIcon`, `HomeIcon` | The library ships no icons. Use an icon set — the four unexported arrow icons in `0.1.x` are gone too.                                                                                                                                                          |
| `*Props` type exports      | Types are generated by `svelte-package` now. Import the variant unions instead — `ButtonVariant`, `BadgeColor`, `InputSize`, and so on.                                                                                                                         |

## New: `Stack`

Vertical rhythm has its own primitive:

```svelte
<Stack gap={4}>…</Stack>
```

`gap` is bound to the spacing scale, and there is no margin, padding or width
prop. That constraint is the lesson from `Box` — the moment a layout primitive
grows props until it can express all of CSS, it has become CSS with a worse
syntax.

## What you gain

The rewrite is not only a breaking change. `0.1.x` shipped 14 components with no
tests and hand-written type declarations that had already drifted from the
source. What is here now:

- **45+ components**, each built on a Bits UI primitive that owns the ARIA,
  focus management and keyboard behaviour.
- **Automated accessibility testing** — every component is rendered in its
  intended accessible configuration and checked with axe.
- **Generated types** from `svelte-package`, with a build-time guard that fails
  if any component's emitted type collapses to `any`.
- **Light and dark** out of the box, themed with CSS custom properties.
- **Prop tables generated from the component source**, so the docs cannot
  disagree with the code.

## Porting strategy

Do it one component at a time rather than in one sweep:

1. Move the app to Svelte 5 first. That is the blocking step, and it is
   independent of this library.
2. Add `import 'sve-ui/theme.css'` at the root.
3. Replace `Box`, `Center`, `Spacer`, `Square`, `Circle`, `Grid` and `GridItem`
   with CSS or `Stack`/`Flex`. This is usually the bulk of the work, and it
   removes indirection rather than adding it.
4. Update `Button` call sites: `onClick` → `onclick`, `label` → children.
5. Swap the loaders for `Spinner` and `CodeExample` for `Code`.
6. Replace `theme` object reads with CSS custom properties.

If you get stuck on a specific component, the [docs](https://sveui.org/components)
carry a live example and a generated prop table for each one.
