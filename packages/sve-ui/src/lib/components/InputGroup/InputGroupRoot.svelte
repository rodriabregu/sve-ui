<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Match the size of the `Input` inside. */
		size?: Size;
		/** Mark the whole group invalid, alongside the input's own `invalid`. */
		invalid?: boolean;
		/** Extra classes merged onto the root element. */
		class?: string;
		children: Snippet;
	}

	let { size = 'md', invalid = false, class: cls, children, ...rest }: Props = $props();

	const className = $derived(
		['sve-input-group', `sve-input-group--${size}`, invalid && 'sve-input-group--invalid', cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
  The group draws the border; the input inside it draws none.

  That inversion is the whole component. An addon sitting NEXT TO a bordered
  input gives you two boxes touching, and no amount of spacing makes them read as
  one control. Moving the border to the wrapper and reacting to `:focus-within`
  is what makes the addon feel like part of the field instead of furniture beside
  it.

  Nothing here is a form control, so the group takes no ARIA role: the `<input>`
  it wraps is still the only thing in the accessibility tree, and it still needs
  its own label. Use `Field` for that.
-->
<div class={className} {...rest}>
	{@render children()}
</div>

<style>
	.sve-input-group {
		display: flex;
		align-items: stretch;
		width: 100%;
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: var(--sve-color-default-surface);
		/* The input's own corners must not paint over the group's. */
		overflow: hidden;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	/*
		`:focus-within`, not `:focus`. The focusable thing is the input (or a button
		addon) inside, and the ring belongs to the whole group so the addon does not
		appear to fall outside the focused control.
	*/
	.sve-input-group:focus-within {
		border-color: var(--sve-color-primary);
		box-shadow: 0 0 0 2px var(--sve-color-primary-surface);
	}

	.sve-input-group--invalid {
		border-color: var(--sve-color-danger-border);
	}

	.sve-input-group--invalid:focus-within {
		border-color: var(--sve-color-danger);
		box-shadow: 0 0 0 2px var(--sve-color-danger-surface);
	}

	/*
		Contextual on purpose: `.sve-input` is declared by Input.svelte and only
		stripped here. Svelte scopes the group class, so these sit one class above
		Input's own rules and win without `!important` — and no input outside a
		group is touched.
	*/
	.sve-input-group :global(.sve-input) {
		flex: 1 1 auto;
		min-width: 0;
		border: none;
		border-radius: 0;
		background-color: transparent;
		box-shadow: none;
	}

	.sve-input-group :global(.sve-input:focus-visible) {
		border: none;
		box-shadow: none;
		outline: none;
	}

	.sve-input-group--sm {
		font-size: var(--sve-font-size-sm);
	}

	.sve-input-group--md {
		font-size: var(--sve-font-size-sm);
	}

	.sve-input-group--lg {
		font-size: var(--sve-font-size-md);
	}
</style>
