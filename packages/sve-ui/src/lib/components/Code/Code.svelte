<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /** The code to display (and copy). Kept as a string so copy is SSR-safe — no DOM scraping. */
    code: string;
    /** Optional header label, e.g. a filename or language. */
    label?: string;
    /** Show the copy-to-clipboard button. */
    copyable?: boolean;
    class?: string;
  }

  let { code, label, copyable = true, class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-code', cls].filter(Boolean).join(' '));

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    // SSR-safe: only touched on click, and guarded for environments without the API.
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (copied = false), 1500);
    } catch {
      // Clipboard denied/unavailable — silently no-op.
    }
  }

  onDestroy(() => clearTimeout(resetTimer));
</script>

<div class={className} {...rest}>
  {#if label || copyable}
    <div class="sve-code__bar">
      {#if label}<span class="sve-code__label">{label}</span>{/if}
      {#if copyable}
        <button
          type="button"
          class="sve-code__copy"
          onclick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {#if copied}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          {/if}
        </button>
      {/if}
    </div>
  {/if}
  <pre class="sve-code__pre"><code>{code}</code></pre>
</div>

<style>
  .sve-code {
    position: relative;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background-color: var(--sve-color-default-surface);
    overflow: hidden;
    font-family: var(--sve-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  }

  .sve-code__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sve-space-2);
    min-height: 2.25rem;
    padding: 0 var(--sve-space-2) 0 var(--sve-space-3);
    border-bottom: 1px solid var(--sve-color-default-border);
  }

  .sve-code__label {
    font-size: var(--sve-font-size-xs);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
    opacity: 0.7;
  }

  .sve-code__copy {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    border: none;
    border-radius: var(--sve-radius-sm);
    background-color: transparent;
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .sve-code__copy:hover {
    background-color: var(--sve-color-default);
  }

  .sve-code__copy:focus-visible {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  .sve-code__copy svg {
    width: 1rem;
    height: 1rem;
  }

  .sve-code__pre {
    margin: 0;
    padding: var(--sve-space-4);
    overflow-x: auto;
    font-size: var(--sve-font-size-sm);
    line-height: var(--sve-line-height-relaxed);
    color: var(--sve-color-default-foreground);
  }

  .sve-code__pre code {
    font-family: inherit;
  }
</style>
