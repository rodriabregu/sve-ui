<script>
	import Box from '$lib/components/Box/Box.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Center from '$lib/components/Center/Center.svelte';
	import Circle from '$lib/components/Circle/Circle.svelte';
	import CodeExample from '$lib/components/CodeExample/CodeExample.svelte';
	import Flex from '$lib/components/Flex/Flex.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
</script>

<main>
	<Center>
		<Box />
		<Circle bg={'red'} size={'10rem'}>Hola</Circle>
		<CodeExample>{`import { Button } from 'sve-ui'`}</CodeExample>

		<Flex p={1} dir="column">
			<Button size="xsm" bg={'#d4d4d4'}>Click me</Button>
			<Button size="sm">Click me</Button>
			<Button size="md" color="red">Click me</Button>
			<Button size="xl" disabled>Click me</Button>
			<Spacer size={10} />
			<Button size="xxl" color="green">Click me</Button>
			<Spacer size={10} />
			<Button size="xxxl" onClick={() => alert('Alert for button')}>Click to alert</Button>
		</Flex>
	</Center>
</main>

<style>
	main {
		background-color: black;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
