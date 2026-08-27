---
'sve-ui': patch
---

Stop emitting a dead `required` attribute, and mark the slider properly.

`Field` puts `required` into the props you spread. On a real input the browser
handles it, and Bits UI translates it to `aria-required` on checkbox, switch,
radio group and rating group. On the rest it was landing as dead markup:

- `Select.Trigger`, `Toggle` and `DatePicker.Trigger` render a `<button>`, where a
  native `required` attribute does nothing. They now swallow it rather than emit
  it, because `aria-required` is not an option either — axe reports it as an
  `aria-allowed-attr` violation on that role.
- `Slider` was receiving it on its container. The `role="slider"` element is the
  thumb, so it now goes there, where axe accepts it.

`aria-invalid` is not symmetric with this: axe accepts that one on a button. Each
was checked separately, and there is a test asserting the asymmetry so the
decision is not left resting on a comment.

The `Field` page now documents which controls can be announced as required and
which cannot.
