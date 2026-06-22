<script lang="ts">
	import { Select } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.select;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{
			prop: 'Select.Root · type',
			type: `'single' | 'multiple'`,
			description: 'Required. Selection mode.'
		},
		{ prop: 'Select.Root · value', type: 'string', description: 'Bindable selected value.' },
		{ prop: 'Select.Trigger · class', type: 'string', description: 'Extra classes on the trigger.' },
		{
			prop: 'Select.Item · value',
			type: 'string',
			description: 'Required. The value this item represents.'
		},
		{
			prop: 'Select.Item · label',
			type: 'string',
			description: 'Required. Accessible label text for the item.'
		},
		{ prop: 'Select.Item · class', type: 'string', description: 'Extra classes on the item.' }
	];

	let selectValue = $state('');
	const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];

	const usageCode = `<script>
  import { Select } from 'sve-ui';
  let selectValue = $state('');
  const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];
<\/script>

<Select.Root type="single" bind:value={selectValue}>
  <Select.Trigger>{selectValue || 'Pick a fruit'}</Select.Trigger>
  <Select.Content>
    {#each fruits as fruit (fruit)}
      <Select.Item value={fruit} label={fruit}>{fruit}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>`;

	const statesCode = `<Select.Root type="single">
  <Select.Trigger>Pick a fruit</Select.Trigger>
  <Select.Content>
    <Select.Item value="apple" label="Apple">Apple</Select.Item>
    <Select.Item value="banana" label="Banana" disabled>Banana (disabled)</Select.Item>
    <Select.Item value="cherry" label="Cherry">Cherry</Select.Item>
  </Select.Content>
</Select.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Select.Root</code>, <code class="ic">Select.Trigger</code>,
			<code class="ic">Select.Content</code>, and <code class="ic">Select.Item</code>. The content
			portals to the body, so it escapes overflow clipping.
		</p>
		<Preview code={usageCode}>
			<Select.Root type="single" bind:value={selectValue}>
				<Select.Trigger>{selectValue || 'Pick a fruit'}</Select.Trigger>
				<Select.Content>
					{#each fruits as fruit (fruit)}
						<Select.Item value={fruit} label={fruit}>{fruit}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">
			Individual items can be <code class="ic">disabled</code> while the rest remain interactive.
		</p>
		<Preview code={statesCode}>
			<Select.Root type="single">
				<Select.Trigger>Pick a fruit</Select.Trigger>
				<Select.Content>
					<Select.Item value="apple" label="Apple">Apple</Select.Item>
					<Select.Item value="banana" label="Banana" disabled>Banana (disabled)</Select.Item>
					<Select.Item value="cherry" label="Cherry">Cherry</Select.Item>
				</Select.Content>
			</Select.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			All subcomponents also forward their corresponding Bits props via spreading.
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
