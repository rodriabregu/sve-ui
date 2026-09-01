<script lang="ts">
	import Kbd from '$lib/components/Kbd/Kbd.svelte';

	interface Props {
		size?: 'sm' | 'md';
		label?: string;
		text?: string;
	}

	let { size, label, text = 'K' }: Props = $props();
</script>

<Kbd {size} {label}>{text}</Kbd>
