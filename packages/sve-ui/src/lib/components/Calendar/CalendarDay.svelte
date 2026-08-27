<script lang="ts">
	import './calendar-day.css';
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.Day>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the day. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The interactive day. Bits sets the state as data attributes, and the
  distinctions matter:

    data-selected           chosen
    data-today              today, which must be visible even when not selected
    data-disabled           outside min/max, or explicitly disabled
    data-unavailable        exists but cannot be picked — a fully booked day
    data-outside-month      a leading/trailing day from the adjacent month
    data-focused            keyboard focus within the roving grid

  `unavailable` and `disabled` are different answers and are styled
  differently: a struck-through unavailable day tells the user the date exists
  but is taken, whereas a greyed-out disabled day says it is out of range.
  Collapsing them into one grey blur loses that.
-->
<Calendar.Day
	class={['sve-calendar__day', cls].filter(Boolean).join(' ')}
	data-slot="calendar-day"
	{children}
	{...rest}
/>

<style>
	/* Today gets a ring rather than a fill, so it stays legible when it is also
     the selected day. */

	/* Bits drives focus with a roving tabindex, so the ring has to follow
     data-focused as well as :focus-visible. */

	/* Out of range: nothing to reason about, so fade it out. */

	/* Exists but taken: keep it readable and strike it, which reads as
     "that date is gone" rather than "that date does not exist". */

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-calendar__day) {
			transition: none;
		}
	}
</style>
