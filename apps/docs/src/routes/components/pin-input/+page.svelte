<script lang="ts">
	import { PinInput } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['pin-input'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'one-input', label: 'One input, not six' },
		{ id: 'naming', label: 'Naming it' },
		{ id: 'props', label: 'Props' }
	];

	// Forwarded to the Bits primitive, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{
			prop: 'maxlength',
			type: 'number',
			required: true,
			description: 'Number of cells, and the max length of the real input.'
		},
		{
			prop: 'onComplete',
			type: '(value: string) => void',
			description: 'Fires once every cell is filled. Submit from here.'
		},
		{ prop: 'onValueChange', type: '(value: string) => void' },
		{
			prop: 'pasteTransformer',
			type: '(text: string) => string',
			description: 'Sanitise pasted text — strip hyphens and spaces before they reach the cells.'
		},
		{ prop: 'textalign', type: `'left' | 'center' | 'right'`, default: `'left'` },
		{ prop: 'disabled', type: 'boolean', default: 'false' }
	];

	const usageCode = `<script>
  import { PinInput } from 'sve-ui';
  let code = $state('');
<\u002fscript>

<span id="otp-label">Verification code</span>
<PinInput.Root
  bind:value={code}
  maxlength={6}
  aria-labelledby="otp-label"
  onComplete={submit}
>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}
      <PinInput.Cell {cell} />
    {/each}
  {/snippet}
</PinInput.Root>`;

	let code = $state('');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">maxlength</code> is required — it is how many cells there are. Root hands you
			a
			<code class="ic">cells</code> array through a snippet, so you render them. Use
			<code class="ic">onComplete</code> to submit rather than making the user hunt for a button after
			typing the last digit.
		</p>
		<Preview code={usageCode} align="start">
			<div class="field">
				<span id="otp-demo-label" class="lbl">Verification code</span>
				<PinInput.Root bind:value={code} maxlength={6} aria-labelledby="otp-demo-label">
					{#snippet children({ cells })}
						{#each cells as cell, i (i)}
							<PinInput.Cell {cell} />
						{/each}
					{/snippet}
				</PinInput.Root>
				<p class="cap">value: {code || '(empty)'}</p>
			</div>
		</Preview>
	</section>

	<section id="one-input" class="sec">
		<h2 class="sec__h">One input, not six</h2>
		<p class="sec__p">
			The cells look like six boxes. They are not six inputs — Bits renders <strong>one</strong> real
			input behind them and the cells are purely visual. That is the whole reason to use this instead
			of rolling your own, and it buys four things a six-input version loses:
		</p>
		<ul class="sec__p">
			<li>Paste works. Pasting a six-digit code fills every cell at once.</li>
			<li>
				Mobile SMS autofill works — the input carries
				<code class="ic">autocomplete="one-time-code"</code>, so the OS offers the code from the
				message.
			</li>
			<li>No tabbing between boxes, and no focus-juggling bugs to write.</li>
			<li>A screen reader announces one field, not six unlabelled ones.</li>
		</ul>
		<p class="sec__p">
			Use <code class="ic">pasteTransformer</code> to clean what arrives — stripping hyphens and
			spaces means a code copied as <code class="ic">123-456</code> still lands correctly.
		</p>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">Naming it</h2>
		<p class="warn">
			<code class="ic">&lt;label for&gt;</code> does <strong>not</strong> work here.
		</p>
		<p class="sec__p">
			The <code class="ic">id</code> you pass lands on the wrapper
			<code class="ic">&lt;div&gt;</code>, and the real input gets a Bits-internal id you cannot
			predict — so a <code class="ic">for</code> attribute has nothing to point at, and you ship an unnamed
			field. Verified against the rendered DOM, and pinned by a test.
		</p>
		<p class="sec__p">Name it from Root instead; the spread reaches the input:</p>
		<ul class="sec__p">
			<li><code class="ic">aria-label="Verification code"</code> — simplest.</li>
			<li>
				<code class="ic">aria-labelledby="my-label-id"</code> — when you want a
				<strong>visible</strong> label. Give your own element an id and point at it, as the example above
				does.
			</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">PinInput.Root</code> — <code class="ic">value</code> is bindable.
		</p>
		<PropsTable component="PinInputRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">PinInput.Cell</code> takes the <code class="ic">cell</code> object from the
			snippet plus <code class="ic">class</code>.
		</p>
		<PropsTable component="PinInputCell" />
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
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.cap {
		margin: 0;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
	.lbl {
		font-size: 13px;
		font-weight: 600;
		color: var(--doc-fg);
	}
</style>
