<script lang="ts">
	import { DateRangeField } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DateRangeField.Label>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits renders this as a plain <span>, not a <label>, and names the Root by pointing its
  Input's `aria-labelledby` at it.
-->
<DateRangeField.Label
	class={['sve-segmented-field__label', cls].filter(Boolean).join(' ')}
	data-slot="date-range-field-label"
	{children}
	{...rest}
/>

<style>
	:global(.sve-segmented-field__label) {
		display: block;
		margin-bottom: var(--sve-space-1);
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-sm);
		font-weight: var(--sve-font-weight-medium);
		color: var(--sve-color-default-foreground);
	}
</style>
