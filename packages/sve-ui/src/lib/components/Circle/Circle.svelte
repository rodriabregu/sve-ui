<script>
	import Square from '../Square/Square.svelte';

	export let size = '1rem';
</script>

<Square {size} borderRadius="100%" {...$$restProps}>
	<slot />
</Square>
