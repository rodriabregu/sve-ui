<script lang="ts">
	import { Calendar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof Calendar.Heading>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the heading. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits fills this with the localised month and year, and it is also what the
  grid's `aria-label` points at — so the visible label and the announced one
  cannot drift apart.
-->
<Calendar.Heading
	class={['sve-calendar__heading', cls].filter(Boolean).join(' ')}
	data-slot="calendar-heading"
	{children}
	{...rest}
/>

<style>
	:global(.sve-calendar__heading) {
		font-size: var(--sve-font-size-md);
		font-weight: var(--sve-font-weight-medium);
	}
</style>
