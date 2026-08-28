<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof RadioGroup.Root>;

	interface Props extends Omit<BitsRootProps, 'class'> {
		/**
		 * Marks the control as failing validation.
		 *
		 * Always applies the invalid styling. Also sets `aria-invalid`, which this element's `radiogroup` role supports.
		 *
		 * Prefer letting `Field` drive this: passing `Field` an `error` is what makes
		 * a field invalid, so the message the user reads and the state of the control
		 * cannot disagree.
		 * @default false
		 */
		invalid?: boolean;
		class?: string;
	}

	/*
		The `''` default matches Bits and is load-bearing. With a bare `$bindable()`
		a consumer who renders this without a value binds `undefined` into a child
		prop that HAS a fallback, and Svelte throws `props_invalid_value` — which
		takes down the whole page, not just the control.
	*/
	let { invalid = false, value = $bindable(''), class: cls, ...rest }: Props = $props();

	const className = $derived(
		['sve-radio-group', invalid && 'sve-radio-group--invalid', cls].filter(Boolean).join(' ')
	);
</script>

<RadioGroup.Root
	bind:value
	class={className}
	aria-invalid={invalid ? true : undefined}
	data-slot="radio-group"
	{...rest}
/>

<style>
	:global(.sve-radio-group) {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-2);
	}

	:global(.sve-radio-group[data-orientation='horizontal']) {
		flex-direction: row;
	}

	/*
		A ring rather than a border: these controls have no border to recolour, and
		colour alone is not a sufficient signal anyway — `Field` supplies the text.
	*/
	:global(.sve-radio-group--invalid) {
		outline: 2px solid var(--sve-color-danger);
		outline-offset: 2px;
		border-radius: var(--sve-radius-sm);
	}
</style>
