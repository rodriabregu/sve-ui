<script lang="ts">
	import { onMount } from 'svelte';
	import { Center, Flex } from 'sve-ui';
	import { page } from '$app/stores';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';

	export let title = 'Sve-UI';
	export let links = [
		{ url: '/docs', text: 'Docs' },
		{ url: '/components', text: 'Components' }
	];

	let isMobile = false;

	function handleResize() {
		isMobile = window.innerWidth < 768;
	}

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleScroll() {
		const navbar = document.querySelector('.navbar');
		if (navbar) {
			if (window.pageYOffset > navbar.offsetTop) {
				navbar.classList.add('navbar-fixed');
			} else {
				navbar.classList.remove('navbar-fixed');
			}
		}
	}
</script>

<header>
	<nav class="navbar">
		<Center>
			<Flex align="center">
				<a href="/" class="logo">SveUI</a>

				<span class="text-xs uppercase font-light opacity-50 hidden md:block">V0.1.0</span>
			</Flex>

			<Flex align="center">
				<ul>
					{#each links as link}
						<li aria-current={$page.url.pathname === link.url ? 'page' : undefined}>
							<a href={link.url} class="navbar-item">{link.text}</a>
						</li>
					{/each}

					<a href="https://github.com/rodriabregu/sve-ui" target="_blank">
						<GithubIcon />
					</a>
				</ul>
			</Flex>
		</Center>
	</nav>
</header>

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
