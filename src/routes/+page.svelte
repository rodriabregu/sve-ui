<script>
	import Button from '$lib/components/Button/Button.svelte';
	import CodeExample from '$lib/components/CodeExample/CodeExample.svelte';
</script>

<main>
	<h1>Sve-UI</h1>

	<CodeExample>{`import { Button } from 'sve-ui'`}</CodeExample>

	<Button size="xsm" bg={'#d4d4d4'}>Click me</Button>
	<Button size="sm">Click me</Button>
	<Button size="md" color="red">Click me</Button>
	<Button size="xl" disabled>Click me</Button>
	<Button size="xxl" color="green">Click me</Button>
	<Button size="xxxl" onClick={() => alert('Alert for button')}>Click to alert</Button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
