<script lang="ts">
	import { TimeRangeField } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof TimeRangeField.Input>;

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
<TimeRangeField.Input
	class={['sve-field-input', cls].filter(Boolean).join(' ')}
	data-slot="time-range-field-input"
	{children}
	{...rest}
/>

<style>
	:global(.sve-field-input) {
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
	:global(.sve-field-input:focus-within) {
		border-color: var(--sve-color-primary-border);
		box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
	}

	:global(.sve-field-input[data-invalid]) {
		border-color: var(--sve-color-danger-border);
	}

	:global(.sve-field-input[data-disabled]) {
		opacity: 0.5;
	}
</style>
