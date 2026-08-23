---
'sve-ui': minor
---

Add Textarea, Label, Skeleton, and Separator (Wave 4a) — no new dependencies.

- **`Textarea`** — styled native `<textarea>`. `size` (sm/md/lg), `variant` (outline/filled), `invalid` (wires `aria-invalid`), `resize` (none/vertical/horizontal/both, default `vertical`), bindable `value`. Mirrors the `Input` API.
- **`Label`** — wraps the Bits UI Label primitive, so click-to-focus and text-selection behaviour come from the primitive. `size` (sm/md/lg) and `required`, which renders an `aria-hidden` asterisk (the control still needs its own `required`).
- **`Skeleton`** — loading placeholder. `variant` (text/circle/rect) plus `width`/`height` overrides. Always `aria-hidden`; announce the loading state on the owning region. Shimmer is disabled under `prefers-reduced-motion`.
- **`Separator`** — wraps the Bits UI Separator primitive: `role="separator"` with `aria-orientation`, or `role="none"` when `decorative`. `orientation` (horizontal/vertical).

Also exports the matching types: `TextareaSize`, `TextareaVariant`, `TextareaResize`, `textareaVariants`, `LabelSize`, `SkeletonVariant`.
