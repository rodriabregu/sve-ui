---
name: sve-ui-usage
description: 'Trigger: using sve-ui, sve-ui components, Svelte 5 UI with sve-ui, theming sve-ui. Use the sve-ui component library correctly: imports, namespaces, theming, a11y.'
license: MIT
metadata:
  author: rodriabregu
  version: '1.0'
---

## Activation Contract

Load when building or editing a Svelte 5 app that consumes `sve-ui` — importing, composing, theming, or debugging unstyled/broken sve-ui components.

## Hard Rules

- Import the stylesheet ONCE at the app root: `import 'sve-ui/theme.css';`. Without it, components render unstyled. The consumer project needs NO Tailwind and NO config.
- Single components are default imports; composite components are namespaces composed with dots:
  - Singles: `import { Button, Input, Textarea, Label, Badge, Spinner, Text, Heading, Slider, Skeleton, Separator, Toggle, Progress, Meter, AspectRatio, Code } from 'sve-ui'`
  - Namespaces: `Dialog.*`, `Select.*`, `Combobox.*`, `Card.*`, `Alert.*`, `Tabs.*`, `Accordion.*`, `Avatar.*`, `DropdownMenu.*`, `Popover.*`, `Tooltip.*`, `Switch.*`, `Checkbox.*`, `RadioGroup.*`.
- Overlays (Dialog/DropdownMenu/Popover/Tooltip/Select/Combobox) portal to `<body>`. Put the theme class (`dark`/`light`) on `<body>` so portaled content gets the right `--sve-*` tokens — not only on an inner wrapper.
- To use a custom element as an overlay trigger, use the Bits `child` snippet:
  `<Dialog.Trigger>{#snippet child({ props })}<Button {...props}>Open</Button>{/snippet}</Dialog.Trigger>`
