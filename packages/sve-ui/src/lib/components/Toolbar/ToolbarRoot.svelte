<script lang="ts">
	import { Toolbar } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof Toolbar.Root>;

	interface Props extends Omit<BitsRootProps, 'class'> {
		/** Extra classes merged onto the toolbar. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits owns `role="toolbar"` plus roving focus, so the whole toolbar is ONE tab
  stop and arrow keys move between controls. That is the point of using it over
  a row of buttons: a twelve-button toolbar costs the keyboard user one Tab, not
  twelve.

  Give it a name with `aria-label` — "Formatting", "Actions" — otherwise the
  toolbar is announced with no indication of what it controls.
-->
<Toolbar.Root
	class={['sve-toolbar', cls].filter(Boolean).join(' ')}
	data-slot="toolbar"
	{children}
	{...rest}
/>

<style>
	:global(.sve-toolbar) {
		display: flex;
		align-items: center;
		gap: var(--sve-space-1);
		padding: var(--sve-space-1);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: var(--sve-color-default-surface);
		font-family: var(--sve-font-family-sans);
	}

	:global(.sve-toolbar[data-orientation='vertical']) {
		flex-direction: column;
		align-items: stretch;
	}
</style>
