<script lang="ts">
	import { setSegmentedRequired } from '$lib/internal/segmented-required';
	import { TimeRangeField } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Time, CalendarDateTime, ZonedDateTime } from '@internationalized/date';

	/**
	 * Mirrors Bits' own `TimeValue`. `Time` is NOT part of the `DateValue` union —
	 * @internationalized/date keeps clock times and calendar dates as separate
	 * types, so reusing `DateValue` here would reject a plain `Time`.
	 */
	type TimeValue = Time | CalendarDateTime | ZonedDateTime;

	type FieldValue = { start: TimeValue | undefined; end: TimeValue | undefined };

	/**
	 * Flat, non-union Props for the same reason the calendars have one: Bits'
	 * props overflow TypeScript's union representation when spread.
	 */
	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'placeholder' | 'children'
	> {
		/** The time value range. Bindable. A `TimeValue`, not a JS `Date`. */
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
		/**
		 * Marks the field as required.
		 *
		 * There is no single element to mark: the Root is a wrapper, and what a
		 * screen reader lands on are the segments. So this reaches them through
		 * context and becomes `aria-required` on each editable one, whose
		 * `role="spinbutton"` supports it (checked against axe, not assumed).
		 *
		 * Bits emits nothing for `required` on this component, so before it was
		 * wired up a `<Field required>` around a date field announced nothing at all.
		 * It is still forwarded to Bits, which uses it on the hidden input for form
		 * submission.
		 * @default false
		 */
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
		required = false,
		value = $bindable(),
		placeholder = $bindable(),
		class: cls,
		children,
		...rest
	}: Props = $props();

	// A getter, so a Root whose `required` changes updates rendered segments.
	setSegmentedRequired(() => required);

	const Root = TimeRangeField.Root as unknown as Component<
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

  NAME THE ROOT YOURSELF. Verified in the rendered DOM: on a RANGE field the
  Root carries `role="group"` with NO accessible name. Bits points each Input's
  `aria-labelledby` at your Label, but the Inputs carry no role, so that
  labelling exposes nothing — the outer group announces as an unnamed group.
  (On the single-value field the Input IS the group and it IS labelled, so this
  gap is specific to ranges.)

  Pass `aria-labelledby` pointing at your Label's id, or `aria-label`. Both reach
  the root element.

  Always pair it with a `Label`. And pass `locale` — it decides the segment
  ORDER, so the wrong one rearranges the field rather than merely relabelling it.
-->
<Root
	bind:value
	bind:placeholder
	class={['sve-field', cls].filter(Boolean).join(' ')}
	data-slot="time-range-field"
	{required}
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
