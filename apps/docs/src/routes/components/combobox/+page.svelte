<script lang="ts">
	import { Combobox } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.combobox;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'filtering', label: 'Filtering' },
		{ id: 'props', label: 'Props' }
	];

	let comboValue = $state('');
	let comboQuery = $state('');
	const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];
	let filteredFruits = $derived(
		fruits.filter((f) => f.toLowerCase().includes(comboQuery.toLowerCase()))
	);

	const usageCode = `<script>
  import { Combobox } from 'sve-ui';
  let comboValue = $state('');
  let comboQuery = $state('');
  const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];
  let filteredFruits = $derived(
    fruits.filter((f) => f.toLowerCase().includes(comboQuery.toLowerCase()))
  );
<\u002fscript>

<Combobox.Root type="single" bind:value={comboValue}>
  <Combobox.Input
    placeholder="Search fruit…"
    oninput={(e) => (comboQuery = e.currentTarget.value)}
  />
  <Combobox.Content>
    {#each filteredFruits as fruit (fruit)}
      <Combobox.Item value={fruit} label={fruit}>{fruit}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`;

	const filteringCode = `<!-- Filtering is consumer-driven: derive from comboQuery -->
<script>
  let comboQuery = $state('');
  let filteredFruits = $derived(
    fruits.filter((f) => f.toLowerCase().includes(comboQuery.toLowerCase()))
  );
<\u002fscript>

<Combobox.Input oninput={(e) => (comboQuery = e.currentTarget.value)} />`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Combobox.Root</code>, <code class="ic">Combobox.Input</code>,
			<code class="ic">Combobox.Content</code>, and <code class="ic">Combobox.Item</code>. Filtering
			is consumer-driven — update a derived list from the input's value.
		</p>
		<Preview code={usageCode}>
			<Combobox.Root type="single" bind:value={comboValue}>
				<Combobox.Input
					placeholder="Search fruit…"
					oninput={(e) => (comboQuery = e.currentTarget.value)}
				/>
				<Combobox.Content>
					{#each filteredFruits as fruit (fruit)}
						<Combobox.Item value={fruit} label={fruit}>{fruit}</Combobox.Item>
					{/each}
				</Combobox.Content>
			</Combobox.Root>
		</Preview>
	</section>

	<section id="filtering" class="sec">
		<h2 class="sec__h">Filtering</h2>
		<p class="sec__p">
			The component does not filter internally. Declare a <code class="ic">comboQuery</code> state
			variable, update it from <code class="ic">Combobox.Input</code>'s
			<code class="ic">oninput</code> handler, and derive the filtered list with
			<code class="ic">$derived</code>. This gives you full control over the matching algorithm.
		</p>
		<Preview code={filteringCode}>
			<Combobox.Root type="single" bind:value={comboValue}>
				<Combobox.Input
					placeholder="Type to filter…"
					oninput={(e) => (comboQuery = e.currentTarget.value)}
				/>
				<Combobox.Content>
					{#each filteredFruits as fruit (fruit)}
						<Combobox.Item value={fruit} label={fruit}>{fruit}</Combobox.Item>
					{/each}
				</Combobox.Content>
			</Combobox.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Combobox.Root</code></p>
		<PropsTable component="ComboboxRoot" />
		<p class="sec__p"><code class="ic">Combobox.Input</code></p>
		<PropsTable component="ComboboxInput" />
		<p class="sec__p"><code class="ic">Combobox.Content</code></p>
		<PropsTable component="ComboboxContent" />
		<p class="sec__p"><code class="ic">Combobox.Item</code></p>
		<PropsTable component="ComboboxItem" />
		<p class="sec__p">
			All subcomponents forward their corresponding Bits props and native HTML attributes via
			spreading.
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
</style>
