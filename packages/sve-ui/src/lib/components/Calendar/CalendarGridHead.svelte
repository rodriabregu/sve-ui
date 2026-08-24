<script lang="ts">
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.GridHead>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the head. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<Calendar.GridHead
	class={['sve-calendar__grid-head', cls].filter(Boolean).join(' ')}
	data-slot="calendar-grid-head"
	{children}
	{...rest}
/>
