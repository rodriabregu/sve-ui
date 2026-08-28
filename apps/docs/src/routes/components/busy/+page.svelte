<script lang="ts">
	import { Busy, Button, Spinner } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.busy;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why it exists' },
		{ id: 'done', label: 'Say what arrived' },
		{ id: 'delay', label: 'The delay' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Busy, Spinner } from 'sve-ui';
  let loading = $state(true);
  let projects = $state([]);
<\u002fscript>

<Busy
  busy={loading}
  label="Loading projects"
  doneLabel={\`\${projects.length} projects loaded\`}
>
  {#if loading}
    <Spinner />
  {:else}
    <Table.Root>…</Table.Root>
  {/if}
</Busy>`;

	let loading = $state(false);
	let count = $state(0);

	async function reload() {
		loading = true;
		await new Promise((r) => setTimeout(r, 1200));
		count = 3;
		loading = false;
	}
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Wrap any region whose content is being fetched or replaced.
			<code class="ic">aria-busy</code> tells assistive technology the region is unstable, so a
			screen reader can hold off reading a half-built list, and the paired live region says what is
			happening — <code class="ic">aria-busy</code> announces nothing on its own.
		</p>
		<Preview code={usageCode} align="start">
			<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
				<Busy busy={loading} label="Loading projects" doneLabel="3 projects loaded">
					{#if loading}
						<Spinner />
					{:else}
						<span class="cap">{count} projects</span>
					{/if}
				</Busy>
				<Button variant="outline" onclick={reload} {loading} loadingLabel="Loading">Reload</Button>
			</div>
		</Preview>
		<p class="cap">Nothing visible changes for a sighted user. That is the point.</p>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why it exists</h2>
		<p class="sec__p">
			This component was found by building a real app, not by planning. Writing its loading branch,
			there was <strong>no way to express "this region is loading"</strong>:
			<code class="ic">Spinner</code> is decorative and announces nothing, and
			<code class="ic">aria-busy</code> existed on two components out of sixty.
		</p>
		<p class="sec__p">
			So a screen reader user got a second of silence and then a table appearing, with no warning
			either way.
		</p>
		<p class="warn">
			The docs site never surfaced it, because it renders everything synchronously from a static
			registry. Latency is what exposed the gap — which is the argument for the example app in this
			repo.
		</p>
	</section>

	<section id="done" class="sec">
		<h2 class="sec__h">Say what arrived</h2>
		<p class="sec__p">
			<code class="ic">doneLabel</code> should name the <em>result</em>, not the event.
			<code class="ic">"3 projects loaded"</code> beats <code class="ic">"Done"</code>, which tells
			the user the wait is over and nothing about what they got.
		</p>
		<p class="sec__p">
			Omitting it means the user is told the content is loading and <strong
				>never told it finished</strong
			>. That is worse than saying nothing at all. It is left as your call, and it is the wrong one.
		</p>
	</section>

	<section id="delay" class="sec">
		<h2 class="sec__h">The delay</h2>
		<p class="sec__p">
			The loading message waits <code class="ic">delay</code> (400ms) before it is announced. A response
			that arrives in 80ms does not need narrating; announcing it just talks over the user for no reason.
		</p>
		<p class="sec__p">
			If the wait beats the delay, <strong>only the completion is announced</strong> — which is the right
			outcome: the content arriving is the part the user cannot see coming.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<PropsTable component="Busy" />
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
	.cap {
		margin: 12px 0 0;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
</style>
