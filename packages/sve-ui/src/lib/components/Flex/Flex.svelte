<script module lang="ts">
	/** Spacing token keys — gap is token-bound on purpose. */
	export type Gap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
	export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
	export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	export type As =
		| 'div'
		| 'section'
		| 'article'
		| 'aside'
		| 'header'
		| 'footer'
		| 'ul'
		| 'ol'
		| 'li'
		| 'nav'
		| 'form'
		| 'fieldset';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/** @default 'row' */
		direction?: Direction;
		/**
		 * Space between children, as a spacing token key — not an arbitrary length.
		 * @default 4
		 */
		gap?: Gap;
		/** Cross-axis alignment. @default 'center' */
		align?: Align;
		/** Main-axis distribution. @default 'start' */
		justify?: Justify;
		/**
		 * Allow children to wrap onto more lines. Worth turning on for anything
		 * that has to survive a narrow screen.
		 * @default false
		 */
		wrap?: boolean;
		/** Element to render, to keep the markup semantic. @default 'div' */
		as?: As;
		/** Extra classes merged onto the element. */
		class?: string;
		children?: Snippet;
	}

	let {
		direction = 'row',
		gap = 4,
		align = 'center',
		justify = 'start',
		wrap = false,
		as = 'div',
		class: cls,
		children,
		...rest
	}: Props = $props();

	const className = $derived(
		[
			'sve-flex',
			`sve-flex--${direction}`,
			`sve-flex--align-${align}`,
			`sve-flex--justify-${justify}`,
			wrap ? 'sve-flex--wrap' : '',
			cls
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
  The general flex primitive. Same discipline as Stack: token-bound gap, and no
  margin, padding, width or colour props — margin belongs to the parent, and the
  rest is what `class` and CSS are for.

  Reach for `Stack` instead when the direction is vertical; it is the same thing
  with a narrower API and a better default alignment for stacked fields.

  `align` defaults to `center` here because a row of mixed-height things (a
  label beside a button, an icon beside text) almost always wants centring, and
  the flex default of `stretch` visibly breaks that.
-->
<svelte:element
	this={as}
	class={className}
	style:gap={`var(--sve-space-${gap})`}
	data-slot="flex"
	{...rest}
>
	{@render children?.()}
</svelte:element>

<style>
	.sve-flex {
		display: flex;
		/* Reset list styling so `as="ul"` stays semantic without bullets. */
		margin: 0;
		padding: 0;
		list-style: none;
		min-width: 0;
	}

	.sve-flex--row {
		flex-direction: row;
	}
	.sve-flex--column {
		flex-direction: column;
	}
	.sve-flex--row-reverse {
		flex-direction: row-reverse;
	}
	.sve-flex--column-reverse {
		flex-direction: column-reverse;
	}

	.sve-flex--wrap {
		flex-wrap: wrap;
	}

	.sve-flex--align-start {
		align-items: flex-start;
	}
	.sve-flex--align-center {
		align-items: center;
	}
	.sve-flex--align-end {
		align-items: flex-end;
	}
	.sve-flex--align-stretch {
		align-items: stretch;
	}
	.sve-flex--align-baseline {
		align-items: baseline;
	}

	.sve-flex--justify-start {
		justify-content: flex-start;
	}
	.sve-flex--justify-center {
		justify-content: center;
	}
	.sve-flex--justify-end {
		justify-content: flex-end;
	}
	.sve-flex--justify-between {
		justify-content: space-between;
	}
	.sve-flex--justify-around {
		justify-content: space-around;
	}
	.sve-flex--justify-evenly {
		justify-content: space-evenly;
	}
</style>
