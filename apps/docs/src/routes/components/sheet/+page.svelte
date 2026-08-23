<script lang="ts">
	import { Sheet, Button, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.sheet;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sides', label: 'Sides' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'vs-dialog', label: 'Sheet vs Dialog' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Sheet } from 'sve-ui';
<\u002fscript>

<Sheet.Root>
  <Sheet.Trigger>Open filters</Sheet.Trigger>
  <Sheet.Content side="right" size="md">
    <Sheet.Title>Filters</Sheet.Title>
    <Sheet.Description>Narrow the result list.</Sheet.Description>
    <Sheet.Close>Done</Sheet.Close>
  </Sheet.Content>
</Sheet.Root>`;

	const sidesCode = `<Sheet.Content side="right">...</Sheet.Content>
<Sheet.Content side="left">...</Sheet.Content>
<Sheet.Content side="top">...</Sheet.Content>
<Sheet.Content side="bottom">...</Sheet.Content>`;

	const sizesCode = `<!-- size sets the axis the panel grows along:
     width for left/right, height for top/bottom -->
<Sheet.Content side="right" size="sm">...</Sheet.Content>
<Sheet.Content side="bottom" size="lg">...</Sheet.Content>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			A Sheet is a <a href="/components/dialog">Dialog</a> anchored to an edge — it is not a separate
			primitive. It composes Bits Dialog, so the focus trap, ESC handling, scroll lock and ARIA all
			come from there rather than being reimplemented. <code class="ic">Title</code> is required,
			because Bits points <code class="ic">aria-labelledby</code> at it.
		</p>
		<Preview code={usageCode}>
			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline">Open filters</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content>
					<Sheet.Title>Filters</Sheet.Title>
					<Sheet.Description>Narrow the result list.</Sheet.Description>
					<Sheet.Close>
						{#snippet child({ props })}
							<Button {...props} size="sm">Done</Button>
						{/snippet}
					</Sheet.Close>
				</Sheet.Content>
			</Sheet.Root>
		</Preview>
	</section>

	<section id="sides" class="sec">
		<h2 class="sec__h">Sides</h2>
		<p class="sec__p">
			<code class="ic">side</code> pins the panel to an edge and spans the perpendicular axis.
			<code class="ic">right</code> is the default because it is the least disruptive on desktop;
			<code class="ic">bottom</code> is usually the right call on mobile, where the thumb is.
		</p>
		<Preview code={sidesCode}>
			<div class="row">
				{#each ['right', 'left', 'top', 'bottom'] as const as side (side)}
					<Sheet.Root>
						<Sheet.Trigger>
							{#snippet child({ props })}
								<Button {...props} variant="outline" size="sm">{side}</Button>
							{/snippet}
						</Sheet.Trigger>
						<Sheet.Content {side}>
							<Sheet.Title>Panel from {side}</Sheet.Title>
							<Text size="sm">Press Escape to close.</Text>
						</Sheet.Content>
					</Sheet.Root>
				{/each}
			</div>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">
			<code class="ic">size</code> applies to whichever axis the panel actually grows along — width
			for <code class="ic">left</code>/<code class="ic">right</code>, height for
			<code class="ic">top</code>/<code class="ic">bottom</code>. Every size is capped against the
			viewport, so a large sheet still fits on a small screen.
		</p>
		<Preview code={sizesCode}>
			<div class="row">
				{#each ['sm', 'md', 'lg'] as const as size (size)}
					<Sheet.Root>
						<Sheet.Trigger>
							{#snippet child({ props })}
								<Button {...props} variant="outline" size="sm">{size}</Button>
							{/snippet}
						</Sheet.Trigger>
						<Sheet.Content {size}>
							<Sheet.Title>Size {size}</Sheet.Title>
							<Text size="sm">Press Escape to close.</Text>
						</Sheet.Content>
					</Sheet.Root>
				{/each}
			</div>
		</Preview>
	</section>

	<section id="vs-dialog" class="sec">
		<h2 class="sec__h">Sheet vs Dialog</h2>
		<p class="sec__p">
			Same mechanics, different intent. Use a <strong>Dialog</strong> for a focused, self-contained
			task the user finishes and leaves. Use a <strong>Sheet</strong> for a secondary surface they
			move through and refer back to — a nav drawer, a filter panel, a detail pane. The edge anchoring
			is what signals "this sits beside your work" rather than "this interrupts it".
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Root</code>, <code class="ic">Trigger</code> and
			<code class="ic">Close</code> are re-exported from Bits Dialog unchanged —
			<code class="ic">open</code> is bindable on Root.
		</p>
		<p class="sec__p"><code class="ic">Sheet.Content</code></p>
		<PropsTable component="SheetContent" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Title</code>, <code class="ic">Description</code> and
			<code class="ic">Overlay</code> each take <code class="ic">class</code> plus their native
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
	.sec__p a { color: var(--doc-primary-text); }
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
</style>
