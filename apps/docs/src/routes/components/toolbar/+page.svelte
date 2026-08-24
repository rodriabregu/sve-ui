<script lang="ts">
	import { Toolbar } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	// Forwarded to Bits, so not declared on our own Props.
	const rootForwarded: PropRow[] = [
		{
			prop: 'orientation',
			type: `'horizontal' | 'vertical'`,
			default: `'horizontal'`,
			description: 'Axis the arrow keys navigate along.'
		},
		{
			prop: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Focus wraps from the last control back to the first.'
		}
	];

	const groupForwarded: PropRow[] = [
		{
			prop: 'type',
			type: `'single' | 'multiple'`,
			required: true,
			description: 'Required. Sets the shape of value: single gives a string, multiple a string[].'
		},
		{
			prop: 'onValueChange',
			type: '(value: string & string[]) => void',
			description: 'Called when the active item(s) change.'
		},
		{
			prop: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables every item in the group.'
		}
	];

	const meta = componentBySlug.toolbar;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why not just buttons' },
		{ id: 'parts', label: 'Picking the right part' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Toolbar } from 'sve-ui';
  let marks = $state(['bold']);
<\u002fscript>

<Toolbar.Root aria-label="Formatting">
  <Toolbar.Group type="multiple" bind:value={marks} aria-label="Text style">
    <Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
    <Toolbar.GroupItem value="italic" aria-label="Italic">I</Toolbar.GroupItem>
  </Toolbar.Group>
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Link href="/help">Help</Toolbar.Link>
</Toolbar.Root>`;

	let marks = $state<string[]>(['bold']);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Give <code class="ic">Root</code> an <code class="ic">aria-label</code> — "Formatting", "Actions"
			— and give icon-only controls their own. A toolbar announced with no name tells the user nothing
			about what it controls.
		</p>
		<Preview code={usageCode}>
			<Toolbar.Root aria-label="Formatting">
				<Toolbar.Group type="multiple" bind:value={marks} aria-label="Text style">
					<Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
					<Toolbar.GroupItem value="italic" aria-label="Italic">I</Toolbar.GroupItem>
					<Toolbar.GroupItem value="underline" aria-label="Underline">U</Toolbar.GroupItem>
				</Toolbar.Group>
				<Toolbar.Button>Save</Toolbar.Button>
				<Toolbar.Link href="/docs">Help</Toolbar.Link>
			</Toolbar.Root>
		</Preview>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why not just buttons</h2>
		<p class="sec__p">
			Because of the keyboard. Bits gives the toolbar
			<code class="ic">role="toolbar"</code> and <strong>roving focus</strong>: the whole thing is
			one tab stop and the arrow keys move between controls.
		</p>
		<p class="sec__p">
			A twelve-button toolbar built from plain buttons costs a keyboard user twelve presses of Tab
			to get past. The same toolbar built with this costs one. That is the entire reason the role
			exists, and it is invisible if you only ever test with a mouse.
		</p>
	</section>

	<section id="parts" class="sec">
		<h2 class="sec__h">Picking the right part</h2>
		<p class="sec__p">The parts are not interchangeable — each carries different semantics:</p>
		<ul class="sec__p">
			<li><code class="ic">Button</code> — performs an action.</li>
			<li>
				<code class="ic">Link</code> — <strong>navigates</strong>. It stays a real anchor, so
				middle-click, open-in-new-tab and the link role keep working. A button that navigates takes
				all of that away from the user.
			</li>
			<li>
				<code class="ic">Group</code> — a toggle group. <code class="ic">type</code> is required and
				sets the shape of <code class="ic">value</code>, exactly as on
				<a href="/components/toggle-group">Toggle Group</a>.
			</li>
			<li><code class="ic">GroupItem</code> — one toggle inside a Group.</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			<code class="ic">Toolbar.Root</code> — plus <code class="ic">orientation</code> and
			<code class="ic">loop</code> forwarded to Bits.
		</p>
		<PropsTable component="ToolbarRoot" extra={rootForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Toolbar.Group</code> — <code class="ic">value</code> is bindable.
		</p>
		<PropsTable component="ToolbarGroup" extra={groupForwarded} />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Button</code>, <code class="ic">Link</code> and
			<code class="ic">GroupItem</code> each take <code class="ic">class</code> plus their native attributes.
		</p>
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
</style>
