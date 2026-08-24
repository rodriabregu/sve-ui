<script lang="ts">
  import { RangeCalendar } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DateValue } from '@internationalized/date';

  /**
   * Shape Bits hands to the children snippet. Typed here rather than left as
   * `unknown`: the consumer destructures this to render the grid, so a loose
   * type would push `any` into every call site.
   *
   * `Month` is Bits' own shape — a month value plus its weeks laid out as rows.
   */
  type CalendarMonth = {
    value: DateValue;
    dates: DateValue[];
    weeks: DateValue[][];
  };
  type SnippetProps = { months: CalendarMonth[]; weekdays: string[] };

  type DateRange = { start: DateValue | undefined; end: DateValue | undefined };

  /**
   * Flat, non-union Props for the same reason CalendarRoot has one: Bits' props
   * overflow TypeScript's union representation when spread.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'placeholder' | 'children'> {
    /**
     * The selected range, as `{ start, end }` of `DateValue`s from
     * `@internationalized/date`. Bindable.
     */
    value?: DateRange;
    /** Called when the range changes. */
    onValueChange?: (value: DateRange) => void;
    /** The month currently on screen. Bindable. */
    placeholder?: DateValue;
    /** Earliest selectable date. */
    minValue?: DateValue;
    /** Latest selectable date. */
    maxValue?: DateValue;
    /** Smallest number of days a range may span. */
    minDays?: number;
    /** Largest number of days a range may span. */
    maxDays?: number;
    /**
     * When true, a range may not straddle an unavailable date — picking one
     * that would is rejected rather than silently swallowing the blocked day.
     */
    excludeDisabled?: boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
    isDateDisabled?: (date: DateValue) => boolean;
    /** @default 1 */
    numberOfMonths?: number;
    /** BCP-47 locale driving month names, weekday order and numerals. @default 'en' */
    locale?: string;
    /**
     * What this calendar is FOR. Bits builds the accessible name as
     * `${calendarLabel} ${month} ${year}` and defaults it to the literal word
     * "Event", so leave it unset and it announces "Event January 2026".
     * @default 'Event'
     */
    calendarLabel?: string;
    /** @default false */
    disabled?: boolean;
    /** @default false */
    readonly?: boolean;
    /** Extra classes merged onto the root. */
    class?: string;
    children?: Snippet<[SnippetProps]>;
  }

  let {
    value = $bindable(),
    placeholder = $bindable(),
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const Root = RangeCalendar.Root as unknown as Component<
    Record<string, unknown>,
    object,
    'value' | 'placeholder'
  >;
</script>

<!--
  Bits handles the two-step range interaction: the first click sets the start,
  the second sets the end, and hovering between them previews the span through
  `data-highlighted`. It also normalises a backwards selection, so clicking the
  end before the start does the sensible thing instead of producing an inverted
  range.

  `minDays`/`maxDays` bound the span, and `excludeDisabled` refuses a range that
  would straddle an unavailable date — which matters for booking, where "3 nights
  including the one that is taken" is not a valid answer.
-->
<Root
  bind:value
  bind:placeholder
  class={['sve-calendar', 'sve-range-calendar', cls].filter(Boolean).join(' ')}
  data-slot="range-calendar"
  {children}
  {...rest}
/>

<style>
  /* Reuses the base .sve-calendar shell from CalendarRoot; only the
     range-specific day states are added here. */
  :global(.sve-range-calendar) {
    display: flex;
    flex-direction: column;
    gap: var(--sve-space-4);
    padding: var(--sve-space-4);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-lg);
    background-color: var(--sve-color-default-surface);
    font-family: var(--sve-font-family-sans);
    color: var(--sve-color-default-foreground);
    width: max-content;
  }

  :global(.sve-range-calendar[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
