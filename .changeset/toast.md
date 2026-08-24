---
'sve-ui': minor
---

Add `Toast` — transient notifications, and the library's only imperative API.

`import { toast } from 'sve-ui'` for the trigger, plus a `<Toast.Viewport />`
mounted once for the placement. Without a Viewport nothing renders.

Imperative because a toast reports an event, not state — and decisively, because
an imperative call is reachable from code that is not a component at all (a
`fetch` wrapper, an interceptor, a `load` function), where a context-based API
cannot be used. The mount point stays declarative so the app decides where the
stack sits, how many fit and what the region is called.

The queue is the library's only mutable module state, which is shared across
requests on a server. Enqueuing during SSR would put one user's toast in another
user's HTML, so it is refused and reported rather than silently accepted.

Other decisions worth knowing:

- A toast carrying an `action` does not auto-dismiss unless you pass an explicit
  `duration`. A control the user can lose a race against is not a control.
- Politeness is fixed at `polite`. `assertive` interrupts whatever is being read,
  and anything worth interrupting for is too important to auto-dismiss — that is
  an inline `Alert` or an `AlertDialog`.
- Timers pause on hover and on focus, because someone reading with a screen
  reader is not moving a pointer.
- No swipe-to-dismiss and no stacked animation in this version, and no second
  runtime dependency.
