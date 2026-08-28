<script lang="ts">
	import { DateRangeField } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof DateRangeField.Input>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The wrapper the segments live in. It is not an <input>: focus lands on an
  individual segment, which is why the focus ring is drawn here with
  `:focus-within`.
-->
<DateRangeField.Input
	class={['sve-segmented-field__input', cls].filter(Boolean).join(' ')}
	data-slot="date-range-field-input"
	{children}
	{...rest}
/>

<style>
	:global(.sve-segmented-field__input) {
		display: inline-flex;
		align-items: center;
		gap: 1px;
		padding: var(--sve-space-2) var(--sve-space-3);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-md);
		color: var(--sve-color-default-foreground);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	/* The ring goes on the WRAPPER, because focus lives on an individual segment
     inside it — without this the field looks unfocused while a segment is being
     edited. */
	:global(.sve-segmented-field__input:focus-within) {
		border-color: var(--sve-color-primary-border);
		box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
	}

	:global(.sve-segmented-field__input[data-invalid]) {
		border-color: var(--sve-color-danger-border);
	}

	:global(.sve-segmented-field__input[data-disabled]) {
		opacity: 0.5;
	}
</style>
