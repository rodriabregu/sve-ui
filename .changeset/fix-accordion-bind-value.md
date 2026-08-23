---
'sve-ui': patch
---

Fix `Accordion.Root` `bind:value` being one-way.

`value` was forwarded through the prop spread, so the opened item never reached the caller — even though the component's own JSDoc and its docs page both documented the binding as two-way. It has been broken since Accordion shipped, and no test exercised the binding, so nothing caught it.

`value` is now destructured as `$bindable()` and passed as `bind:value`. The loose cast around the Bits root needed its third type argument to name the bindable prop, otherwise the cast erases the binding. Covered by a regression test.
