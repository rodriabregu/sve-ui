---
'sve-ui': minor
---

Add Toggle, ToggleGroup, Collapsible, Progress, Meter, and AspectRatio (Wave 4b) — no new dependencies.

- **`Toggle`** — a two-state button over the Bits Toggle primitive. `pressed` (bindable), `disabled`, `size` (sm/md/lg), `variant` (outline/ghost). Bits owns `aria-pressed`.
- **`ToggleGroup`** namespace (`Root`, `Item`) — segmented control. `type` is required and decides both behaviour and the shape of `value`: `single` yields a string, `multiple` a `string[]`. The two modes carry different semantics on purpose — `single` items are `role="radio"` with `aria-checked`, `multiple` items are buttons with `aria-pressed`.
- **`Collapsible`** namespace (`Root`, `Trigger`, `Content`) — one expand/collapse region with `open` bindable. Bits wires `aria-expanded` and `aria-controls`.
- **`Progress`** — advancement toward completion, `role="progressbar"`. `value` (`null` for indeterminate), `min`, `max`, `size`, `color`. The indeterminate animation is disabled under `prefers-reduced-motion`.
- **`Meter`** — a static measurement within a known range, `role="meter"`. Same value/size/color surface as Progress.
- **`AspectRatio`** — reserves a box before media loads, which is what prevents layout shift. `ratio` as width / height.

`Progress`, `Meter` and `ToggleGroup.Root` need an accessible name from you (`aria-label` or `aria-labelledby`); Bits supplies the role and value attributes but cannot invent the name.

Also exports the matching types: `ToggleSize`, `ToggleVariant`, `ToggleGroupSize`, `ProgressSize`, `ProgressColor`, `MeterSize`, `MeterColor`.
