<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/** Extra classes merged onto the footer. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Fixed region; it does not scroll with the Content between them. -->
<footer
	class={['sve-sidebar__footer', cls].filter(Boolean).join(' ')}
	data-slot="sidebar-footer"
	{...rest}
>
	{@render children?.()}
</footer>

<style>
	.sve-sidebar__footer {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
		padding: var(--sve-space-3);
		min-height: 3.5rem;
		border-top: 1px solid var(--sve-color-default-border);
		margin-top: auto;
	}
</style>
