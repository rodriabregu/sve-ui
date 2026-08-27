<script lang="ts">
	import * as Command from '$lib/components/Command/index.js';

	interface Props {
		label?: (count: number) => string;
		delay?: number;
		/** Forwarded so the test can prove the caller's handler still runs. */
		onStateChange?: (state: { search: string }) => void;
	}

	let { label, delay, onStateChange }: Props = $props();

	let search = $state('');
	const fruit = ['apple', 'apricot', 'banana', 'cherry'];
</script>

<Command.Root label="Command palette" {onStateChange}>
	<Command.Input bind:value={search} placeholder="Search" />
	<Command.Status {label} {delay} />
	<Command.List aria-label="Fruit">
		<Command.Viewport>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group>
				<Command.GroupItems>
					{#each fruit as f (f)}
						<Command.Item value={f}>{f}</Command.Item>
					{/each}
				</Command.GroupItems>
			</Command.Group>
		</Command.Viewport>
	</Command.List>
</Command.Root>
