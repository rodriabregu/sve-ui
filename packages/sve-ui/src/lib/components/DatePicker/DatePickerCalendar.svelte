<script lang="ts">
	// This renders `.sve-calendar`, so it needs that class's rules to travel
	// with it. Route-level code splitting means the page loads only what its own
	// modules import.
	import '../Calendar/calendar-root.css';
	import { DatePicker } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DatePicker.Calendar>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the calendar. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The calendar, wired to the picker's state rather than owning its own. Compose
  its parts exactly as on a standalone Calendar — they are the same components,
  since Bits re-exports the identical modules here.
-->
<DatePicker.Calendar
	class={['sve-calendar', cls].filter(Boolean).join(' ')}
	data-slot="date-picker-calendar"
	{children}
	{...rest}
/>

<style>
	/* Inside a popover the panel already provides the border and shadow, so drop
     the standalone calendar's own frame rather than double-framing it. */
	:global(.sve-picker__content .sve-calendar) {
		border: none;
		box-shadow: none;
	}
</style>
