<script lang="ts">
	import { Menubar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsTriggerProps = ComponentProps<typeof Menubar.Trigger>;

	interface Props extends Omit<BitsTriggerProps, 'class'> {
		/** Extra classes merged onto the trigger. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Bits wires aria-haspopup and aria-expanded, plus data-state open/closed. -->
<Menubar.Trigger
	class={['sve-menubar__trigger', cls].filter(Boolean).join(' ')}
	data-slot="menubar-trigger"
	{children}
	{...rest}
/>

<style>
	:global(.sve-menubar__trigger) {
		display: inline-flex;
		align-items: center;
		height: 2rem;
		padding: 0 var(--sve-space-3);
		border: none;
		border-radius: var(--sve-radius-sm);
		background-color: transparent;
		font-family: inherit;
		font-size: var(--sve-font-size-sm);
		font-weight: var(--sve-font-weight-medium);
		color: var(--sve-color-default-foreground);
		cursor: default;
		transition: background-color 0.15s ease;
	}

	:global(.sve-menubar__trigger:hover) {
		background-color: var(--sve-color-default);
	}

	/* Keep the trigger highlighted while its menu is open, so it is obvious
     which of several menus you are looking at. */
	:global(.sve-menubar__trigger[data-state='open']) {
		background-color: var(--sve-color-primary-surface);
		color: var(--sve-color-primary);
	}

	:global(.sve-menubar__trigger:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: -2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-menubar__trigger) {
			transition: none;
		}
	}
</style>
