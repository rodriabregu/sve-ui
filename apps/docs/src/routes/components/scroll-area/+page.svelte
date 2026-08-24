<script lang="ts">
	import { ScrollArea, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['scroll-area'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'type', label: 'When the scrollbar shows' },
		{ id: 'cost', label: 'The cost of hiding it' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { ScrollArea } from 'sve-ui';
<\u002fscript>

<!-- put the size constraint on Root; Viewport fills it and scrolls -->
<ScrollArea.Root type="always" style="height: 12rem;">
  <ScrollArea.Viewport>
    {#each rows as row (row.id)}
      <p>{row.label}</p>
    {/each}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>`;

	const rows = Array.from({ length: 24 }, (_, i) => i);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Root</code> &gt; <code class="ic">Viewport</code> plus one
			<code class="ic">Scrollbar</code> per axis, each holding a
			<code class="ic">Thumb</code>. Put the height or width constraint on
			<code class="ic">Root</code> — the Viewport fills it and does the actual scrolling.
		</p>
		<Preview code={usageCode} align="start">
			<ScrollArea.Root
				type="always"
				style="height: 10rem; width: 14rem; border: 1px solid var(--doc-border); border-radius: 10px;"
			>
				<ScrollArea.Viewport>
					<div style="padding: 10px 14px;">
						{#each rows as row (row)}
							<Text size="sm">Row {row}</Text>
						{/each}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar orientation="vertical">
					<ScrollArea.Thumb />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</Preview>
	</section>

	<section id="type" class="sec">
		<h2 class="sec__h">When the scrollbar shows</h2>
		<p class="sec__p">
			<code class="ic">type</code> controls visibility: <code class="ic">hover</code> (the default)
			shows it on pointer hover, <code class="ic">scroll</code> only while scrolling,
			<code class="ic">auto</code> follows the platform, and
			<code class="ic">always</code> keeps it visible.
		</p>
		<p class="sec__p">
			Worth knowing: under <code class="ic">hover</code> the scrollbar is not merely transparent —
			it is <strong>not in the DOM at all</strong> until the pointer enters. That is Bits behaviour,
			and it is why the demo above uses <code class="ic">always</code>.
		</p>
	</section>

	<section id="cost" class="sec">
		<h2 class="sec__h">The cost of hiding it</h2>
		<p class="warn">A hidden scrollbar removes the only visual cue that more content exists.</p>
		<p class="sec__p">
			That is the real trade-off of a styled scroll area, and it is easy to miss on a trackpad where
			you scroll by reflex. Prefer <code class="ic">always</code> whenever the overflow is not obvious
			from the content itself — a clipped row of text hints at more, a neatly clipped card does not.
		</p>
		<p class="sec__p">
			The good news is that only the chrome is restyled. Bits keeps the Viewport a real scroll
			container, so wheel, touch and keyboard scrolling all keep working natively — this never traps
			a keyboard user, and it does not virtualise your content.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">ScrollArea.Root</code></p>
		<PropsTable component="ScrollAreaRoot" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">ScrollArea.Scrollbar</code> — <code class="ic">orientation</code> is required by
			Bits; render one per axis you want styled.
		</p>
		<PropsTable component="ScrollAreaScrollbar" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Viewport</code> and <code class="ic">Thumb</code> each take
			<code class="ic">class</code> plus their native attributes.
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
