<div align="center">

# Sve·UI

**Styled, accessible Svelte 5 components — zero config.**

[![npm](https://img.shields.io/npm/v/sve-ui?color=F56565)](https://www.npmjs.com/package/sve-ui)
[![license](https://img.shields.io/npm/l/sve-ui?color=F56565)](https://github.com/rodriabregu/sve-ui/blob/main/LICENSE)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00)](https://svelte.dev)

</div>

A library of ready-made, fully **styled** and fully **accessible** Svelte 5
components, built on [Bits UI](https://bits-ui.com). The wedge: it needs **no
Tailwind and no config** in your project. Install, import the stylesheet once,
and use — then theme everything with CSS custom properties.

```sh
pnpm add sve-ui
```

## Why Sve·UI

- **No Tailwind, no config** — styles ship with the package. No `tailwind.config`,
  no PostCSS, no utility classes in your app.
- **Accessible by default** — overlays are built on Bits UI: WAI-ARIA, focus traps,
  keyboard navigation.
- **Themeable** — every color, radius and spacing value is a `--sve-*` CSS variable.
  Light and dark out of the box.
- **Svelte 5 + runes** — modern, typed, tree-shakeable, ships with provenance.

## Quick start

Import the stylesheet once (e.g. in your root layout), then use the components:

```svelte
<script>
	import 'sve-ui/theme.css';
	import { Button } from 'sve-ui';
</script>

<Button color="primary">Ship it</Button>
```

Wrap your app in `ThemeProvider` to control light/dark (optional — components work
without it):

```svelte
<script>
	import { ThemeProvider, Button, Dialog } from 'sve-ui';
</script>

<ThemeProvider colorScheme="dark">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button {...props}>Open dialog</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Overlay />
		<Dialog.Content>
			<Dialog.Title>Delete project?</Dialog.Title>
			<Dialog.Description>This action can't be undone.</Dialog.Description>
		</Dialog.Content>
	</Dialog.Root>
</ThemeProvider>
```

## Components

**Display & form** — `Button`, `Input`, `Card`, `Badge`, `Avatar`, `Spinner`,
`Text`, `Heading`, `Alert`.

**Form controls** (on Bits UI) — `Switch`, `Checkbox`, `RadioGroup`.

**Overlays** (on Bits UI) — `Dialog`, `DropdownMenu`, `Tooltip`, `Popover`.

Most components take `variant`, `color` and `size` props, e.g.:

```svelte
<Button variant="solid" color="primary">Primary</Button>
<Button variant="outline" color="danger">Danger</Button>
<Badge variant="subtle" color="success">Active</Badge>
<Input variant="outline" size="md" placeholder="you@example.com" bind:value />
```

`Avatar`, `Card`, `Alert`, the overlays, and the form controls are **namespaced**
compositions — import the namespace and compose its parts (`Dialog.Root`,
`Dialog.Trigger`, `Dialog.Content`; `RadioGroup.Root`, `RadioGroup.Item`; …).

## Theming

All design tokens are CSS custom properties under `:root`, established by
`sve-ui/theme.css`. Override any of them to retheme — no rebuild, no config:

```css
:root {
	--sve-color-primary: #8b5cf6;
	--sve-radius-md: 0.5rem;
}
```

Semantic color roles (`primary`, `secondary`, `success`, `warning`, `danger`,
`default`) each expose `…-foreground`, `…-surface`, `…-border`, `…-hover` and
`…-active` variants. Light and dark are both included; `ThemeProvider` toggles
the scheme via a `colorScheme` prop (`"light" | "dark" | "system"`) and can apply
per-subtree token overrides via its `theme` prop.

## Package exports

| Import             | What                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `sve-ui`           | All components, `ThemeProvider`, variant helpers and types         |
| `sve-ui/theme`     | Token maps and theming utilities (`lightTokens`, `themeToVars`, …) |
| `sve-ui/theme.css` | The stylesheet that registers all `--sve-*` variables              |

## Requirements

- Svelte `^5` (peer dependency)

## Links

- Docs: [sveui.org](https://sveui.org)
- Source: [github.com/rodriabregu/sve-ui](https://github.com/rodriabregu/sve-ui)

## License

[MIT](https://github.com/rodriabregu/sve-ui/blob/main/LICENSE) © Rodrigo Abregu
