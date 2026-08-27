<script lang="ts">
	import './calendar-cell.css';
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.Cell>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the cell. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- The <td>. The interactive element is the Day inside it. -->
<Calendar.Cell
	class={['sve-calendar__cell', cls].filter(Boolean).join(' ')}
	data-slot="calendar-cell"
	{children}
	{...rest}
/>

<style>
</style>