- Theme by overriding `--sve-*` CSS variables (e.g. `--sve-color-primary`). Do NOT put Tailwind layout/margin utilities on sve-ui components — scoped styles win; wrap in a `<div>` instead.
- `AlertDialog.Action` does NOT close the dialog (only `Cancel` does) — close it yourself, so a failed async operation can keep it open. `AlertDialog`/`Sheet` both REQUIRE a `Title`; Bits wires `aria-labelledby` to it.
- `DatePicker`/`DateRangePicker` = a segmented field + a calendar popover sharing ONE value. Trigger goes INSIDE the Input. Almost every part is re-exported from DateField, Calendar and Popover, so it behaves identically to the standalone pieces. The range picker needs `aria-labelledby` on Root and `numberOfMonths={2}`.
- Segmented fields (`DateField`/`TimeField`/`*RangeField`): `locale` decides SEGMENT ORDER, not just labels — the wrong one silently records the wrong date. Range variants need TWO Inputs (`type` required) AND an `aria-labelledby`/`aria-label` on Root, because Bits leaves the range group unnamed. `TimeField` values are `TimeValue`, which is NOT `DateValue`.
- Date components require the `@internationalized/date` PEER dependency, and dates are `DateValue` not `Date`. `Calendar`/`RangeCalendar` need `calendarLabel` (Bits defaults it to the literal word "Event"); their nav buttons' aria-labels are hardcoded by Bits and cannot be overridden. `isDateDisabled` (out of range) and `isDateUnavailable` (exists but taken) are different. Key weekdays by INDEX — narrow names are not unique.
- `Stack`/`Flex`: `gap` is a spacing token key, and there is NO margin/padding/width prop by design. Reach for CSS instead of asking for more props. `Flex` defaults `align` to `center`, `Stack` to `stretch`.
- `PinInput`: `<label for>` does NOT work — the real input's id is Bits-internal and unpredictable. Name it with `aria-label` or `aria-labelledby` on Root. `maxlength` is required.
- `RatingGroup` needs BOTH `aria-label` and `aria-valuetext` (pass the function form, so the scale is announced and not a bare number).
- `Command.Viewport` is REQUIRED and goes inside `Command.List` — Bits takes the Input's `aria-controls` from it, so omitting it is invalid ARIA. `label` on Root names the INPUT; `aria-label` on List names the LIST (Bits defaults it to "Suggestions...").
- `NavigationMenu` is the choice for SITE navigation (opens on hover AND click/Enter). `active` on a Link gives `aria-current="page"`.
- `Menubar` is desktop-application chrome, not website navigation — it assumes hover and a wide screen. Use `NavigationMenu` for site nav.
- `Breadcrumb`: the LAST crumb takes `current`, which renders it as text with `aria-current="page"` instead of a dead-end link.
- `Pagination.Root` renders nothing itself — it hands you a `pages` snippet prop and you render the buttons. `page` is bindable.
- `ContextMenu` is an accelerator, never the only route: right-click is undiscoverable and touch has none. Mirror every action in a visible control.
- `ScrollArea` default `type="hover"` does not even mount the scrollbar until pointer enter — use `type="always"` unless the overflow is obvious. Put the size constraint on `Root`.
- `Field` is how you attach a label, help text and a validation message to a control accessibly — nothing else in this library wires `aria-describedby`. The control comes through a `control` snippet and you MUST spread its props (`{#snippet control(props)}<Input {...props} />{/snippet}`) or nothing is wired. There is NO `invalid` prop: passing `error` is what marks it invalid. Pass `undefined` when valid, never an empty string. The error is not a live region — on a failed submit, move focus to the first invalid control.
- `Button` takes `href` to render an `<a>` instead of a `<button>`. Use it whenever activating the control navigates. NEVER write `onclick={() => (window.location.href = '/x')}` — that is not a link: no middle-click, no new tab, no URL on hover, announced as a button, and dead until JS runs. `target="_blank"` gets `rel="noopener noreferrer"` automatically. `href` + `disabled` renders a `<span aria-disabled="true">`, not a dead anchor.
- `Toast` is the ONE imperative API: `import { toast } from 'sve-ui'` plus a `<Toast.Viewport />` mounted ONCE, high in the layout — without the Viewport nothing renders. NEVER call `toast()` during SSR (top level of a `load` or a component body): the queue is module state, so it would leak into another request's HTML; the call is refused and logged. A toast with an `action` does NOT auto-dismiss unless you pass an explicit `duration`. Politeness is fixed at `polite` — if a message earns an interruption it is too important to auto-dismiss, so use `Alert` or `AlertDialog`.
- `Table` does NOT sort your data — `Head sortable` renders the button and sets `aria-sort`; you apply the order (locale-aware via `Intl.Collator`). It is NOT `role="grid"` on purpose. `Row selected` sets `data-selected`, never `aria-selected` (invalid on a plain `<tr>`) — pair it with a real `Checkbox`. Always give it a `Caption`, a `RowHeader` per row, and `scrollLabel` on `Root` so the overflow is keyboard-reachable.
- `Sidebar` needs BOTH `Sidebar.Provider` (owns state) and `Sidebar.Root` (the `<aside>`) — context reaches descendants, not siblings, so a Trigger outside Root only works under the Provider. Provider is `display: contents` unless you pass `shell`. Give collapsed icon-only Items a `label`, and point each `Group`'s `aria-labelledby` at its `GroupLabel` id.
- `Toolbar` needs `aria-label` on Root. Use `Toolbar.Link` for navigation (stays a real anchor) and `Toolbar.Button` for actions — they are not interchangeable.
- `LinkPreview` is hover-only: keyboard and touch users never see it. Never put the only copy of an action or a fact inside it — use `Popover` when the content is essential.
- `Progress`, `Meter` and `ToggleGroup.Root` need an `aria-label`; Bits gives the role and value attributes but not the name.
- `Slider` is NOT `bind:value`; use `value` + `onValueChange`, and give it an accessible name with `thumbLabel`. `Switch`/`Checkbox` need `aria-label` when unlabelled. `Tooltip` requires a `Tooltip.Provider` ancestor.

## Decision Gates

| Need              | Use                                          |
| ----------------- | -------------------------------------------- |
| Action button     | `Button`                                     |
| Modal / confirm   | `Dialog.*`                                   |
| Pick one option   | `Select.*` (listbox) or `RadioGroup.*`       |
| Filterable pick   | `Combobox.*`                                 |
| On/off vs boolean | `Switch.*` vs `Checkbox.*`                   |
| Theme a subtree   | wrap in `ThemeProvider` + override `--sve-*` |

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
