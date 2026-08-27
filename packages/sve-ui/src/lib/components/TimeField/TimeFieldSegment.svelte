<script lang="ts">
	import { useSegmentedRequired } from '$lib/internal/segmented-required';
	import { TimeField } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsProps = ComponentProps<typeof TimeField.Segment>;

	interface Props extends Omit<BitsProps, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();

	const isRequired = useSegmentedRequired();

	/*
		Only the editable segments. The literals — the slashes and colons — are not
		focusable and carry no role, so marking them required would be noise on
		elements a user never reaches.
	*/
	const required = $derived(isRequired() && rest.part !== 'literal');
</script>

<!--
  One editable part of the value — month, day, year, hour. Bits gives each
  segment spinbutton ARIA (`aria-valuenow`, `aria-valuetext`, `aria-label`), so
  arrow keys adjust it and a screen reader announces "month, 12" rather than
  reading a formatted string. That is what a segmented field buys over a text
  input: the parts are individually addressable.

  Literal segments (the slashes and colons) are rendered too, marked
  `data-segment="literal"`, and are not focusable.
-->
<TimeField.Segment
	class={['sve-segment', cls].filter(Boolean).join(' ')}
	data-slot="time-field-segment"
	aria-required={required ? true : undefined}
	{children}
	{...rest}
/>

<style>
	/*
    This ruleset is duplicated in TimeFieldSegment. Svelte compiles styles per
    component, so sharing it would need a global stylesheet — and adding one for
    thirty lines is worse than the duplication. Keep the two in sync.
  */
	:global(.sve-segment) {
		padding: 0 2px;
		border-radius: var(--sve-radius-sm);
		font-variant-numeric: tabular-nums;
		color: var(--sve-color-default-foreground);
		outline: none;
	}

	/*
    An unfilled segment. Bits does NOT emit a `data-placeholder` attribute —
    verified against the rendered DOM — it signals empty through
    `aria-valuetext="Empty"`, which is part of the ARIA contract and stable to
    target. Fading it makes the "mm" read as a prompt rather than as data the
    user typed.
  */
	:global(.sve-segment[aria-valuetext='Empty']) {
		opacity: 0.5;
	}

	/*
    `:focus`, not `:focus-visible`: these are contenteditable spinbuttons, so a
    click is an edit and must show the highlight. There is no `data-focused`
    attribute on segments — checked.
  */
	:global(.sve-segment:focus) {
		background-color: var(--sve-color-primary);
		color: var(--sve-color-primary-foreground);
	}

	/* Literals — the slashes and colons between segments — are not focusable and
     must not look like they are. */
	:global(.sve-segment[data-segment='literal']) {
		opacity: 0.5;
		padding: 0;
	}

	:global(.sve-segment[data-invalid]) {
		color: var(--sve-color-danger);
	}

	:global(.sve-segment[data-disabled]) {
		opacity: 0.5;
	}
</style>
