<script lang="ts">
	import { Select } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type BitsTriggerProps = ComponentProps<typeof Select.Trigger>;

	interface Props extends Omit<BitsTriggerProps, 'class' | 'children'> {
		/**
		 * Marks the control as failing validation.
		 *
		 * Always applies the invalid styling. Does NOT set `aria-invalid`: this renders as `button`, and ARIA does not
		 * support the attribute there, so assistive technology is free to ignore it.
		 * axe does NOT flag it either way — verified by injecting it and watching the
		 * suite still pass — so this is a decision taken from the spec, not one a
		 * tool enforces. The accessible signal comes
		 * from `Field` wiring the error message through `aria-describedby`.
		 *
		 * Prefer letting `Field` drive this: passing `Field` an `error` is what makes
		 * a field invalid, so the message the user reads and the state of the control
		 * cannot disagree.
		 * @default false
		 */
		invalid?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { invalid = false, class: cls, children, ...rest }: Props = $props();

	const className = $derived(
		['sve-select__trigger', invalid && 'sve-select__trigger--invalid', cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<Select.Trigger class={className} data-slot="select-trigger" {...rest}>
	<span class="sve-select__trigger-value">{@render children?.()}</span>
	<svg
		class="sve-select__trigger-icon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
</Select.Trigger>

<style>
	:global(.sve-select__trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--sve-space-2);
		width: 100%;
		min-height: 2.5rem;
		padding: var(--sve-space-2) var(--sve-space-3);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		color: var(--sve-color-default-foreground);
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-md);
		cursor: pointer;
		text-align: left;
	}

	:global(.sve-select__trigger:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 1px;
		border-color: var(--sve-color-primary-border);
	}

	:global(.sve-select__trigger:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.sve-select__trigger-value) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.sve-select__trigger-icon) {
		width: 1.1rem;
		height: 1.1rem;
		flex-shrink: 0;
		opacity: 0.6;
	}

	/* Colour is never the only signal: `Field` supplies the message that says why. */
	:global(.sve-select__trigger--invalid) {
		border-color: var(--sve-color-danger);
	}

	:global(.sve-select__trigger--invalid:focus-visible) {
		outline-color: var(--sve-color-danger);
	}
</style>
