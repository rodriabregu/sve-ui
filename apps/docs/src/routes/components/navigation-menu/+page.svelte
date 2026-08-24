<script lang="ts">
	import { NavigationMenu } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['navigation-menu'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'vs-menubar', label: 'Navigation Menu vs Menubar' },
		{ id: 'active', label: 'Marking the current page' },
		{ id: 'viewport', label: 'The optional Viewport' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{
			prop: 'onValueChange',
			type: '(value: string) => void',
			description: 'Called when the open menu changes.'
		},
		{
			prop: 'delayDuration',
			type: 'number',
			default: '200',
			description: 'Milliseconds of hover before a menu opens.'
		},
		{
			prop: 'skipDelayDuration',
			type: 'number',
			default: '300',
			description: 'Grace period in which moving to another trigger skips the delay.'
		},
		{
			prop: 'orientation',
			type: `'horizontal' | 'vertical'`,
			default: `'horizontal'`,
			description: 'Layout and arrow-key axis.'
		},
		{ prop: 'dir', type: `'ltr' | 'rtl'`, default: `'ltr'`, description: 'Reading direction.' }
	];

	const linkForwarded: PropRow[] = [
		{ prop: 'href', type: 'string', description: 'Destination. Rendered as a real anchor.' },
		{
			prop: 'active',
			type: 'boolean',
			default: 'false',
			description: 'Marks the current page. Bits then reports aria-current="page".'
		}
	];

	const usageCode = `<script>
  import { NavigationMenu } from 'sve-ui';
<\u002fscript>

<NavigationMenu.Root aria-label="Site">
  <NavigationMenu.List>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link>
        <NavigationMenu.Link href="/reports">Reports</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="pricing">
      <NavigationMenu.Link href="/pricing" active>Pricing</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>`;

	let value = $state('');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Root</code> &gt; <code class="ic">List</code> &gt;
			<code class="ic">Item</code> &gt; (<code class="ic">Trigger</code> +
			<code class="ic">Content</code>) or a bare <code class="ic">Link</code>. Root renders a
			<code class="ic">&lt;nav&gt;</code> landmark, so give it an
			<code class="ic">aria-label</code>.
		</p>
		<Preview code={usageCode} align="start">
			<NavigationMenu.Root bind:value aria-label="Example site">
				<NavigationMenu.List>
					<NavigationMenu.Item value="products">
						<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<NavigationMenu.Link href="/components">Components</NavigationMenu.Link>
							<NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item value="pricing">
						<NavigationMenu.Link href="/docs" active>Docs</NavigationMenu.Link>
					</NavigationMenu.Item>
				</NavigationMenu.List>
				<NavigationMenu.Viewport />
			</NavigationMenu.Root>
		</Preview>
	</section>

	<section id="vs-menubar" class="sec">
		<h2 class="sec__h">Navigation Menu vs Menubar</h2>
		<p class="sec__p">
			This is the one to use for <strong>site navigation</strong>. Its triggers open on hover after
			<code class="ic">delayDuration</code> <em>and</em> on click or Enter, so the menu works for pointer,
			keyboard and touch alike.
		</p>
		<p class="sec__p">
			<a href="/components/menubar">Menubar</a> is a desktop-application pattern: it assumes hover and
			a screen wide enough for several always-visible triggers. Neither holds on a phone. Reach for a
			menubar when you are building application chrome — an editor, an IDE-like tool — and for this when
			you are building a website's header.
		</p>
	</section>

	<section id="active" class="sec">
		<h2 class="sec__h">Marking the current page</h2>
		<p class="sec__p">
			Set <code class="ic">active</code> on the Link for the page the user is on. Bits then reports
			<code class="ic">aria-current="page"</code>, which is the difference between "this looks
			highlighted" and "this is announced as where you are". Styling it without that tells sighted
			users and nobody else.
		</p>
		<p class="sec__p">
			Links stay real anchors throughout, so middle-click and open-in-new-tab keep working.
		</p>
	</section>

	<section id="viewport" class="sec">
		<h2 class="sec__h">The optional Viewport</h2>
		<p class="sec__p">
			Add a <code class="ic">Viewport</code> after the List and every
			<code class="ic">Content</code> panel renders inside one shared container — so switching menus
			resizes a single surface instead of swapping two boxes. Bits publishes the measured size as
			<code class="ic">--bits-navigation-menu-viewport-width</code> and
			<code class="ic">-height</code>, which is what the transition animates.
		</p>
		<p class="sec__p">
			Omit it and each panel positions itself against its own trigger. Both are valid; the Viewport
			just looks calmer when panels differ in size.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">NavigationMenu.Root</code></p>
		<PropsTable component="NavigationMenuRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px"><code class="ic">NavigationMenu.Link</code></p>
		<PropsTable component="NavigationMenuLink" extra={linkForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">List</code>, <code class="ic">Trigger</code>,
			<code class="ic">Content</code> and <code class="ic">Viewport</code> take
			<code class="ic">class</code> plus their native attributes.
			<code class="ic">Item</code>, <code class="ic">Sub</code> and
			<code class="ic">Indicator</code> are re-exported from Bits unchanged.
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
</style>
