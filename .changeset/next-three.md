---
'sve-ui': patch
---

Three fixes, all from the ARIA-state audit and the tree-shaking work.

**Segmented date fields can now announce that they are required.** `DateField`,
`TimeField` and their range variants declared `required` and did nothing with it
— Bits emits nothing for it there, so a `<Field required>` around a date field
announced nothing at all. It now reaches the segments through context and becomes
`aria-required` on each editable one, whose `role="spinbutton"` supports it. The
literal separators are left alone: they are not focusable and carry no role.

**`DatePicker` and `DateRangePicker` now style their disabled trigger.** Bits sets
`data-disabled` and nothing styled it, so a disabled picker looked exactly like an
enabled one.

**Fixed a styling regression that had been shipping since 0.6.1.** Svelte compiles
styles per component, so a rule written in one file does not travel to another
that reuses the class name. A consumer importing only `DateRangePicker` got a
completely unstyled trigger, and `RangeCalendar` lost its cell and day styles.
Five classes across three namespaces were affected.

It was invisible until `sideEffects` was declared and tree-shaking started
working — the fix for one problem uncovered another that had been hiding behind
it. Shared rules now live in plain `.css` files that every component using them
imports, which survives tree-shaking precisely because `sideEffects` is
`["**/*.css"]`. A new `check-css-coverage` step fails the build if it happens
again.
