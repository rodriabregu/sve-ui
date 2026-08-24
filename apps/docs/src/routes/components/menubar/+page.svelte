<script lang="ts">
	import { Menubar } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.menubar;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'vs-dropdown', label: 'Menubar vs Dropdown Menu' },
		{ id: 'shared', label: 'Shared menu parts' },
		{ id: 'when', label: 'When not to use it' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{
			prop: 'value',
			type: 'string',
			description: 'Which menu is open, by its Menu value. Bindable.'
		},
		{
			prop: 'onValueChange',
			type: '(value: string) => void',
			description: 'Called when the open menu changes.'
		},
		{
			prop: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Arrow-key focus wraps at either end.'
		},
		{
			prop: 'dir',
			type: `'ltr' | 'rtl'`,
			default: `'ltr'`,
			description: 'Reading direction, which flips submenu placement.'
		}
	];

	const usageCode = `<script>
  import { Menubar } from 'sve-ui';
<\u002fscript>

<Menubar.Root aria-label="Main">
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Group>
        <Menubar.Label>Document</Menubar.Label>
        <Menubar.Item>New</Menubar.Item>
        <Menubar.Item>Open</Menubar.Item>
      </Menubar.Group>
      <Menubar.Separator />
      <Menubar.Item>Quit</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>Undo</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Root</code> &gt; <code class="ic">Menu</code> &gt; (<code class="ic"
				>Trigger</code
			>
			+ <code class="ic">Content</code>).
			<code class="ic">Menu</code> pairs one trigger with its panel; a menubar holds several. Give
			Root an <code class="ic">aria-label</code>.
		</p>
		<Preview code={usageCode}>
			<Menubar.Root aria-label="Main">
				<Menubar.Menu>
					<Menubar.Trigger>File</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Group>
							<Menubar.Label>Document</Menubar.Label>
							<Menubar.Item>New</Menubar.Item>
							<Menubar.Item>Open</Menubar.Item>
						</Menubar.Group>
						<Menubar.Separator />
						<Menubar.Item>Quit</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
				<Menubar.Menu>
					<Menubar.Trigger>Edit</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>Undo</Menubar.Item>
						<Menubar.Item>Redo</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
				<Menubar.Menu>
					<Menubar.Trigger>View</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>Zoom in</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</Menubar.Root>
		</Preview>
	</section>

	<section id="vs-dropdown" class="sec">
		<h2 class="sec__h">Menubar vs Dropdown Menu</h2>
		<p class="sec__p">
			A menubar is not a row of <a href="/components/dropdown-menu">Dropdown Menus</a>. Two
			behaviours make it a single control rather than several:
		</p>
		<ul class="sec__p">
			<li>Arrow keys move between the top-level menus, so the whole bar is one tab stop.</li>
			<li>
				Once one menu is open, hovering a sibling <strong>switches</strong> to it — no second click. That
				is the desktop-app behaviour people already expect from a menu bar.
			</li>
		</ul>
		<p class="sec__p">
			Build it from separate dropdowns and you lose both, which is exactly the kind of regression
			nobody notices with a mouse.
		</p>
	</section>

	<section id="shared" class="sec">
		<h2 class="sec__h">Shared menu parts</h2>
		<p class="sec__p">
			<code class="ic">Item</code>, <code class="ic">Group</code>,
			<code class="ic">Label</code> and <code class="ic">Separator</code> are the same components
			<a href="/components/dropdown-menu">Dropdown Menu</a> and
			<a href="/components/context-menu">Context Menu</a> use. Bits re-exports identical menu internals
			to all three, so the three menus look and behave the same by construction rather than by three copies
			of the same CSS agreeing for now.
		</p>
		<p class="sec__p">
			They stay context-aware — the same wrapper emits
			<code class="ic">data-menubar-item</code> here.
		</p>
	</section>

	<section id="when" class="sec">
		<h2 class="sec__h">When not to use it</h2>
		<p class="warn">
			A menubar is a desktop-application pattern. On a website it is usually the wrong shape.
		</p>
		<p class="sec__p">
			It assumes a pointer that hovers and a screen wide enough for several always-visible triggers
			— neither holds on a phone. For site navigation reach for a
			<a href="/components/navigation-menu">Navigation Menu</a>; for a handful of actions on a
			toolbar, a <a href="/components/dropdown-menu">Dropdown Menu</a> or
			<a href="/components/toolbar">Toolbar</a>. Use a menubar when you are genuinely building an
			application chrome — an editor, an IDE-like tool.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Menubar.Root</code></p>
		<PropsTable component="MenubarRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Menubar.Trigger</code></p>
		<PropsTable component="MenubarTrigger" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">Menubar.Content</code></p>
		<PropsTable component="MenubarContent" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Menu</code>, <code class="ic">Sub</code>,
			<code class="ic">SubTrigger</code>, <code class="ic">SubContent</code>,
			<code class="ic">CheckboxItem</code>, <code class="ic">RadioItem</code>,
			<code class="ic">RadioGroup</code> and <code class="ic">Arrow</code> are re-exported from Bits unchanged.
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
