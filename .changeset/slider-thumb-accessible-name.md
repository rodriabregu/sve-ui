---
"sve-ui": patch
---

Slider: add a `thumbLabel` prop so the thumb (`role="slider"`) has an accessible name. Without it, axe reported an `aria-input-field-name` violation. In `multiple` mode each thumb's label is suffixed with its position.
