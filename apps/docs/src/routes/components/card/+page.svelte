<script lang="ts">
	import { Card, Button, Heading, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.card;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'variants', label: 'Variants' },
		{ id: 'composition', label: 'Composition' },
		{ id: 'props', label: 'Props' }
	];

	const rootProps: PropRow[] = [
		{ prop: 'variant', type: `'elevated' | 'outlined' | 'filled'`, default: `'elevated'` },
		{ prop: 'padding', type: `'2' | '4' | '6' | '8'`, description: 'Shorthand padding applied to the root. Omit to let Header/Content/Footer control spacing.' },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Card sections (Header, Content, Footer).' }
	];

	const subProps: PropRow[] = [
		{ prop: 'class', type: 'string', description: 'Extra classes.' },
		{ prop: 'children', type: 'Snippet', description: 'Section content.' }
	];

	const usageCode = `<script>
  import { Card, Heading, Text } from 'sve-ui';
<\u002fscript>

<Card.Root>
  <Card.Header>
    <Heading level={4} size="sm">Card title</Heading>
  </Card.Header>
  <Card.Content>
    <Text size="sm">Card body content goes here.</Text>
  </Card.Content>
</Card.Root>`;

	const variantsCode = `<Card.Root variant="elevated">
  <Card.Content>
    <Text size="sm">Elevated — drop shadow, no border.</Text>
  </Card.Content>
</Card.Root>

<Card.Root variant="outlined">
  <Card.Content>
    <Text size="sm">Outlined — visible border, no shadow.</Text>
  </Card.Content>
</Card.Root>

<Card.Root variant="filled">
  <Card.Content>
    <Text size="sm">Filled — filled background surface.</Text>
  </Card.Content>
</Card.Root>`;

	const compositionCode = `<Card.Root variant="elevated">
  <Card.Header>
    <Heading level={4} size="sm">Invoice #1042</Heading>
  </Card.Header>
  <Card.Content>
    <Text size="sm">Due on July 15 · $240.00</Text>
  </Card.Content>
  <Card.Footer>
    <Button variant="solid" color="primary" size="sm">Pay now</Button>
    <Button variant="ghost" color="default" size="sm">Dismiss</Button>
  </Card.Footer>
</Card.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Card.Root</code> with <code class="ic">Card.Header</code>,
			<code class="ic">Card.Content</code>, and <code class="ic">Card.Footer</code>. Use only the
			sections you need.
		</p>
		<Preview code={usageCode} align="start">
			<Card.Root>
				<Card.Header>
					<Heading level={4} size="sm">Card title</Heading>
				</Card.Header>
				<Card.Content>
					<Text size="sm">Card body content goes here.</Text>
				</Card.Content>
			</Card.Root>
		</Preview>
	</section>

	<section id="variants" class="sec">
		<h2 class="sec__h">Variants</h2>
		<p class="sec__p">
			Three surface treatments via the <code class="ic">variant</code> prop on
			<code class="ic">Card.Root</code>.
		</p>
		<Preview code={variantsCode} align="start">
			<div style="display: flex; flex-direction: column; gap: 14px; width: 100%; max-width: 340px;">
				<Card.Root variant="elevated">
					<Card.Content>
						<Text size="sm">Elevated — drop shadow, no border.</Text>
					</Card.Content>
				</Card.Root>
				<Card.Root variant="outlined">
					<Card.Content>
						<Text size="sm">Outlined — visible border, no shadow.</Text>
					</Card.Content>
				</Card.Root>
				<Card.Root variant="filled">
					<Card.Content>
						<Text size="sm">Filled — filled background surface.</Text>
					</Card.Content>
				</Card.Root>
			</div>
		</Preview>
	</section>

	<section id="composition" class="sec">
		<h2 class="sec__h">Composition</h2>
		<p class="sec__p">
			Header gets a bottom border, Footer gets a top border. Mix in any other Sve·UI component.
		</p>
		<Preview code={compositionCode} align="start">
			<Card.Root variant="elevated" style="width: 100%; max-width: 340px;">
				<Card.Header>
					<Heading level={4} size="sm">Invoice #1042</Heading>
				</Card.Header>
				<Card.Content>
					<Text size="sm">Due on July 15 · $240.00</Text>
				</Card.Content>
				<Card.Footer>
					<Button variant="solid" color="primary" size="sm">Pay now</Button>
					<Button variant="ghost" color="default" size="sm">Dismiss</Button>
				</Card.Footer>
			</Card.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Card.Root</code></p>
		<PropsTable rows={rootProps} />
		<p class="sec__p" style="margin-top: 24px;">
			<code class="ic">Card.Header</code> · <code class="ic">Card.Content</code> ·
			<code class="ic">Card.Footer</code>
		</p>
		<PropsTable rows={subProps} />
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
