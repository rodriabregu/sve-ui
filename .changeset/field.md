---
'sve-ui': minor
---

Add `Field` — a label, help text and a validation message wired to one control.

Until now `aria-describedby` appeared in **zero** of this library's components.
There was no accessible way to attach help text or an error to any control:
consumers generated the ids themselves and wired them by hand, on every field.
That is the same shape of gap as `Button` being unable to render a link.

```svelte
<Field label="Email" description="We never share it." {error} required>
	{#snippet control(props)}
		<Input {...props} type="email" bind:value={email} />
	{/snippet}
</Field>
```

Ids come from `$props.id()`, so they are identical on the server and the client
and never collide between fields.

The control arrives through a snippet, and `description`/`error` are props rather
than sibling parts, because `aria-describedby` may only name ids that exist — and
that has to hold in the server-rendered HTML, not be repaired later by an effect.
A sibling `<Field.Description>` could only register itself after the control had
rendered. There are tests that render on a real server and assert every
referenced id resolves.

There is no `invalid` prop: passing `error` is what marks the field invalid, so
the styling and `aria-invalid` cannot disagree with the message the user reads.
Pass `undefined` when valid, not an empty string.
