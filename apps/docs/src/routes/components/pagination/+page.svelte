<script lang="ts">
	import { Pagination } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.pagination;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'snippet', label: 'Why you render the pages' },
		{ id: 'a11y', label: 'Accessibility' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{
			prop: 'count',
			type: 'number',
			required: true,
			description: 'Total number of items to paginate.'
		},
		{
			prop: 'perPage',
			type: 'number',
			default: '1',
			description: 'Items per page. count / perPage gives the page count.'
		},
		{
			prop: 'siblingCount',
			type: 'number',
			default: '1',
			description: 'Visible page buttons either side of the current page.'
		},
		{
			prop: 'onPageChange',
			type: '(page: number) => void',
			description: 'Called when the page changes.'
		},
		{
			prop: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Keyboard navigation wraps at either end.'
		},
		{
			prop: 'orientation',
			type: `'horizontal' | 'vertical'`,
			default: `'horizontal'`,
			description: 'Axis the arrow keys navigate along.'
		}
	];

	const usageCode = `<script>
  import { Pagination } from 'sve-ui';
  let page = $state(1);
<\u002fscript>

<nav aria-label="Pagination">
  <Pagination.Root count={100} perPage={10} bind:page>
    {#snippet children({ pages })}
      <Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
      {#each pages as p (p.key)}
        {#if p.type === 'page'}
          <Pagination.Page page={p}>{p.value}</Pagination.Page>
        {:else}
          <span>…</span>
        {/if}
      {/each}
      <Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
    {/snippet}
  </Pagination.Root>
</nav>`;

	let page = $state(1);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Give Root the <code class="ic">count</code> of items and
			<code class="ic">perPage</code>; it works out the pages.
			<code class="ic">page</code> is bindable.
		</p>
		<Preview code={usageCode} align="start">
			<nav aria-label="Pagination example">
				<Pagination.Root count={100} perPage={10} bind:page>
					{#snippet children({ pages })}
						<Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
						{#each pages as p (p.key)}
							{#if p.type === 'page'}
								<Pagination.Page page={p}>{p.value}</Pagination.Page>
							{:else}
								<span class="ellipsis">…</span>
							{/if}
						{/each}
						<Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
					{/snippet}
				</Pagination.Root>
			</nav>
		</Preview>
	</section>

	<section id="snippet" class="sec">
		<h2 class="sec__h">Why you render the pages</h2>
		<p class="sec__p">
			Root does not emit buttons — it hands you a <code class="ic">pages</code> array through a snippet
			and you render them. That indirection looks like extra work and buys something real: Bits owns the
			page range, the ellipsis logic and the keyboard navigation, while the markup stays entirely yours.
		</p>
		<p class="sec__p">
			Each entry is either <code class="ic">type: 'page'</code> — pass it to
			<code class="ic">Pagination.Page</code> — or <code class="ic">type: 'ellipsis'</code>, which
			you render however you like. Use <code class="ic">p.key</code> as the
			<code class="ic">each</code> key.
		</p>
	</section>

	<section id="a11y" class="sec">
		<h2 class="sec__h">Accessibility</h2>
		<p class="sec__p">
			Wrap the whole thing in <code class="ic">&lt;nav aria-label="Pagination"&gt;</code>. Bits
			gives the buttons their roles and marks the active page with
			<code class="ic">data-selected</code> and <code class="ic">aria-label</code>, so the current
			page is announced rather than only coloured differently.
		</p>
		<p class="sec__p">
			Prev and Next are disabled at the ends automatically. If you render them as arrows with no
			text, give each an <code class="ic">aria-label</code> — an unlabelled arrow button is announced
			as nothing at all.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Pagination.Root</code></p>
		<PropsTable component="PaginationRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Page</code> takes the <code class="ic">page</code> object from the snippet.
			<code class="ic">PrevButton</code> and <code class="ic">NextButton</code> take
			<code class="ic">class</code> plus the native button attributes.
		</p>
		<PropsTable component="PaginationPage" />
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
	.ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		color: var(--doc-fg-subtle);
	}
</style>
