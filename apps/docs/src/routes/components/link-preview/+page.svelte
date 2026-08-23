<script lang="ts">
	import { LinkPreview, Text, Heading } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	// Forwarded straight to the Bits primitive, so they are not declared on our
	// own Props and cannot be generated. Curated here instead of omitted.
	const rootProps: PropRow[] = [
		{ prop: 'open', type: 'boolean', default: 'false', description: 'Bindable open state of the card.' },
		{ prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the card opens or closes.' },
		{ prop: 'openDelay', type: 'number', default: '700', description: 'Milliseconds of hover before the card opens.' },
		{ prop: 'closeDelay', type: 'number', default: '300', description: 'Milliseconds after the pointer leaves before it closes.' }
	];

	const triggerProps: PropRow[] = [
		{ prop: 'href', type: 'string', description: 'Destination. Kept as a real anchor href so the link works without the card.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the trigger.' }
	];

	const meta = componentBySlug['link-preview'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'limits', label: 'Know the limits' },
		{ id: 'role', label: 'The trigger reports as a button' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { LinkPreview } from 'sve-ui';
<\u002fscript>

<LinkPreview.Root>
  <LinkPreview.Trigger href="https://svelte.dev">Svelte</LinkPreview.Trigger>
  <LinkPreview.Content>
    <strong>Svelte</strong>
    <p>A web framework that compiles your components.</p>
  </LinkPreview.Content>
</LinkPreview.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			The hover-card pattern: peek at what is behind a link without following it. Content portals to
			<code class="ic">&lt;body&gt;</code> automatically, so z-index stacking stays clean.
		</p>
		<Preview code={usageCode}>
			<LinkPreview.Root>
				<LinkPreview.Trigger href="https://svelte.dev">Svelte</LinkPreview.Trigger>
				<LinkPreview.Content>
					<Heading level={4} size="sm">Svelte</Heading>
					<Text size="sm">A web framework that compiles your components.</Text>
				</LinkPreview.Content>
			</LinkPreview.Root>
		</Preview>
	</section>

	<section id="limits" class="sec">
		<h2 class="sec__h">Know the limits</h2>
		<p class="warn">
			<strong>This card opens on pointer hover only.</strong> It does not open on focus, so keyboard
			users never see it, and there is no hover on touch, so mobile users never see it either.
		</p>
		<p class="sec__p">
			That makes it enrichment, never a delivery mechanism. Everything inside the card must be
			reachable another way — put an action or a fact only in here and you have hidden it from a large
			share of your users. The upside is that the trigger stays a real
			<code class="ic">&lt;a href&gt;</code>, so the destination itself is always reachable.
		</p>
		<p class="sec__p">
			If the content is essential, use a <a href="/components/popover">Popover</a> — it opens on
			click, which works for every input method.
		</p>
	</section>

	<section id="role" class="sec">
		<h2 class="sec__h">The trigger reports as a button</h2>
		<p class="sec__p">
			Worth knowing before you ship it: Bits renders the trigger as an anchor with your
			<code class="ic">href</code>, but overrides its role to
			<code class="ic">button</code> with <code class="ic">aria-haspopup="dialog"</code>. A screen
			reader therefore announces "button", not "link", so the element does not advertise that it
			navigates.
		</p>
		<p class="sec__p">
			The practical consequence: do not rely on the trigger alone to communicate a destination. Make
			the link text say where it goes, or provide the same navigation somewhere that is announced as a
			link.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Root</code>, <code class="ic">Trigger</code> and
			<code class="ic">Arrow</code> are re-exported from Bits unchanged, so their props are forwarded
			rather than redeclared.
		</p>
		<p class="sec__p"><code class="ic">LinkPreview.Root</code></p>
		<PropsTable rows={rootProps} />
		<p class="sec__p" style="margin-top:16px"><code class="ic">LinkPreview.Trigger</code> — plus the native anchor attributes.</p>
		<PropsTable rows={triggerProps} />
		<p class="sec__p" style="margin-top:16px"><code class="ic">LinkPreview.Content</code> — plus the Bits floating-position props (<code class="ic">side</code>, <code class="ic">align</code>, <code class="ic">sideOffset</code>).</p>
		<PropsTable component="LinkPreviewContent" />
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
	.warn {
		margin: 0 0 16px; padding: 12px 14px;
		border-left: 3px solid var(--doc-primary-text);
		background: var(--doc-surface-2);
		border-radius: 0 8px 8px 0;
		font-size: 14px; line-height: 1.55; color: var(--doc-fg-muted);
	}
</style>
