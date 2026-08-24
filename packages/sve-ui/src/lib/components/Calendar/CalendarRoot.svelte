<script lang="ts">
	import { Calendar } from 'bits-ui';
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

	/**
	 * Bits' Calendar.Root props are a discriminated union (single vs multiple)
	 * over 400+ HTML attributes, which overflows TypeScript's union
	 * representation when spread — the same limit AccordionRoot and
	 * ToggleGroupRoot hit. We expose a flat, non-union surface and forward it to a
	 * loosely-typed view of the Bits root; behaviour is unchanged.
	 *
	 * `DateValue` comes from `@internationalized/date`, which is a peerDependency:
	 * the consumer constructs the values, so there must be exactly ONE copy of
	 * that library or the objects stop lining up.
	 */
	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'placeholder' | 'children'
	> {
		/**
		 * `single` selects one date, `multiple` selects several. Required, because
		 * it also decides the shape of `value`.
		 */
		type: 'single' | 'multiple';
		/**
		 * Selected date, or dates in `multiple` mode. Bindable. A `DateValue` from
		 * `@internationalized/date`, not a JS `Date`.
		 */
		value?: DateValue | DateValue[] | undefined;
		/** Called when the selection changes. */
		onValueChange?: (value: DateValue | DateValue[] | undefined) => void;
		/** The month currently on screen. Bindable. */
		placeholder?: DateValue;
		/** Earliest selectable date. */
		minValue?: DateValue;
		/** Latest selectable date. */
		maxValue?: DateValue;
		/** Return true for dates that exist but cannot be picked — a booked day. */
		isDateUnavailable?: (date: DateValue) => boolean;
		/** Return true for dates to disable outright. */
		isDateDisabled?: (date: DateValue) => boolean;
		/** How many months to show at once. @default 1 */
		numberOfMonths?: number;
		/** BCP-47 locale driving month names, weekday order and numerals. @default 'en' */
		locale?: string;
		/**
		 * What this calendar is FOR. Bits builds the root's accessible name as
		 * `${calendarLabel} ${month} ${year}`, and its default is the literal word
		 * "Event" — so an unset calendar announces as "Event January 2026", which
		 * tells the user nothing. Pass "Departure date", "Booking", "Due date".
		 * @default 'Event'
		 */
		calendarLabel?: string;
		/** @default false */
		disabled?: boolean;
		/** @default false */
		readonly?: boolean;
		/** Show the month and year dropdowns in the header. @default false */
		monthFormat?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
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

	// The third type argument names the bindable props; without it the cast
	// erases the bindings and `bind:value` below would not type-check.
	const Root = Calendar.Root as unknown as Component<
		Record<string, unknown>,
		object,
		'value' | 'placeholder'
	>;
</script>

<!--
  Bits owns the whole calendar behaviour: the roving grid, arrow-key navigation
  across weeks and months, PageUp/PageDown, Home/End, the `role="application"`
  wrapper and the aria-labelled grid. It also owns the calendar arithmetic, via
  `@internationalized/date` — which is why that is a peerDependency rather than
  something we vendor.

  Locale is not cosmetic here: `locale` changes month names, the first day of
  the week and the numeral system. Pass the user's locale rather than assuming
  Monday-first or Sunday-first.

  Pass `calendarLabel` too. Bits builds the accessible name as
  `${calendarLabel} ${month} ${year}` and defaults the first part to the literal
  word "Event", so leaving it unset announces "Event January 2026". Verified in
  the rendered DOM.
-->
<Root
	bind:value
	bind:placeholder
	class={['sve-calendar', cls].filter(Boolean).join(' ')}
	data-slot="calendar"
	{children}
	{...rest}
/>

<style>
	:global(.sve-calendar) {
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

	:global(.sve-calendar[data-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
