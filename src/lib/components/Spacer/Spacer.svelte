<script lang="ts">
	import Box from '../Box/Box.svelte';

	export let size = 1;
</script>

<Box width={`${size}rem`} height={`${size}rem`} {...$$restProps} />
