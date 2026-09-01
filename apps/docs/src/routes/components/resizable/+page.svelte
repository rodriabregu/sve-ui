<script lang="ts">
	import { Resizable, Text } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.resizable;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'keyboard', label: 'The keyboard contract' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'limits', label: 'Limits and clamping' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Resizable } from 'sve-ui';
<\u002fscript>

<Resizable.Group>
  <Resizable.Pane min={20}>Sidebar</Resizable.Pane>
  <Resizable.Handle index={0} label="Resize sidebar" />
  <Resizable.Pane>Content</Resizable.Pane>
</Resizable.Group>`;

	const verticalCode = `<Resizable.Group direction="vertical" style="height: 12rem;">
  <Resizable.Pane>Editor</Resizable.Pane>
  <Resizable.Handle index={0} label="Resize editor" />
  <Resizable.Pane min={15}>Console</Resizable.Pane>
</Resizable.Group>`;

	const threeCode = `<!-- Handle index is the pane on its LEADING side -->
<Resizable.Group>
  <Resizable.Pane min={15}>Files</Resizable.Pane>
  <Resizable.Handle index={0} label="Resize file tree" />
  <Resizable.Pane min={30}>Editor</Resizable.Pane>
  <Resizable.Handle index={1} label="Resize editor" />
  <Resizable.Pane min={15}>Inspector</Resizable.Pane>
</Resizable.Group>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			<code class="ic">Handle index</code> is the pane on its <em>leading</em> side — the one whose
			share it reports as <code class="ic">aria-valuenow</code> and points
			<code class="ic">aria-controls</code> at.
		</p>
		<p class="sec__p">
			<code class="ic">label</code> is required. A <code class="ic">separator</code> with a tab stop is
			a control, and one that announces only "splitter, 40" gives a keyboard user a number without saying
			what it sizes.
		</p>
		<Preview code={usageCode}>
			<div style="width: 100%;">
				<Resizable.Group
					style="height: 7rem; border: 1px solid var(--doc-border); border-radius: 8px;"
				>
					<Resizable.Pane min={20}>
						<div style="padding: 12px;"><Text size="sm">Sidebar</Text></div>
					</Resizable.Pane>
					<Resizable.Handle index={0} label="Resize sidebar" />
					<Resizable.Pane>
						<div style="padding: 12px;"><Text size="sm">Content</Text></div>
					</Resizable.Pane>
				</Resizable.Group>
			</div>
		</Preview>
	</section>

	<section id="keyboard" class="sec">
		<h2 class="sec__h">The keyboard contract</h2>
		<p class="sec__p">
			This is the half every hand-rolled divider skips, and it is the difference between a splitter
			and a decoration. Tab to the handle above and try it.
		</p>
		<ul class="sec__p" style="padding-left: 20px; display: grid; gap: 6px;">
			<li>
				<strong style="color: var(--doc-fg);">Arrow keys</strong> — move the boundary by
				<code class="ic">step</code> (5% by default). Left/Right in a horizontal group, Up/Down in a vertical
				one.
			</li>
			<li>
				<strong style="color: var(--doc-fg);">Home / End</strong> — collapse and expand, as far as the
				panes' own limits allow.
			</li>
			<li>
				<strong style="color: var(--doc-fg);">Focus ring</strong> — the handle is a real tab stop
				with <code class="ic">role="separator"</code>, <code class="ic">aria-orientation</code> and
				live <code class="ic">aria-valuenow</code>.
			</li>
		</ul>
		<p class="sec__p">
			Two implementation details that only show up in use: the drag uses
			<code class="ic">setPointerCapture</code>, so it survives the pointer leaving a hairline
			target — which it does immediately — and the grabbable area is grown to 12px by a
			pseudo-element, so the divider can stay 1px wide without being unreasonable to hit.
		</p>
	</section>

	<section id="vertical" class="sec">
		<h2 class="sec__h">Vertical</h2>
		<p class="sec__p">
			Note that <code class="ic">aria-orientation</code> on the handle is the opposite of the group's
			direction: it describes the separator's own line, not the direction of travel.
		</p>
		<Preview code={verticalCode}>
			<div style="width: 100%;">
				<Resizable.Group
					direction="vertical"
					style="height: 10rem; border: 1px solid var(--doc-border); border-radius: 8px;"
				>
					<Resizable.Pane>
						<div style="padding: 12px;"><Text size="sm">Editor</Text></div>
					</Resizable.Pane>
					<Resizable.Handle index={0} label="Resize editor" />
					<Resizable.Pane min={15}>
						<div style="padding: 12px;"><Text size="sm">Console</Text></div>
					</Resizable.Pane>
				</Resizable.Group>
			</div>
		</Preview>
	</section>

	<section id="limits" class="sec">
		<h2 class="sec__h">Limits and clamping</h2>
		<p class="sec__p">
			A drag moves <strong style="color: var(--doc-fg);">one</strong> boundary and touches exactly
			<strong style="color: var(--doc-fg);">two</strong> panes, clamped against
			<em>both</em> of their limits before anything is applied. Distributing a drag across the whole group
			is what produces the familiar bug where dragging one divider quietly reflows the far side of the
			layout.
		</p>
		<p class="sec__p">
			Clamping only the pane being grown is the other half of that bug: it lets the neighbour shrink
			past its own minimum. <code class="ic">min</code> defaults to 10 — pass
			<code class="ic">min={0}</code> if a pane should be able to disappear entirely.
		</p>
		<p class="sec__p">
			Sizes are <strong style="color: var(--doc-fg);">not</strong> persisted. Where that belongs — a
			cookie, a user profile, <code class="ic">localStorage</code> — is an application decision, and guessing
			it wrong is worse than not guessing.
		</p>
		<Preview code={threeCode}>
			<div style="width: 100%;">
				<Resizable.Group
					style="height: 7rem; border: 1px solid var(--doc-border); border-radius: 8px;"
				>
					<Resizable.Pane min={15}>
						<div style="padding: 12px;"><Text size="sm">Files</Text></div>
					</Resizable.Pane>
					<Resizable.Handle index={0} label="Resize file tree" />
					<Resizable.Pane min={30}>
						<div style="padding: 12px;"><Text size="sm">Editor</Text></div>
					</Resizable.Pane>
					<Resizable.Handle index={1} label="Resize editor" />
					<Resizable.Pane min={15}>
						<div style="padding: 12px;"><Text size="sm">Inspector</Text></div>
					</Resizable.Pane>
				</Resizable.Group>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Each part also takes its native element's attributes via prop spreading.</p>
		<PropsTable component="ResizableGroup" />
		<PropsTable component="ResizablePane" />
		<PropsTable component="ResizableHandle" />
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
