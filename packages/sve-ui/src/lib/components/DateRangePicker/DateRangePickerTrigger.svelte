<script lang="ts">
	import { DateRangePicker } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DateRangePicker.Trigger>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the trigger. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Icon-only in practice, so give it an `aria-label`. -->
<DateRangePicker.Trigger
	class={['sve-picker__trigger', cls].filter(Boolean).join(' ')}
	data-slot="date-range-picker-trigger"
	{children}
	{...rest}
/>
