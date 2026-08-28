<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DatePicker.Content>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the popover panel. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The floating panel holding the calendar. Portals to <body> so z-index stacking
  stays clean, and Bits handles the positioning, the focus trap and Escape.
-->
<DatePicker.Portal>
	<DatePicker.Content
		class={['sve-picker__content', cls].filter(Boolean).join(' ')}
		data-slot="date-picker-content"
		{children}
		{...rest}
	/>
</DatePicker.Portal>

<style>
	:global(.sve-picker__content) {
		/* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60,
       Tooltip=70. A picker is a popover. */
		z-index: 60;
		/*
			The panel supplies its own surface. It used to have only a radius and a
			shadow and leant on the calendar inside for the background — while
			telling that calendar to drop its frame, on the stated grounds that "the
			panel already provides the border and shadow". It did not. The result was
			a transparent popover with the page showing through the dates.

			A floating panel cannot depend on its content for a background: the
			content is whatever the caller puts there.
		*/
		background-color: var(--sve-color-default-surface);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-lg);
		box-shadow: var(--sve-shadow-md);
	}
</style>
