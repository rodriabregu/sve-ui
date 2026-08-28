<script lang="ts">
	// Shared rules, so they travel with this namespace too.
	import '../DateField/field-root.css';
	import { DatePicker } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { DateValue } from '@internationalized/date';

	/**
	 * Flat, non-union Props for the same reason the calendars and fields have one:
	 * Bits' props overflow TypeScript's union representation when spread.
	 */
	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'placeholder' | 'children'
	> {
		/** The selected date. Bindable. A `DateValue`, not a JS `Date`. */
		value?: DateValue;
		/** Called when the selection changes. */
		onValueChange?: (value: DateValue | undefined) => void;
		/** Whether the calendar popover is open. Bindable. */
		open?: boolean;
		/** Called when the popover opens or closes. */
		onOpenChange?: (open: boolean) => void;
		/** The month on screen. Bindable. */
		placeholder?: DateValue;
		/** Earliest selectable date. */
		minValue?: DateValue;
		/** Latest selectable date. */
		maxValue?: DateValue;
		/** Exists but cannot be picked — a booked day. */
		isDateUnavailable?: (date: DateValue) => boolean;
		/** Disabled outright. */
		isDateDisabled?: (date: DateValue) => boolean;
		/** Smallest editable unit, which decides the field's segments. @default 'day' */
		granularity?: 'day' | 'hour' | 'minute' | 'second';
		/**
		 * BCP-47 locale. It drives the field's SEGMENT ORDER and the calendar's
		 * month names and first day of week, so it is not cosmetic.
		 * @default 'en'
		 */
		locale?: string;
		/**
		 * What this picker is FOR. Bits builds the calendar's accessible name as
		 * `${calendarLabel} ${month} ${year}` and defaults it to the literal word
		 * "Event", so leaving it unset announces "Event January 2026".
		 * @default 'Event'
		 */
		calendarLabel?: string;
		/** How many months the calendar shows at once. @default 1 */
		numberOfMonths?: number;
		/** Name for form submission; Bits renders a hidden input. */
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

	const Root = DatePicker.Root as unknown as Component<
		Record<string, unknown>,
		object,
		'value' | 'placeholder' | 'open'
	>;
</script>

<!--
  A segmented field plus a calendar popover, sharing one value.

  That pairing is the whole point, and it is why a picker beats either half
  alone: someone who knows the date types it in three keystrokes, and someone
  choosing "the second Tuesday" opens the calendar. Ship only the calendar and
  you have made the fast path slow; ship only the field and you have made
  browsing impossible.

  Compose:
    Root > Label
         > Input > (Segment per part) + Trigger
         > Content > Calendar > (the calendar parts)

  `Input`, `Label` and `Segment` are DateField's components, and the calendar
  parts are Calendar's — Bits re-exports the identical modules here, so the
  field inside a picker behaves and looks exactly like a standalone one.
  `Arrow` and `Close` come from Popover for the same reason.
-->
<Root
	bind:value
	bind:placeholder
	bind:open
	class={['sve-segmented-field', cls].filter(Boolean).join(' ')}
	data-slot="date-picker"
	{children}
	{...rest}
/>
