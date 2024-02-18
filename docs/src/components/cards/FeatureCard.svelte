<script lang="ts">
	export let icon: ConstructorOfATypedSvelteComponent;
	export let title = '';
	export let description = '';
</script>

<div class="bg-gray-800 bg-opacity-60 p-4 rounded-md flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<div class="bg-purple-900 p-2 rounded-full"><svelte:component this={icon} /></div>

		<span class="text-xl font-bold">{title} <br /></span>
	</div>

	{description}
</div>
