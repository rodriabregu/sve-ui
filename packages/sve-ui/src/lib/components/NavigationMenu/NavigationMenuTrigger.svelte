<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsTriggerProps = ComponentProps<typeof NavigationMenu.Trigger>;

	interface Props extends Omit<BitsTriggerProps, 'class'> {
		/** Extra classes merged onto the trigger. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Opens on hover after Root's `delayDuration`, and on click or Enter — so unlike
  a hover card this IS reachable by keyboard and touch. Bits wires aria-expanded
  and the data-state attribute.
-->
<NavigationMenu.Trigger
	class={['sve-navigation-menu__trigger', cls].filter(Boolean).join(' ')}
	data-slot="navigation-menu-trigger"
	{children}
	{...rest}
/>

<style>
	:global(.sve-navigation-menu__trigger) {
		display: inline-flex;
		align-items: center;
		gap: var(--sve-space-1);
		height: 2.25rem;
		padding: 0 var(--sve-space-3);
		border: none;
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-sm);
		font-weight: var(--sve-font-weight-medium);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.sve-navigation-menu__trigger:hover) {
		background-color: var(--sve-color-default-surface);
	}

	:global(.sve-navigation-menu__trigger[data-state='open']) {
		background-color: var(--sve-color-primary-surface);
		color: var(--sve-color-primary);
	}

	:global(.sve-navigation-menu__trigger:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-navigation-menu__trigger) {
			transition: none;
		}
	}
</style>
