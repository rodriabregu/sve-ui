<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof NavigationMenu.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value'> {
		/** Which menu is open, by its Item value. Bindable. */
		value?: string;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	// `value` must be destructured and passed as `bind:value`. Forwarding it in
	// the spread makes it one-way, so opening a menu would not reach the caller.
	let { value = $bindable(''), class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits renders a <nav> landmark, so pass `aria-label` to distinguish it from
  other navs on the page.

  Unlike a menubar, triggers here open on hover after `delayDuration` AND on
  click or Enter, so the menu is reachable by keyboard and touch. That is why
  this is the right choice for site navigation and a menubar is not.
-->
<NavigationMenu.Root
	bind:value
	class={['sve-nav-menu', cls].filter(Boolean).join(' ')}
	data-slot="navigation-menu"
	{children}
	{...rest}
/>

<style>
	:global(.sve-nav-menu) {
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: var(--sve-font-family-sans);
	}
</style>
