<script>
	import Flex from '../Flex/Flex.svelte';

	export let size = '1rem';
</script>

<Flex
	d="flex"
	align="center"
	justify="center"
	color={'white'}
	width={size}
	height={size}
	{...$$restProps}
>
	<slot />
</Flex>
