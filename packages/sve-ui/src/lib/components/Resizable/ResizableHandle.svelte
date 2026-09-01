<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { useResizable } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label'> {
		/**
		 * Index of the pane on the leading side of this handle — the one whose size
		 * `aria-valuenow` reports.
		 */
		index: number;
		/**
		 * The handle's accessible name, e.g. "Resize sidebar".
		 *
		 * Required. A `separator` with a tabindex is a control, and a control that
		 * announces only "splitter, 40" tells a keyboard user a number without
		 * saying what it sizes.
		 */
		label?: string;
		/** Percent moved per arrow-key press. */
		step?: number;
		/** Extra classes merged onto the handle. */
		class?: string;
	}

	let { index, label, step = 5, class: cls, ...rest }: Props = $props();

	const ctx = useResizable();
	const horizontal = $derived(ctx?.direction !== 'vertical');

	let dragging = $state(false);

	const now = $derived(Math.round(ctx?.sizeOf(index) ?? 0));

	function toPercent(px: number): number {
		const el = ctx?.element;
		if (!el) return 0;
		const total = horizontal ? el.clientWidth : el.clientHeight;
		return total ? (px / total) * 100 : 0;
	}

	/*
		Pointer events, and `setPointerCapture`.

		Capture is what keeps a drag alive when the pointer leaves the 4px handle —
		which it does immediately, because nobody tracks a hairline. Without it the
		divider drops the moment the cursor moves faster than the layout, and the
		listeners would have to go on the window and be torn down by hand.
	*/
	function onpointerdown(event: PointerEvent) {
		if (!ctx || event.button !== 0) return;
		const el = event.currentTarget as HTMLElement;
		el.setPointerCapture(event.pointerId);
		dragging = true;
		event.preventDefault();
	}

	function onpointermove(event: PointerEvent) {
		if (!dragging || !ctx) return;
		ctx.resize(index, toPercent(horizontal ? event.movementX : event.movementY));
	}

	function onpointerup(event: PointerEvent) {
		if (!dragging) return;
		(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
		dragging = false;
	}

	/*
		Keyboard operation is not a nice-to-have here: it is the difference between a
		splitter and a decoration. A divider that only responds to a drag is
		unusable without a pointer, and the APG window-splitter pattern is explicit
		about the arrow keys, Home and End.
	*/
	function onkeydown(event: KeyboardEvent) {
		if (!ctx) return;

		const back = horizontal ? 'ArrowLeft' : 'ArrowUp';
		const forward = horizontal ? 'ArrowRight' : 'ArrowDown';

		switch (event.key) {
			case back:
				ctx.resize(index, -step);
				break;
			case forward:
				ctx.resize(index, step);
				break;
			// 100 is deliberately larger than any legal move: `resize` clamps to the
			// declared minimum, so this collapses as far as the panes allow without
			// this component needing to know their limits.
			case 'Home':
				ctx.resize(index, -100);
				break;
			case 'End':
				ctx.resize(index, 100);
				break;
			default:
				return;
		}
		event.preventDefault();
	}

	const className = $derived(
		[
			'sve-resizable__handle',
			`sve-resizable__handle--${horizontal ? 'horizontal' : 'vertical'}`,
			dragging && 'sve-resizable__handle--dragging',
			cls
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
  The a11y linter flags `tabindex` on a `separator` as a non-interactive element
  with a tab stop. It is right about a plain separator and wrong about this one:
  ARIA says a separator becomes a WIDGET the moment it is focusable and carries
  `aria-valuenow`, which is exactly the window-splitter pattern. Removing the tab
  stop to satisfy the rule would delete keyboard operation, which is the whole
  contract this component exists to honour.
-->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class={className}
	role="separator"
	tabindex="0"
	aria-orientation={horizontal ? 'vertical' : 'horizontal'}
	aria-label={label}
	aria-controls={ctx?.idOf(index)}
	aria-valuenow={now}
	aria-valuemin={0}
	aria-valuemax={100}
	{onpointerdown}
	{onpointermove}
	{onpointerup}
	{onkeydown}
	{...rest}
></div>

<style>
	.sve-resizable__handle {
		flex: 0 0 auto;
		position: relative;
		background-color: var(--sve-color-default-border);
		transition: background-color 0.15s ease;
		/* Stops a drag from selecting the text in the panes either side. */
		user-select: none;
		touch-action: none;
	}

	/*
		`aria-orientation` is VERTICAL for a handle in a horizontal group: it
		describes the separator's own line, not the direction of travel. The class
		follows the group so the CSS reads the same way the prop does.
	*/
	.sve-resizable__handle--horizontal {
		width: 1px;
		cursor: col-resize;
	}

	.sve-resizable__handle--vertical {
		height: 1px;
		cursor: row-resize;
	}

	/*
		The hit area, and the reason it is a pseudo-element.

		A 1px divider is the right thing to LOOK at and an unreasonable thing to
		hit — WCAG target-size guidance puts the floor far above it. This grows the
		grabbable area to 12px without moving the panes by a pixel, which a padded
		or bordered handle would.
	*/
	.sve-resizable__handle::after {
		content: '';
		position: absolute;
		z-index: 1;
	}

	.sve-resizable__handle--horizontal::after {
		inset: 0 -6px;
	}

	.sve-resizable__handle--vertical::after {
		inset: -6px 0;
	}

	.sve-resizable__handle:hover,
	.sve-resizable__handle--dragging {
		background-color: var(--sve-color-primary);
	}

	.sve-resizable__handle:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 1px;
	}
</style>
