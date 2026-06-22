<script lang="ts">
	import { Popover, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.popover;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'placement', label: 'Placement' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		// Root
		{ prop: 'Popover.Root — open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
		{ prop: 'Popover.Root — onOpenChange', type: '(open: boolean) => void', description: 'Callback fired when open state changes.' },
		// Trigger
		{ prop: 'Popover.Trigger — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads trigger props onto a real element.' },
		// Content
		{ prop: 'Popover.Content — class', type: 'string', description: 'Extra classes merged onto the content panel.' },
		{ prop: 'Popover.Content — side', type: `'top' | 'right' | 'bottom' | 'left'`, default: `'bottom'`, description: 'Preferred side to render the popover.' },
		{ prop: 'Popover.Content — sideOffset', type: 'number', default: '4', description: 'Gap in px between trigger and content.' },
		{ prop: 'Popover.Content — align', type: `'start' | 'center' | 'end'`, default: `'start'`, description: 'Alignment of the content relative to the trigger.' },
		// Close
		{ prop: 'Popover.Close — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads close props onto a real element.' }
	];

	const usageCode = `<script>
  import { Popover, Button } from 'sve-ui';
<\/script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button variant="outline" color="primary" {...props}>Open Popover</Button>
    {/snippet}
  </Popover.Trigger>

  <Popover.Content>
    <p style="margin:0 0 12px; font-size:14px;">
      Popovers display rich secondary content anchored to a trigger.
      They close on outside click or Esc.
    </p>
    <Popover.Close>
      {#snippet child({ props })}
        <Button variant="ghost" color="default" size="sm" {...props}>Dismiss</Button>
      {/snippet}
    </Popover.Close>
  </Popover.Content>
</Popover.Root>`;

	const placementCode = `<!-- Preferred side — auto-flips when near viewport edge -->
<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button variant="outline" color="default" size="sm" {...props}>Top</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content side="top">
    <p style="margin:0; font-size:13px;">Opens above the trigger.</p>
  </Popover.Content>
</Popover.Root>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button variant="outline" color="default" size="sm" {...props}>Right</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content side="right">
    <p style="margin:0; font-size:13px;">Opens to the right.</p>
  </Popover.Content>
</Popover.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Use the <code class="ic">child</code> snippet on <code class="ic">Popover.Trigger</code> to
			render any element as the anchor. The content portals to <code class="ic">&lt;body&gt;</code>
			and closes on outside click or <kbd class="ic">Esc</kbd>. Use
			<code class="ic">Popover.Close</code> for an explicit dismiss action inside the panel.
		</p>
		<Preview code={usageCode}>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" color="primary" {...props}>Open Popover</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content>
					<p style="margin:0 0 12px; font-size:14px; color:var(--doc-fg-muted);">
						Popovers display rich secondary content anchored to a trigger. They close on outside
						click or Esc.
					</p>
					<Popover.Close>
						{#snippet child({ props })}
							<Button variant="ghost" color="default" size="sm" {...props}>Dismiss</Button>
						{/snippet}
					</Popover.Close>
				</Popover.Content>
			</Popover.Root>
		</Preview>
	</section>

	<section id="placement" class="sec">
		<h2 class="sec__h">Placement</h2>
		<p class="sec__p">
			The <code class="ic">side</code> prop sets the preferred placement. The popover
			auto-flips when there is not enough space near a viewport edge.
		</p>
		<Preview code={placementCode}>
			<div style="display:flex; gap:12px; flex-wrap:wrap;">
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" color="default" size="sm" {...props}>Top</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content side="top">
						<p style="margin:0; font-size:13px; color:var(--doc-fg-muted);">Opens above the trigger.</p>
					</Popover.Content>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" color="default" size="sm" {...props}>Right</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content side="right">
						<p style="margin:0; font-size:13px; color:var(--doc-fg-muted);">Opens to the right.</p>
					</Popover.Content>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" color="default" size="sm" {...props}>Bottom</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content side="bottom">
						<p style="margin:0; font-size:13px; color:var(--doc-fg-muted);">Opens below (default).</p>
					</Popover.Content>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" color="default" size="sm" {...props}>Left</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content side="left">
						<p style="margin:0; font-size:13px; color:var(--doc-fg-muted);">Opens to the left.</p>
					</Popover.Content>
				</Popover.Root>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Built on <code class="ic">bits-ui</code> — all underlying Bits UI Popover props are forwarded
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
