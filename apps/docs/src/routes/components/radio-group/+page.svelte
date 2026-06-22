<script lang="ts">
	import { RadioGroup } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['radio-group'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'orientation', label: 'Orientation' },
		{ id: 'states', label: 'States' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{
			prop: 'RadioGroup.Root · value',
			type: 'string',
			description: 'Bindable selected value.'
		},
		{ prop: 'RadioGroup.Root · class', type: 'string', description: 'Extra classes on the root.' },
		{
			prop: 'RadioGroup.Item · value',
			type: 'string',
			description: 'Required. The value this item represents.'
		},
		{ prop: 'RadioGroup.Item · class', type: 'string', description: 'Extra classes on the item.' }
	];

	let radioValue = $state('comfortable');

	const usageCode = `<script>
  import { RadioGroup } from 'sve-ui';
  let radioValue = $state('comfortable');
<\u002fscript>

<RadioGroup.Root bind:value={radioValue}>
  {#each ['comfortable', 'compact', 'spacious'] as option (option)}
    <label class="flex items-center gap-2">
      <RadioGroup.Item value={option} />
      <span>{option}</span>
    </label>
  {/each}
</RadioGroup.Root>`;

	const orientationCode = `<RadioGroup.Root orientation="horizontal">
  {#each ['left', 'center', 'right'] as align (align)}
    <label class="flex items-center gap-2">
      <RadioGroup.Item value={align} />
      <span>{align}</span>
    </label>
  {/each}
</RadioGroup.Root>`;

	const statesCode = `<RadioGroup.Root value="enabled">
  <label class="flex items-center gap-2">
    <RadioGroup.Item value="enabled" />
    <span>Enabled</span>
  </label>
  <label class="flex items-center gap-2">
    <RadioGroup.Item value="disabled" disabled />
    <span>Disabled item</span>
  </label>
</RadioGroup.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">RadioGroup.Root</code> with <code class="ic">RadioGroup.Item</code>
			inside label elements. Bind the root's <code class="ic">value</code> for selection state.
		</p>
		<Preview code={usageCode}>
			<RadioGroup.Root bind:value={radioValue}>
				{#each ['comfortable', 'compact', 'spacious'] as option (option)}
					<label class="flex items-center gap-2">
						<RadioGroup.Item value={option} />
						<span>{option}</span>
					</label>
				{/each}
			</RadioGroup.Root>
		</Preview>
	</section>

	<section id="orientation" class="sec">
		<h2 class="sec__h">Orientation</h2>
		<p class="sec__p">
			Pass <code class="ic">orientation="horizontal"</code> to <code class="ic">RadioGroup.Root</code
			> to lay items in a row.
		</p>
		<Preview code={orientationCode}>
			<RadioGroup.Root orientation="horizontal">
				{#each ['left', 'center', 'right'] as align (align)}
					<label class="flex items-center gap-2">
						<RadioGroup.Item value={align} />
						<span>{align}</span>
					</label>
				{/each}
			</RadioGroup.Root>
		</Preview>
	</section>

	<section id="states" class="sec">
		<h2 class="sec__h">States</h2>
		<p class="sec__p">
			Individual items can be <code class="ic">disabled</code> without disabling the whole group.
		</p>
		<Preview code={statesCode}>
			<RadioGroup.Root value="enabled">
				<label class="flex items-center gap-2">
					<RadioGroup.Item value="enabled" />
					<span>Enabled</span>
				</label>
				<label class="flex items-center gap-2">
					<RadioGroup.Item value="disabled" disabled />
					<span>Disabled item</span>
				</label>
			</RadioGroup.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Both subcomponents also forward all Bits <code class="ic">RadioGroup</code> props via spreading.
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
