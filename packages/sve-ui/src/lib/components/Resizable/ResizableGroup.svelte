<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setResizableContext, type Direction, type PaneRegistration } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		direction?: Direction;
		/** Extra classes merged onto the group. */
		class?: string;
		children: Snippet;
	}

	let { direction = 'horizontal', class: cls, children, ...rest }: Props = $props();

	let element = $state<HTMLDivElement | undefined>(undefined);
	let regs = $state<PaneRegistration[]>([]);
	let sizes = $state<number[]>([]);
	const uid = $props.id();

	function register(reg: PaneRegistration): number {
		const index = regs.length;
		regs = [...regs, reg];
		// An even split is the only distribution that needs no configuration and
		// cannot violate a minimum that has not been declared yet. Recomputed from
		// the new total rather than appended, so registering a third pane
		// redistributes the first two instead of leaving them at 50 each.
		const total = index + 1;
		sizes = Array.from({ length: total }, () => 100 / total);
		return index;
	}

	/*
		Resizing moves ONE boundary and touches exactly TWO panes.

		Distributing a drag across every pane in the group is what produces the
		familiar bug where dragging one divider quietly reflows the far side of the
		layout. Taking from the neighbour keeps the total at 100 and leaves every
		other pane where the user put it.
	*/
	function resize(index: number, deltaPercent: number) {
		const a = index;
		const b = index + 1;
		if (a < 0 || b >= sizes.length) return;

		const ra = regs[a];
		const rb = regs[b];

		// Clamp against BOTH panes before applying anything. Clamping only the pane
		// being grown lets the other one shrink past its own minimum.
		const maxGrow = Math.min(ra.max - sizes[a], sizes[b] - rb.min);
		const maxShrink = Math.min(sizes[a] - ra.min, rb.max - sizes[b]);
		const delta = Math.max(-maxShrink, Math.min(maxGrow, deltaPercent));
		if (delta === 0) return;

		const next = [...sizes];
		next[a] = sizes[a] + delta;
		next[b] = sizes[b] - delta;
		sizes = next;
	}

	setResizableContext({
		get direction() {
			return direction;
		},
		get sizes() {
			return sizes;
		},
		get element() {
			return element;
		},
		register,
		sizeOf(i) {
			return sizes[i] ?? 0;
		},
		idOf(i) {
			return `${uid}-pane-${i}`;
		},
		resize
	});

	const className = $derived(
		['sve-resizable', `sve-resizable--${direction}`, cls].filter(Boolean).join(' ')
	);
</script>

<div bind:this={element} class={className} {...rest}>
	{@render children()}
</div>

<style>
	.sve-resizable {
		display: flex;
		width: 100%;
		overflow: hidden;
	}

	.sve-resizable--horizontal {
		flex-direction: row;
	}

	.sve-resizable--vertical {
		flex-direction: column;
		height: 100%;
	}
</style>
