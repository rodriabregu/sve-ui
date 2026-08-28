<script lang="ts">
	import { Code, Command } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.command;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'viewport', label: 'Viewport is required' },
		{ id: 'naming', label: 'Naming the field and the list' },
		{ id: 'keywords', label: 'Keywords and filtering' },
		{ id: 'async', label: 'Async results' },
		{ id: 'announce', label: 'Announcing results' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.

	const statusCode = `<Command.Root label="Command palette">
  <Command.Input bind:value={search} />

  <!-- Once, anywhere inside Root. Pass a label in your language. -->
  <Command.Status label={(n) => (n === 1 ? '1 resultado' : \`\${n} resultados\`)} />

  <Command.List aria-label="Commands">
    <Command.Viewport>…</Command.Viewport>
  </Command.List>
</Command.Root>`;

	const usageCode = `<script>
  import { Command } from 'sve-ui';
  let search = $state('');
<\u002fscript>

<Command.Root label="Command palette">
  <Command.Input bind:value={search} placeholder="Type a command" />
  <Command.List aria-label="Commands">
    <Command.Viewport>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group>
        <Command.GroupHeading>Actions</Command.GroupHeading>
        <Command.GroupItems>
          <Command.Item value="new-file">New file</Command.Item>
          <Command.Item value="delete" keywords={['trash']}>Delete</Command.Item>
        </Command.GroupItems>
      </Command.Group>
    </Command.Viewport>
  </Command.List>
</Command.Root>`;

	const asyncCode = `<Command.List aria-label="Results">
  <Command.Viewport>
    {#if loading}
      <Command.Loading>Searching…</Command.Loading>
    {:else}
      <Command.Empty>No results found.</Command.Empty>
      <!-- render your items -->
    {/if}
  </Command.Viewport>
</Command.List>`;

	let search = $state('');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			The command-palette pattern. Bits owns the filtering, the scoring and arrow-key navigation,
			and it keeps focus in the Input while the highlight moves — so the user types and navigates
			without ever leaving the field. To open it in a modal, wrap the whole thing in a
			<a href="/components/dialog">Dialog</a>.
		</p>
		<Preview code={usageCode} align="start">
			<div style="width: 100%; max-width: 420px;">
				<Command.Root label="Command palette">
					<Command.Input bind:value={search} placeholder="Type a command" />
					<Command.List aria-label="Commands">
						<Command.Viewport>
							<Command.Empty>No results found.</Command.Empty>
							<Command.Group>
								<Command.GroupHeading>Actions</Command.GroupHeading>
								<Command.GroupItems>
									<Command.Item value="new-file">New file</Command.Item>
									<Command.Item value="open-file">Open file</Command.Item>
									<Command.Item value="delete" keywords={['trash', 'remove']}>Delete</Command.Item>
								</Command.GroupItems>
							</Command.Group>
							<Command.Separator />
							<Command.Group>
								<Command.GroupHeading>Help</Command.GroupHeading>
								<Command.GroupItems>
									<Command.Item value="docs">Documentation</Command.Item>
								</Command.GroupItems>
							</Command.Group>
						</Command.Viewport>
					</Command.List>
				</Command.Root>
			</div>
		</Preview>
		<p class="sec__p">
			Try typing <code class="ic">trash</code> — it matches Delete, which does not contain the word.
		</p>
	</section>

	<section id="viewport" class="sec">
		<h2 class="sec__h">Viewport is required</h2>
		<p class="warn">
			<code class="ic">Command.Viewport</code> goes inside <code class="ic">List</code> and wraps
			the content. It is <strong>not</strong> optional.
		</p>
		<p class="sec__p">
			Bits takes the Input's <code class="ic">aria-controls</code> from the Viewport's id, and uses
			the Viewport as the insertion element when sorting filtered items. Omit it and the combobox is
			invalid ARIA — axe reports
			<code class="ic">aria-required-attr</code>, because a
			<code class="ic">role="combobox"</code> with <code class="ic">aria-expanded</code> must say what
			it controls.
		</p>
		<p class="sec__p">
			This is not hypothetical: our own a11y suite caught a Command built without one, which is why
			it is called out here rather than left as a detail in the API table.
		</p>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">Naming the field and the list</h2>
		<p class="sec__p">
			There are <strong>two</strong> names to set, and the prop names do not make that obvious:
		</p>
		<ul class="sec__p">
			<li>
				<code class="ic">label</code> on <code class="ic">Root</code> names the
				<strong>search field</strong>. It renders a visually hidden
				<code class="ic">&lt;label&gt;</code> that the Input references.
			</li>
			<li>
				<code class="ic">aria-label</code> on <code class="ic">List</code> names the
				<strong>list</strong>. Bits defaults it to <code class="ic">"Suggestions..."</code>, which
				says nothing about what the suggestions are — override it.
			</li>
		</ul>
		<p class="sec__p">
			We deliberately leave Bits' default in place rather than silently substituting our own, so the
			behaviour matches their documentation. Setting both is on you.
		</p>
	</section>

	<section id="keywords" class="sec">
		<h2 class="sec__h">Keywords and filtering</h2>
		<p class="sec__p">
			<code class="ic">value</code> is what the query matches against. Add
			<code class="ic">keywords</code> for the words a user would actually type but that are not in
			your label — <code class="ic">trash</code> on a Delete item,
			<code class="ic">preferences</code> on Settings. This is the difference between a palette people
			use and one they abandon because it never finds anything.
		</p>
		<p class="sec__p">
			A group whose items are all filtered out is hidden along with its heading, so you never get a
			heading over nothing. Set <code class="ic">shouldFilter={false}</code> when you filter server-side
			and render only what you want shown.
		</p>
	</section>

	<section id="async" class="sec">
		<h2 class="sec__h">Async results</h2>
		<p class="sec__p">
			Use <code class="ic">Loading</code> while a request is in flight, not
			<code class="ic">Empty</code>. "No results" and "still loading" are different answers, and
			showing the first one during a fetch tells the user to stop typing when they should wait.
		</p>
		<Preview code={asyncCode} align="start">
			<p class="sec__p" style="margin:0">
				Always render one or the other — a palette that goes silently blank reads as broken.
			</p>
		</Preview>
	</section>

	<section id="announce" class="sec">
		<h2 class="sec__h">Announcing results</h2>
		<p class="warn">
			Bits filters the list and announces nothing. Without
			<code class="ic">Command.Status</code>, a screen reader user types and the list shrinks in
			silence — they never learn whether they have forty matches or none.
		</p>
		<Code code={statusCode} label="Add it once, inside Root" />
		<p class="sec__p" style="margin-top:16px">
			It is a visually hidden <code class="ic">role="status"</code> region. Hidden because the count is
			already on screen — the results are right there — so duplicating it visibly would be noise for everyone
			else.
		</p>
		<p class="sec__p">
			<strong>Pass <code class="ic">label</code>.</strong> The default is English, and a count is exactly
			the kind of string that needs your language and plural rules.
		</p>
		<p class="sec__p">
			<code class="ic">delay</code> is not a performance tweak. Without it, typing "button" fires six
			announcements — "48 results", "12 results", "4 results" — and the user hears a torrent instead of
			an answer. Each keystroke restarts the wait, so they get one answer once they stop typing. The default
			is 500ms.
		</p>
		<p class="sec__p">
			It stays silent until the search is non-empty: the count of an unfiltered list is not news
			when a palette opens, and it falls silent again if the search is cleared.
		</p>
		<p class="sec__p">
			<strong><code class="ic">Combobox</code> needs the same thing and gets no component</strong>,
			deliberately — Bits does not filter there, <em>you</em> do, so you already know the count. Render
			your own region with it. There is nothing this library can add that you do not already have.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Command.Root</code></p>
		<PropsTable component="CommandRoot" />
		<p class="sec__p"><code class="ic">Command.Input</code></p>
		<PropsTable component="CommandInput" />
		<p class="sec__p"><code class="ic">Command.List</code></p>
		<PropsTable component="CommandList" />
		<p class="sec__p"><code class="ic">Command.Item</code></p>
		<PropsTable component="CommandItem" />
		<p class="sec__p"><code class="ic">Command.Status</code></p>
		<PropsTable component="CommandStatus" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Command.Item</code></p>
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Input</code>, <code class="ic">List</code>,
			<code class="ic">Group</code>, <code class="ic">GroupHeading</code>,
			<code class="ic">Empty</code>, <code class="ic">Separator</code> and
			<code class="ic">Loading</code> take <code class="ic">class</code> plus their native
			attributes. <code class="ic">Viewport</code>, <code class="ic">GroupItems</code> and
			<code class="ic">LinkItem</code> are re-exported from Bits unchanged.
		</p>
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
	.sec__p a {
		color: var(--doc-primary-text);
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.warn {
		margin: 0 0 16px;
		padding: 12px 14px;
		border-left: 3px solid var(--doc-primary-text);
		background: var(--doc-surface-2);
		border-radius: 0 8px 8px 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
</style>
