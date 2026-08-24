<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsDescriptionProps = ComponentProps<typeof Dialog.Description>;

	interface Props extends Omit<BitsDescriptionProps, 'class'> {
		/** Extra classes merged onto the description. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<Dialog.Description
	class={['sve-sheet-description', cls].filter(Boolean).join(' ')}
	{children}
	{...rest}
/>

<style>
	:global(.sve-sheet-description) {
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-sm);
		line-height: var(--sve-line-height-relaxed);
		color: var(--sve-color-default-foreground);
		margin: 0;
		opacity: 0.75;
	}
</style>
