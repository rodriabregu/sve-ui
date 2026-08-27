---
'sve-ui': minor
---

Add `focusFirstInvalidField` — the other half of `Field`'s own guidance.

`Field`'s documentation says to move focus to the first invalid control when a
submit fails, which is the correct WCAG technique and the reason the error is
deliberately not a live region. The library shipped nothing to help do it.

```ts
import { focusFirstInvalidField } from 'sve-ui';

if (Object.keys(errors).length > 0) {
	await focusFirstInvalidField({ root: formEl });
	return;
}
```

It awaits Svelte's `tick()` internally, because it is called right after the
state change that produced the errors and the DOM would otherwise not carry them
yet. It returns `false` when nothing was focused, so a caller can fall back when
a submit failed for a reason no single field owns, and it reports to the console
when it finds an invalid field whose control was never wired or cannot take
focus, rather than doing nothing quietly.

It matches on the `Field` wrapper rather than on `aria-invalid`, so it focuses
the labelled control — which is what makes the label, error and description
announce together — and only ever moves focus into a field this library wired.
