<script lang="ts">
	// Shared rules, so they travel with this namespace too.
	import '../Calendar/calendar-day.css';
	import { RangeCalendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof RangeCalendar.Day>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the day. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Everything CalendarDay handles, plus the range states — which are what make a
  range readable at a glance:

    data-selection-start / data-selection-end   the two endpoints
    data-range-middle                           the days between them
    data-highlighted                            the live preview while the user
                                                is choosing the second endpoint

  The endpoints are filled and the middle is a tint, so the span reads as one
  continuous selection with two handles rather than as a row of separately
  selected days.
-->
<RangeCalendar.Day
	class={['sve-calendar__day', 'sve-range-day', cls].filter(Boolean).join(' ')}
	data-slot="range-calendar-day"
	{children}
	{...rest}
/>

<style>
	/* The endpoints: solid, so the boundaries of the range are unambiguous. */
	:global(.sve-range-day[data-selection-start]),
	:global(.sve-range-day[data-selection-end]) {
		background-color: var(--sve-color-primary);
		border-color: var(--sve-color-primary);
		color: var(--sve-color-primary-foreground);
	}

	/* Square off the inner edges so start, middle and end read as one band. */
	:global(.sve-range-day[data-selection-start]) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	:global(.sve-range-day[data-selection-end]) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	/* The span between: a tint, not a fill, so the endpoints stay distinct. */
	:global(.sve-range-day[data-range-middle]) {
		background-color: var(--sve-color-primary-surface);
		border-radius: 0;
		color: var(--sve-color-primary);
	}

	/* Live preview while picking the second endpoint. Same tint as the committed
     middle, so what you see while hovering is what you get. */
	:global(.sve-range-day[data-highlighted]) {
		background-color: var(--sve-color-primary-surface);
		color: var(--sve-color-primary);
	}
</style>
