<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Busy,
		Button,
		ButtonGroup,
		Empty,
		Field,
		Input,
		Select,
		Spinner,
		Table,
		toast,
		focusFirstInvalidField
	} from 'sve-ui';
	import { listProjects, createProject, type FieldErrors, type Project } from '$lib/api';

	let projects = $state<Project[]>([]);
	let loading = $state(true);

	let formEl = $state<HTMLFormElement>();
	let name = $state('');
	let owner = $state('');
	let budget = $state('');
	let errors = $state<FieldErrors>({});
	let saving = $state(false);

	// Sorting is the app's job — the library renders the control and sets
	// aria-sort, it does not reorder anything. That split is the whole reason
	// Table has no `columns` prop.
	type Dir = 'none' | 'asc' | 'desc';
	let sort = $state<Dir>('none');

	/*
		Sorting still belongs to the app — Table.Head only renders the button and
		sets aria-sort. These reset controls sit beside it as three INDEPENDENT
		actions, which is the ButtonGroup case: each keeps its own tab stop, and
		none of them represents a selected value.
	*/
	let onlyMine = $state(false);
	const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
	const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

	const sorted = $derived(
		sort === 'none'
			? projects
			: [...projects].sort((a, b) => (sort === 'asc' ? 1 : -1) * collator.compare(a.name, b.name))
	);

	const owners = ['Ana', 'Bruno', 'Carla'];

	onMount(async () => {
		projects = await listProjects();
		loading = false;
	});

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		saving = true;
		errors = {};

		const result = await createProject({ name, owner, budget });
		saving = false;

		if (!result.ok) {
			errors = result.errors;
			// The library's own guidance, and now the library's own helper.
			await focusFirstInvalidField({ root: formEl });
			return;
		}

		projects = [...projects, result.project];
		name = '';
		owner = '';
		budget = '';
		toast.success('Project created', { description: result.project.name });
	}
</script>

<section>
	<h2>New project</h2>

	<form bind:this={formEl} onsubmit={submit} novalidate>
		<Field label="Name" description="Shown in the project list." error={errors.name} required>
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
						{#each owners as person (person)}
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
	<h2>All projects</h2>

	<!--
	  `Busy` is here because writing this page is what proved it was missing. The
	  library had no way to say "this region is loading": Spinner is decorative,
	  and aria-busy existed on two components out of sixty. A screen reader user
	  got a second of silence and then a table, with no warning either way.
	-->
	<Busy busy={loading} label="Loading projects" doneLabel={`${projects.length} projects loaded`}>
		{#if loading}
			<!-- Visible half. The Spinner is aria-hidden inside the library: it is
			     decoration, and `Busy` above is what actually says anything. -->
			<div class="loading">
				<Spinner />
				<span>Loading projects…</span>
			</div>
		{:else if sorted.length === 0}
			<!-- Not announced: this is the first paint of an empty account, not a
			     change the user just caused. `announce` would interrupt the heading
			     above it. -->
			<Empty.Root>
				<Empty.Title level={3}>No projects yet</Empty.Title>
				<Empty.Description>Create your first project with the form above.</Empty.Description>
			</Empty.Root>
		{:else}
			<ButtonGroup label="Project list controls">
				<Button variant="outline" onclick={() => (sort = 'none')}>Reset sort</Button>
				<Button variant="outline" onclick={() => (onlyMine = !onlyMine)}>
					{onlyMine ? 'Show all' : 'Only mine'}
				</Button>
				<Button variant="outline" onclick={() => toast.success('Export queued')}>Export</Button>
			</ButtonGroup>

			<Table.Root scrollLabel="Projects, scrollable" zebra>
				<Table.Caption>All projects</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head sortable {sort} onSortChange={(d) => (sort = d)}>Name</Table.Head>
						<Table.Head>Owner</Table.Head>
						<Table.Head numeric>Budget</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each sorted as project (project.id)}
						<Table.Row>
							<Table.RowHeader>{project.name}</Table.RowHeader>
							<Table.Cell>{project.owner}</Table.Cell>
							<Table.Cell numeric>{money.format(project.budget)}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.RowHeader>Total</Table.RowHeader>
						<Table.Cell />
						<Table.Cell numeric>
							{money.format(projects.reduce((sum, p) => sum + p.budget, 0))}
						</Table.Cell>
					</Table.Row>
				</Table.Footer>
			</Table.Root>
		{/if}
	</Busy>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-4);
	}

	h2 {
		margin: 0;
		font-size: var(--sve-font-size-lg);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-4);
		align-items: flex-start;
		max-width: 26rem;
	}

	.loading {
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
		color: var(--sve-color-default-foreground);
		font-size: var(--sve-font-size-sm);
	}
</style>
