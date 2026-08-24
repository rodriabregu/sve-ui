<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Density = 'compact' | 'default' | 'comfortable';

  interface Props extends Omit<HTMLAttributes<HTMLTableElement>, 'class'> {
    /**
     * Names the horizontal scroll region so a keyboard user can reach it.
     *
     * A table wider than its container scrolls, and a scroll container that is
     * not focusable cannot be scrolled without a pointer — the columns off the
     * right edge are simply unreachable. Focusability requires a name, though:
     * an unnamed focusable region is announced as nothing at all, which is why
     * `tabindex` is only added when this is set.
     *
     * It is NOT the table's accessible name. Use `Table.Caption` for that.
     */
    scrollLabel?: string;
    /**
     * Row height. Compact fits more on screen; comfortable is easier to track
     * across a wide row.
     * @default 'default'
     */
    density?: Density;
    /** Shade alternating body rows. @default false */
    zebra?: boolean;
    /**
     * Pin the header while the body scrolls vertically. Needs a height on the
     * scroll container — set `--sve-table-max-height`, or the page scrolls
     * instead of the table and there is nothing for the header to stick to.
     * @default false
     */
    stickyHeader?: boolean;
    /** Extra classes merged onto the `<table>`. */
    class?: string;
    /** Caption, Header, Body and Footer. */
    children?: Snippet;
  }

  let {
    scrollLabel,
    density = 'default',
    zebra = false,
    stickyHeader = false,
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const tableClass = $derived(
    [
      'sve-table',
      `sve-table--${density}`,
      zebra && 'sve-table--zebra',
      stickyHeader && 'sve-table--sticky',
      cls
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<!--
  A real `<table>`, and deliberately without `role="grid"`.

  `grid` promises a full keyboard interaction model — arrow keys moving a focus
  cursor between cells, Home/End, Ctrl+Home. Claiming the role without
  implementing it leaves a screen reader user pressing arrow keys that do
  nothing. A static data table is a table; the native element already conveys
  rows, columns and headers.

  Root also owns the horizontal scroll container, because a wide table that
  scrolls the whole page instead of itself is the single most common table
  defect. Pass `scrollLabel` to make that container reachable by keyboard.
-->
<!--
  The a11y rule below assumes a focusable non-interactive element is a mistake.
  A scrollable region is the documented exception: WAI-ARIA pairs
  `role="region"` with a name and `tabindex="0"` precisely so a keyboard user
  can scroll it. The compiler cannot see that all three are set together, or
  omitted together.

  The rationale lives in its own comment because everything after
  `svelte-ignore` is parsed as a list of rule names — prose in there becomes a
  dozen nonexistent rules and eslint fails on every word.
-->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={['sve-table-scroll', stickyHeader && 'sve-table-scroll--capped'].filter(Boolean).join(' ')}
  tabindex={scrollLabel ? 0 : undefined}
  role={scrollLabel ? 'region' : undefined}
  aria-label={scrollLabel}
>
  <table class={tableClass} {...rest}>
    {@render children?.()}
  </table>
</div>

<style>
  :global(.sve-table-scroll) {
    overflow-x: auto;
    max-width: 100%;
  }

  :global(.sve-table-scroll--capped) {
    overflow-y: auto;
    max-height: var(--sve-table-max-height, 24rem);
  }

  :global(.sve-table-scroll:focus-visible) {
    outline: 2px solid var(--sve-color-primary, #2563eb);
    outline-offset: 2px;
  }

  /*
    `border-collapse: separate` is not a style preference here. With
    `collapse`, borders belong to the table rather than the cell, and a
    `position: sticky` header leaves its own border behind when it detaches —
    the header floats over the rows with no line under it.
  */
  :global(.sve-table) {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
    text-align: left;
  }

  :global(.sve-table--compact) {
    --sve-table-cell-py: var(--sve-space-1);
  }

  :global(.sve-table--default) {
    --sve-table-cell-py: var(--sve-space-2);
  }

  :global(.sve-table--comfortable) {
    --sve-table-cell-py: var(--sve-space-4);
  }

  :global(.sve-table--zebra tbody tr:nth-child(even)) {
    background: var(--sve-color-default-surface);
  }

  :global(.sve-table--sticky thead th) {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--sve-color-default-surface);
  }
</style>
