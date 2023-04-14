<script lang="ts">
	import Box from '../Box/Box.svelte';

	export let width = '100%';
	export let height = '100%';
</script>

<Box
	display={'flex'}
	justifyContent={'center'}
	alignItems={'center'}
	{width}
	{height}
	{...$$restProps}
>
	<slot />
</Box>
