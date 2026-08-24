<script lang="ts">
	import { Sidebar } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.sidebar;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'provider', label: 'Why Provider is separate' },
		{ id: 'collapsible', label: 'Collapse modes' },
		{ id: 'no-media-query', label: 'No JS media query' },
		{ id: 'a11y', label: 'Accessibility' },
		{ id: 'not-docs-nav', label: 'Not a docs sidebar' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Sidebar } from 'sve-ui';
  let collapsed = $state(false);
<\u002fscript>

<Sidebar.Provider bind:collapsed collapsible="icon" shell>
  <Sidebar.Root label="Main navigation">
    <Sidebar.Header>
      <Sidebar.Trigger aria-label="Toggle sidebar">&#9776;</Sidebar.Trigger>
      <strong>Acme</strong>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group aria-labelledby="grp-platform">
        <Sidebar.GroupLabel id="grp-platform">Platform</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.Item href="/dashboard" active label="Dashboard">Dashboard</Sidebar.Item>
          <Sidebar.Item href="/projects" label="Projects">Projects</Sidebar.Item>
          <Sidebar.Item disabled label="Reports">Reports</Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>Account</Sidebar.Footer>
  </Sidebar.Root>

  <main>Your page content</main>
</Sidebar.Provider>`;

	let collapsed = $state(false);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Custom rather than a Bits wrapper — Bits ships no sidebar, and there is no hard behaviour to
			buy here. What a sidebar needs is a landmark, a labelled list, a shared collapsed state and a
			toggle that announces itself, all of which the platform gives directly.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Sidebar.Provider bind:collapsed collapsible="icon" shell>
					<Sidebar.Root label="Demo navigation">
						<Sidebar.Header>
							<Sidebar.Trigger>☰</Sidebar.Trigger>
							<strong class="brand">Acme</strong>
						</Sidebar.Header>
						<Sidebar.Content>
							<Sidebar.Group aria-labelledby="demo-grp">
								<Sidebar.GroupLabel id="demo-grp">Platform</Sidebar.GroupLabel>
								<Sidebar.Menu>
									<Sidebar.Item href="/components/sidebar" active label="Dashboard"
										>Dashboard</Sidebar.Item
									>
									<Sidebar.Item href="/components/button" label="Projects">Projects</Sidebar.Item>
									<Sidebar.Item disabled label="Reports">Reports</Sidebar.Item>
								</Sidebar.Menu>
							</Sidebar.Group>
						</Sidebar.Content>
						<Sidebar.Footer>Account</Sidebar.Footer>
					</Sidebar.Root>
					<div class="demo__main">Page content</div>
				</Sidebar.Provider>
			</div>
		</Preview>
		<p class="cap">
			Toggle it — the labels hide, the items stay reachable, and "Reports" is a non-link.
		</p>
	</section>

	<section id="provider" class="sec">
		<h2 class="sec__h">Why Provider is separate</h2>
		<p class="sec__p">
			<code class="ic">Provider</code> owns the state; <code class="ic">Root</code> is the
			<code class="ic">&lt;aside&gt;</code>. They are separate parts for one concrete reason: Svelte
			context reaches <strong>descendants</strong>, not siblings.
		</p>
		<p class="sec__p">
			Put the state on <code class="ic">Root</code> and a <code class="ic">Trigger</code> sitting in
			a top bar next to the sidebar never sees it — and with
			<code class="ic">collapsible="offcanvas"</code> the Trigger <em>has</em> to be outside, or
			collapsing hides the only way back. A test caught exactly that: the Trigger got a null
			<code class="ic">aria-controls</code> and clicking it did nothing.
		</p>
		<p class="sec__p">
			The Provider imposes <strong>no layout</strong> unless you pass
			<code class="ic">shell</code>. By default it is <code class="ic">display: contents</code>, so
			it is invisible to layout and the children sit where they would without it — which matters
			when the sidebar is a child of a grid your app already defined. <code class="ic">shell</code> opts
			into the flex row.
		</p>
	</section>

	<section id="collapsible" class="sec">
		<h2 class="sec__h">Collapse modes</h2>
		<ul class="sec__p">
			<li><code class="ic">icon</code> — narrows to a rail. Labels hide, items stay reachable.</li>
			<li>
				<code class="ic">offcanvas</code> — slides out entirely, and its contents become unfocusable so
				the cursor cannot vanish into a hidden panel.
			</li>
			<li><code class="ic">none</code> — not collapsible; the Trigger becomes pointless.</li>
		</ul>
		<p class="sec__p">
			<code class="ic">collapsed</code> is bindable on the Provider. <strong>Persist it</strong> — a sidebar
			that forgets its state on every navigation is worse than one that never collapsed.
		</p>
		<p class="sec__p">
			Size it with <code class="ic">--sve-sidebar-width</code> and
			<code class="ic">--sve-sidebar-width-icon</code> rather than overriding rules.
		</p>
	</section>

	<section id="no-media-query" class="sec">
		<h2 class="sec__h">No JS media query</h2>
		<p class="warn">
			The collapsed presentation is one CSS class. This component does not watch the viewport.
		</p>
		<p class="sec__p">
			A library that swaps the markup for a drawer below some breakpoint hardcodes that breakpoint
			inside itself, cannot know it during server rendering, and flashes the wrong layout on
			hydration.
			<code class="ic">collapsible="offcanvas"</code> plus <em>your</em> breakpoint gets the same result,
			and your app decides when it happens.
		</p>
	</section>

	<section id="a11y" class="sec">
		<h2 class="sec__h">Accessibility</h2>
		<ul class="sec__p">
			<li>
				<code class="ic">Root</code> is a named <code class="ic">&lt;aside&gt;</code> — an app shell usually
				has more than one complementary region.
			</li>
			<li>
				Point each <code class="ic">Group</code>'s <code class="ic">aria-labelledby</code> at its
				<code class="ic">GroupLabel</code> id. A visual heading assistive technology cannot connect to
				its items is decoration, not structure.
			</li>
			<li>
				On an icon rail the <code class="ic">GroupLabel</code> is hidden <strong>visually</strong>,
				not removed — deleting it would strip the group of its name for someone who has plenty of
				room for it.
			</li>
			<li>
				Give icon-only <code class="ic">Item</code>s a <code class="ic">label</code>. It becomes the
				accessible name when collapsed; without it the rail is a column of unnamed links.
			</li>
			<li>
				<code class="ic">Item</code> sets <code class="ic">aria-current="page"</code> when
				<code class="ic">active</code> — not just a highlight, which tells sighted users and nobody else.
			</li>
			<li>
				<code class="ic">disabled</code> renders a <code class="ic">&lt;span&gt;</code>, not a link.
				A link that goes nowhere takes a tab stop and lies about what will happen.
			</li>
			<li>
				The Trigger's label stays the <strong>same</strong> in both states.
				<code class="ic">aria-expanded</code> already carries the state; a label that flips to "Close"
				says it twice and contradicts itself mid-announcement.
			</li>
		</ul>
	</section>

	<section id="not-docs-nav" class="sec">
		<h2 class="sec__h">Not a docs sidebar</h2>
		<p class="sec__p">
			This is an <strong>app-shell</strong> panel: fixed header and footer, a scrolling middle, and an
			icon rail when collapsed. It is not the right shape for a documentation table of contents — like
			the one on the left of this page — which is a sticky list that becomes a disclosure panel on mobile.
		</p>
		<p class="sec__p">
			We tried rebuilding this site's own navigation on top of it, as a test. Making it fit meant
			overriding <code class="ic">display</code>, <code class="ic">flex-direction</code>,
			<code class="ic">width</code>, <code class="ic">border</code>,
			<code class="ic">background</code>, <code class="ic">overflow</code> and the collapse mechanism
			itself — nearly everything the component provides. When you override that much you are fighting
			the component, not using it.
		</p>
		<p class="sec__p">
			The exercise was still worth it: it is what surfaced the
			<code class="ic">display: contents</code> default on Provider and the
			<code class="ic">disabled</code> variant on Item, both of which are here because of it.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Sidebar.Provider</code> — <code class="ic">collapsed</code> is bindable.
		</p>
		<PropsTable component="SidebarProvider" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Sidebar.Root</code></p>
		<PropsTable component="SidebarRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Sidebar.Item</code> — plus the native anchor attributes.
		</p>
		<PropsTable component="SidebarItem" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Sidebar.Trigger</code></p>
		<PropsTable component="SidebarTrigger" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Header</code>, <code class="ic">Content</code>,
			<code class="ic">Footer</code>, <code class="ic">Group</code>,
			<code class="ic">GroupLabel</code> and <code class="ic">Menu</code> each take
			<code class="ic">class</code> plus their native attributes.
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
	.demo {
		display: flex;
		height: 17rem;
		width: 100%;
		border: 1px solid var(--doc-border);
		border-radius: 12px;
		overflow: hidden;
	}
	.demo__main {
		flex: 1;
		padding: 16px;
		font-size: 13px;
		color: var(--doc-fg-subtle);
	}
	.brand {
		font-size: 14px;
	}
	.cap {
		margin: 12px 0 0;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
</style>
