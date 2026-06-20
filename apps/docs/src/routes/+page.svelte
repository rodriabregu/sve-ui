<script>
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	// import FeatureCard from './components/cards/FeatureCard.svelte';

	// const FEATURES = [
	// 	{
	// 		icon: GithubIcon,
	// 		title: 'Fast',
	// 		description:
	// 			'Constructed using Tailwind CSS infrastructure, signifying absence of runtime style calculations and unnecessary class inclusions within your package.'
	// 	}
	// ];
</script>

<svelte:head>
	<title>SveUI - Fast and modern Svelte UI library</title>
	<meta
		name="description"
		content="Boost your Svelte development with our powerful and easy-to-use library of reusable UI components. With a wide range of customizable options, including responsive design and support for popular CSS frameworks, our library helps you streamline your development process and create stunning web applications with ease. All this with Sve-UI."
	/>
</svelte:head>

<main class="flex flex-col items-center gap-16">
	<section class="flex items-center gap-64">
		<h1 class="text-5xl">
			Make <span class="text-blue-400">beautiful</span> and easily websites. <br /> With <span class="text-blue-600">SveUI</span>.
		</h1>

		<!-- <article class="flex flex-col gap-16">
			<div>
				<h2>Less code. More speed</h2>
				<span> Build fast and accessible web apps with Sve-UI.</span>
			</div>

			<div>
				<h2>Easy to use</h2>
				<span> Sve-UI is easy to use, easy to learn and intuitive.</span>
			</div>
		</article> -->
	</section>

	<article class="flex flex-col gap-2 my-20">
	<span class="
		text-2xl
		text-center
		bg-blue-600
		rounded-full
		px-6
		py-2
	">New version coming soon...</span>

	<p class="
		text-center
		text-lg
		font-light
		max-w-2xl
		text-gray-300
	">
		We are working on a new version of SveUI. It'll be a complete redesign of the library, with new components and a new API. We are also working on a new documentation and a new website. As this type of project deserves.
		<span class="
			block
			text-gray-400
			font-normal
			text-sm
			mt-2
		">Stay tuned for more updates.</span>
	</p>
</article>

	<section class="flex gap-4">
		<a
			href="/docs"
			class="bg-blue-600 text-white text-xl font-light rounded-full mt-8 transition duration-300 hover:bg-blue-700 px-6 py-2"
			>Get started</a
		>

		<a
			href="https://github.com/rodriabregu/sve-ui"
			class="
		flex gap-2 items-center bg-gray-800 text-white text-xl font-light rounded-full mt-8 transition duration-300 hover:bg-gray-700 px-6 py-2
		"
			target="_blank"
		>
			<GithubIcon size={24} />
			Github
		</a>
	</section>

	<!-- <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
		{#each FEATURES as { icon, title, description }}
			<FeatureCard {icon} {title} {description} />
		{/each}
	</section> -->
</main>

<style>
	h1 {
		width: 100%;
		font-size: 3rem;
	}
</style>
