<script module lang="ts">
	import { defineVariants } from '$lib/internal/variants';

	type Size = 'sm' | 'md' | 'lg';
	type Variant = 'outline' | 'filled';
	type Resize = 'none' | 'vertical' | 'horizontal' | 'both';

	export const textareaVariants = defineVariants({
		base: 'sve-textarea',
		variants: {
			variant: {
				outline: 'sve-textarea--outline',
				filled: 'sve-textarea--filled'
			},
			size: {
				sm: 'sve-textarea--sm',
				md: 'sve-textarea--md',
				lg: 'sve-textarea--lg'
			}
		},
		defaultVariants: {
			variant: 'outline',
			size: 'md'
		}
	});

	export type { Size, Variant, Resize };
</script>

<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLTextareaAttributes, 'class'> {
		size?: Size;
		variant?: Variant;
		invalid?: boolean;
		/** Which axes the user may resize. Maps to CSS `resize`. */
		resize?: Resize;
		class?: string;
	}

	let {
		size,
		variant,
		invalid = false,
		resize = 'vertical',
		rows = 3,
		class: cls,
		value = $bindable(),
		...rest
	}: Props = $props();

	const className = $derived(
		textareaVariants({
			size,
			variant,
			class: [cls, invalid ? 'sve-textarea--invalid' : ''].filter(Boolean).join(' ') || undefined
		})
	);
</script>

<!--
  Accessibility: consumers MUST associate a label via one of:
    - <label for="..."> matching the textarea's forwarded `id` prop
    - aria-labelledby pointing to a visible label element
  Both approaches work through the spread `{...rest}`.
  `aria-invalid` is wired automatically via the `invalid` prop.
-->
<textarea
	class={className}
	style:resize
	aria-invalid={invalid ? true : undefined}
	{rows}
	bind:value
	{...rest}></textarea>

<style>
	.sve-textarea {
		display: block;
		width: 100%;
		border-radius: var(--sve-radius-md);
		border: 1px solid transparent;
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-md);
		line-height: var(--sve-line-height-normal);
		/* Suppress the default browser outline; we render our own focus-visible ring below */
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
		background-color: transparent;
		color: var(--sve-color-default-foreground);
	}

	/* --- Sizes --- */
	.sve-textarea--sm {
		padding: var(--sve-space-1) var(--sve-space-2);
		font-size: var(--sve-font-size-sm);
	}

	.sve-textarea--md {
		padding: var(--sve-space-2) var(--sve-space-3);
	}

	.sve-textarea--lg {
		padding: var(--sve-space-3) var(--sve-space-4);
		font-size: var(--sve-font-size-lg);
	}

	/* --- Focus-visible ring (respects high-contrast mode via outline) --- */
	.sve-textarea:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 1px;
	}

	/* --- Outline variant --- */
	.sve-textarea--outline {
		background-color: transparent;
		border-color: var(--sve-color-default-border);
	}

	.sve-textarea--outline:focus-visible {
		border-color: var(--sve-color-primary-border);
		box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
	}

	/* --- Filled variant --- */
	.sve-textarea--filled {
		background-color: var(--sve-color-default-surface);
		border-color: transparent;
	}

	.sve-textarea--filled:focus-visible {
		background-color: var(--sve-color-default-surface);
		border-color: var(--sve-color-primary-border);
		box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
	}

	/* --- Invalid state --- */
	.sve-textarea--invalid {
		border-color: var(--sve-color-danger-border);
	}

	.sve-textarea--invalid:focus-visible {
		border-color: var(--sve-color-danger);
		box-shadow: 0 0 0 3px var(--sve-color-danger-surface);
		outline-color: var(--sve-color-danger);
	}

	/* --- Disabled state --- */
	.sve-textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
