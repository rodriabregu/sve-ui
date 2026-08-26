---
'sve-ui': minor
---

`Button` can now render a link.

Pass `href` and it renders an `<a>` instead of a `<button>`, keeping the same
variants and sizes. `target="_blank"` gets `rel="noopener noreferrer"`
automatically unless you pass your own `rel`.

This closes a real gap. Without it, the only way to make a styled control
navigate was `onclick={() => (window.location.href = '/somewhere')}` — and that
is not a link: it cannot be middle-clicked or opened in a new tab, shows no URL
on hover, is announced as a button rather than a link, and does nothing at all
until JavaScript has run. Our own documentation site had six of them, which is
how it was reported (#41).

`href` together with `disabled` renders a `<span aria-disabled="true">`, not an
anchor. `<a>` has no `disabled` attribute, and an `<a aria-disabled>` still takes
a tab stop and is still announced as a link, so it invites the user to follow
something that goes nowhere. Same call as `Sidebar.Item`.
