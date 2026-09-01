<script lang="ts">
	import { ButtonGroup, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['button-group'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'naming', label: 'Naming the group' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'which', label: 'Which one to reach for' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { ButtonGroup, Button } from 'sve-ui';
<\u002fscript>

<ButtonGroup label="Text alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`;

	const namingCode = `<!-- A visible heading already names it -->
<span id="align-label">Alignment</span>
<ButtonGroup labelledby="align-label">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`;

	const verticalCode = `<ButtonGroup orientation="vertical" label="Row actions">
  <Button variant="outline">Edit</Button>
  <Button variant="outline">Duplicate</Button>
  <Button variant="outline" color="danger">Delete</Button>
</ButtonGroup>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Wrap the buttons. The group collapses the seam between them, keeps the outer corners rounded,
			and lifts whichever button has focus so its ring is never clipped by a neighbour's border.
		</p>
		<Preview code={usageCode}>
			<ButtonGroup label="Text alignment">
				<Button variant="outline">Left</Button>
				<Button variant="outline">Center</Button>
				<Button variant="outline">Right</Button>
			</ButtonGroup>
		</Preview>
	</section>

	<section id="naming" class="sec">
		<h2 class="sec__h">Naming the group</h2>
		<p class="sec__p">
			<code class="ic">label</code> is not decoration. The group renders
			<code class="ic">role="group"</code>, and a role without a name is worse than no role: it
			tells a screen reader there is a boundary here and then cannot say what for. Use
			<code class="ic">labelledby</code> instead when a visible heading already names it, so the name
			is not duplicated.
		</p>
		<Preview code={namingCode}>
			<div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
				<span id="align-label" style="font-size: 13px; color: var(--doc-fg-muted);">Alignment</span>
				<ButtonGroup labelledby="align-label">
					<Button variant="outline">Left</Button>
					<Button variant="outline">Right</Button>
				</ButtonGroup>
			</div>
		</Preview>
	</section>

	<section id="vertical" class="sec">
		<h2 class="sec__h">Vertical</h2>
		<Preview code={verticalCode}>
			<ButtonGroup orientation="vertical" label="Row actions">
				<Button variant="outline">Edit</Button>
				<Button variant="outline">Duplicate</Button>
				<Button variant="outline" color="danger">Delete</Button>
			</ButtonGroup>
		</Preview>
	</section>

	<section id="which" class="sec">
		<h2 class="sec__h">Which one to reach for</h2>
		<p class="sec__p">
			Three components look alike here and behave differently. Picking the wrong one changes how the
			control is keyboard-operated, which is not something styling can fix afterwards.
		</p>
		<ul class="sec__p" style="padding-left: 20px; display: grid; gap: 8px;">
			<li>
				<strong style="color: var(--doc-fg);">ButtonGroup</strong> — several independent actions that
				belong together visually. Every button keeps its own tab stop.
			</li>
			<li>
				<strong style="color: var(--doc-fg);">Toolbar</strong> — the group is one tab stop and the arrow
				keys move between the buttons inside it.
			</li>
			<li>
				<strong style="color: var(--doc-fg);">ToggleGroup</strong> — the buttons represent a selected
				value, not actions.
			</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			Plus every native <code class="ic">&lt;div&gt;</code> attribute via prop spreading.
		</p>
		<PropsTable component="ButtonGroup" />
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
