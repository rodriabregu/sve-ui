<script lang="ts">
	import Field from '$lib/components/Field/Field.svelte';
	import Input from '$lib/components/Input/Input.svelte';

	interface Props {
		label?: string;
		description?: string;
		error?: string;
		required?: boolean;
		/** Render a control that ignores the props, to exercise the dev warning. */
		unwired?: boolean;
	}

	let { label = 'Email', description, error, required = false, unwired = false }: Props = $props();

	let value = $state('');
</script>

<Field {label} {description} {error} {required}>
	{#snippet control(props)}
		{#if unwired}
			<Input bind:value />
		{:else}
			<Input {...props} type="email" bind:value />
		{/if}
	{/snippet}
</Field>
