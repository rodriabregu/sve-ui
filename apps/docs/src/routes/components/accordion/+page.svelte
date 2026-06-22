<script lang="ts">
	import { Accordion } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.accordion;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'multiple', label: 'Multiple' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'type', type: `'single' | 'multiple'`, default: `'single'`, description: 'Single allows one open item at a time; multiple allows many.' },
		{ prop: 'value', type: 'string | string[]', description: 'Controlled open item(s). Use bind:value for two-way binding.' },
		{ prop: 'onValueChange', type: '(value: string & string[]) => void', description: 'Called when the open item(s) change.' },
		{ prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all triggers in the accordion.' },
		{ prop: 'loop', type: 'boolean', default: 'true', description: 'Keyboard focus loops from last trigger back to first.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Compose Accordion.Item blocks inside.' }
	];

	const usageCode = `<script>
  import { Accordion } from 'sve-ui';
<\u002fscript>

<Accordion.Root type="single">
  <Accordion.Item value="a">
    <Accordion.Header>
      <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      Yes — built on Bits UI with full WAI-ARIA support and keyboard navigation.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="b">
    <Accordion.Header>
      <Accordion.Trigger>Does it need Tailwind?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      No. Styles ship with the package; theme everything via CSS variables.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="c">
    <Accordion.Header>
      <Accordion.Trigger>Can I animate it?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      Yes. Target the data-state attribute on Content for CSS transitions.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`;

	const multipleCode = `<Accordion.Root type="multiple">
  <Accordion.Item value="a">
    <Accordion.Header>
      <Accordion.Trigger>First panel</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Both panels can be open at the same time.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="b">
    <Accordion.Header>
      <Accordion.Trigger>Second panel</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Opening one does not close the other.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Import the namespace and compose <code class="ic">Accordion.Root</code>,
			<code class="ic">Accordion.Item</code>, <code class="ic">Accordion.Header</code>,
			<code class="ic">Accordion.Trigger</code>, and <code class="ic">Accordion.Content</code>.
			The <code class="ic">type</code> prop controls whether one or many items can be open at once.
		</p>
		<Preview code={usageCode} align="start">
			<div style="width: 100%; max-width: 480px;">
				<Accordion.Root type="single">
					<Accordion.Item value="a">
						<Accordion.Header>
							<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content>
							Yes — built on Bits UI with full WAI-ARIA support and keyboard navigation.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="b">
						<Accordion.Header>
							<Accordion.Trigger>Does it need Tailwind?</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content>
							No. Styles ship with the package; theme everything via CSS variables.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="c">
						<Accordion.Header>
							<Accordion.Trigger>Can I animate it?</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content>
							Yes. Target the <code class="ic">data-state</code> attribute on Content for CSS transitions.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</Preview>
	</section>

	<section id="multiple" class="sec">
		<h2 class="sec__h">Multiple</h2>
		<p class="sec__p">
			Set <code class="ic">type="multiple"</code> to allow several items to stay open simultaneously.
			Each item's open state is independent.
		</p>
		<Preview code={multipleCode} align="start">
			<div style="width: 100%; max-width: 480px;">
				<Accordion.Root type="multiple">
					<Accordion.Item value="a">
						<Accordion.Header>
							<Accordion.Trigger>First panel</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content>Both panels can be open at the same time.</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="b">
						<Accordion.Header>
							<Accordion.Trigger>Second panel</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content>Opening one does not close the other.</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Props for <code class="ic">Accordion.Root</code>. Each
			<code class="ic">Accordion.Item</code> requires a unique <code class="ic">value</code> string
			that pairs its <code class="ic">Trigger</code> with its <code class="ic">Content</code>.
			All parts accept <code class="ic">class</code> for custom overrides.
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
