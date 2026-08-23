---
'sve-ui': minor
---

Add NavigationMenu and Command — no new dependencies.

- **`NavigationMenu`** namespace (`Root`, `List`, `Item`, `Trigger`, `Content`, `Link`, `Viewport`, `Sub`, `Indicator`) — the right primitive for site navigation. Its triggers open on hover after `delayDuration` **and** on click or Enter, so the menu works for pointer, keyboard and touch alike; that is where `Menubar`, a desktop pattern assuming hover, falls down on the web.

  `Root` renders a `<nav>` landmark, so give it an `aria-label`. Set `active` on the Link for the current page — Bits then reports `aria-current="page"`, which is the difference between looking highlighted and being announced. Links stay real anchors throughout. `Viewport` is optional and gives every panel one shared, resizing container.

- **`Command`** namespace (`Root`, `Input`, `List`, `Viewport`, `Item`, `Group`, `GroupHeading`, `GroupItems`, `Empty`, `Separator`, `Loading`, `LinkItem`) — the command-palette pattern. Bits owns the filtering, the scoring and arrow-key navigation, and keeps focus in the Input while the highlight moves. Wrap it in a `Dialog` for a modal palette.

  **`Command.Viewport` is required**, not decorative. It goes inside `List` and wraps the content: Bits takes the Input's `aria-controls` from the Viewport's id and uses it as the insertion element when sorting filtered items. Omit it and the combobox is invalid ARIA — our own axe suite caught exactly that, which is why the docs lead with it.

  There are **two** names to set, and the prop names hide that: `label` on `Root` names the **search field** (it renders a visually hidden `<label>` the Input references), while `aria-label` on `List` names the **list**. Bits defaults the latter to `"Suggestions..."`; override it. We leave Bits' default in place rather than silently substituting our own, so behaviour matches their documentation.

  Add `keywords` to an `Item` for terms users would type that are not in the label — `trash` on a Delete item. Use `Loading` rather than `Empty` while a request is in flight: "no results" and "still loading" are different answers.

This completes the Bits UI navigation and menu family. `Item`, `Group`, `Label` and `Separator` remain shared across `DropdownMenu`, `ContextMenu` and `Menubar`; `NavigationMenu` and `Command` are self-contained, with no shared internals upstream.
