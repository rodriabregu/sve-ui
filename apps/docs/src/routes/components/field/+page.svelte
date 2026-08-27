<script lang="ts">
	import { Field, Input, Code } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.field;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why', label: 'Why it exists' },
		{ id: 'snippet', label: 'Why a snippet' },
		{ id: 'error', label: 'Error implies invalid' },
		{ id: 'required', label: 'What required can announce' },
		{ id: 'submit', label: 'Errors after submit' },
		{ id: 'any-control', label: 'Any control' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Field, Input } from 'sve-ui';
  let email = $state('');
  let error = $derived(email && !email.includes('@') ? 'Enter a valid email address.' : undefined);
<\u002fscript>

<Field label="Email" description="We never share it." {error} required>
  {#snippet control(props)}
    <Input {...props} type="email" bind:value={email} />
  {/snippet}
</Field>`;

	const submitCode = `import { focusFirstInvalidField } from 'sve-ui';

let formEl;
let errors = $state({});

async function submit() {
  errors = await validate(values);

  if (Object.keys(errors).length > 0) {
    // Awaits tick() itself, so the errors are in the DOM before it looks.
    await focusFirstInvalidField({ root: formEl });
    return;
  }

  await save(values);
}`;

	const nativeCode = `<!-- Nothing here is sve-ui specific. Any control works. -->
<Field label="Colour" description="Pick anything.">
  {#snippet control(props)}
    <input {...props} type="color" />
  {/snippet}
</Field>`;

	const wrongCode = `<!-- WRONG: the props are ignored, so the label, the description and
     the error are attached to nothing. Field reports this to the console. -->
<Field label="Email" description="We never share it.">
  {#snippet control(props)}
    <Input type="email" bind:value={email} />
  {/snippet}
</Field>`;

	let email = $state('');
	const emailError = $derived(
		email.length > 0 && !email.includes('@') ? 'Enter a valid email address.' : undefined
	);
	let colour = $state('#ff8a8a');
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			One control, its label, its help text and its validation message — with ids that actually
			match.
		</p>
		<Preview code={usageCode} align="start">
			<div style="width:100%;max-width:22rem">
				<Field label="Email" description="We never share it." error={emailError} required>
					{#snippet control(props)}
						<Input {...props} type="email" bind:value={email} placeholder="you@example.com" />
					{/snippet}
				</Field>
			</div>
		</Preview>
		<p class="cap">Type something without an @ to see the error wire itself up.</p>
	</section>

	<section id="why" class="sec">
		<h2 class="sec__h">Why it exists</h2>
		<p class="sec__p">
			Before this component, <code class="ic">aria-describedby</code> appeared in
			<strong>zero</strong> of this library's components. There was no accessible way to attach help text
			or a validation message to any control: you generated the ids yourself and wired them by hand, on
			every field.
		</p>
		<p class="sec__p">
			That is the same shape of gap as <code class="ic">Button</code> not being able to be a link. A library
			that does not let you do the correct thing will get you writing the incorrect thing, and then it
			looks like your bug.
		</p>
		<p class="sec__p">
			The ids come from <code class="ic">$props.id()</code>, so they are identical on the server and
			the client. Two fields on one page never collide.
		</p>
	</section>

	<section id="snippet" class="sec">
		<h2 class="sec__h">Why a snippet, not sibling parts</h2>
		<p class="sec__p">
			Every other composite here is parts — <code class="ic">Table.Row</code>,
			<code class="ic">Sidebar.Item</code>. This one takes the control through a snippet and its
			text as props, and that is a deliberate break.
		</p>
		<p class="sec__p">
			<code class="ic">aria-describedby</code> may only name ids that <em>exist</em>. A reference to
			a missing id is invalid, axe flags it, and nothing is announced for it — a silent loss rather
			than a visible bug. That has to be true in the <strong>server-rendered</strong> HTML, before any
			JavaScript runs.
		</p>
		<p class="sec__p">
			A sibling <code class="ic">&lt;Field.Description&gt;</code> could only register itself
			<em>after</em> the control had already rendered, so the first paint would either miss the reference
			or point at an id that was not there yet. Taking the text as props means the value is exact at render
			time. There are tests that render this on a real server and assert every referenced id resolves.
		</p>
		<p class="warn">
			The one way to misuse it is to forget the spread. Nothing breaks visibly — the label just
			points at nothing — so <code class="ic">Field</code> reports it to the console instead of letting
			it pass.
		</p>
		<Code code={wrongCode} label="What not to do" />
	</section>

	<section id="error" class="sec">
		<h2 class="sec__h">Error implies invalid</h2>
		<p class="sec__p">
			There is no <code class="ic">invalid</code> prop. Passing an <code class="ic">error</code> is
			what marks the field invalid, so the red border and
			<code class="ic">aria-invalid</code> cannot disagree with the message the user is reading.
		</p>
		<p class="sec__p">
			Pass <code class="ic">undefined</code> when the field is valid, not an empty string — an empty string
			is still a message, so it would render an empty error node and mark the field invalid.
		</p>
		<p class="sec__p">
			When both are present, <code class="ic">aria-describedby</code> names the
			<strong>error first</strong>. When a field is wrong, that is what the user needs to hear
			before the standing help text.
		</p>
		<p class="sec__p">
			Keep <code class="ic">description</code> short. It is announced every single time the control takes
			focus.
		</p>
	</section>

	<section id="required" class="sec">
		<h2 class="sec__h">What <code class="ic">required</code> can announce</h2>
		<p class="sec__p">
			<code class="ic">required</code> always marks the visible label. Whether the
			<em>control</em> is announced as required depends on what it renders, and the answer is not the
			same for all of them.
		</p>
		<div class="tablewrap">
			<table class="t">
				<thead>
					<tr><th>Control</th><th>How</th></tr>
				</thead>
				<tbody>
					<tr>
						<td
							><code class="ic">Input</code>, <code class="ic">Textarea</code>,
							<code class="ic">Combobox.Input</code>, <code class="ic">PinInput</code></td
						>
						<td>the native <code class="ic">required</code> attribute, on a real input</td>
					</tr>
					<tr>
						<td
							><code class="ic">Checkbox</code>, <code class="ic">Switch</code>,
							<code class="ic">RadioGroup</code>, <code class="ic">RatingGroup</code></td
						>
						<td><code class="ic">aria-required</code>, which Bits UI sets for you</td>
					</tr>
					<tr>
						<td><code class="ic">Slider</code></td>
						<td
							><code class="ic">aria-required</code> on the thumb — the container is not the slider</td
						>
					</tr>
					<tr>
						<td
							><code class="ic">Select</code>, <code class="ic">Toggle</code>,
							<code class="ic">DatePicker</code></td
						>
						<td><strong>cannot be</strong> — see below</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="sec__p">
			Those last three render a <code class="ic">&lt;button&gt;</code>. A native
			<code class="ic">required</code> attribute does nothing there, and
			<code class="ic">aria-required</code> is worse — axe reports it as an
			<code class="ic">aria-allowed-attr</code> violation. So the components swallow it rather than emit
			dead markup, and there is a test asserting that axe still rejects it.
		</p>
		<p class="warn">
			<code class="ic">aria-invalid</code> behaves differently: axe <em>accepts</em> that one on a button.
			The two rules are not symmetric, which is why each was checked separately rather than generalised
			from the other.
		</p>
		<p class="sec__p">
			For those controls the signal a user gets is the required marker on the visible label plus the
			error on submit — which is what <code class="ic">Field</code> is for. Do not rely on
			<code class="ic">required</code> alone to communicate it on any control: validate, and say what
			is wrong.
		</p>
	</section>

	<section id="submit" class="sec">
		<h2 class="sec__h">Errors that appear after submit</h2>
		<p class="warn">
			The error is <strong>not</strong> a live region. If it appears while focus is somewhere else — a
			failed submit, a server response — nobody is told.
		</p>
		<p class="sec__p">
			That is on purpose. An error that is both a live region and referenced by
			<code class="ic">aria-describedby</code> gets announced twice on the common path: once when it appears,
			again when focus reaches the control.
		</p>
		<p class="sec__p">
			So do what the WCAG technique actually says — move focus to the first invalid control — and
			use
			<code class="ic">focusFirstInvalidField</code> to do it. Focusing reads the label, the error and
			the description in one announcement, and it puts the user where the work is.
		</p>
		<Code code={submitCode} label="A failed submit" />
		<p class="sec__p" style="margin-top:16px">
			It awaits Svelte's <code class="ic">tick()</code> internally, because you call it right after the
			state change that produced the errors and the DOM would not carry them yet. That is the one thing
			easiest to get wrong here, so it is handled rather than documented.
		</p>
		<p class="sec__p">
			It returns <code class="ic">false</code> when nothing was focused, so you can fall back when a submit
			failed for a reason no single field owns. If it finds an invalid field whose control was never wired,
			or one that cannot take focus, it says so in the console rather than doing nothing quietly.
		</p>
		<p class="sec__p">
			Pass <code class="ic">root</code> to scope it to one form. Without it, the whole document is searched,
			which is wrong on a page with two forms.
		</p>
	</section>

	<section id="any-control" class="sec">
		<h2 class="sec__h">Any control</h2>
		<p class="sec__p">
			The snippet just hands you attributes, so this works with a plain
			<code class="ic">&lt;input&gt;</code>, a <code class="ic">Select</code>, a
			<code class="ic">Slider</code>, or something from another library entirely. Field never has to
			know what your control is.
		</p>
		<Preview code={nativeCode} align="start">
			<div style="width:100%;max-width:22rem">
				<Field label="Colour" description="Pick anything.">
					{#snippet control(props)}
						<input {...props} type="color" bind:value={colour} />
					{/snippet}
				</Field>
			</div>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<PropsTable component="Field" />
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">label</code>, <code class="ic">description</code> and
			<code class="ic">error</code> each take a string, or a snippet when the content needs markup — a
			link in the help text, say.
		</p>
		<p class="sec__p">
			The <code class="ic">control</code> snippet receives
			<code class="ic">id</code>, <code class="ic">aria-describedby</code>,
			<code class="ic">aria-invalid</code> and <code class="ic">required</code>. Spread all of them.
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

	.tablewrap {
		overflow-x: auto;
		margin: 0 0 16px;
	}

	.t {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.t th,
	.t td {
		padding: 8px 10px;
		text-align: left;
		border-bottom: 1px solid var(--doc-border);
		color: var(--doc-fg-muted);
		vertical-align: top;
	}

	.t th {
		color: var(--doc-fg);
		font-weight: 600;
	}
</style>
