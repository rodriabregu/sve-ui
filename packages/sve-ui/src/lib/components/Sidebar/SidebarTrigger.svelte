<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useSidebar } from './context.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'onclick'> {
		/**
		 * Accessible name. It stays the SAME in both states — `aria-expanded`
		 * already carries whether the sidebar is open, so a label that flips between
		 * "Open" and "Close" says it twice and contradicts itself mid-announcement.
		 * @default 'Toggle sidebar'
		 */
		label?: string;
		/** Extra classes merged onto the button. */
		class?: string;
		children?: Snippet;
	}

	let { label = 'Toggle sidebar', class: cls, children, ...rest }: Props = $props();

	const ctx = useSidebar();
</script>

<!--
  Toggles the sidebar. It reports state through `aria-expanded` and points
  `aria-controls` at the sidebar element, so the relationship is announced
  rather than merely visual.

  It can live OUTSIDE the sidebar — in a top bar, say — which is why it reads
  the id from context instead of assuming it is a sibling. With
  `collapsible="offcanvas"` it has to be outside, or collapsing hides the only
  way back.
-->
<button
	type="button"
	class={['sve-sidebar__trigger', cls].filter(Boolean).join(' ')}
	aria-label={label}
	aria-expanded={ctx ? !ctx.collapsed : true}
	aria-controls={ctx?.id}
	data-slot="sidebar-trigger"
	onclick={() => ctx?.toggle()}
	{...rest}
>
	{@render children?.()}
</button>

<style>
	.sve-sidebar__trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-sm);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.sve-sidebar__trigger:hover {
		background-color: var(--sve-color-default);
	}

	.sve-sidebar__trigger:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.sve-sidebar__trigger {
			transition: none;
		}
	}
</style>
