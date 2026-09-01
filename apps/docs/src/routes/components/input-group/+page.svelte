<script lang="ts">
	import { InputGroup, Input, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug['input-group'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'both-sides', label: 'Prefix and suffix' },
		{ id: 'button', label: 'With a button' },
		{ id: 'labelling', label: 'An addon is not a label' },
		{ id: 'invalid', label: 'Invalid' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { InputGroup, Input } from 'sve-ui';
<\u002fscript>

<InputGroup.Root>
  <InputGroup.Addon>https://</InputGroup.Addon>
  <Input placeholder="example.com" />
</InputGroup.Root>`;

	const bothSidesCode = `<InputGroup.Root>
  <InputGroup.Addon>$</InputGroup.Addon>
  <Input type="number" placeholder="0.00" aria-label="Amount in dollars" />
  <InputGroup.Addon>USD</InputGroup.Addon>
</InputGroup.Root>`;

	const buttonCode = `<InputGroup.Root>
  <Input placeholder="Search projects" aria-label="Search projects" />
  <Button variant="ghost">Search</Button>
</InputGroup.Root>`;

	const labellingCode = `<!-- Wrong: the unit exists only in the addon -->
<InputGroup.Root>
  <Input aria-label="Weight" />
  <InputGroup.Addon>kg</InputGroup.Addon>
</InputGroup.Root>

<!-- Right: the name carries it -->
<InputGroup.Root>
  <Input aria-label="Weight in kilograms" />
  <InputGroup.Addon>kg</InputGroup.Addon>
</InputGroup.Root>`;

	const invalidCode = `<InputGroup.Root invalid>
  <InputGroup.Addon>@</InputGroup.Addon>
  <Input invalid aria-label="Username" value="not a username" />
</InputGroup.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			The group draws the border and the focus ring; the input inside draws neither. That inversion
			is the whole component — an addon placed next to a bordered input is two boxes touching, and
			no amount of spacing makes them read as one control.
		</p>
		<p class="sec__p">
			The addon's side comes from where you put it. There is no
			<code class="ic">side</code> prop, because DOM order already says it and a prop that could disagree
			with the layout is a prop that will.
		</p>
		<Preview code={usageCode}>
			<div style="max-width: 320px;">
				<InputGroup.Root>
					<InputGroup.Addon>https://</InputGroup.Addon>
					<Input placeholder="example.com" aria-label="Site URL" />
				</InputGroup.Root>
			</div>
		</Preview>
	</section>

	<section id="both-sides" class="sec">
		<h2 class="sec__h">Prefix and suffix</h2>
		<Preview code={bothSidesCode}>
			<div style="max-width: 320px;">
				<InputGroup.Root>
					<InputGroup.Addon>$</InputGroup.Addon>
					<Input type="number" placeholder="0.00" aria-label="Amount in dollars" />
					<InputGroup.Addon>USD</InputGroup.Addon>
				</InputGroup.Root>
			</div>
		</Preview>
	</section>

	<section id="button" class="sec">
		<h2 class="sec__h">With a button</h2>
		<p class="sec__p">
			Put a <code class="ic">Button</code> where an addon would go.
			<code class="ic">:focus-within</code> keeps the ring around the whole group, so focusing the button
			does not make it look like it fell outside the field.
		</p>
		<Preview code={buttonCode}>
			<div style="max-width: 320px;">
				<InputGroup.Root>
					<Input placeholder="Search projects" aria-label="Search projects" />
					<Button variant="ghost">Search</Button>
				</InputGroup.Root>
			</div>
		</Preview>
	</section>

	<section id="labelling" class="sec">
		<h2 class="sec__h">An addon is not a label</h2>
		<p class="sec__p">
			<code class="ic">Addon</code> is <code class="ic">aria-hidden</code> by default, and that
			default is right more often than it looks. A magnifier, a <code class="ic">$</code>, a
			<code class="ic">https://</code> — these are hints for the eye. The meaning has to live in the input's
			own accessible name, because an addon cannot become one.
		</p>
		<p class="sec__p">
			<code class="ic">decorative={false}</code> puts an addon back in the accessibility tree. Use it
			only when the text is the sole place the information exists — and fix the input's name anyway.
		</p>
		<Preview code={labellingCode}>
			<div style="max-width: 320px;">
				<InputGroup.Root>
					<Input aria-label="Weight in kilograms" placeholder="0" />
					<InputGroup.Addon>kg</InputGroup.Addon>
				</InputGroup.Root>
			</div>
		</Preview>
	</section>

	<section id="invalid" class="sec">
		<h2 class="sec__h">Invalid</h2>
		<p class="sec__p">
			Pass <code class="ic">invalid</code> to both: the group so the border and ring turn, the input
			so
			<code class="ic">aria-invalid</code> is set. Styling alone tells sighted users and nobody else.
		</p>
		<Preview code={invalidCode}>
			<div style="max-width: 320px;">
				<InputGroup.Root invalid>
					<InputGroup.Addon>@</InputGroup.Addon>
					<Input invalid aria-label="Username" value="not a username" />
				</InputGroup.Root>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">Each part also takes its native element's attributes via prop spreading.</p>
		<PropsTable component="InputGroupRoot" />
		<PropsTable component="InputGroupAddon" />
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
