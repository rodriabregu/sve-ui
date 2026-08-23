<script lang="ts">
  import { TimeField } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Time, CalendarDateTime, ZonedDateTime } from '@internationalized/date';

  /**
   * Mirrors Bits' own `TimeValue`. `Time` is NOT part of the `DateValue` union —
   * @internationalized/date keeps clock times and calendar dates as separate
   * types, so reusing `DateValue` here would reject a plain `Time`.
   */
  type TimeValue = Time | CalendarDateTime | ZonedDateTime;

  type FieldValue = TimeValue | undefined;

  /**
   * Flat, non-union Props for the same reason the calendars have one: Bits'
   * props overflow TypeScript's union representation when spread.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'placeholder' | 'children'> {
    /** The time value. Bindable. A `TimeValue`, not a JS `Date`. */
    value?: FieldValue;
    /** Called when the value changes. */
    onValueChange?: (value: FieldValue) => void;
    /** Which time the empty segments are formatted from. Bindable. */
    placeholder?: TimeValue;
    /** Earliest accepted value. */
    minValue?: TimeValue;
    /** Latest accepted value. */
    maxValue?: TimeValue;
    /**
     * Smallest unit the user can edit, which decides which segments appear.
     * @default 'minute'
     */
    granularity?: 'hour' | 'minute' | 'second';
    /**
     * 12- or 24-hour clock. Leave it unset to follow the locale — hardcoding 12
     * is wrong for most of the world.
     */
    hourCycle?: 12 | 24;
    /**
     * BCP-47 locale. It decides the SEGMENT ORDER — month/day/year versus
     * day/month/year — so getting it wrong does not just relabel the field, it
     * rearranges it. Pass the user's locale.
     * @default 'en'
     */
    locale?: string;
    /** Name for form submission; Bits renders a hidden input. */
    name?: string;
    /** @default false */
    required?: boolean;
    /** @default false */
    disabled?: boolean;
    /** @default false */
    readonly?: boolean;
    /**
     * Return a message to mark the value invalid. Bits then sets `data-invalid`
     * and wires `aria-invalid` on the segments.
     */
    validate?: (value: never) => string | string[] | void;
    /** Extra classes merged onto the root. */
    class?: string;
    children?: Snippet;
  }

  // `value` and `placeholder` must be destructured and passed as bindings.
  // Forwarding them in the spread makes them one-way.
  let {
    value = $bindable(),
    placeholder = $bindable(),
    class: cls,
    children,
    ...rest
  }: Props = $props();

  const Root = TimeField.Root as unknown as Component<
    Record<string, unknown>,
    object,
    'value' | 'placeholder'
  >;
</script>

<!--
  A segmented time field, not a text input. Bits gives every segment
  spinbutton ARIA and handles the typing model: numbers fill the focused
  segment and advance, arrow keys increment, and the value is only committed
  when every segment is filled — so there is no half-parsed state to guard
  against.

  That is the argument over `<input type="time">`:
  you get the same keyboard behaviour with markup and styling you control, and
  identical rendering across browsers.

  Always pair it with a `Label`. And pass `locale` — it decides the segment
  ORDER, so the wrong one rearranges the field rather than merely relabelling it.
-->
<Root
  bind:value
  bind:placeholder
  class={['sve-field', cls].filter(Boolean).join(' ')}
  data-slot="time-field"
  {children}
  {...rest}
/>

<style>
  :global(.sve-field) {
    display: flex;
    flex-direction: column;
    font-family: var(--sve-font-family-sans);
  }
</style>
