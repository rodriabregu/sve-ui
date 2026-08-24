---
'sve-ui': minor
---

Add `Sidebar` — a composable app-shell navigation panel.

Custom rather than a Bits UI wrapper: Bits ships no sidebar, and there is no hard
behaviour to buy here. What a sidebar needs is a landmark, a labelled list, a
shared collapsed state and a toggle that announces itself.

`Sidebar.Provider` owns the state and `Sidebar.Root` is the `<aside>`. They are
separate parts because Svelte context reaches descendants, not siblings — with
`collapsible="offcanvas"` the `Trigger` has to live outside `Root`, or collapsing
hides the only way back. The Provider imposes no layout unless you pass `shell`.

Parts: `Provider`, `Root`, `Trigger`, `Header`, `Content`, `Footer`, `Group`,
`GroupLabel`, `Menu`, `Item`.
