<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsGroupProps = ComponentProps<typeof DropdownMenu.Group>;

	interface Props extends Omit<BitsGroupProps, 'class'> {
		/** Extra classes merged onto the group. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Pair with MenuLabel so the group is named, not just visually clustered. -->
<DropdownMenu.Group
	class={['sve-menu-group', cls].filter(Boolean).join(' ')}
	data-slot="menu-group"
	{children}
	{...rest}
/>
