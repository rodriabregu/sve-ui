<script lang="ts">
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import Button from '$lib/components/Button/Button.svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		label?: string;
		labelledby?: string;
	}

	let { orientation, label = 'Text alignment', labelledby }: Props = $props();
</script>

{#if labelledby}
	<span id={labelledby}>Alignment</span>
{/if}
<ButtonGroup {orientation} label={labelledby ? undefined : label} {labelledby}>
	<Button variant="outline">Left</Button>
	<Button variant="outline">Right</Button>
</ButtonGroup>
