<script lang="ts">
	import {
		Accordion,
		AspectRatio,
		Badge,
		Button,
		Card,
		Carousel,
		Collapsible,
		Combobox,
		Command,
		ContextMenu,
		Empty,
		Flex,
		Heading,
		Input,
		InputGroup,
		Kbd,
		LinkPreview,
		Menubar,
		NavigationMenu,
		Pagination,
		Popover,
		Resizable,
		ScrollArea,
		Sheet,
		Skeleton,
		Stack,
		Text,
		Textarea,
		Toolbar,
		toast
	} from 'sve-ui';
	import { assetOwners, listAssets, type Asset } from '$lib/api';

	const PER_PAGE = 8;

	let page = $state(1);
	let owner = $state<string>('');
	let ownerQuery = $state('');
	let rows = $state<Asset[]>([]);
	let total = $state(0);
	let loading = $state(true);

	let search = $state('');

	// Filtering in the browser on purpose: this is what turns a populated list
	// into an empty one WITHOUT a page load, which is the exact case
	// `Empty.Root announce` exists for.
	let visible = $derived(
		search.trim()
			? rows.filter((r) => r.title.toLowerCase().includes(search.trim().toLowerCase()))
			: rows
	);

	let paletteOpen = $state(false);
	let paletteQuery = $state('');
	let marks = $state<string[]>([]);
	let columns = $state({ owner: true, updated: true });
	let note = $state('');
	let selected = $state<Asset | null>(null);

	/*
		Refetches on page or owner change. The 800ms is deliberate: a screen that
		resolves synchronously never shows whether the loading state is any good.
	*/
	$effect(() => {
		const p = page;
		const o = owner;
		let stale = false;
		loading = true;
		listAssets({ page: p, perPage: PER_PAGE, owner: o || undefined }).then((res) => {
			if (stale) return;
			rows = res.rows;
			total = res.total;
			loading = false;
		});
		return () => {
			stale = true;
		};
	});

	const filteredOwners = $derived(
		assetOwners.filter((o) => o.toLowerCase().includes(ownerQuery.toLowerCase()))
	);

	const COMMANDS = [
		{ value: 'new-doc', label: 'New document' },
		{ value: 'new-sheet', label: 'New spreadsheet' },
		{ value: 'import', label: 'Import from Drive' },
		{ value: 'trash', label: 'Open trash' }
	];

	function run(label: string) {
		paletteOpen = false;
		toast(`${label} — not wired up in the example`);
	}
</script>

<svelte:head><title>Browse — sve-ui example</title></svelte:head>

<Menubar.Root>
	<Menubar.Menu value="file">
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item onSelect={() => (paletteOpen = true)}>Open palette…</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onSelect={() => run('Export')}>Export</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu value="view">
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item onSelect={() => (page = 1)}>Back to first page</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>

<Heading level={1} size="lg">Files</Heading>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Related</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<Stack gap={2}>
					<NavigationMenu.Link href="/">Projects</NavigationMenu.Link>
					<NavigationMenu.Link href="/booking">Booking</NavigationMenu.Link>
				</Stack>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
	<NavigationMenu.Viewport />
</NavigationMenu.Root>

<Toolbar.Root aria-label="File actions">
	<Toolbar.Group type="multiple" bind:value={marks} aria-label="Density">
		<Toolbar.GroupItem value="compact" aria-label="Compact rows">Compact</Toolbar.GroupItem>
		<Toolbar.GroupItem value="grid" aria-label="Grid preview">Grid</Toolbar.GroupItem>
	</Toolbar.Group>
	<Toolbar.Button onclick={() => (paletteOpen = true)} aria-keyshortcuts="Meta+K">
		Command palette
		<Kbd size="sm" label="Command">&#8984;</Kbd><Kbd size="sm">K</Kbd>
	</Toolbar.Button>
	<Toolbar.Link href="/security">Security</Toolbar.Link>
</Toolbar.Root>

<!--
  Several slides visible at once, which is the case that catches a carousel
  disabling its controls from the slide index: the last index is reachable while
  there is still track to scroll.
