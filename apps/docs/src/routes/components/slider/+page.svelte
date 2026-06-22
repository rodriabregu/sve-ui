<script lang="ts">
	import { Slider } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.slider;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'range', label: 'Range' },
		{ id: 'props', label: 'Props' }
	];

	const props: PropRow[] = [
		{ prop: 'type', type: `'single' | 'multiple'`, default: `'single'` },
		{ prop: 'value', type: 'number | number[]', description: 'Current value(s). Not bindable — use onValueChange.' },
		{
			prop: 'onValueChange',
			type: '(value: number & number[]) => void',
			description: 'Callback fired when the value changes.'
		},
		{ prop: 'min', type: 'number', description: 'Minimum value.' },
		{ prop: 'max', type: 'number', description: 'Maximum value.' },
		{ prop: 'step', type: 'number', description: 'Step increment.' },
		{ prop: 'disabled', type: 'boolean', default: 'false' },
		{ prop: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'` },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' }
	];

	let sliderValue = $state(40);
	let rangeValue = $state([20, 70]);

	const usageCode = `<script>
  import { Slider } from 'sve-ui';
  let sliderValue = $state(40);
<\/script>

<Slider
  type="single"
  value={sliderValue}
  onValueChange={(v) => (sliderValue = v as number)}
  max={100}
  step={1}
/>`;

	const rangeCode = `<script>
  import { Slider } from 'sve-ui';
  let rangeValue = $state([20, 70]);
<\/script>

<Slider
  type="multiple"
  value={rangeValue}
  onValueChange={(v) => (rangeValue = v as number[])}
  max={100}
  step={1}
/>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Slider uses <code class="ic">value</code> + <code class="ic">onValueChange</code> instead of
			<code class="ic">bind:value</code>. Update your state variable inside the callback.
		</p>
		<Preview code={usageCode}>
			<Slider
				type="single"
				value={sliderValue}
				onValueChange={(v) => (sliderValue = v as number)}
				max={100}
				step={1}
			/>
		</Preview>
	</section>

	<section id="range" class="sec">
		<h2 class="sec__h">Range</h2>
		<p class="sec__p">
			Pass <code class="ic">type="multiple"</code> and an array as <code class="ic">value</code> to
			render a two-handle range slider. The callback receives <code class="ic">number[]</code>.
		</p>
		<Preview code={rangeCode}>
			<Slider
				type="multiple"
				value={rangeValue}
				onValueChange={(v) => (rangeValue = v as number[])}
				max={100}
				step={1}
			/>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p">
			The component also forwards all native slider attributes via prop spreading.
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
