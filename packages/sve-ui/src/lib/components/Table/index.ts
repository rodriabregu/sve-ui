/**
 * Table namespace — a styled data table.
 *
 * Custom, not a Bits UI wrapper: Bits ships no table, and there is nothing
 * headless to buy. A data table is already a solved accessibility problem in
 * HTML — `<table>`, `<caption>`, `scope` on the headers — and the value here is
 * getting that markup right by default plus the styling and the scroll
 * container on top.
 *
 * Compose:
 *   Root > Caption
 *        > Header > Row > Head
 *        > Body   > Row > RowHeader + Cell
 *        > Footer > Row > Cell
 *
 * What it does NOT do:
 *
 *   - It does not sort your data. `Head sortable` renders the button and sets
 *     `aria-sort`; you apply the order. Sorting is application logic — it may
 *     be server-side, it interacts with pagination, and comparing text needs an
 *     `Intl.Collator` for the user's locale. Announcing a sort you did not
 *     apply is a lie to assistive technology.
 *   - It does not set `role="grid"`. That role promises arrow-key cell
 *     navigation; claiming it without implementing it leaves a screen reader
 *     user pressing keys that do nothing.
 *   - It does not take rows as data. A `columns` array plus a render callback
 *     buys nothing over an `{#each}` and takes away every escape hatch.
 *
 * Accessibility notes worth reading before shipping:
 *   - Give it a `Caption`. A table announced as just "table" is useless on a
 *     page with more than one. Use `visuallyHidden` if a heading above already
 *     says it.
 *   - Give the identifying cell of each row a `RowHeader`, so a value is
 *     announced with its subject and not just its column.
 *   - Pass `scrollLabel` on `Root`. A wide table scrolls, and a scroll
 *     container that is not focusable cannot be scrolled without a pointer.
 *   - `Row selected` sets `data-selected`, never `aria-selected` — that
 *     attribute is not valid on a plain `<tr>`. Pair it with a real `Checkbox`;
 *     styling alone tells sighted users and nobody else.
 *
 * Size and pace it with `--sve-table-max-height` and `--sve-table-cell-py`.
 */

export { default as Root } from './TableRoot.svelte';
export { default as Caption } from './TableCaption.svelte';
export { default as Header } from './TableHeader.svelte';
export { default as Body } from './TableBody.svelte';
export { default as Footer } from './TableFooter.svelte';
export { default as Row } from './TableRow.svelte';
export { default as Head } from './TableHead.svelte';
export { default as RowHeader } from './TableRowHeader.svelte';
export { default as Cell } from './TableCell.svelte';
