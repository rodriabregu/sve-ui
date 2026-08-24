---
'sve-ui': minor
---

Add `Table` — a styled data table.

Custom rather than a Bits UI wrapper: Bits ships no table, and there is nothing
headless to buy. A data table is already a solved accessibility problem in HTML —
`<table>`, `<caption>`, `scope` on the headers — so the value is getting that
markup right by default plus the styling and the scroll container on top.

What it deliberately does not do:

- It does not sort your data. `Head sortable` renders the button and sets
  `aria-sort`; the application applies the order, because sorting may be
  server-side, interacts with pagination, and comparing text correctly needs an
  `Intl.Collator` for the user's locale.
- It does not set `role="grid"`. That role promises arrow-key cell navigation;
  claiming it without implementing it leaves a screen reader user pressing keys
  that do nothing.
- `Row selected` sets `data-selected`, never `aria-selected` — that attribute is
  not valid on a plain `<tr>`.

Parts: `Root`, `Caption`, `Header`, `Body`, `Footer`, `Row`, `Head`, `RowHeader`,
`Cell`.
