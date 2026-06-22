---
'sve-ui': minor
---

Add Tabs, Accordion, and Code components:

- **Tabs** (`Tabs.Root` / `List` / `Trigger` / `Content`) — accessible tabs on
  Bits UI with `bind:value` and an active-underline indicator.
- **Accordion** (`Accordion.Root` / `Item` / `Header` / `Trigger` / `Content`) —
  single or multiple (`type`), `bind:value`, rotating chevron on the trigger.
- **Code** — code block with an optional header label and an SSR-safe
  copy-to-clipboard button (`code`, `label`, `copyable` props).

All styled with `--sve-*` tokens; no Tailwind required.
