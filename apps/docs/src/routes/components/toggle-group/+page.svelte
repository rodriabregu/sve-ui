<script lang="ts">
	import { ToggleGroup } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['toggle-group'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'multiple', label: 'Multiple' },
		{ id: 'semantics', label: 'Semantics per mode' },
		{ id: 'orientation', label: 'Orientation' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { ToggleGroup } from 'sve-ui';
  let align = $state('left');
<\u002fscript>

<ToggleGroup.Root type="single" bind:value={align} aria-label="Text alignment">
  <ToggleGroup.Item value="left" aria-label="Align left">L</ToggleGroup.Item>
  <ToggleGroup.Item value="center" aria-label="Align center">C</ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Align right">R</ToggleGroup.Item>
</ToggleGroup.Root>`;

	const multipleCode = `<!-- value is a string[] in multiple mode -->
<ToggleGroup.Root type="multiple" bind:value={marks} aria-label="Text formatting">
  <ToggleGroup.Item value="bold" aria-label="Bold">B</ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic">I</ToggleGroup.Item>
</ToggleGroup.Root>`;

	const orientationCode = `<ToggleGroup.Root type="single" orientation="vertical" bind:value={view} aria-label="View">
  <ToggleGroup.Item value="list" aria-label="List">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid" aria-label="Grid">Grid</ToggleGroup.Item>
</ToggleGroup.Root>`;

	let align = $state('left');
	let marks = $state<string[]>(['bold']);
	let view = $state('list');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">type</code> is required and it is not a detail — it decides both the
			behaviour and the shape of <code class="ic">value</code>.
			<code class="ic">single</code> gives you a string, <code class="ic">multiple</code> gives you
			a
			<code class="ic">string[]</code>. Bits owns roving focus and arrow-key navigation, so the
			whole group is one tab stop.
		</p>
		<Preview code={usageCode}>
			<ToggleGroup.Root type="single" bind:value={align} aria-label="Text alignment">
				<ToggleGroup.Item value="left" aria-label="Align left">L</ToggleGroup.Item>
				<ToggleGroup.Item value="center" aria-label="Align center">C</ToggleGroup.Item>
				<ToggleGroup.Item value="right" aria-label="Align right">R</ToggleGroup.Item>
			</ToggleGroup.Root>
		</Preview>
	</section>

	<section id="multiple" class="sec">
		<h2 class="sec__h">Multiple</h2>
		<p class="sec__p">
			In <code class="ic">multiple</code> mode any number of items can be active at once, and
			<code class="ic">value</code> is an array. Clicking an active item deselects it.
		</p>
		<Preview code={multipleCode}>
			<div class="stack">
				<ToggleGroup.Root type="multiple" bind:value={marks} aria-label="Text formatting">
					<ToggleGroup.Item value="bold" aria-label="Bold">B</ToggleGroup.Item>
					<ToggleGroup.Item value="italic" aria-label="Italic">I</ToggleGroup.Item>
					<ToggleGroup.Item value="underline" aria-label="Underline">U</ToggleGroup.Item>
				</ToggleGroup.Root>
				<p class="cap">value: [{marks.join(', ')}]</p>
			</div>
		</Preview>
	</section>

	<section id="semantics" class="sec">
		<h2 class="sec__h">Semantics per mode</h2>
		<p class="sec__p">
			The two modes expose <strong>different roles</strong>, and that is correct rather than an
			inconsistency. Picking one of a set is a radio group; independent on/off buttons are pressed
			buttons. Screen reader users hear the right thing in each case.
		</p>
		<div class="table">
			<table>
				<thead>
					<tr><th>Mode</th><th>Item role</th><th>State attribute</th></tr>
				</thead>
				<tbody>
					<tr
						><td><code class="ic">single</code></td><td><code class="ic">radio</code></td><td
							><code class="ic">aria-checked</code></td
						></tr
					>
					<tr
						><td><code class="ic">multiple</code></td><td><code class="ic">button</code></td><td
							><code class="ic">aria-pressed</code></td
						></tr
					>
				</tbody>
			</table>
		</div>
		<p class="sec__p">
			Either way, the group needs a name — pass <code class="ic">aria-label</code> on the Root — and icon-only
			items need one each.
		</p>
	</section>

	<section id="orientation" class="sec">
		<h2 class="sec__h">Orientation</h2>
		<p class="sec__p">
			<code class="ic">orientation="vertical"</code> stacks the items and switches arrow-key navigation
			to up/down.
		</p>
		<Preview code={orientationCode}>
			<ToggleGroup.Root type="single" orientation="vertical" bind:value={view} aria-label="View">
				<ToggleGroup.Item value="list" aria-label="List">List</ToggleGroup.Item>
				<ToggleGroup.Item value="grid" aria-label="Grid">Grid</ToggleGroup.Item>
			</ToggleGroup.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">ToggleGroup.Root</code> — plus <code class="ic">type</code> (required),
			<code class="ic">disabled</code>, <code class="ic">loop</code>,
			<code class="ic">orientation</code> and <code class="ic">onValueChange</code> forwarded to Bits.
		</p>
		<PropsTable component="ToggleGroupRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">ToggleGroup.Item</code> — plus <code class="ic">value</code> (required) and
			<code class="ic">disabled</code>.
		</p>
		<PropsTable component="ToggleGroupItem" />
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
	.stack {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 100%;
		max-width: 420px;
	}
	.cap {
		margin: 0;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
	.table {
		border: 1px solid var(--doc-border);
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 16px;
	}
	.table table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
	}
	.table th {
		text-align: left;
		padding: 10px 16px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		background: var(--doc-surface-2);
	}
	.table td {
		padding: 12px 16px;
		border-top: 1px solid var(--doc-border);
		color: var(--doc-fg-muted);
	}
</style>
