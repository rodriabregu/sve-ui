<script lang="ts">
	import { Tabs } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.tabs;

	let tabValue = $state('account');

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'value', type: 'string', description: 'The active tab value. Use bind:value for two-way binding.' },
		{ prop: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes.' },
		{ prop: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'` },
		{ prop: 'activationMode', type: `'automatic' | 'manual'`, default: `'automatic'` },
		{ prop: 'loop', type: 'boolean', default: 'true', description: 'Keyboard focus loops from last trigger back to first.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Compose Tabs.List and Tabs.Content inside.' }
	];

	const usageCode = `<script>
  import { Tabs } from 'sve-ui';

  let tabValue = $state('account');
<\u002fscript>

<Tabs.Root bind:value={tabValue}>
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
    <Tabs.Trigger value="team">Team</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Manage your account details.</Tabs.Content>
  <Tabs.Content value="password">Change your password here.</Tabs.Content>
  <Tabs.Content value="team">Invite and manage team members.</Tabs.Content>
</Tabs.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import the namespace and compose <code class="ic">Tabs.Root</code>,
			<code class="ic">Tabs.List</code>, <code class="ic">Tabs.Trigger</code>, and
			<code class="ic">Tabs.Content</code>. Use <code class="ic">bind:value</code> to track the active tab.
		</p>
		<Preview code={usageCode} align="start">
			<div style="width: 100%; max-width: 400px;">
				<Tabs.Root bind:value={tabValue}>
					<Tabs.List>
						<Tabs.Trigger value="account">Account</Tabs.Trigger>
						<Tabs.Trigger value="password">Password</Tabs.Trigger>
						<Tabs.Trigger value="team">Team</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="account">Manage your account details.</Tabs.Content>
					<Tabs.Content value="password">Change your password here.</Tabs.Content>
					<Tabs.Content value="team">Invite and manage team members.</Tabs.Content>
				</Tabs.Root>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Props for <code class="ic">Tabs.Root</code>. <code class="ic">Tabs.Trigger</code> and
			<code class="ic">Tabs.Content</code> require a matching <code class="ic">value</code> string.
			All parts accept <code class="ic">class</code> for custom overrides.
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
