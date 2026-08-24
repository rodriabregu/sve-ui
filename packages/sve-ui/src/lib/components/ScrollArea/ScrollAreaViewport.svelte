<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsViewportProps = ComponentProps<typeof ScrollArea.Viewport>;

	interface Props extends Omit<BitsViewportProps, 'class'> {
		/** Extra classes merged onto the viewport. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- The real scroll container. Put the height constraint on Root, not here. -->
<ScrollArea.Viewport
	class={['sve-scroll-area__viewport', cls].filter(Boolean).join(' ')}
	data-slot="scroll-area-viewport"
	{children}
	{...rest}
/>

<style>
	:global(.sve-scroll-area__viewport) {
		width: 100%;
		height: 100%;
	}
</style>
