<script>
	import '../app.pcss';
	import './styles.css';

	import { page } from "$app/stores";

	import Navbar from '../components/Navbar.svelte';
	import Sidebard from '../components/Sidebard.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />

	{#if $page.route.id !== '/'}
		<Sidebard />
	{/if}
	
	<main class="py-16 justify-center px-6">
		<slot />
	</main>

	<footer>
		<p>
			Site docs &amp; library under construction. See the npm package in
			<a class="text-blue-600" href="https://www.npmjs.com/package/sve-ui" target="_blank">npm Sve-UI</a>
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
