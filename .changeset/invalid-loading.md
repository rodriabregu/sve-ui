---
'sve-ui': minor
---

Every form control can now show that it is invalid, and `Button` has a loading
state.

`Field` sets `aria-invalid` on whatever control it is given, and until now only
`Input` and `Textarea` could show it. Ten controls announced themselves as
invalid while looking exactly like a correct one — a sighted user read an error
message with no indication of which control it was about.

`invalid` is now on `Checkbox.Root`, `Switch.Root`, `RadioGroup.Root`,
`Combobox.Input`, `RatingGroup.Root`, `Select.Trigger`, `Toggle`, `Slider`,
`PinInput.Root` and `DatePicker.Trigger`. It always applies the styling.
`aria-invalid` is set only where the rendered role supports it — `Select.Trigger`
and `Toggle` render plain `<button>`s, where ARIA does not list that state, so
the accessible signal stays `Field`'s `aria-describedby`.

`Button` takes `loading`: a spinner, `aria-busy`, and activation blocked. It
stays **focusable** on purpose — `disabled` would drop a keyboard user who just
pressed Enter back to the top of the document. `loadingLabel` is what gets
announced, and the spinner respects `prefers-reduced-motion`.
