<script lang="ts">
	import { PinInput } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsCellProps = ComponentProps<typeof PinInput.Cell>;

	interface Props extends Omit<BitsCellProps, 'class'> {
		/** Extra classes merged onto the cell. */
		class?: string;
	}

	// `cell` has to be read, not just forwarded: Bits' Cell renders
	// `{@render children?.()}` and nothing else, so the character is ours to draw.
	let { cell, class: cls, ...rest }: Props = $props();
</script>

<!--
  Purely visual: the real input lives on Root, and Bits marks the focused cell
  with `data-active`.

  It does NOT draw the character. Bits' Cell renders
  `<div {...props}>{@render children?.()}</div>` — the digit is the consumer's to
  render, and this wrapper was self-closing, so every cell was empty no matter
  what you typed. The value updated and the boxes stayed blank.

  The caret is a placeholder for the cell the cursor is in, since the real input
  is visually hidden and cannot show its own.
-->
<PinInput.Cell
	{cell}
	class={['sve-pin-input__cell', cls].filter(Boolean).join(' ')}
	data-slot="pin-input-cell"
	{...rest}
>
	{#if cell.char !== null && cell.char !== undefined}
		{cell.char}
	{:else if cell.hasFakeCaret}
		<span class="sve-pin-input__caret" aria-hidden="true"></span>
	{/if}
</PinInput.Cell>

<style>
	:global(.sve-pin-input__cell) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 3rem;
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		font-size: var(--sve-font-size-lg);
		font-weight: var(--sve-font-weight-medium);
		color: var(--sve-color-default-foreground);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	/* The focus ring lands on the cell the caret is in, since the real input is
     visually hidden and cannot show focus itself. */
	:global(.sve-pin-input__cell[data-active]) {
		border-color: var(--sve-color-primary);
		box-shadow: 0 0 0 3px var(--sve-color-primary-surface);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-pin-input__cell) {
			transition: none;
		}
	}

	/*
		Stands in for the text cursor, which the visually hidden real input cannot
		show. Decorative — the value is announced by the input itself.
	*/
	.sve-pin-input__caret {
		width: 1px;
		height: 1.25rem;
		background-color: var(--sve-color-default-foreground);
		animation: sve-pin-caret 1s step-end infinite;
	}

	@keyframes sve-pin-caret {
		50% {
			opacity: 0;
		}
	}

	/* A blinking bar is exactly the kind of motion that has to be stoppable. */
	@media (prefers-reduced-motion: reduce) {
		.sve-pin-input__caret {
			animation: none;
		}
	}
</style>
