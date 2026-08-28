---
'sve-ui': minor
---

Add `Command.Status` — announce how many results a search produced.

Bits filters the Command list internally and announces nothing, so a screen
reader user typed and the list shrank in silence: they never learned whether they
had forty matches or none. It reports the count through `onStateChange` and
exposes it nowhere else, so `Command.Root` now intercepts that hook (the caller's
own handler still runs, first and unchanged) and publishes the count.

```svelte
<Command.Root label="Command palette">
	<Command.Input bind:value={search} />
	<Command.Status label={(n) => (n === 1 ? '1 resultado' : `${n} resultados`)} />
	<Command.List aria-label="Commands">…</Command.List>
</Command.Root>
```

A visually hidden `role="status"` region — the count is already on screen, so
duplicating it visibly would be noise.

`delay` (500ms) is not a performance tweak: without it, typing "button" fires six
announcements and the user hears a torrent instead of an answer. Each keystroke
restarts the wait. It stays silent until the search is non-empty, because the
count of an unfiltered list is not news when a palette opens.

`Combobox` needs the same thing and deliberately gets no component: Bits does not
filter there, the consumer does, so they already know the count. The docs show the
pattern instead.
