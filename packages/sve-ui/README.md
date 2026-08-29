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

**60 components**, every one styled and accessible out of the box. Names ending
in `.*` are namespace compositions — import the namespace and compose its parts
(`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`). The rest are default
imports.

| Group          | Components                                                                                                                                                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display**    | `Avatar.*`, `Badge`, `Card.*`, `Heading`, `Text`, `Skeleton`                                                                                                                                                                                                                                                                        |
| **Forms**      | `Button`, `Input`, `Field`, `Checkbox.*`, `RadioGroup.*`, `Switch.*`, `Select.*`, `Combobox.*`, `Slider`, `Textarea`, `Label`, `Toggle`, `ToggleGroup.*`, `Calendar.*`, `DateField.*`, `DatePicker.*`, `RangeCalendar.*`, `DateRangeField.*`, `DateRangePicker.*`, `TimeField.*`, `TimeRangeField.*`, `PinInput.*`, `RatingGroup.*` |
| **Feedback**   | `Alert.*`, `Busy`, `Spinner`, `Toast.*`, `Progress`, `Meter`                                                                                                                                                                                                                                                                        |
| **Navigation** | `Tabs.*`, `Accordion.*`, `Sidebar.*`, `Breadcrumb.*`, `NavigationMenu.*`, `Menubar.*`, `Collapsible.*`, `Toolbar.*`                                                                                                                                                                                                                 |
| **Overlays**   | `Dialog.*`, `DropdownMenu.*`, `Popover.*`, `Tooltip.*`, `AlertDialog.*`, `Command.*`, `Sheet.*`, `ContextMenu.*`, `LinkPreview.*`                                                                                                                                                                                                   |
| **Data**       | `Table.*`, `Pagination.*`                                                                                                                                                                                                                                                                                                           |
| **Layout**     | `Stack`, `Flex`, `Separator`, `ScrollArea.*`, `AspectRatio`                                                                                                                                                                                                                                                                         |
| **Utilities**  | `Code`                                                                                                                                                                                                                                                                                                                              |

Every component has a live page with props and examples at
[sveui.org/components](https://sveui.org/components).

Most take `variant`, `color` and `size`:

```svelte
<Button variant="solid" color="primary">Primary</Button>
<Button variant="outline" color="danger">Danger</Button>
<Badge variant="subtle" color="success">Active</Badge>
<Input variant="outline" size="md" placeholder="you@example.com" bind:value />
```

Three that are easy to miss:

- **`Field`** is the only thing here that wires `aria-describedby` — use it to
  attach help text or a validation message to any control.
- **`Busy`** covers the gap between "nothing yet" and "loaded": a region that
  announces itself while its content is in flight.
- **`Command.*`** is the command palette, and its `Command.Status` announces
  result counts to a screen reader as you filter.

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

| Import                        | What                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| `sve-ui`                      | All components, `ThemeProvider`, variant helpers and types         |
| `sve-ui/theme`                | Token maps and theming utilities (`lightTokens`, `themeToVars`, …) |
| `sve-ui/theme.css`            | The stylesheet that registers all `--sve-*` variables              |
| `sve-ui/skills/sve-ui-usage/` | An agent skill, shipped in the package — see below                 |

## Requirements

- Svelte `^5` (peer dependency)

## Links

- Docs: [sveui.org](https://sveui.org)
- Source: [github.com/rodriabregu/sve-ui](https://github.com/rodriabregu/sve-ui)

## License

[MIT](https://github.com/rodriabregu/sve-ui/blob/main/LICENSE) © Rodrigo Abregu

## Building with an AI agent

The package ships an agent skill so your assistant writes real `sve-ui` code
instead of guessing prop names:

```bash
mkdir -p .claude/skills
cp -r node_modules/sve-ui/skills/sve-ui-usage .claude/skills/
```

It encodes the parts an LLM gets wrong on its own: importing `sve-ui/theme.css`
once, single versus namespace imports, the Bits `child` snippet for overlay
triggers, mirroring the theme class onto `<body>` for portalled overlays, that
`Button` takes `href` rather than navigating from `onclick`, and that `Field` is
the only thing here that wires `aria-describedby`.
