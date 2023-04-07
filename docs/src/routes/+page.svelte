<svelte:head>
	<title>Sve UI</title>
	<meta
		name="description"
		content="Svelte ui component 
		library for building fast and accessible web apps.
	"
	/>
</svelte:head>

<section>
	<h1>Create accessible Svelte apps fast <br /> with Sve-UI</h1>

	<article>
		<h2>Less code. More speed</h2>
		<span> Build fast and accessible web apps with Sve-UI.</span>

		<h2>Easy to use</h2>
		<span> Sve-UI is easy to use, easy to learn and intuitive.</span>
	</article>

	<a href="/docs">See the docs to start</a>
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

	h2 {
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 2.4rem;
	}

	span {
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 1.4rem;
	}

	article {
		margin-bottom: 8rem;
	}

	a {
		width: 40%;
		display: flex;
		justify-content: center;
		font-size: 1.4rem;
		border: 1px solid #ebedf1;
		border-radius: 4px;
		padding: 1rem;
	}
</style>
