<script lang="ts">
	import * as Resizable from '$lib/components/Resizable/index.js';

	interface Props {
		direction?: 'horizontal' | 'vertical';
		min?: number;
		max?: number;
		step?: number;
		panes?: number;
		/** Renders the Handle with no label, to prove the prop is not decoration. */
		omitLabel?: boolean;
	}

	let { direction, min = 10, max = 90, step, panes = 2, omitLabel = false }: Props = $props();
</script>

<Resizable.Group {direction}>
	{#if panes === 2}
		<Resizable.Pane {min} {max}>a</Resizable.Pane>
		{#if omitLabel}
			<Resizable.Handle index={0} {step} />
		{:else}
			<Resizable.Handle index={0} label="Resize sidebar" {step} />
		{/if}
		<Resizable.Pane {min} {max}>b</Resizable.Pane>
	{:else}
		<Resizable.Pane {min} {max}>a</Resizable.Pane>
		<Resizable.Handle index={0} label="Resize a" {step} />
		<Resizable.Pane {min} {max}>b</Resizable.Pane>
		<Resizable.Handle index={1} label="Resize b" {step} />
		<Resizable.Pane {min} {max}>c</Resizable.Pane>
	{/if}
</Resizable.Group>
