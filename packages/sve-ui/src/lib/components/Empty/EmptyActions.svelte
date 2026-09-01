<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
		children: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-empty__actions', cls].filter(Boolean).join(' '));
</script>

<div class={className} {...rest}>
	{@render children()}
</div>

<style>
	.sve-empty__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--sve-space-2);
		margin-top: var(--sve-space-1);
	}
</style>
