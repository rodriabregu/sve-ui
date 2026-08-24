<script lang="ts">
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.HeadCell>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the weekday cell. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The weekday label. Bits renders a real <th>, so the column header is
  associated with its cells rather than being decorative text.
-->
<Calendar.HeadCell
	class={['sve-calendar__head-cell', cls].filter(Boolean).join(' ')}
	data-slot="calendar-head-cell"
	{children}
	{...rest}
/>

<style>
	:global(.sve-calendar__head-cell) {
		width: 2.25rem;
		padding-bottom: var(--sve-space-1);
		font-size: var(--sve-font-size-xs);
		font-weight: var(--sve-font-weight-medium);
		text-align: center;
		color: var(--sve-color-default-foreground);
		opacity: 0.6;
	}
</style>
