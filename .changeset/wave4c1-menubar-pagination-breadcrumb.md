---
'sve-ui': minor
---

Add Menubar, Pagination, and Breadcrumb — no new dependencies.

- **`Menubar`** namespace (`Root`, `Menu`, `Trigger`, `Content`, `Item`, `Group`, `Label`, `Separator`, `Sub`, `SubTrigger`, `SubContent`, `CheckboxItem`, `RadioItem`, `RadioGroup`, `Arrow`) — desktop-style menu bar. Compose `Root > Menu > (Trigger + Content)`.

  A menubar is not a row of dropdowns: arrow keys move between the top-level menus, and once one is open, hovering a sibling switches to it without a second click. Build it from separate `DropdownMenu`s and you lose both. It is application chrome, though — for site navigation reach for `NavigationMenu` instead. Give `Root` an `aria-label`.

  `Item`, `Group`, `Label` and `Separator` come from the shared menu implementation that `DropdownMenu` and `ContextMenu` also use, so all three menus match by construction.

- **`Pagination`** namespace (`Root`, `Page`, `PrevButton`, `NextButton`) — `Root` takes `count` and `perPage` and hands you a `pages` array through a snippet prop, so you render the buttons while Bits owns the page range, the ellipsis logic and keyboard navigation. `page` is bindable, Prev/Next disable at the ends automatically, and the active page carries `data-selected`.

  Wrap the whole thing in `<nav aria-label="Pagination">`, and give arrow-only Prev/Next buttons an `aria-label`.

- **`Breadcrumb`** namespace (`Root`, `List`, `Item`, `Link`, `Separator`) — custom rather than a Bits wrapper, because a `<nav>` landmark wrapping an ordered list already *is* a breadcrumb trail: there is no keyboard behaviour to manage and no ARIA to invent. The list is `<ol>` because the order carries meaning.

  Set `current` on the last `Link`: it renders as plain text with `aria-current="page"` instead of an anchor, since a link to the page you are already on is a dead end. Separators are `aria-hidden` with `role="presentation"`, so a screen reader reads "Home, Projects, Settings" rather than "Home, slash, Projects, slash, Settings". `Root`'s `label` defaults to `"Breadcrumb"`, which is what distinguishes it from the site's main navigation.
