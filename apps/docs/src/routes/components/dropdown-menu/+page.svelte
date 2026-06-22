<script lang="ts">
	import { DropdownMenu, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['dropdown-menu'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'groups', label: 'Groups & Labels' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		// Root
		{ prop: 'DropdownMenu.Root — open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
		{ prop: 'DropdownMenu.Root — onOpenChange', type: '(open: boolean) => void', description: 'Callback fired when open state changes.' },
		// Trigger
		{ prop: 'DropdownMenu.Trigger — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads trigger props onto a real element.' },
		// Content
		{ prop: 'DropdownMenu.Content — class', type: 'string', description: 'Extra classes merged onto the menu panel.' },
		{ prop: 'DropdownMenu.Content — sideOffset', type: 'number', default: '4', description: 'Gap in px between trigger and menu.' },
		{ prop: 'DropdownMenu.Content — align', type: `'start' | 'center' | 'end'`, default: `'start'`, description: 'Horizontal alignment relative to the trigger.' },
		// Item
		{ prop: 'DropdownMenu.Item — disabled', type: 'boolean', default: 'false', description: 'Prevents selection and applies muted styling.' },
		{ prop: 'DropdownMenu.Item — onSelect', type: '() => void', description: 'Callback fired when the item is selected.' },
		{ prop: 'DropdownMenu.Item — class', type: 'string', description: 'Extra classes merged onto the item.' },
		// Separator
		{ prop: 'DropdownMenu.Separator — class', type: 'string', description: 'Extra classes merged onto the separator.' }
	];

	const usageCode = `<script>
  import { DropdownMenu, Button } from 'sve-ui';
<\u002fscript>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button variant="solid" color="default" {...props}>Options ▾</Button>
    {/snippet}
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Item>Profile</DropdownMenu.Item>
    <DropdownMenu.Item>Settings</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Sign out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;

	const groupsCode = `<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button variant="outline" color="default" {...props}>Account ▾</Button>
    {/snippet}
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>Team (unavailable)</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Sign out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Wrap your trigger in the <code class="ic">child</code> snippet to forward all required ARIA
			and positioning props. The menu portals to <code class="ic">&lt;body&gt;</code>, is fully
			keyboard-navigable, and closes on item select or <kbd class="ic">Esc</kbd>.
		</p>
		<Preview code={usageCode}>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="solid" color="default" {...props}>Options ▾</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Sign out</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Preview>
	</section>

	<section id="groups" class="sec">
		<h2 class="sec__h">Groups & Labels</h2>
		<p class="sec__p">
			Use <code class="ic">DropdownMenu.Group</code> with <code class="ic">DropdownMenu.Label</code>
			to section related items. The <code class="ic">disabled</code> prop on an item prevents
			selection while keeping it visible.
		</p>
		<Preview code={groupsCode}>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" color="default" {...props}>Account ▾</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>Billing</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item disabled>Team (unavailable)</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Sign out</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Built on <code class="ic">bits-ui</code> — all underlying Bits UI DropdownMenu props are
			forwarded transparently.
		</p>
		<PropsTable rows={props} />
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
