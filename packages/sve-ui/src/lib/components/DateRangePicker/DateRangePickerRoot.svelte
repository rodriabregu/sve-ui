<script lang="ts">
	// Shared rules, so they travel with this namespace too.
	import '../DateField/field-root.css';
	import { DateRangePicker } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { DateValue } from '@internationalized/date';

	type DateRange = { start: DateValue | undefined; end: DateValue | undefined };

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'placeholder' | 'children'
	> {
		/** The selected range. Bindable. */
		value?: DateRange;
		/** Called when the range changes. */
		onValueChange?: (value: DateRange) => void;
		/** Whether the calendar popover is open. Bindable. */
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		/** The month on screen. Bindable. */
		placeholder?: DateValue;
		minValue?: DateValue;
		maxValue?: DateValue;
		/** Smallest number of days the range may span. */
		minDays?: number;
		/** Largest number of days the range may span. */
		maxDays?: number;
		/** Refuse a range that would straddle an unavailable date. */
		excludeDisabled?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		/** @default 'day' */
		granularity?: 'day' | 'hour' | 'minute' | 'second';
		/**
		 * BCP-47 locale. Drives the fields' segment order and the calendar's month
		 * names and first day of week.
		 * @default 'en'
		 */
		locale?: string;
		/**
		 * What this picker is FOR. Bits defaults it to the literal word "Event", so
		 * leaving it unset announces "Event January 2026".
		 * @default 'Event'
		 */
		calendarLabel?: string;
		/** @default 1 — two is usually right for a range, so both ends are visible. */
		numberOfMonths?: number;
		name?: string;
		/** @default false */
		required?: boolean;
		/** @default false */
		disabled?: boolean;
		/** @default false */
		readonly?: boolean;
		/** Extra classes merged onto the root. */
		class?: string;
		children?: Snippet;
	}

	let {
		value = $bindable(),
		placeholder = $bindable(),
		open = $bindable(false),
		class: cls,
		children,
		...rest
	}: Props = $props();

	const Root = DateRangePicker.Root as unknown as Component<
		Record<string, unknown>,
		object,
		'value' | 'placeholder' | 'open'
	>;
</script>

<!--
  Two segmented fields plus a range calendar, sharing one value.

  Set `numberOfMonths={2}` for most range pickers: a stay that crosses a month
  boundary is the common case, and one month forces the user to page back and
  forth to see both ends of their own selection.

  NAME THE ROOT. Like the range FIELD, the range picker's group carries no
  accessible name of its own — pass `aria-labelledby` pointing at your Label's
  id, or `aria-label`.

  Compose:
    Root > Label
         > Input type="start" > (Segment per part)
         > Input type="end"   > (Segment per part) + Trigger
         > Content > Calendar > (RangeCalendar's Cell and Day, Calendar's chrome)
-->
<Root
	bind:value
	bind:placeholder
	bind:open
	class={['sve-segmented-field', cls].filter(Boolean).join(' ')}
	data-slot="date-range-picker"
	{children}
	{...rest}
/>
