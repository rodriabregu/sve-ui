---
'sve-ui': patch
---

Fixed `RadioGroup.Root` and `Tabs.Root` throwing when rendered without a `value`.

Both declared `value = $bindable()` with no fallback and forwarded it with
`bind:value` to a Bits primitive whose `value` **does** have one. Binding
`undefined` into a prop with a fallback makes Svelte throw
`props_invalid_value` — which takes down the whole page, not just the control.
Any consumer rendering either component without a `value` hit a blank page, and
the RadioGroup documentation page was broken in production because of it.

Both now default to `''`, matching Bits.

Whether this shape is fatal depends on the child, which is why it survived so
long: twelve other components declare the same bare `$bindable()` and are fine,
because the Bits props they forward to have no fallback either. A new test
renders every one of them with no props at all and fails if any throws.
