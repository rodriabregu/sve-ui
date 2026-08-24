<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsTitleProps = ComponentProps<typeof AlertDialog.Title>;

	interface Props extends Omit<BitsTitleProps, 'class'> {
		/** Extra classes merged onto the title. */
		class?: string;
	}

	let { class: cls, level, children, ...rest }: Props = $props();
</script>

<!--
  Required, not optional: Bits points the dialog's `aria-labelledby` at this
  element. Omit it and the alert dialog opens with no accessible name.
-->
<AlertDialog.Title
	class={['sve-alert-dialog-title', cls].filter(Boolean).join(' ')}
	{level}
	{children}
	{...rest}
/>

<style>
	:global(.sve-alert-dialog-title) {
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-lg);
		font-weight: var(--sve-font-weight-bold);
		line-height: var(--sve-line-height-tight);
		color: var(--sve-color-default-foreground);
		margin: 0 0 var(--sve-space-2);
	}
</style>
