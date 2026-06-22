<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Source shown under the Code tab. */
		code: string;
		/** Live demo rendered under the Preview tab. */
		children: Snippet;
		/** Vertically center the demo (default) vs. top-align it. */
		align?: 'center' | 'start';
	}

	let { code, children, align = 'center' }: Props = $props();

	let tab = $state<'preview' | 'code'>('preview');
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		if (typeof navigator === 'undefined' || !navigator.clipboard) return;
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (copied = false), 1600);
		} catch {
			/* clipboard blocked — no-op */
		}
	}
</script>

<div class="preview">
	<div class="preview__bar">
		<div class="preview__tabs" role="tablist">
			<button
				role="tab"
				aria-selected={tab === 'preview'}
				class="preview__tab"
				class:is-active={tab === 'preview'}
				onclick={() => (tab = 'preview')}>Preview</button
			>
			<button
				role="tab"
				aria-selected={tab === 'code'}
				class="preview__tab"
				class:is-active={tab === 'code'}
				onclick={() => (tab = 'code')}>Code</button
			>
		</div>
		<button class="preview__copy" onclick={copy} aria-label="Copy code">
			{#if copied}
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
				Copied
			{:else}
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
				Copy
			{/if}
		</button>
	</div>

	{#if tab === 'preview'}
		<div class="preview__canvas" class:is-start={align === 'start'}>
			{@render children()}
		</div>
	{:else}
		<pre class="preview__code doc-mono"><code>{code}</code></pre>
	{/if}
</div>

<style>
	.preview {
		border: 1px solid var(--doc-border);
		border-radius: 14px;
		background: var(--doc-surface);
		overflow: hidden;
		box-shadow: var(--doc-shadow);
	}

	.preview__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px 0 14px;
		border-bottom: 1px solid var(--doc-border);
		background: var(--doc-surface-2);
	}

	.preview__tabs {
		display: flex;
		gap: 2px;
	}

	.preview__tab {
		position: relative;
		padding: 12px 6px;
		margin-right: 12px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 13.5px;
		font-weight: 600;
		color: var(--doc-fg-subtle);
		transition: color 120ms ease;
	}
	.preview__tab:hover {
		color: var(--doc-fg-muted);
	}
	.preview__tab.is-active {
		color: var(--doc-fg);
	}
	.preview__tab.is-active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 12px;
		bottom: -1px;
		height: 2px;
		border-radius: 2px;
		background: var(--sve-color-primary);
	}

	.preview__copy {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		border-radius: 8px;
		border: 1px solid var(--doc-border-2);
		background: var(--doc-surface);
		color: var(--doc-fg-muted);
		font-size: 12.5px;
		font-weight: 600;
		cursor: pointer;
		transition: color 120ms ease, border-color 120ms ease;
	}
	.preview__copy:hover {
		color: var(--doc-fg);
		border-color: var(--doc-fg-subtle);
	}

	.preview__canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 14px;
		min-height: 160px;
		padding: 32px 24px;
		background-image: radial-gradient(var(--doc-dot) 1px, transparent 1px);
		background-size: 22px 22px;
	}
	.preview__canvas.is-start {
		align-items: flex-start;
		justify-content: flex-start;
	}

	.preview__code {
		margin: 0;
		padding: 18px 20px;
		overflow-x: auto;
		font-size: 13px;
		line-height: 1.7;
		color: #e6e6ec;
		background: var(--doc-code-bg);
	}
	.preview__code code {
		font-family: inherit;
		white-space: pre;
	}
</style>
