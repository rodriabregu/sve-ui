---
name: sve-ui-usage
description: "Trigger: using sve-ui, sve-ui components, Svelte 5 UI with sve-ui, theming sve-ui. Use the sve-ui component library correctly: imports, namespaces, theming, a11y."
license: MIT
metadata:
  author: rodriabregu
  version: "1.0"
---

## Activation Contract

Load when building or editing a Svelte 5 app that consumes `sve-ui` — importing, composing, theming, or debugging unstyled/broken sve-ui components.

## Hard Rules

- Import the stylesheet ONCE at the app root: `import 'sve-ui/theme.css';`. Without it, components render unstyled. The consumer project needs NO Tailwind and NO config.
- Single components are default imports; composite components are namespaces composed with dots:
  - Singles: `import { Button, Input, Badge, Spinner, Text, Heading, Slider, Code } from 'sve-ui'`
  - Namespaces: `Dialog.*`, `Select.*`, `Combobox.*`, `Card.*`, `Alert.*`, `Tabs.*`, `Accordion.*`, `Avatar.*`, `DropdownMenu.*`, `Popover.*`, `Tooltip.*`, `Switch.*`, `Checkbox.*`, `RadioGroup.*`.
- Overlays (Dialog/DropdownMenu/Popover/Tooltip/Select/Combobox) portal to `<body>`. Put the theme class (`dark`/`light`) on `<body>` so portaled content gets the right `--sve-*` tokens — not only on an inner wrapper.
- To use a custom element as an overlay trigger, use the Bits `child` snippet:
  `<Dialog.Trigger>{#snippet child({ props })}<Button {...props}>Open</Button>{/snippet}</Dialog.Trigger>`
- Theme by overriding `--sve-*` CSS variables (e.g. `--sve-color-primary`). Do NOT put Tailwind layout/margin utilities on sve-ui components — scoped styles win; wrap in a `<div>` instead.
- `Slider` is NOT `bind:value`; use `value` + `onValueChange`, and give it an accessible name with `thumbLabel`. `Switch`/`Checkbox` need `aria-label` when unlabelled. `Tooltip` requires a `Tooltip.Provider` ancestor.

## Decision Gates

| Need | Use |
|------|-----|
| Action button | `Button` |
| Modal / confirm | `Dialog.*` |
| Pick one option | `Select.*` (listbox) or `RadioGroup.*` |
| Filterable pick | `Combobox.*` |
| On/off vs boolean | `Switch.*` vs `Checkbox.*` |
| Theme a subtree | wrap in `ThemeProvider` + override `--sve-*` |

## Execution Steps

1. Install: `pnpm add sve-ui`.
2. Import `sve-ui/theme.css` once in the root layout.
3. Optionally wrap the app/area in `ThemeProvider` and set `colorScheme`.
4. Import and compose components per the single/namespace rules above.
5. For per-component props and copy-paste snippets, read `references/components.md`.

## Output Contract

Svelte 5 markup that imports `theme.css` once, uses correct single/namespace imports and the `child` snippet for custom triggers, gives interactive controls accessible names, and themes via `--sve-*` (no Tailwind in the consumer project).

## References

- `references/components.md` — full component catalog, import style, and per-component usage snippets.
- GitHub: https://github.com/rodriabregu/sve-ui — source and live docs site.
