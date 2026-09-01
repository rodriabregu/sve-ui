<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Orientation = 'horizontal' | 'vertical';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label'> {
		orientation?: Orientation;
		/**
		 * The group's accessible name, e.g. "Text alignment".
		 *
		 * Required, because `role="group"` without one is worse than no role at
		 * all: it tells a screen reader there is a boundary here and then cannot say
		 * what the boundary is for. Use `labelledby` instead when a visible heading
		 * already names it.
		 */
		label?: string;
		/** Id of an existing visible label, as an alternative to `label`. */
		labelledby?: string;
		/** Extra classes merged onto the root element. */
		class?: string;
		children: Snippet;
	}

	let {
		orientation = 'horizontal',
		label,
		labelledby,
		class: cls,
		children,
		...rest
	}: Props = $props();

	const className = $derived(
		['sve-button-group', `sve-button-group--${orientation}`, cls].filter(Boolean).join(' ')
	);
</script>

<!--
  A group, not a toolbar and not a radio group.

  Reach for `Toolbar` when the buttons need one tab stop and arrow-key movement
  between them, and for `ToggleGroup` when they represent a selected value. This
  is the plain case: several independent buttons that belong together visually,
  each keeping its own tab stop.
-->
<div
	class={className}
	role="group"
	aria-label={labelledby ? undefined : label}
	aria-labelledby={labelledby}
	{...rest}
>
	{@render children()}
</div>

<style>
	.sve-button-group {
		display: inline-flex;
		/*
			`isolation` gives the group its own stacking context, so the z-index
			below lifts the focused button above its neighbours' borders without
			competing with anything outside the group.
		*/
		isolation: isolate;
	}

	.sve-button-group--horizontal {
		flex-direction: row;
	}

	.sve-button-group--vertical {
		flex-direction: column;
		align-items: stretch;
	}

	/*
		Collapsing the seam between buttons.

		These selectors are contextual on purpose: `.sve-button` is declared by
		Button.svelte and only reshaped here. Svelte compiles the group class with
		its own scope hash, which puts these at one class more specificity than
		Button's own rules — so they win without `!important` and without leaking
		to any button outside a group.

		The negative margin is what removes the doubled border. Without it, two
		1px borders meet and the seam reads twice as heavy as every other edge.
	*/
	.sve-button-group--horizontal :global(> *:not(:first-child)) {
		margin-left: -1px;
	}

	.sve-button-group--vertical :global(> *:not(:first-child)) {
		margin-top: -1px;
	}

	.sve-button-group--horizontal :global(> *:not(:first-child):not(:last-child)),
	.sve-button-group--vertical :global(> *:not(:first-child):not(:last-child)) {
		border-radius: 0;
	}

	.sve-button-group--horizontal :global(> *:first-child:not(:last-child)) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.sve-button-group--horizontal :global(> *:last-child:not(:first-child)) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.sve-button-group--vertical :global(> *:first-child:not(:last-child)) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.sve-button-group--vertical :global(> *:last-child:not(:first-child)) {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	/*
		A focus ring drawn under the next button's border is a focus ring the user
		cannot fully see. Lifting the focused child fixes it for every variant,
		including the ones whose ring sits outside the box.
	*/
	.sve-button-group :global(> *:focus-visible) {
		position: relative;
		z-index: 1;
	}
</style>
