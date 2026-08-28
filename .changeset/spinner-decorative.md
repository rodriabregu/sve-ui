---
'sve-ui': minor
---

`Spinner` is now decoration unless you give it a `label`.

**This changes behaviour.** `label` used to default to `'Loading'`, so every
spinner was a live region that announced itself the moment it appeared. If you
relied on that announcement, pass `label` explicitly.

It changed because it had started talking over other components. Once `Busy` and
`Button loading` existed, this:

```svelte
<Busy label="Loading projects"><Spinner /></Busy>
```

produced **two announcements for one event** — the spinner's immediately, and
`Busy`'s 400ms later — and the immediate one defeated the debounce that exists to
prevent exactly that. Counting `role="status"` elements in the subtree gave two.

Without a `label` the spinner is now `aria-hidden`, which is what you want in
almost every case: there is visible text beside it, or a `Button loading`, or a
`Busy` region, and each of those already announces. `'Loading'` said nothing
useful anyway — loading what?
