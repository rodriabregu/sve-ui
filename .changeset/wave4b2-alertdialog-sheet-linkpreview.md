---
'sve-ui': minor
---

Add AlertDialog, Sheet, and LinkPreview — no new dependencies.

- **`AlertDialog`** namespace (`Root`, `Trigger`, `Overlay`, `Content`, `Title`, `Description`, `Action`, `Cancel`) — destructive confirmation. The differences from `Dialog` are behavioural, not decorative: `role="alertdialog"`, the backdrop does **not** dismiss (Bits omits `onInteractOutside` on Content), and `Cancel` takes initial focus so Enter never destroys anything. `Action` defaults to the danger tone.

  **`Action` does not close the dialog — only `Cancel` does.** That is deliberate: a destructive operation is usually async and can fail, so closing is the consumer's call. Close after it succeeds, or keep the dialog open and show the error. Verified against the Bits source (`AlertDialogCancelState` has an `onclick` calling `handleClose()`; `DialogActionState` has none) and pinned down by tests.

- **`Sheet`** namespace (`Root`, `Trigger`, `Close`, `Overlay`, `Content`, `Title`, `Description`) — a Dialog anchored to a viewport edge. It composes Bits Dialog rather than reimplementing it, so the focus trap, ESC handling, scroll lock and ARIA all come from there. `side` (left/right/top/bottom, default `right`) and `size` (sm/md/lg), where `size` applies to whichever axis the panel grows along and is always capped against the viewport.

- **`LinkPreview`** namespace (`Root`, `Trigger`, `Arrow`, `Content`) — the hover-card pattern.

  **It opens on pointer hover only** — not on focus, and there is no hover on touch, so keyboard and mobile users never see it. Treat it as enrichment, never as the only path to an action or a fact; reach for `Popover` when the content is essential. Note also that Bits renders the trigger as an `<a href>` but overrides its role to `button` with `aria-haspopup="dialog"`, so it is announced as a button rather than a link.

`AlertDialog` and `Sheet` both require a `Title` — Bits points the dialog's `aria-labelledby` at it, so omitting it ships a dialog with no accessible name.

Also exports the matching types: `AlertDialogActionColor`, `SheetSide`, `SheetSize`.
