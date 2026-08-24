<script lang="ts">
	import { Command } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsLoadingProps = ComponentProps<typeof Command.Loading>;

	interface Props extends Omit<BitsLoadingProps, 'class'> {
		/** Extra classes merged onto the loading region. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  For async results. Show this instead of Empty while a request is in flight —
  "no results" and "still loading" are different answers, and conflating them
  tells the user to stop typing when they should wait.
-->
<Command.Loading
	class={['sve-command__loading', cls].filter(Boolean).join(' ')}
	data-slot="command-loading"
	{children}
	{...rest}
/>

<style>
	:global(.sve-command__loading) {
		padding: var(--sve-space-6) var(--sve-space-4);
		text-align: center;
		font-size: var(--sve-font-size-sm);
		opacity: 0.6;
	}
</style>
