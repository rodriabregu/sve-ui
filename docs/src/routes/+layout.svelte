<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="py-16">
		<slot />
	</main>

	<footer>
		<p>
			Site docs &amp; library under construction. See the npm package in
			<a href="https://www.npmjs.com/package/sve-ui" target="_blank">npm Sve-UI</a>
		</p>
	</footer>
</div>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
