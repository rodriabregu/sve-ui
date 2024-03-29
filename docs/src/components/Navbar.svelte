<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { MOBILE_WIDTH_THRESHOLD } from '../constants';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import ToggleSidebar from './Sidebar/ToggleSidebar.svelte';

	export let links = [
		{ url: '/docs', text: 'Docs' },
		{ url: '/components', text: 'Components' }
	];

	let isMobile = false;

	function handleResize() {
		isMobile = window.innerWidth < MOBILE_WIDTH_THRESHOLD;
	}

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<nav class="navbar">
	<div class="flex items-center px-8 md:px-32 justify-between">
			<div class="flex items-center">
					<a href="/" class="logo">SveUI</a>

					<span class="text-xs uppercase font-light opacity-50 hidden md:block">V0.1.0</span>
			</div>

					<ul>
							{#each links as link}
									<li aria-current={$page.url.pathname === link.url ? 'page' : undefined}>
											<a href={link.url} class="navbar-item">{link.text}</a>
									</li>
							{/each}

							<a href="https://github.com/rodriabregu/sve-ui" target="_blank">
									<GithubIcon />
							</a>

							{#if isMobile}
									<ToggleSidebar />
							{/if}
					</ul>
	</div>
</nav>

<style>
	.logo {
		font-size: 2rem;
		font-weight: 10;
		color: #fff;
		text-transform: none;
	}
	.logo:hover {
		color: #d4d4d4;
	}

	.navbar {
		background-color: #25252550;
		backdrop-filter: blur(4px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		color: #fff;
		border-radius: 4px;
		width: 100%;
		position: fixed;
		z-index: 99;
	}

	.navbar-item {
		margin-right: 1rem;
		color: #fff;
		text-decoration: none;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: #0070f0;
	}
</style>
