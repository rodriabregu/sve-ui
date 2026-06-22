---
'sve-ui': minor
---

Add Wave 3 form controls (batch 1), built on Bits UI:

- **Switch** (`Switch.Root`) — accessible toggle with `sm`/`md`/`lg` sizes and
  `bind:checked`.
- **Checkbox** (`Checkbox.Root`) — checkbox with check / indeterminate indicators,
  `sm`/`md`/`lg` sizes, `bind:checked` and `bind:indeterminate`.
- **RadioGroup** (`RadioGroup.Root` + `RadioGroup.Item`) — radio group with a
  selected-dot indicator and `bind:value`.

All styled with `--sve-*` tokens, no Tailwind required.
