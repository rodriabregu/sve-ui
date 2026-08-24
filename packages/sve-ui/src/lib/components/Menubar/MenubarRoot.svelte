<script lang="ts">
	import { Menubar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof Menubar.Root>;

	interface Props extends Omit<BitsRootProps, 'class'> {
		/** Extra classes merged onto the menubar. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits owns `role="menubar"` plus the behaviour that makes a menubar a menubar:
  arrow keys move between top-level menus, and once one is open, hovering a
  sibling switches to it without a second click.

  Give it an `aria-label` — "Main" — so it is not announced as an unnamed menubar.
-->
<Menubar.Root
	class={['sve-menubar', cls].filter(Boolean).join(' ')}
	data-slot="menubar"
	{children}
	{...rest}
/>

<style>
	:global(.sve-menubar) {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: var(--sve-space-1);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: var(--sve-color-default-surface);
		font-family: var(--sve-font-family-sans);
	}
</style>
