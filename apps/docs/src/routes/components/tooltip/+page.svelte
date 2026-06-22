<script lang="ts">
	import { Tooltip, Button, Badge } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.tooltip;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'placement', label: 'Placement' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		// Provider
		{ prop: 'Tooltip.Provider — delayDuration', type: 'number', default: '700', description: 'Delay in ms before the tooltip opens on hover.' },
		{ prop: 'Tooltip.Provider — skipDelayDuration', type: 'number', default: '300', description: 'Delay in ms before a second tooltip opens without the full delay.' },
		// Root
		{ prop: 'Tooltip.Root — open', type: 'boolean', description: 'Controlled open state.' },
		{ prop: 'Tooltip.Root — onOpenChange', type: '(open: boolean) => void', description: 'Callback fired when open state changes.' },
		// Trigger
		{ prop: 'Tooltip.Trigger — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads trigger props onto a real element.' },
		// Content
		{ prop: 'Tooltip.Content — side', type: `'top' | 'right' | 'bottom' | 'left'`, default: `'top'`, description: 'Preferred side for the tooltip.' },
		{ prop: 'Tooltip.Content — sideOffset', type: 'number', default: '4', description: 'Gap in px between trigger and tooltip.' },
		{ prop: 'Tooltip.Content — class', type: 'string', description: 'Extra classes merged onto the tooltip panel.' }
	];

	const usageCode = `<script>
  import { Tooltip, Button } from 'sve-ui';
<\u002fscript>

<!-- Tooltip.Provider must wrap all tooltips on the page (or the whole app) -->
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        <Button variant="outline" color="default" size="sm" {...props}>Hover me</Button>
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content>Tooltip hint text</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`;

	const placementCode = `<Tooltip.Provider>
  <div style="display:flex; gap:12px; flex-wrap:wrap;">
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button variant="outline" color="default" size="sm" {...props}>Top</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content side="top">Opens above</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button variant="outline" color="default" size="sm" {...props}>Right</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content side="right">Opens to the right</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button variant="outline" color="default" size="sm" {...props}>Bottom</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">Opens below</Tooltip.Content>
    </Tooltip.Root>
  </div>
</Tooltip.Provider>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Wrap all tooltips in a single <code class="ic">Tooltip.Provider</code> — it manages shared
			delay timing and the "skip delay" behaviour when moving between triggers quickly. The
			<code class="ic">child</code> snippet on <code class="ic">Tooltip.Trigger</code> renders any
			focusable element as the anchor.
		</p>
		<Preview code={usageCode}>
			<Tooltip.Provider>
				<div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Hover me</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Tooltip hint text</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Badge color="primary" {...props}>Badge with tooltip</Badge>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Works on any focusable element</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</Tooltip.Provider>
		</Preview>
	</section>

	<section id="placement" class="sec">
		<h2 class="sec__h">Placement</h2>
		<p class="sec__p">
			The <code class="ic">side</code> prop on <code class="ic">Tooltip.Content</code> controls
			preferred placement. Like all floating elements, it auto-flips near viewport edges.
		</p>
		<Preview code={placementCode}>
			<Tooltip.Provider>
				<div style="display:flex; gap:12px; flex-wrap:wrap;">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Top</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content side="top">Opens above</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Right</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content side="right">Opens to the right</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Bottom</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content side="bottom">Opens below</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Left</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content side="left">Opens to the left</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</Tooltip.Provider>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Built on <code class="ic">bits-ui</code> — all underlying Bits UI Tooltip props are forwarded
			transparently.
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
