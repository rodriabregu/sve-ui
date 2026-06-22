---
'sve-ui': minor
---

Add Wave 3 form controls (batch 3), built on Bits UI:

- **Select** (`Select.Root` / `Trigger` / `Content` / `Item` / `Value` / `Group`)
  — accessible listbox select with a styled trigger, portaled menu, and a
  selected-item check.
- **Combobox** (`Combobox.Root` / `Input` / `Content` / `Item`) — typeahead/filter
  select with a styled input and portaled list.
- **Slider** — self-contained range slider (track + filled range + thumb-per-value),
  single or multiple, `min` / `max` / `step`.

All styled with `--sve-*` tokens; no Tailwind required.
