---
'sve-ui': patch
---

Fix `Label` and `Separator` shipping with no prop types.

Both components imported a Bits UI namespace whose name matched their own (`import { Label } from 'bits-ui'` inside a component called `Label`). `svelte-package` cannot resolve that shadowing and silently emitted `declare const Label: any`, so consumers of 0.4.0 got no prop autocomplete and no type errors on invalid props. The Bits imports are now aliased (`LabelPrimitive`, `SeparatorPrimitive`) and both emit their real `Component<Props, …>` type.

Adds `scripts/check-dts.mjs` to the `package` step, which fails the build if any generated component type collapses to `any`. `svelte-check` only validates the source and `publint`/`attw` only validate the package shape, so nothing was asserting the fidelity of the emitted types.
