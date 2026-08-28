<script lang="ts">
	import { AlertDialog, Button } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	// Forwarded to the Bits primitive, so not declared on our own Props.

	const meta = componentBySlug['alert-dialog'];

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'action-does-not-close', label: 'Action does not close' },
		{ id: 'vs-dialog', label: 'Alert Dialog vs Dialog' },
		{ id: 'writing', label: 'Writing the copy' },
		{ id: 'props', label: 'Props' }
	];

	const usageCode = `<script>
  import { AlertDialog, Button } from 'sve-ui';
  let open = $state(false);
<\u002fscript>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Title>Delete this project?</AlertDialog.Title>
    <AlertDialog.Description>
      This removes the project and every deployment. It cannot be undone.
    </AlertDialog.Description>
    <AlertDialog.Cancel>Keep project</AlertDialog.Cancel>
    <AlertDialog.Action onclick={destroy}>Delete project</AlertDialog.Action>
  </AlertDialog.Content>
</AlertDialog.Root>`;

	const asyncCode = `<script>
  let open = $state(false);
  let error = $state('');

  async function destroy() {
    try {
      await api.deleteProject(id);
      open = false;              // close only once it succeeded
    } catch (e) {
      error = 'Could not delete the project.';   // stay open, show why
    }
  }
<\u002fscript>

<AlertDialog.Action onclick={destroy}>Delete project</AlertDialog.Action>`;

	let open = $state(false);
	let deleted = $state(false);
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Use this when the user must decide before continuing and one outcome is destructive.
			<code class="ic">Title</code> is not optional — Bits points the dialog's
			<code class="ic">aria-labelledby</code> at it, so leaving it out ships a dialog with no accessible
			name.
		</p>
		<Preview code={usageCode}>
			<div class="row">
				<AlertDialog.Root bind:open>
					<AlertDialog.Trigger>
						{#snippet child({ props })}
							<Button {...props} color="danger">Delete project</Button>
						{/snippet}
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Title>Delete this project?</AlertDialog.Title>
						<AlertDialog.Description>
							This removes the project and every deployment. It cannot be undone.
						</AlertDialog.Description>
						<div class="row">
							<AlertDialog.Cancel>Keep project</AlertDialog.Cancel>
							<AlertDialog.Action
								onclick={() => {
									deleted = true;
									open = false;
								}}
							>
								Delete project
							</AlertDialog.Action>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Root>
				{#if deleted}<span class="ic">deleted</span>{/if}
			</div>
		</Preview>
	</section>

	<section id="action-does-not-close" class="sec">
		<h2 class="sec__h">Action does not close</h2>
		<p class="warn">
			<strong>Cancel closes the dialog. Action does not.</strong> This is deliberate, and it is the one
			thing people get wrong here.
		</p>
		<p class="sec__p">
			The reason is that your destructive operation is usually async and can fail. If Action closed
			the dialog for you, a failed delete would leave the user staring at a dismissed dialog with no
			idea whether it worked. So closing is yours to decide: close after it succeeds, or keep it
			open and show the error.
		</p>
		<Preview code={asyncCode} align="start">
			<p class="sec__p" style="margin:0">
				Close on success, stay open on failure — that is why the primitive leaves it to you.
			</p>
		</Preview>
	</section>

	<section id="vs-dialog" class="sec">
		<h2 class="sec__h">Alert Dialog vs Dialog</h2>
		<p class="sec__p">
			The differences are behavioural, not decorative — which is why you cannot get here by styling
			a <a href="/components/dialog">Dialog</a> differently:
		</p>
		<ul class="sec__p">
			<li><code class="ic">role="alertdialog"</code>, so it is announced as an interruption.</li>
			<li>
				Clicking the backdrop does <strong>not</strong> dismiss it. Bits omits
				<code class="ic">onInteractOutside</code> on Content, so a stray click cannot resolve a destructive
				choice.
			</li>
			<li>Cancel takes initial focus, so pressing Enter never destroys anything.</li>
		</ul>
		<p class="sec__p">
			If nothing is being destroyed and the user can just walk away, you want Dialog. Reaching for
			Alert Dialog for ordinary content trains people to dismiss warnings without reading them.
		</p>
	</section>

	<section id="writing" class="sec">
		<h2 class="sec__h">Writing the copy</h2>
		<p class="sec__p">
			The component is the easy part. Label the buttons with the <strong>verb</strong>, not
			<code class="ic">OK</code> and <code class="ic">Cancel</code> — "Delete project" and "Keep project"
			tell the user what each button does without re-reading anything. And put the consequence in the
			description: what disappears, and whether it can be undone. "Are you sure?" is not a description;
			it just moves the question back to the user.
		</p>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">AlertDialog.Root</code></p>
		<PropsTable component="AlertDialogRoot" />
		<p class="sec__p"><code class="ic">AlertDialog.Content</code></p>
		<PropsTable component="AlertDialogContent" />
		<p class="sec__p"><code class="ic">AlertDialog.Title</code></p>
		<PropsTable component="AlertDialogTitle" />
		<p class="sec__p"><code class="ic">AlertDialog.Description</code></p>
		<PropsTable component="AlertDialogDescription" />
		<p class="sec__p"><code class="ic">AlertDialog.Action</code></p>
		<PropsTable component="AlertDialogAction" />
		<p class="sec__p"><code class="ic">AlertDialog.Cancel</code></p>
		<PropsTable component="AlertDialogCancel" />
		<p class="sec__p">
			<code class="ic">AlertDialog.Root</code> and <code class="ic">Trigger</code> are re-exported from
			Bits unchanged, so their props are forwarded rather than redeclared.
		</p>
		<p class="sec__p" style="margin-top:16px"><code class="ic">AlertDialog.Content</code></p>
		<p class="sec__p" style="margin-top:16px"><code class="ic">AlertDialog.Action</code></p>
		<p class="sec__p" style="margin-top:16px">
			<code class="ic">Title</code>, <code class="ic">Description</code>,
			<code class="ic">Cancel</code> and <code class="ic">Overlay</code> each take
			<code class="ic">class</code> plus their native attributes.
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
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