-->
<Carousel.Root label="Recent files" style="--sve-carousel-slide-size: 45%;">
	<Carousel.Viewport>
		{#each rows.slice(0, 6) as row (row.id)}
			<Carousel.Slide label={row.title}>
				<Card.Root>
					<Card.Content>
						<Text size="sm">{row.title}</Text>
						<Badge color="secondary">{row.kind}</Badge>
					</Card.Content>
				</Card.Root>
			</Carousel.Slide>
		{/each}
	</Carousel.Viewport>
	<div class="shelf-controls">
		<Carousel.Previous />
		<Carousel.Next />
	</div>
</Carousel.Root>

<div class="search">
	<InputGroup.Root>
		<InputGroup.Addon>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
			</svg>
		</InputGroup.Addon>
		<Input bind:value={search} placeholder="Filter by title" aria-label="Filter assets by title" />
		{#if search}
			<Button variant="ghost" onclick={() => (search = '')}>Clear</Button>
		{/if}
	</InputGroup.Root>
</div>

<Flex gap={4} wrap>
	<div class="filter">
		<Combobox.Root type="single" bind:value={owner}>
			<Combobox.Input
				placeholder="Filter by owner"
				aria-label="Filter by owner"
				oninput={(e) => (ownerQuery = e.currentTarget.value)}
			/>
			<Combobox.Content>
				{#each filteredOwners as o (o)}
					<Combobox.Item value={o} label={o}>{o}</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Root>
	</div>

	<Popover.Root>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline">Columns</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content>
			<Stack gap={2}>
				<label><input type="checkbox" bind:checked={columns.owner} /> Owner</label>
				<label><input type="checkbox" bind:checked={columns.updated} /> Updated</label>
			</Stack>
		</Popover.Content>
	</Popover.Root>

	{#if owner}
		<Button variant="ghost" onclick={() => ((owner = ''), (page = 1))}>Clear filter</Button>
	{/if}
</Flex>

<Collapsible.Root>
	<Collapsible.Trigger>Advanced filters</Collapsible.Trigger>
	<Collapsible.Content>
		<Stack gap={2}>
			<Text size="sm">
				Nothing here is wired to the stub — the point is that the panel is hidden from assistive
				technology while collapsed, which only a real toggle demonstrates.
			</Text>
			<Textarea
				bind:value={note}
				rows={3}
				placeholder="Notes about this view"
				aria-label="View notes"
			/>
		</Stack>
	</Collapsible.Content>
</Collapsible.Root>

<Card.Root>
	<Card.Header>
		<Heading level={2} size="md">
			{total} file{total === 1 ? '' : 's'}{owner ? ` owned by ${owner}` : ''}
		</Heading>
	</Card.Header>
	<Card.Content>
		<!--
			role="status" + aria-busy on the region that owns the rows: the Skeleton is
			aria-hidden by design, so without this the swap is silent.
		-->
		<Resizable.Group style="height: 20rem;">
			<Resizable.Pane min={35}>
				<div role="status" aria-busy={loading} aria-label="File list">
					<ScrollArea.Root type="auto" style="height: 20rem;">
						<ScrollArea.Viewport>
							{#if loading}
								<Stack gap={3}>
									{#each Array.from({ length: PER_PAGE }, (_, i) => i) as i (i)}
										<Skeleton height="2.5rem" />
									{/each}
								</Stack>
							{:else if visible.length === 0}
								<Empty.Root announce>
									<Empty.Title>No assets match "{search}"</Empty.Title>
									<Empty.Description
										>Try a shorter search term, or clear the filter.</Empty.Description
									>
									<Empty.Actions>
										<Button variant="outline" onclick={() => (search = '')}>Clear filter</Button>
									</Empty.Actions>
								</Empty.Root>
							{:else}
								<ul>
									{#each visible as row (row.id)}
										<li>
											<ContextMenu.Root>
												<ContextMenu.Trigger>
													{#snippet child({ props })}
														<div {...props} class="row">
															<div class="thumb">
																<AspectRatio ratio={4 / 3}>
																	<div class="thumb-fill">{row.kind.slice(0, 1).toUpperCase()}</div>
																</AspectRatio>
															</div>
															<div class="row-main">
																<Text>{row.title}</Text>
																{#if columns.owner}
																	<LinkPreview.Root>
																		<LinkPreview.Trigger href="/">{row.owner}</LinkPreview.Trigger>
																		<LinkPreview.Content>
																			<Text size="sm">{row.owner} owns {row.kind} files.</Text>
																		</LinkPreview.Content>
																	</LinkPreview.Root>
																{/if}
															</div>
															{#if columns.updated}
																<Badge color="secondary">{row.updated}</Badge>
															{/if}
														</div>
													{/snippet}
												</ContextMenu.Trigger>
												<ContextMenu.Content>
													<ContextMenu.Item onSelect={() => (selected = row)}
														>Select</ContextMenu.Item
													>
													<ContextMenu.Separator />
													<ContextMenu.Item onSelect={() => run(`Delete ${row.title}`)}>
														Delete
													</ContextMenu.Item>
												</ContextMenu.Content>
											</ContextMenu.Root>
										</li>
									{/each}
								</ul>
							{/if}
						</ScrollArea.Viewport>
						<ScrollArea.Scrollbar orientation="vertical">
							<ScrollArea.Thumb />
						</ScrollArea.Scrollbar>
					</ScrollArea.Root>
				</div>
			</Resizable.Pane>
			<Resizable.Handle index={0} label="Resize the file list" />
			<Resizable.Pane min={20}>
				<div class="detail">
					{#if selected}
						<Text size="sm">Selected: {selected.title}</Text>
						<Text size="sm">Owner: {selected.owner}</Text>
					{:else}
						<Empty.Root>
							<Empty.Title>Nothing selected</Empty.Title>
							<Empty.Description>Right-click a file and choose Select.</Empty.Description>
						</Empty.Root>
					{/if}
				</div>
			</Resizable.Pane>
		</Resizable.Group>
	</Card.Content>
	<Card.Footer>
		<Pagination.Root count={total} perPage={PER_PAGE} bind:page>
			{#snippet children({ pages })}
				<Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
				{#each pages as p (p.key)}
					{#if p.type === 'page'}
						<Pagination.Page page={p}>{p.value}</Pagination.Page>
					{/if}
				{/each}
				<Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
			{/snippet}
		</Pagination.Root>
	</Card.Footer>
</Card.Root>

<Accordion.Root type="single">
	<Accordion.Item value="why">
		<Accordion.Header>
			<Accordion.Trigger>Why this screen exists</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content>
			<Text size="sm">
				Two shipped bugs got past every test and every docs page because the example app never
				rendered the components that had them. This screen exists to render the rest.
			</Text>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="latency">
		<Accordion.Header>
			<Accordion.Trigger>About the latency</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content>
			<Text size="sm">Every fetch here waits 800ms so the loading state is visible.</Text>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

<Sheet.Root bind:open={paletteOpen}>
	<Sheet.Overlay />
	<Sheet.Content side="right" size="md">
		<Sheet.Title>Command palette</Sheet.Title>
		<Sheet.Description>Type to filter the available actions.</Sheet.Description>
		<Command.Root label="Command palette" bind:value={paletteQuery}>
			<Command.Input placeholder="Type a command" />
			<Command.Status label={(n) => (n === 1 ? '1 result' : `${n} results`)} />
			<Command.List aria-label="Commands">
				<Command.Viewport>
					<Command.Empty>No matching command.</Command.Empty>
					<Command.Group>
						<Command.GroupHeading>Create</Command.GroupHeading>
						<Command.GroupItems>
							{#each COMMANDS as c (c.value)}
								<Command.Item value={c.value} onSelect={() => run(c.label)}>
									{c.label}
								</Command.Item>
							{/each}
						</Command.GroupItems>
					</Command.Group>
				</Command.Viewport>
			</Command.List>
		</Command.Root>
	</Sheet.Content>
</Sheet.Root>

<style>
	.shelf-controls {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.detail {
		height: 100%;
		padding: 12px;
		overflow: auto;
	}

	.search {
		max-width: 26rem;
		margin-bottom: 12px;
	}

	.filter {
		min-width: 14rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-2);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--sve-space-3);
		padding: var(--sve-space-2);
		border-radius: var(--sve-radius-md);
	}

	.row:hover {
		background: var(--sve-color-default-surface-hover);
	}

	.row-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.thumb {
		width: 3rem;
		flex: none;
	}

	.thumb-fill {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		border-radius: var(--sve-radius-sm);
		background: var(--sve-color-secondary-surface);
		font-weight: 600;
	}
</style>
