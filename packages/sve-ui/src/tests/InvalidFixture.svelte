<script lang="ts">
	import * as Checkbox from '$lib/components/Checkbox/index.js';
	import * as Switch from '$lib/components/Switch/index.js';
	import * as RadioGroup from '$lib/components/RadioGroup/index.js';
	import * as Combobox from '$lib/components/Combobox/index.js';
	import * as RatingGroup from '$lib/components/RatingGroup/index.js';
	import * as Select from '$lib/components/Select/index.js';
	import * as PinInput from '$lib/components/PinInput/index.js';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import Toggle from '$lib/components/Toggle/Toggle.svelte';

	interface Props {
		invalid?: boolean;
	}

	let { invalid = false }: Props = $props();

	let checkboxOn = $state(false);
	let switchOn = $state(false);
	let radioValue = $state('a');
	let comboValue = $state('');
	let rating = $state(3);
	let selectValue = $state('');
	let pin = $state('');
	let pressed = $state(false);
</script>

<Checkbox.Root aria-label="Accept terms" bind:checked={checkboxOn} {invalid} />

<Switch.Root aria-label="Enable notifications" bind:checked={switchOn} {invalid} />

<RadioGroup.Root bind:value={radioValue} aria-label="Density" {invalid}>
	<RadioGroup.Item value="a" aria-label="Comfortable" />
</RadioGroup.Root>

<Combobox.Root type="single" bind:value={comboValue}>
	<Combobox.Input aria-label="Search fruit" {invalid} />
</Combobox.Root>

<RatingGroup.Root
	bind:value={rating}
	max={5}
	aria-label="Rating"
	aria-valuetext={(v, max) => `${v} of ${max} stars`}
	{invalid}
>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<RatingGroup.Item index={item.index}>*</RatingGroup.Item>
		{/each}
	{/snippet}
</RatingGroup.Root>

<Select.Root type="single" bind:value={selectValue}>
	<Select.Trigger aria-label="Pick a fruit" {invalid}>Pick a fruit</Select.Trigger>
</Select.Root>

<PinInput.Root bind:value={pin} maxlength={3} {invalid}>
	{#snippet children({ cells })}
		{#each cells as cell, i (i)}
			<PinInput.Cell {cell} />
		{/each}
	{/snippet}
</PinInput.Root>

<Slider value={40} max={100} thumbLabel="Volume" {invalid} />

<Toggle bind:pressed aria-label="Bold" {invalid}>B</Toggle>
