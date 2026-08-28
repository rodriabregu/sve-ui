<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md' | 'lg';
	type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class' | 'role'> {
		size?: Size;
		color?: Color;
		/**
		 * Names the spinner and makes it announce itself.
		 *
		 * **Leave it unset unless the spinner is the only thing on screen.** Without
		 * it the spinner is `aria-hidden` — decoration — which is what you want in
		 * almost every case, because something beside it already says what is
		 * happening: visible text, a `Button loading`, or a `Busy` region.
		 *
		 * It used to default to `'Loading'`, which made every spinner a live region.
		 * `<Busy label="Loading projects"><Spinner /></Busy>` then produced TWO
		 * announcements for one event — the spinner's on insertion, and `Busy`'s
		 * 400ms later — and the first defeated the debounce that exists to stop
		 * exactly that. Verified by counting `role="status"` elements in the subtree.
		 *
		 * `'Loading'` said nothing useful anyway: loading *what*?
		 */
		label?: string;
		/** Extra classes merged onto the root element. */
		class?: string;
	}

	let { size = 'md', color = 'default', label, class: cls, ...rest }: Props = $props();

	const className = $derived(
		['sve-spinner', `sve-spinner--${size}`, `sve-c-${color}`, cls ?? ''].filter(Boolean).join(' ')
	);
</script>

<!--
  Decoration unless named. A spinner almost never travels alone: there is visible
  text beside it, or a `Button loading`, or a `Busy` region — and each of those
  already announces. A second live region for the same event is not redundancy,
  it is two things talking at once.
-->
{#if label}
	<span role="status" class={className} aria-label={label} {...rest}>
		<span class="sve-spinner__track" aria-hidden="true"></span>
	</span>
{:else}
	<span class={className} aria-hidden="true" {...rest}>
		<span class="sve-spinner__track" aria-hidden="true"></span>
	</span>
{/if}

<style>
	.sve-spinner {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	/* --- Sizes --- */
	.sve-spinner--sm {
		width: 1rem;
		height: 1rem;
	}
	.sve-spinner--md {
		width: 1.5rem;
		height: 1.5rem;
	}
	.sve-spinner--lg {
		width: 2.5rem;
		height: 2.5rem;
	}

	/* --- Track (the spinning ring) --- */
	.sve-spinner__track {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--sve-radius-full);
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-right-color: currentColor;
		animation: sve-spin 0.7s linear infinite;
	}

	/* --- Colors via currentColor --- */
	.sve-c-primary {
		color: var(--sve-color-primary);
	}
	.sve-c-secondary {
		color: var(--sve-color-secondary);
	}
	.sve-c-success {
		color: var(--sve-color-success);
	}
	.sve-c-warning {
		color: var(--sve-color-warning);
	}
	.sve-c-danger {
		color: var(--sve-color-danger);
	}
	.sve-c-default {
		color: var(--sve-color-default-foreground);
	}

	/* Respect the user's motion preference */
	@media (prefers-reduced-motion: reduce) {
		.sve-spinner__track {
			animation: none;
		}
	}

	@keyframes sve-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
