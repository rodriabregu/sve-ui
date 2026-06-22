# sve-ui

## 0.3.1

### Patch Changes

- 506d758: Slider: add a `thumbLabel` prop so the thumb (`role="slider"`) has an accessible name. Without it, axe reported an `aria-input-field-name` violation. In `multiple` mode each thumb's label is suffixed with its position.

## 0.3.0

### Minor Changes

- 997bbf6: Add Wave 3 form controls (batch 1), built on Bits UI:

  - **Switch** (`Switch.Root`) — accessible toggle with `sm`/`md`/`lg` sizes and
    `bind:checked`.
  - **Checkbox** (`Checkbox.Root`) — checkbox with check / indeterminate indicators,
    `sm`/`md`/`lg` sizes, `bind:checked` and `bind:indeterminate`.
  - **RadioGroup** (`RadioGroup.Root` + `RadioGroup.Item`) — radio group with a
    selected-dot indicator and `bind:value`.

  All styled with `--sve-*` tokens, no Tailwind required.

- 0ceec98: Add Tabs, Accordion, and Code components:

  - **Tabs** (`Tabs.Root` / `List` / `Trigger` / `Content`) — accessible tabs on
    Bits UI with `bind:value` and an active-underline indicator.
  - **Accordion** (`Accordion.Root` / `Item` / `Header` / `Trigger` / `Content`) —
    single or multiple (`type`), `bind:value`, rotating chevron on the trigger.
  - **Code** — code block with an optional header label and an SSR-safe
    copy-to-clipboard button (`code`, `label`, `copyable` props).

  All styled with `--sve-*` tokens; no Tailwind required.

- f5f09a7: Add Wave 3 form controls (batch 3), built on Bits UI:

  - **Select** (`Select.Root` / `Trigger` / `Content` / `Item` / `Value` / `Group`)
    — accessible listbox select with a styled trigger, portaled menu, and a
    selected-item check.
  - **Combobox** (`Combobox.Root` / `Input` / `Content` / `Item`) — typeahead/filter
    select with a styled input and portaled list.
  - **Slider** — self-contained range slider (track + filled range + thumb-per-value),
    single or multiple, `min` / `max` / `step`.

  All styled with `--sve-*` tokens; no Tailwind required.

## 0.2.1

### Patch Changes

- 3a10045: Add a package README (shown on npm) and a sharper package description covering
  the wedge: styled + accessible Svelte 5 components on Bits UI, no Tailwind/config,
  themeable via CSS variables.

## 0.2.0

### Minor Changes

- 61dae57: Complete 2026 rewrite. Sve-UI is now a library of ready-made, fully styled and
  fully accessible Svelte 5 components (HeroUI-style), built on Bits UI — no
  Tailwind and no config required in the consumer's project.

  - **Svelte 5 + runes** throughout; ships ESM with types and provenance.
  - **13 components**: Button, Input, Card, Badge, Avatar, Spinner, Text, Heading,
    Alert, plus accessible overlays on Bits UI — Dialog, DropdownMenu, Tooltip,
    Popover.
  - **Theming via CSS custom properties** (`--sve-*`): semantic color tokens
    (primary/secondary/success/warning/danger/default), spacing, radius and
    typography, with light and dark out of the box.
  - **`ThemeProvider`** for color-scheme switching and per-subtree token overrides;
    typed `defineVariants` helper and exported variant/type maps.
  - Styles ship in the package (`import 'sve-ui/theme.css'`) — install, import, use.

  > Note: this is a ground-up redesign. The pre-1.0 API differs from `0.1.x`
  > (which exposed layout primitives); treat it as a fresh baseline.
