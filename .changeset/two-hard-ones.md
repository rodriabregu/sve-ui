---
'sve-ui': minor
---

Two new components: `Carousel` and `Resizable`.

Both hand-built — Bits UI ships neither — and neither adds a dependency. These are
the Tier 2 gaps from the same catalog diff that produced `Kbd`, `ButtonGroup`,
`Empty` and `InputGroup`: harder than those four, because both have real behaviour
and a real accessibility contract rather than just a styling problem.

**`Carousel`** is built on CSS scroll-snap rather than transforms, which is what
buys touch swiping, trackpad flicks, momentum and the browser's own arrow-key
scrolling for free. Position is *read* from the scroll container on every scroll
and never remembered: a swipe, a flick and the arrow keys are all drivers a
component cannot intercept, and a stored index would disagree with the screen
after any of them — which would make the "3 of 5" slide label a lie.

Two things it deliberately does not do:

- **It does not loop.** An infinite track makes "slide 3 of 5" meaningless and
  removes the only honest position affordance a carousel has: a Previous or Next
  that goes flat at the boundary.
- **It does not auto-rotate.** That is only acceptable with a visible pause
  control, and stopping on hover, and stopping on focus, and honouring
  `prefers-reduced-motion` — a chain that gets half-built more often than not.
  `useCarousel()` exposes `next`, `prev` and `goTo` for anyone who takes on the
  obligation that comes with it.

Previous and Next are disabled from the measured scroll extent, not the slide
index, so they stay honest when several slides are visible at once.

**`Resizable`** implements the APG window-splitter pattern, which is mostly a
keyboard contract — and that is the half every hand-rolled divider skips. The
handle is a focusable `separator` with `aria-orientation` and live
`aria-valuenow`; arrow keys move it, Home and End collapse and expand. `label` is
required, because "splitter, 40" names a number and not the thing it sizes.

A drag moves one boundary and touches exactly two panes, clamped against *both*
of their limits before anything is applied. Clamping only the pane being grown is
what lets its neighbour shrink past its own minimum, and distributing a drag
across the whole group is what makes resizing a sidebar quietly reflow the far
side of a layout. It does not persist sizes: where that belongs is an application
decision.

Two smaller notes:

- The drag uses `setPointerCapture`, so it survives the pointer leaving a
  hairline target — which it does immediately — and the grabbable area is grown to
  12px by a pseudo-element, so the divider can stay 1px wide without being
  unreasonable to hit.
- `Resizable.Pane` registers its `min`/`max` as getters. Registration happens once
  at init because the handle beside it needs an index and id on first render, and
  snapshotting the numbers there would freeze limits that depend on state.
