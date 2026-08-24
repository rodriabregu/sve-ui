<script lang="ts">
	import { ContextMenu, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootProps: PropRow[] = [
		{ prop: 'open', type: 'boolean', default: 'false', description: 'Bindable open state.' },
		{
			prop: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Called when the menu opens or closes.'
		},
		{
			prop: 'dir',
			type: `'ltr' | 'rtl'`,
			default: `'ltr'`,
			description: 'Reading direction, which flips submenu placement.'
		}
	];

	const meta = componentBySlug['context-menu'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'never-only-route', label: 'Never the only route' },
		{ id: 'shared', label: 'Shared with Dropdown Menu' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { ContextMenu } from 'sve-ui';
<\u002fscript>

<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click this row</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Group>
      <ContextMenu.Label>Actions</ContextMenu.Label>
      <ContextMenu.Item>Rename</ContextMenu.Item>
      <ContextMenu.Item>Duplicate</ContextMenu.Item>
    </ContextMenu.Group>
    <ContextMenu.Separator />
    <ContextMenu.Item>Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Trigger</code> is the right-click <strong>region</strong>, not a button — it
			wraps the content the menu acts on. Content portals to
			<code class="ic">&lt;body&gt;</code> and Bits positions it at the pointer, owning
			<code class="ic">role="menu"</code>, roving focus and keyboard navigation.
		</p>
		<Preview code={usageCode}>
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<Text size="sm">Right-click this row</Text>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Group>
						<ContextMenu.Label>Actions</ContextMenu.Label>
						<ContextMenu.Item>Rename</ContextMenu.Item>
						<ContextMenu.Item>Duplicate</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Item>Delete</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
		</Preview>
	</section>

	<section id="never-only-route" class="sec">
		<h2 class="sec__h">Never the only route</h2>
		<p class="warn">
			<strong>Right-click is undiscoverable, and touch devices have no right-click at all.</strong>
			Every action offered here must also be reachable from a visible control.
		</p>
		<p class="sec__p">
			That is not a nitpick — put "Delete" only in a context menu and a phone user simply cannot
			delete anything. Treat this as an accelerator for people who already know the action exists:
			pair it with a <a href="/components/dropdown-menu">Dropdown Menu</a> on a visible trigger, or with
			inline buttons on the row.
		</p>
	</section>

	<section id="shared" class="sec">
		<h2 class="sec__h">Shared with Dropdown Menu</h2>
		<p class="sec__p">
			<code class="ic">Item</code>, <code class="ic">Group</code>,
			<code class="ic">Label</code> and <code class="ic">Separator</code> are the
			<strong>same components</strong> <a href="/components/dropdown-menu">Dropdown Menu</a> uses. Bits
			re-exports identical menu internals under both namespaces, so one styled implementation serves each
			rather than two copies of the same CSS drifting apart.
		</p>
		<p class="sec__p">
			They stay context-aware: Bits derives its data attributes from whichever Root wraps them, so
			the same wrapper emits <code class="ic">data-context-menu-item</code> here and
			<code class="ic">data-dropdown-menu-item</code> there. The class is
			<code class="ic">sve-menu-item</code> in both, which is what keeps the two menus looking identical.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Root</code>, <code class="ic">Sub</code>,
			<code class="ic">SubTrigger</code>, <code class="ic">SubContent</code>,
			<code class="ic">CheckboxItem</code>, <code class="ic">RadioItem</code>,
			<code class="ic">RadioGroup</code> and <code class="ic">Arrow</code> are re-exported from Bits unchanged.
		</p>
		<p class="sec__p"><code class="ic">ContextMenu.Root</code></p>
		<PropsTable rows={rootProps} />
		<p class="sec__p" style="margin-top:16px"><code class="ic">ContextMenu.Trigger</code></p>
		<PropsTable component="ContextMenuTrigger" />
		<p class="sec__p" style="margin-top:16px"><code class="ic">ContextMenu.Content</code></p>
		<PropsTable component="ContextMenuContent" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">ContextMenu.Item</code> — shared with Dropdown Menu.
		</p>
		<PropsTable component="MenuItem" />
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
