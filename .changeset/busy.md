---
'sve-ui': minor
---

Add `Busy` — mark a region as loading, and say so.

Found by building a real app. Writing its loading branch, there was no way to
express "this region is loading": `Spinner` is decorative, and `aria-busy`
appeared in two components out of sixty. A screen reader user got a second of
silence and then content appearing with no warning.

```svelte
<Busy busy={loading} label="Loading projects" doneLabel={`${projects.length} projects loaded`}>
	{#if loading}<Spinner />{:else}<Table.Root>…</Table.Root>{/if}
</Busy>
```

It sets `aria-busy` while loading, so a screen reader can hold off reading a
half-built region, and pairs it with a polite live region — `aria-busy` announces
nothing on its own.

`doneLabel` says what **arrived**, because "done" tells the user the wait is over
and nothing about the result. Omitting it means they are told the content is
loading and never told it finished, which is worse than saying nothing; it is
documented as the wrong choice but left as the caller's.

The loading message waits `delay` (400ms) first: a response that arrives in 80ms
does not need narrating. If the wait beats it, only the completion is announced.
