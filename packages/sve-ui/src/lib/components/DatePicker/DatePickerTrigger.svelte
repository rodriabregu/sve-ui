<script lang="ts">
	import './picker-trigger.css';
	import { DatePicker } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DatePicker.Trigger>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the trigger. */
		/**
		 * Marks the control as failing validation. Applies the invalid styling only.
		 *
		 * No `aria-invalid`: this renders as a `button`, and ARIA does not support the
		 * attribute on that role, so assistive technology is free to ignore it.
		 * axe does NOT flag it either way — verified by injecting it and watching the
		 * suite still pass — so this is a decision taken from the spec, not one a
		 * tool enforces. The accessible signal comes from
		 * `Field` wiring the error message through `aria-describedby`.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Accepted and deliberately NOT forwarded.
		 *
		 * This renders as a `<button>`. A native `required` attribute is inert there,
		 * and `aria-required` is worse — axe reports it as an `aria-allowed-attr`
		 * violation, verified rather than assumed. (Note `aria-invalid` differs: axe
		 * accepts that one on a button. The two rules are not the same.)
		 *
		 * So it is swallowed here rather than emitted as dead markup. When wrapped by
		 * `Field`, the required signal a user gets is the marker on the visible label
		 * plus the error on submit — which is what `Field` is for.
		 * @default false
		 */
		required?: boolean;
		class?: string;
	}

	let {
		/*
			Declared only so it never reaches `{...rest}` as dead markup. There is
			nothing to do with it here — see the prop's own comment above.
		*/
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		required: _required = false,
		invalid = false,
		class: cls,
		children,
		...rest
	}: Props = $props();
</script>

<!--
  Opens the calendar popover. It sits INSIDE the field, next to the segments —
  which is the point of a picker over a bare calendar: the user can type the
  date OR pick it, and neither path is hidden behind the other.

  It is usually an icon-only button, so give it an `aria-label`.
-->
<DatePicker.Trigger
	class={['sve-picker__trigger', invalid && 'sve-picker__trigger--invalid', cls]
		.filter(Boolean)
		.join(' ')}
	data-slot="date-picker-trigger"
	{children}
	{...rest}
/>

<style>
	@media (prefers-reduced-motion: reduce) {
		:global(.sve-picker__trigger) {
			transition: none;
		}
	}

	/* Colour is never the only signal: `Field` supplies the message that says why. */

	/*
		Bits sets `data-disabled` here and nothing styled it, so a disabled picker
		looked exactly like an enabled one. `:disabled` does not help: this is a
		button Bits renders with the attribute, not the native property.
	*/
</style>
