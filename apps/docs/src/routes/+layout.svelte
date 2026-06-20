<script>
	import '../app.pcss';
	import './styles.css';

	import Navbar from '../components/Navbar.svelte';
	import Sidebard from '../components/Sidebar/Sidebard.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col min-h-screen relative">
	<Navbar />

	<Sidebard />
	
	<main class={`py-16 justify-center items-left flex-grow px-6 ${ $page.route.id === '/' ? '' : 'lg:pl-80'}`}>
		<slot />
	</main>

	<footer class="absolute bottom-0 w-full">
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
