<script lang="ts">
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.YearSelect>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the select. */
		class?: string;
	}

	let { class: cls, ...rest }: Props = $props();
</script>

<!--
  A native <select> for jumping straight to a month or year. Worth including
  for any range wider than a few months: paging one month at a time to reach a
  birth year is not navigation, it is a punishment.
-->
<Calendar.YearSelect
	class={['sve-calendar__select', cls].filter(Boolean).join(' ')}
	data-slot="calendar-year-select"
	{...rest}
/>
