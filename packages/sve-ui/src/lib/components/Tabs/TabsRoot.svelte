<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof Tabs.Root>;

	interface Props extends Omit<BitsRootProps, 'class'> {
		class?: string;
	}

	/*
		The `''` default matches Bits and is load-bearing. With a bare `$bindable()`
		a consumer who renders this without a value binds `undefined` into a child
		prop that HAS a fallback, and Svelte throws `props_invalid_value` — which
		takes down the whole page, not just the control.
	*/
	let { value = $bindable(''), class: cls, ...rest }: Props = $props();

	const className = $derived(['sve-tabs', cls].filter(Boolean).join(' '));
</script>

<Tabs.Root bind:value class={className} data-slot="tabs" {...rest} />

<style>
	:global(.sve-tabs) {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-3);
		font-family: var(--sve-font-family-sans);
	}

	:global(.sve-tabs[data-orientation='vertical']) {
		flex-direction: row;
	}
</style>
