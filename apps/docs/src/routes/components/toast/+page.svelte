<script lang="ts">
	import { Button, Code, Toast, toast } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.toast;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'why-imperative', label: 'Why imperative' },
		{ id: 'ssr', label: 'Never during SSR' },
		{ id: 'actions', label: 'Actions never auto-dismiss' },
		{ id: 'polite', label: 'Always polite' },
		{ id: 'not-v1', label: 'Not in v1' },
		{ id: 'a11y', label: 'Accessibility' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { Toast, toast, Button } from 'sve-ui';
<\u002fscript>

<!-- Once, high in the layout. Without it nothing renders. -->
<Toast.Viewport />

<Button onclick={() => toast.success('Project saved')}>Save</Button>
<Button onclick={() => toast.error('Upload failed', {
  description: 'The file is over 10 MB.'
})}>Upload</Button>`;

	const apiCode = `toast('Copied');                              // info
toast.success('Project saved');
toast.warning('Your trial ends in 3 days');
toast.error('Upload failed', { description: 'The file is over 10 MB.' });

// Options
toast('Copied', { duration: 2000 });          // Infinity to keep it
toast('Working\u2026', { dismissible: false });
toast('Message deleted', {                    // does NOT auto-dismiss
  action: { label: 'Undo', onclick: restore }
});

// The id is returned, so a pending toast can be replaced
const id = toast('Uploading\u2026', { duration: Infinity });
await upload();
toast.dismiss(id);
toast.success('Uploaded');

toast.clear();                                // drop everything`;

	const callSiteCode = `// This is the case a declarative API cannot reach: there is no
// component here, and no ancestor to read context from.
export async function api(path, init) {
  const res = await fetch(path, init);
  if (!res.ok) toast.error(\`Request failed (\${res.status})\`);
  return res;
}`;

	let uploadId = '';

	function fakeUpload() {
		toast.dismiss(uploadId);
		uploadId = toast('Uploading\u2026', { duration: Infinity, dismissible: false });
		setTimeout(() => {
			toast.dismiss(uploadId);
			toast.success('Uploaded', { description: 'report-q3.pdf' });
		}, 1600);
	}
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<!-- The docs site mounts its own Viewport so every demo on this page has somewhere to land. -->
	<Toast.Viewport position="bottom-right" />

	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Two halves: an <strong>imperative trigger</strong> you call from anywhere, and a
			<strong>declarative mount point</strong> you place once. Without a
			<code class="ic">Toast.Viewport</code> the calls queue into a list nothing is rendering.
		</p>
		<Preview code={usageCode} align="start">
			<div class="demo">
				<Button onclick={() => toast.success('Project saved')}>Success</Button>
				<Button
					variant="outline"
					onclick={() =>
						toast.error('Upload failed', { description: 'The file is over 10 MB.' })}
				>
					Error
				</Button>
				<Button
					variant="outline"
					onclick={() =>
						toast('Message deleted', {
							action: { label: 'Undo', onclick: () => toast.success('Restored') }
						})}
				>
					With action
				</Button>
				<Button variant="outline" onclick={fakeUpload}>Replace a pending one</Button>
			</div>
		</Preview>
		<p class="cap">
			Hover or tab into a toast and its countdown freezes. "With action" never dismisses itself.
		</p>
		<Code code={apiCode} label="The whole API" />
	</section>

	<section id="why-imperative" class="sec">
		<h2 class="sec__h">Why imperative</h2>
		<p class="sec__p">
			Every other component here is declarative, so this one owes you a reason.
		</p>
		<p class="sec__p">
			A toast does not report <em>state</em>, it reports an <strong>event</strong> — a fetch resolved,
			a socket message arrived, a form action came back. State lives in the component tree; the event
			happens inside a <code class="ic">catch</code>.
		</p>
		<p class="sec__p">
			And the argument that settles it is not ergonomics. An imperative call works from code that is
			<strong>not a component at all</strong>, where a context-based API simply cannot reach:
		</p>
		<Code code={callSiteCode} label="No component, no ancestor, no context" />
		<p class="sec__p">
			The declarative alternative also does not save you the hard part — it relocates it. Ids,
			auto-dismiss timers, the queue, the limit, and removing a toast only once its exit animation
			finished: that <em>is</em> the toast. An <code class="ic">{'{#each}'}</code> over an array you
			maintain hands all of it back to you.
		</p>
		<p class="sec__p">
			The mount point stays declarative because the app — not the library — decides where the stack
			sits, how many fit and what the region is called.
		</p>
	</section>

	<section id="ssr" class="sec">
		<h2 class="sec__h">Never during SSR</h2>
		<p class="warn">
			The queue is this library's only mutable module state. On a server, module state is shared
			across every request — so a toast enqueued while rendering would be delivered in a
			<strong>different user's HTML</strong>.
		</p>
		<p class="sec__p">
			That is not a lost notification, it is one person's message shown to another. So the call is
			refused on the server and reported to the console. It is <em>reported</em>, not thrown: a toast
			is by definition not essential to the page, and trading a missing notification for a blank
			screen is the worse outcome.
		</p>
		<p class="sec__p">
			Call it from an event handler, from <code class="ic">onMount</code>, or from a client-only
			module — never from the top level of a <code class="ic">load</code> or a component body.
		</p>
	</section>

	<section id="actions" class="sec">
		<h2 class="sec__h">Actions never auto-dismiss</h2>
		<p class="sec__p">
			Pass an <code class="ic">action</code> and <code class="ic">duration</code> defaults to
			<code class="ic">Infinity</code>. A control the user can lose a race against is not a control.
		</p>
		<p class="sec__p">
			You can still pass an explicit <code class="ic">duration</code> — it is a safe default, not a
			prohibition. But if the action matters, mirror it somewhere permanent. A toast has no history:
			miss it and it is gone.
		</p>
	</section>

	<section id="polite" class="sec">
		<h2 class="sec__h">Always polite</h2>
		<p class="sec__p">
			The live region is <code class="ic">aria-live="polite"</code> and that is not configurable.
		</p>
		<p class="sec__p">
			<code class="ic">assertive</code> interrupts whatever is being read — and anything that earns an
			interruption is too important to auto-dismiss. That is an <code class="ic">Alert</code> you
			render inline, or an <code class="ic">AlertDialog</code>. A toast is for what the user can afford
			to miss; if they cannot afford to miss it, it should not be a toast.
		</p>
	</section>

	<section id="not-v1" class="sec">
		<h2 class="sec__h">Not in v1</h2>
		<ul class="sec__p">
			<li>
				<strong>Swipe to dismiss.</strong> It needs a keyboard and screen-reader equivalent, and that
				equivalent is the dismiss button — so the swipe is decoration on top of the control already
				doing the work.
			</li>
			<li>
				<strong>Collapsed/stacked animation.</strong> It needs FLIP measurement. That is motion, not
				behaviour, and it is not what was missing.
			</li>
			<li>
				<strong>A second runtime dependency.</strong> None was needed. Enter and exit transitions come
				from Svelte, and they respect <code class="ic">prefers-reduced-motion</code>.
			</li>
		</ul>
	</section>

	<section id="a11y" class="sec">
		<h2 class="sec__h">Accessibility</h2>
		<ul class="sec__p">
			<li>Mount the <code class="ic">Viewport</code> <strong>once and early</strong>. It is a persistent live region that renders even when empty, because assistive technology announces additions to a region it was <em>already</em> observing — creating the region and its first toast in the same moment is the usual reason nothing gets announced.</li>
			<li>The region is a named <code class="ic">&lt;section&gt;</code>, which <em>is</em> a region; the list inside carries <code class="ic">aria-live</code>. <code class="ic">role="region"</code> on an <code class="ic">&lt;ol&gt;</code> is a violation — the element already has an implicit list role.</li>
			<li>Timers pause on hover <strong>and on focus</strong>. Someone reading with a screen reader, or tabbing towards the action, is not moving a pointer.</li>
			<li>Each dismiss button is named with its toast's title, not a bare "Dismiss". Three toasts means three buttons, and three identical names give no way to tell which closes what.</li>
			<li>Past <code class="ic">max</code> the <em>oldest</em> is dropped — the newest message is the one the user is waiting for.</li>
			<li>Never let a toast hold the only copy of information or an action.</li>
		</ul>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Toast.Viewport</code> — the only component. Everything else is the <code class="ic">toast</code> function above.</p>
		<PropsTable component="ToastViewport" />
	</section>
</DocPage>

<style>
	.sec { margin-bottom: 48px; scroll-margin-top: 84px; }
	.sec__h {
		font-size: 21px; font-weight: 700; letter-spacing: -0.02em;
		color: var(--doc-fg); margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px; font-size: 14.5px; line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono); font-size: 0.85em; padding: 1px 5px;
		border-radius: 5px; background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.warn {
		margin: 0 0 16px; padding: 12px 14px;
		border-left: 3px solid var(--doc-primary-text);
		background: var(--doc-surface-2);
		border-radius: 0 8px 8px 0;
		font-size: 14px; line-height: 1.55; color: var(--doc-fg-muted);
	}
	.demo { display: flex; flex-wrap: wrap; gap: 10px; }
	.cap { margin: 12px 0 0; font-size: 12.5px; color: var(--doc-fg-subtle); }
</style>
