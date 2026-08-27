<script lang="ts">
	import Field from '$lib/components/Field/Field.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import * as Select from '$lib/components/Select/index.js';

	interface Props {
		/** Error for the first (text) field. */
		nameError?: string;
		/** Error for the second (text) field. */
		emailError?: string;
		/** Error for the Select, whose trigger never gets aria-invalid. */
		fruitError?: string;
		/** Render the Select's control without spreading props, to break it. */
		unwired?: boolean;
	}

	let { nameError, emailError, fruitError, unwired = false }: Props = $props();

	let name = $state('');
	let email = $state('');
	let fruit = $state('');
</script>

<form data-testid="form">
	<Field label="Name" error={nameError}>
		{#snippet control(props)}
			<Input {...props} bind:value={name} />
		{/snippet}
	</Field>

	<Field label="Email" error={emailError}>
		{#snippet control(props)}
			<Input {...props} type="email" bind:value={email} />
		{/snippet}
	</Field>

	<Field label="Fruit" error={fruitError}>
		{#snippet control(props)}
			<Select.Root type="single" bind:value={fruit}>
				{#if unwired}
					<Select.Trigger>Pick</Select.Trigger>
				{:else}
					<Select.Trigger {...props} invalid={fruitError !== undefined}>Pick</Select.Trigger>
				{/if}
			</Select.Root>
		{/snippet}
	</Field>
</form>
