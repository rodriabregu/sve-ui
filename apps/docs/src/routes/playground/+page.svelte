<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import {
		Busy,
		Button,
		Field,
		Input,
		Select,
		Spinner,
		Table,
		Toast,
		toast,
		focusFirstInvalidField
	} from 'sve-ui';

	/*
		A whole FLOW, which is the thing the component pages cannot show. Each of
		them demonstrates one component in isolation; none of them shows what happens
		when a submit fails, where focus goes, and what gets announced.

		Deliberately not the same artifact as `apps/example`. That one is a consumer
		smoke test — it exists to break the build when the public API breaks. This one
		exists to be clicked by someone deciding whether to install anything.
	*/

	interface Row {
		id: string;
		name: string;
		owner: string;
		budget: number;
	}

	const OWNERS = ['Ana', 'Bruno', 'Carla'];
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	let rows = $state<Row[]>([]);
	let loading = $state(false);
	let loadedOnce = $state(false);

	let formEl = $state<HTMLFormElement>();
	let name = $state('');
	let owner = $state('');
	let budget = $state('');
	let errors = $state<{ name?: string; owner?: string; budget?: string }>({});
	let saving = $state(false);

	type Dir = 'none' | 'asc' | 'desc';
	let sort = $state<Dir>('none');
	const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
	const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

	const sorted = $derived(
		sort === 'none'
			? rows
			: [...rows].sort((a, b) => (sort === 'asc' ? 1 : -1) * collator.compare(a.name, b.name))
	);

	async function load() {
		loading = true;
		await sleep(1100);
		rows = [
			{ id: 'p1', name: 'Atlas migration', owner: 'Ana', budget: 42000 },
			{ id: 'p2', name: 'Billing rewrite', owner: 'Bruno', budget: 18500 }
		];
		loading = false;
		loadedOnce = true;
	}

	/** Server-shaped validation: it runs after a round trip, not on keystroke. */
	async function submit(event: SubmitEvent) {
		event.preventDefault();
		saving = true;
		errors = {};
		await sleep(700);

		const next: typeof errors = {};
		if (name.trim().length < 3) next.name = 'Use at least three characters.';
		else if (rows.some((r) => r.name.toLowerCase() === name.trim().toLowerCase())) {
			next.name = 'A project with that name already exists.';
		}
		if (!owner) next.owner = 'Pick an owner.';
		const amount = Number(budget);
		if (!budget || Number.isNaN(amount) || amount <= 0) {
			next.budget = 'Enter an amount greater than zero.';
		}

		saving = false;

		if (Object.keys(next).length > 0) {
			errors = next;
			// The library's own guidance, and the library's own helper.
			await focusFirstInvalidField({ root: formEl });
			return;
		}

		rows = [...rows, { id: `p${rows.length + 1}`, name: name.trim(), owner, budget: amount }];
		toast.success('Project created', { description: name.trim() });
		name = '';
		owner = '';
		budget = '';
	}
</script>

<Seo
	title="Svelte Theme Playground — Sve·UI"
	description="Try the Sve·UI Svelte component library live: tune the --sve-* CSS variables, switch light and dark, and copy the theme straight into your project."
/>

<Toast.Viewport position="bottom-right" />

<div class="wrap">
	<header>
		<h1>Playground</h1>
		<p>
			The component pages each show one component. This shows a whole flow — the part you cannot see
			from a props table: what happens when a submit fails, where focus lands, and what a screen
			reader is told while a request is in flight.
		</p>
		<p class="hint">
			Submit the form empty. Then try a name that already exists. Then load the table and watch the
			button.
		</p>
	</header>

	<section>
		<h2>A form with server-side errors</h2>
		<form bind:this={formEl} onsubmit={submit} novalidate>
			<Field label="Name" description="Shown in the list below." error={errors.name} required>
				{#snippet control(props)}
					<Input {...props} bind:value={name} placeholder="Atlas migration" />
				{/snippet}
			</Field>

			<Field label="Owner" error={errors.owner} required>
				{#snippet control(props)}
					<Select.Root type="single" bind:value={owner}>
						<Select.Trigger {...props} invalid={errors.owner !== undefined}>
							{owner || 'Pick an owner'}
						</Select.Trigger>
						<Select.Content>
							{#each OWNERS as person (person)}
								<Select.Item value={person} label={person}>{person}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Field>

			<Field label="Budget" description="US dollars." error={errors.budget} required>
				{#snippet control(props)}
					<Input {...props} bind:value={budget} inputmode="numeric" placeholder="42000" />
				{/snippet}
			</Field>

			<Button type="submit" color="primary" loading={saving} loadingLabel="Creating the project">
				Create project
			</Button>
		</form>
	</section>

	<section>
		<h2>A table that has to be fetched</h2>
		<Button variant="outline" onclick={load} {loading} loadingLabel="Loading projects">
			{loadedOnce ? 'Reload' : 'Load'} projects
		</Button>

		<Busy busy={loading} label="Loading projects" doneLabel={`${rows.length} projects loaded`}>
			{#if loading}
				<div class="loading"><Spinner /><span>Loading projects…</span></div>
			{:else if rows.length > 0}
				<Table.Root scrollLabel="Projects, scrollable" zebra>
					<Table.Caption>Projects</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head sortable {sort} onSortChange={(d) => (sort = d)}>Name</Table.Head>
							<Table.Head>Owner</Table.Head>
							<Table.Head numeric>Budget</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each sorted as row (row.id)}
							<Table.Row>
								<Table.RowHeader>{row.name}</Table.RowHeader>
								<Table.Cell>{row.owner}</Table.Cell>
								<Table.Cell numeric>{money.format(row.budget)}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{:else}
				<p class="hint">Nothing loaded yet.</p>
			{/if}
		</Busy>
	</section>
</div>

<style>
	.wrap {
		max-width: 46rem;
		margin: 0 auto;
		padding: 40px 28px 80px;
		display: flex;
		flex-direction: column;
		gap: 40px;
		color: var(--doc-fg);
	}

	h1 {
		margin: 0 0 10px;
		font-size: 34px;
		font-weight: 800;
		letter-spacing: -0.03em;
	}

	h2 {
		margin: 0 0 16px;
		font-size: 19px;
		font-weight: 700;
	}

	p {
		margin: 0 0 10px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}

	.hint {
		font-size: 13px;
		color: var(--doc-fg-subtle);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 18px;
		align-items: flex-start;
		max-width: 24rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		align-items: flex-start;
	}

	.loading {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--doc-fg-muted);
	}
</style>
