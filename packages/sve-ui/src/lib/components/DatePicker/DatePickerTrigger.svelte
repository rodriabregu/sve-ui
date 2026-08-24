<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DatePicker.Trigger>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the trigger. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Opens the calendar popover. It sits INSIDE the field, next to the segments —
  which is the point of a picker over a bare calendar: the user can type the
  date OR pick it, and neither path is hidden behind the other.

  It is usually an icon-only button, so give it an `aria-label`.
-->
<DatePicker.Trigger
	class={['sve-picker__trigger', cls].filter(Boolean).join(' ')}
	data-slot="date-picker-trigger"
	{children}
	{...rest}
/>

<style>
	:global(.sve-picker__trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		margin-left: auto;
		border: none;
		border-radius: var(--sve-radius-sm);
		background-color: transparent;
		font-family: inherit;
		font-size: var(--sve-font-size-sm);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.sve-picker__trigger:hover) {
		background-color: var(--sve-color-default);
	}

	:global(.sve-picker__trigger:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 1px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-picker__trigger) {
			transition: none;
		}
	}
</style>
