<script lang="ts">
	import { Breadcrumb } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.breadcrumb;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'current', label: 'The last crumb' },
		{ id: 'separators', label: 'Separators are decorative' },
		{ id: 'why-custom', label: 'Why this one is custom' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Breadcrumb } from 'sve-ui';
<\u002fscript>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Link href="/projects">Projects</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Link current>Settings</Breadcrumb.Link></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`;

	const customSepCode = `<Breadcrumb.Separator>/</Breadcrumb.Separator>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Root</code> &gt; <code class="ic">List</code> &gt;
			<code class="ic">Item</code>, with a <code class="ic">Separator</code> between items. Root is a
			<code class="ic">&lt;nav&gt;</code> landmark labelled "Breadcrumb" by default — that label is
			what lets a screen reader user tell it apart from the site's main navigation.
		</p>
		<Preview code={usageCode} align="start">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item><Breadcrumb.Link href="/components">Components</Breadcrumb.Link></Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item><Breadcrumb.Link current>Breadcrumb</Breadcrumb.Link></Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</Preview>
	</section>

	<section id="current" class="sec">
		<h2 class="sec__h">The last crumb</h2>
		<p class="sec__p">
			Set <code class="ic">current</code> on the final <code class="ic">Link</code>. It then renders
			as plain text with <code class="ic">aria-current="page"</code> instead of an anchor — because a
			link to the page you are already on is a dead end, and a keyboard user should not have to tab
			through it.
		</p>
		<p class="sec__p">
			It also stops looking like a link, which is the honest signal: nothing happens if you click it.
		</p>
	</section>

	<section id="separators" class="sec">
		<h2 class="sec__h">Separators are decorative</h2>
		<p class="sec__p">
			<code class="ic">Separator</code> carries <code class="ic">aria-hidden</code> and
			<code class="ic">role="presentation"</code>, so a screen reader reads
			"Home, Components, Breadcrumb" rather than "Home, slash, Components, slash, Breadcrumb". The
			glyph is visual punctuation; it means nothing spoken.
		</p>
		<p class="sec__p">Pass children to replace the default chevron.</p>
		<Preview code={customSepCode} align="start">
			<Breadcrumb.Root label="Example with slashes">
				<Breadcrumb.List>
					<Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
					<Breadcrumb.Separator>/</Breadcrumb.Separator>
					<Breadcrumb.Item><Breadcrumb.Link current>Docs</Breadcrumb.Link></Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</Preview>
	</section>

	<section id="why-custom" class="sec">
		<h2 class="sec__h">Why this one is custom</h2>
		<p class="sec__p">
			Every other component in sve-ui wraps a Bits UI primitive. This one does not, and it is not an
			oversight: a <code class="ic">&lt;nav&gt;</code> wrapping an ordered list <em>is</em> a breadcrumb
			trail. There is no keyboard behaviour to manage and no ARIA to invent.
		</p>
		<p class="sec__p">
			The list is <code class="ic">&lt;ol&gt;</code>, not <code class="ic">&lt;ul&gt;</code>, because
			the order carries meaning — the trail is a sequence from root to current page. Reaching for a
			headless primitive here would add a dependency to reproduce what HTML already does correctly.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Breadcrumb.Root</code></p>
		<PropsTable component="BreadcrumbRoot" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Breadcrumb.Link</code> — plus the native anchor attributes.</p>
		<PropsTable component="BreadcrumbLink" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">List</code>, <code class="ic">Item</code> and
			<code class="ic">Separator</code> each take <code class="ic">class</code> plus their native
			attributes.
		</p>
	</section>
</DocPage>

<style>
	.sec { margin-bottom: 48px; scroll-margin-top: 84px; }
	.sec__h {
		font-size: 21px; font-weight: 700; letter-spacing: -0.02em;
		color: var(--doc-fg); margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px; font-size: 14.5px; line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
</style>
