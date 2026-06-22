<script lang="ts">
	import { Dialog, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.dialog;

	let open = $state(false);

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'anatomy', label: 'Anatomy' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		// Root
		{ prop: 'Dialog.Root — open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
		{ prop: 'Dialog.Root — onOpenChange', type: '(open: boolean) => void', description: 'Callback fired when open state changes.' },
		// Trigger / Close
		{ prop: 'Dialog.Trigger — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads trigger props onto a real element.' },
		{ prop: 'Dialog.Close — child', type: 'Snippet<[{ props: object }]>', description: 'Render prop that spreads close props onto a real element.' },
		// Content
		{ prop: 'Dialog.Content — class', type: 'string', description: 'Extra classes merged onto the content panel.' },
		// Title / Description
		{ prop: 'Dialog.Title — level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level for the dialog title.' },
		{ prop: 'Dialog.Description — class', type: 'string', description: 'Extra classes merged onto the description.' }
	];

	const usageCode = `<script>
  import { Dialog, Button } from 'sve-ui';

  let open = $state(false);
<\u002fscript>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button color="primary" {...props}>Open Dialog</Button>
    {/snippet}
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Title>Confirm action</Dialog.Title>
    <Dialog.Description>
      This action cannot be undone. Are you sure you want to continue?
    </Dialog.Description>
    <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px;">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button variant="outline" color="default" size="sm" {...props}>Cancel</Button>
        {/snippet}
      </Dialog.Close>
      <Button variant="solid" color="primary" size="sm" onclick={() => (open = false)}>
        Confirm
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>`;

	const anatomyCode = `<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <!-- any focusable element -->
    {/snippet}
  </Dialog.Trigger>

  <!-- Dialog.Content already portals and includes the overlay internally -->
  <Dialog.Content>
    <Dialog.Title>…</Dialog.Title>
    <Dialog.Description>…</Dialog.Description>

    <Dialog.Close>
      {#snippet child({ props })}
        <!-- close button -->
      {/snippet}
    </Dialog.Close>
  </Dialog.Content>
</Dialog.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Use the <code class="ic">child</code> snippet on <code class="ic">Dialog.Trigger</code> and
			<code class="ic">Dialog.Close</code> to render real, accessible elements. The trigger spreads
			all required ARIA and event props onto whatever element you pass.
		</p>
		<Preview code={usageCode}>
			<Dialog.Root bind:open>
				<Dialog.Trigger>
					{#snippet child({ props })}
						<Button color="primary" {...props}>Open Dialog</Button>
					{/snippet}
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Confirm action</Dialog.Title>
					<Dialog.Description>
						This action cannot be undone. Are you sure you want to continue?
					</Dialog.Description>
					<div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px;">
						<Dialog.Close>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Cancel</Button>
							{/snippet}
						</Dialog.Close>
						<Button variant="solid" color="primary" size="sm" onclick={() => (open = false)}>
							Confirm
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</Preview>
	</section>

	<section id="anatomy" class="sec">
		<h2 class="sec__h">Anatomy</h2>
		<p class="sec__p">
			<code class="ic">Dialog.Content</code> already portals to <code class="ic">&lt;body&gt;</code>
			and renders the overlay behind the panel — you do not need to add
			<code class="ic">Dialog.Overlay</code> separately. Focus is trapped inside the content while
			open; pressing <kbd class="ic">Esc</kbd> closes.
		</p>
		<Preview code={anatomyCode}>
			<span style="font-size:13px; color:var(--doc-fg-muted);">
				See the Usage example above for a runnable demo.
			</span>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Built on <code class="ic">bits-ui</code> — all underlying Bits UI Dialog props are forwarded
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
