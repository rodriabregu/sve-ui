<script>
	import Button from '$lib/components/Button/Button.svelte';
	import DemoCode from '$lib/components/CodeExample/CodeExample.svelte';
</script>

<main class="page">
	<h1>Sve-UI</h1>

	<DemoCode>{`import { Button } from 'sve-ui'`}</DemoCode>

	<Button size="xsm" bg={'#d4d4d4'}>Click me</Button>
	<Button size="sm">Click me</Button>
	<Button size="md" color="red">Click me</Button>
	<Button size="xl" disabled>Click me</Button>
	<Button size="xxl" color="green">Click me</Button>
	<Button size="xxxl" onClick={() => alert('Alert for button')}>Click to alert</Button>
</main>

<style>
	.page {
		background: #5e5e5e;
		width: 100vw;
		height: 100vh;
		color: #fff;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
