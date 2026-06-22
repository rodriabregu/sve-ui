# sve-ui

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
