<script lang="ts">
	import { Stack } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.stack;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'narrow', label: 'Why the API is narrow' },
		{ id: 'as', label: 'Keeping the markup semantic' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Stack } from 'sve-ui';
<\u002fscript>

<Stack gap={4}>
  <Input placeholder="Name" />
  <Input placeholder="Email" />
  <Button>Save</Button>
</Stack>`;

	const asCode = `<!-- a real list, not a div pretending to be one -->
<Stack gap={2} as="ul">
  {#each items as item (item.id)}
    <li>{item.label}</li>
  {/each}
</Stack>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">&lt;Stack gap={4}&gt;</code> is
			<code class="ic">display: flex; flex-direction: column; gap: 1rem</code>, with the gap bound
			to the spacing scale. <code class="ic">align</code> defaults to
			<code class="ic">stretch</code>, which is what you want for stacked form fields.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Stack gap={4}>
					<div class="box">First</div>
					<div class="box">Second</div>
					<div class="box">Third</div>
				</Stack>
			</div>
		</Preview>
	</section>

	<section id="narrow" class="sec">
		<h2 class="sec__h">Why the API is narrow</h2>
		<p class="warn">
			There is no <code class="ic">margin</code>, <code class="ic">padding</code>,
			<code class="ic">width</code> or colour prop. That is deliberate.
		</p>
		<p class="sec__p">
			<strong>Margin belongs to the parent.</strong> A component that sets its own outer margin
			cannot be reused in a layout that spaces things differently — you end up overriding it, which
			is worse than never having had it. And an <code class="ic">each</code>-generated list gets
			even rhythm from one <code class="ic">gap</code> rather than a margin on every item plus a
			<code class="ic">:last-child</code> exception.
		</p>
		<p class="sec__p">
			<strong>The gap is a token key, not a length.</strong> <code class="ic">gap={4}</code>, not
			<code class="ic">gap="17px"</code>. Constraining it is the whole point: it keeps vertical
			rhythm consistent across the app instead of letting every screen invent its own spacing.
		</p>
		<p class="sec__p">
			This library shipped the other version of this component before
			<code class="ic">1.0</code>. <code class="ic">Box</code> took seventeen style props with
			duplicate aliases — <code class="ic">p</code>/<code class="ic">padding</code>,
			<code class="ic">m</code>/<code class="ic">margin</code>,
			<code class="ic">w</code>/<code class="ic">width</code> — and concatenated inline style strings.
			It had reinvented CSS with a worse syntax, and it was dropped rather than ported. The moment you
			want something Stack does not express, reach for CSS: that is not a gap in the component, it is
			the boundary working.
		</p>
	</section>

	<section id="as" class="sec">
		<h2 class="sec__h">Keeping the markup semantic</h2>
		<p class="sec__p">
			Use <code class="ic">as</code> to render the element the content actually is —
			<code class="ic">ul</code> for a list, <code class="ic">fieldset</code> for grouped inputs,
			<code class="ic">nav</code> for navigation — instead of wrapping a div around it. List styling
			is reset, so <code class="ic">as="ul"</code> stays semantic without looking like a bulleted list.
		</p>
		<Preview code={asCode} align="start">
			<div class="demo">
				<Stack gap={2} as="ul">
					<li class="box">List item one</li>
					<li class="box">List item two</li>
				</Stack>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native attribute of the element you render, via prop spreading. Reach for
			<a href="/components/flex">Flex</a> when the direction is not vertical.
		</p>
		<PropsTable component="Stack" />
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
	.sec__p a {
		color: var(--doc-primary-text);
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
	.box {
		padding: 8px 12px;
		border-radius: 8px;
		background: var(--doc-surface-2);
		border: 1px solid var(--doc-border);
		font-size: 13px;
		color: var(--doc-fg-muted);
	}
	.demo {
		width: 100%;
		max-width: 420px;
	}
</style>
