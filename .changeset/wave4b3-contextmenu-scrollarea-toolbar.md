---
'sve-ui': minor
---

Add ContextMenu, ScrollArea, and Toolbar — no new dependencies.

- **`ContextMenu`** namespace (`Root`, `Trigger`, `Content`, `Item`, `Group`, `Label`, `Separator`, `Sub`, `SubTrigger`, `SubContent`, `CheckboxItem`, `RadioItem`, `RadioGroup`, `Arrow`) — right-click menu. `Trigger` is the right-click **region**, not a button.

  Treat it as an accelerator, never as the only route to an action: right-click is undiscoverable, and touch devices have no right-click at all. Every action offered here must also be reachable from a visible control.

- **`ScrollArea`** namespace (`Root`, `Viewport`, `Scrollbar`, `Thumb`) — styled scroll chrome over a native scroll container, so wheel, touch and keyboard scrolling all keep working and content is not virtualised. Put the size constraint on `Root`; `Viewport` fills it.

  Note that the default `type="hover"` does not merely hide the scrollbar — Bits does not mount it at all until the pointer enters, which removes the only visual cue that more content exists. Prefer `type="always"` unless the overflow is obvious from the content.

- **`Toolbar`** namespace (`Root`, `Button`, `Link`, `Group`, `GroupItem`) — `role="toolbar"` with roving focus, so the whole bar is one tab stop and arrow keys move between controls. A twelve-button toolbar then costs a keyboard user one Tab instead of twelve. The parts are not interchangeable: `Button` performs an action, `Link` navigates and stays a real anchor (keeping middle-click and open-in-new-tab), `Group`/`GroupItem` form a toggle group whose `type` sets the shape of `value`.

  `Root` needs an `aria-label`, and icon-only controls need their own.

Also exports the matching type: `ScrollAreaType`.

### Changed

`DropdownMenu`'s `Item`, `Group`, `Label` and `Separator` now come from a single shared implementation that `ContextMenu` also uses — Bits re-exports identical menu internals under both namespaces, so two copies of the same CSS would only drift apart. Behaviour is unchanged and the parts stay context-aware (the same wrapper emits `data-context-menu-item` inside a ContextMenu and `data-dropdown-menu-item` inside a DropdownMenu).

Their internal CSS classes were renamed accordingly: `sve-dropdown-item` → `sve-menu-item`, `sve-dropdown-group` → `sve-menu-group`, `sve-dropdown-label` → `sve-menu-label`, `sve-dropdown-separator` → `sve-menu-separator`. These class names were never documented — the supported way to theme sve-ui is by overriding `--sve-*` CSS variables — but if you were targeting them directly, update your selectors.
