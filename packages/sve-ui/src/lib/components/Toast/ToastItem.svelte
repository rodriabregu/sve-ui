<script lang="ts">
  import type { ToastItem } from './store.svelte.js';
  import { dismiss } from './store.svelte.js';

  interface Props {
    item: ToastItem;
    /** Base label for the dismiss button, for translation. */
    dismissLabel: string;
  }

  let { item, dismissLabel }: Props = $props();

  function runAction(): void {
    item.action?.onclick();
    dismiss(item.id);
  }
</script>

<div class="sve-toast sve-toast--{item.variant}">
  <div class="sve-toast__body">
    <p class="sve-toast__title">{item.title}</p>
    {#if item.description}
      <p class="sve-toast__desc">{item.description}</p>
    {/if}
  </div>

  {#if item.action}
    <button type="button" class="sve-toast__action" onclick={runAction}>
      {item.action.label}
    </button>
  {/if}

  {#if item.dismissible}
    <!--
      Named with the toast's title, not a bare "Dismiss". With three toasts on
      screen a list of three identically-named buttons gives no way to tell
      which one closes what.
    -->
    <button
      type="button"
      class="sve-toast__close"
      aria-label="{dismissLabel}: {item.title}"
      onclick={() => dismiss(item.id)}
    >
      <span aria-hidden="true">×</span>
    </button>
  {/if}
</div>

<style>
  .sve-toast {
    display: flex;
    align-items: flex-start;
    gap: var(--sve-space-2);
    padding: var(--sve-space-3) var(--sve-space-4);
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    background: var(--sve-color-default-surface);
    box-shadow: var(--sve-shadow-md);
    font-family: var(--sve-font-family-sans);
    color: var(--sve-color-default-foreground);
    pointer-events: auto;
  }

  .sve-toast--success {
    border-color: var(--sve-color-success-border);
    background: var(--sve-color-success-surface);
    color: var(--sve-color-success-foreground);
  }

  .sve-toast--warning {
    border-color: var(--sve-color-warning-border);
    background: var(--sve-color-warning-surface);
    color: var(--sve-color-warning-foreground);
  }

  .sve-toast--error {
    border-color: var(--sve-color-danger-border);
    background: var(--sve-color-danger-surface);
    color: var(--sve-color-danger-foreground);
  }

  .sve-toast__body {
    flex: 1;
    min-width: 0;
  }

  .sve-toast__title {
    margin: 0;
    font-size: var(--sve-font-size-sm);
    font-weight: 600;
  }

  .sve-toast__desc {
    margin: var(--sve-space-1) 0 0;
    font-size: var(--sve-font-size-sm);
    opacity: 0.85;
  }

  .sve-toast__action,
  .sve-toast__close {
    flex: none;
    border-radius: var(--sve-radius-sm);
    font: inherit;
    cursor: pointer;
  }

  .sve-toast__action {
    padding: var(--sve-space-1) var(--sve-space-2);
    border: 1px solid currentColor;
    background: none;
    color: inherit;
    font-size: var(--sve-font-size-sm);
    font-weight: 600;
  }

  .sve-toast__close {
    padding: 0 var(--sve-space-1);
    border: 0;
    background: none;
    color: inherit;
    font-size: 1.15rem;
    line-height: 1.2;
    opacity: 0.7;
  }

  .sve-toast__close:hover {
    opacity: 1;
  }

  .sve-toast__action:focus-visible,
  .sve-toast__close:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
</style>
