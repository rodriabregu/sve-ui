<script lang="ts">
	import './field-root.css';
	import { setSegmentedRequired } from '$lib/internal/segmented-required';
	import { DateField } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { DateValue } from '@internationalized/date';

	type FieldValue = DateValue | undefined;

	/**
	 * Flat, non-union Props for the same reason the calendars have one: Bits'
	 * props overflow TypeScript's union representation when spread.
	 */
	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'placeholder' | 'children'
	> {
		/** The date value. Bindable. A `DateValue`, not a JS `Date`. */
		value?: FieldValue;
		/** Called when the value changes. */
		onValueChange?: (value: FieldValue) => void;
		/** Which date the empty segments are formatted from. Bindable. */
		placeholder?: DateValue;
		/** Earliest accepted value. */
		minValue?: DateValue;
		/** Latest accepted value. */
		maxValue?: DateValue;
		/**
		 * Smallest unit the user can edit, which decides which segments appear.
		 * `day` gives a plain date; `minute` adds time segments.
		 * @default 'day'
		 */
		granularity?: 'day' | 'hour' | 'minute' | 'second';
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

	const Root = DateField.Root as unknown as Component<
		Record<string, unknown>,
		object,
		'value' | 'placeholder'
	>;
</script>

<!--
  A segmented date field, not a text input. Bits gives every segment
  spinbutton ARIA and handles the typing model: numbers fill the focused
  segment and advance, arrow keys increment, and the value is only committed
  when every segment is filled — so there is no half-parsed state to guard
  against.

  That is the argument over `<input type="date">`:
  you get the same keyboard behaviour with markup and styling you control, and
  identical rendering across browsers.

  Always pair it with a `Label`. And pass `locale` — it decides the segment
  ORDER, so the wrong one rearranges the field rather than merely relabelling it.
-->
<Root
	bind:value
	bind:placeholder
	class={['sve-field', cls].filter(Boolean).join(' ')}
	data-slot="date-field"
	{required}
	{children}
	{...rest}
/>

<style>
</style>
