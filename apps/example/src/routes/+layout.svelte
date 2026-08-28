<script lang="ts">
	import 'sve-ui/theme.css';
	import { Toast, Button } from 'sve-ui';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let dark = $state(false);

	/*
		The theme class goes on <body>, not on a wrapper: overlays portal to the
		body, so a class on an inner div never reaches them. The library documents
		this and it is the kind of thing an example should demonstrate rather than
		assume the reader read.
	*/
	$effect(() => {
		document.body.classList.toggle('dark', dark);
		document.body.classList.add('sve-theme');
	});
</script>

<Toast.Viewport position="bottom-right" />

<main>
	<header>
		<h1>Projects</h1>
		<Button variant="outline" onclick={() => (dark = !dark)}>
			{dark ? 'Light' : 'Dark'} theme
		</Button>
	</header>

	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		background: var(--sve-color-default-surface);
		color: var(--sve-color-default-foreground);
		font-family: var(--sve-font-family-sans);
	}

	main {
		max-width: 60rem;
		margin: 0 auto;
		padding: var(--sve-space-6);
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-6);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--sve-space-4);
	}

	h1 {
		margin: 0;
		font-size: var(--sve-font-size-xl);
	}
</style>
