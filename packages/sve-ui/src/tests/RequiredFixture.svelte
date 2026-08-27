<script lang="ts">
	import Input from '$lib/components/Input/Input.svelte';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import Toggle from '$lib/components/Toggle/Toggle.svelte';
	import * as Checkbox from '$lib/components/Checkbox/index.js';
	import * as Select from '$lib/components/Select/index.js';

	interface Props {
		required?: boolean;
	}

	let { required = false }: Props = $props();

	let text = $state('');
	let checked = $state(false);
	let picked = $state('');
	let pressed = $state(false);
</script>

<Input aria-label="Name" bind:value={text} {required} />
<Checkbox.Root aria-label="Accept terms" bind:checked {required} />
<Slider value={40} max={100} thumbLabel="Volume" {required} />
<Select.Root type="single" bind:value={picked}>
	<Select.Trigger aria-label="Pick a fruit" {required}>Pick</Select.Trigger>
</Select.Root>
<Toggle aria-label="Bold" bind:pressed {required}>B</Toggle>
