<script lang="ts">
	import { Empty, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.empty;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'actions', label: 'With actions' },
		{ id: 'announce', label: 'Announcing the change' },
		{ id: 'headings', label: 'Titles are not headings' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Empty } from 'sve-ui';
<\u002fscript>

<Empty.Root>
  <Empty.Title>No projects yet</Empty.Title>
  <Empty.Description>
    Projects you create will show up here.
  </Empty.Description>
</Empty.Root>`;

	const actionsCode = `<Empty.Root>
  <Empty.Media>
    <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
  </Empty.Media>
  <Empty.Title>No projects yet</Empty.Title>
  <Empty.Description>
    Create your first project to get started.
  </Empty.Description>
  <Empty.Actions>
    <Button color="primary">New project</Button>
    <Button variant="ghost">Import</Button>
  </Empty.Actions>
</Empty.Root>`;

	const announceCode = `<!-- Results replaced by nothing after a search -->
{#if results.length === 0 && query}
  <Empty.Root announce>
    <Empty.Title>No matches for &quot;{query}&quot;</Empty.Title>
    <Empty.Description>Try a shorter search term.</Empty.Description>
  </Empty.Root>
{/if}`;

	const headingCode = `<!-- Inside a section that warrants one -->
<Empty.Title level={3}>No invoices</Empty.Title>

<!-- Default: a <p>, no outline entry -->
<Empty.Title>No invoices</Empty.Title>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Everything but <code class="ic">Root</code> is optional. A bare
			<code class="ic">Root &gt; Title</code> is a legitimate empty state.
		</p>
		<Preview code={usageCode}>
			<Empty.Root>
				<Empty.Title>No projects yet</Empty.Title>
				<Empty.Description>Projects you create will show up here.</Empty.Description>
			</Empty.Root>
		</Preview>
	</section>

	<section id="actions" class="sec">
		<h2 class="sec__h">With actions</h2>
		<p class="sec__p">
			<code class="ic">Media</code> is <code class="ic">aria-hidden</code> and that is the point: whatever
			goes in it — an icon, an illustration — restates the title underneath. Left in the accessibility
			tree it either announces nothing or says the same thing twice.
		</p>
		<Preview code={actionsCode}>
			<Empty.Root>
				<Empty.Media>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.7"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
					</svg>
				</Empty.Media>
				<Empty.Title>No projects yet</Empty.Title>
				<Empty.Description>Create your first project to get started.</Empty.Description>
				<Empty.Actions>
					<Button color="primary">New project</Button>
					<Button variant="ghost">Import</Button>
				</Empty.Actions>
			</Empty.Root>
		</Preview>
	</section>

	<section id="announce" class="sec">
		<h2 class="sec__h">Announcing the change</h2>
		<p class="sec__p">
			<code class="ic">announce</code> sets <code class="ic">role="status"</code>, and it is off by
			default on purpose. An empty state present on first paint is just the page — announcing it
			interrupts a screen reader reading the heading above it. An empty state that
			<em>replaces</em> results after a search is a change the user caused and cannot see, and silence
			there reads as "nothing happened".
		</p>
		<p class="sec__p">
			So: on for anything that swaps in after an interaction, off for a first-render placeholder.
		</p>
		<Preview code={announceCode}>
			<Empty.Root announce>
				<Empty.Title>No matches for "svelt"</Empty.Title>
				<Empty.Description>Try a shorter search term.</Empty.Description>
			</Empty.Root>
		</Preview>
	</section>

	<section id="headings" class="sec">
		<h2 class="sec__h">Titles are not headings</h2>
		<p class="sec__p">
			<code class="ic">Title</code> renders a <code class="ic">&lt;p&gt;</code> by default. An empty
			state inside a card or a table cell has no section of its own, and injecting an
			<code class="ic">&lt;h3&gt;</code> there puts "No results" into the document outline — a
			screen reader user navigating by heading would land on it as if it were part of the page. Pass
			<code class="ic">level</code> only when the surrounding structure genuinely warrants one.
		</p>
		<Preview code={headingCode}>
			<Empty.Root>
				<Empty.Title level={3}>No invoices</Empty.Title>
			</Empty.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Each part also takes its native element's attributes via prop spreading.</p>
		<PropsTable component="EmptyRoot" />
		<PropsTable component="EmptyTitle" />
		<PropsTable component="EmptyMedia" />
		<PropsTable component="EmptyDescription" />
		<PropsTable component="EmptyActions" />
	</section>
</DocPage>

<style>
	.sec {
		margin-bottom: 48px;
		scroll-margin-top: 84px;
	}
	.sec__h {
		font-size: 21px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--doc-fg);
		margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
</style>
