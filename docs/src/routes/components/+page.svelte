<script lang="ts">
	import { Button, CodeExample } from 'sve-ui';
</script>

<svelte:head>
	<title>Components - SveUI</title>
	<meta name="description" content="Section with all Sve-UI UI components." />
</svelte:head>

<section class="flex flex-col items-center">
  <span class="text-blue-400 text-center mx-auto my-8">We're working in more and new componentes, soon...</span>

	<h1>Components</h1>


	<article>
		<span>{'<Button />'}</span>
		<span>A button component</span>
		<Button />

		<a href="/components/button">See code and examples</a>
	</article>

	<article>
		<span>{'<CodeExample />'}</span>
		<span>Code Example display</span>
		<CodeExample>{`import { CodeExample } from 'sve-ui';`}</CodeExample>

		<a href="/components/codeexample">See code and examples</a>
	</article>
</section>

<style>
	h1 {
		width: 100%;
		font-size: 3rem;
	}
	span {
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
