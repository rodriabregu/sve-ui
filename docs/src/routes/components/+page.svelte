<script lang="ts">
	import { Button } from 'sve-ui';
</script>

<svelte:head>
	<title>Components - Sve-UI</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<section>
	<h1>Components</h1>

	<article>
		<span>{'<Button />'}</span>
		<span>A button component</span>
		<Button />

		<a href="/components/button">See code and examples</a>
	</article>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		width: 100%;
		font-size: 3rem;
	}

	span {
		/* width: 100%; */
		font-size: 1.4rem;
	}

	article {
		margin-bottom: 4rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
