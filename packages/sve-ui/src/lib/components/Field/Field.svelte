<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Label from '../Label/Label.svelte';

	/** Text, or a snippet when the content needs markup (a link, say). */
	type Content = string | Snippet;

	/** What the control must spread onto itself for any of this to be wired. */
	export interface FieldControlProps {
		id: string;
		'aria-describedby': string | undefined;
		'aria-invalid': true | undefined;
		required: true | undefined;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** The control's accessible name. Rendered as a `<label for>`. */
		label: Content;
		/**
		 * Standing help text. Read out with the control, so keep it short — it is
		 * announced every time the control takes focus.
		 */
		description?: Content;
		/**
		 * The validation message. Its presence is what makes the field invalid:
		 * there is no separate `invalid` prop, so the styling and `aria-invalid`
		 * cannot disagree with what the user is reading.
		 *
		 * Pass `undefined` (not an empty string) when the field is valid.
		 */
		error?: Content;
		/** Marks the control required and shows the marker on the label. */
		required?: boolean;
		/** Extra classes merged onto the wrapper. */
		class?: string;
		/** The control. Spread the props it is given, or nothing is wired. */
		control: Snippet<[FieldControlProps]>;
	}

	let {
		label,
		description,
		error,
		required = false,
		class: cls,
		control,
		...rest
	}: Props = $props();

	// Stable across server and client, which `Math.random()` would not be.
	const uid = $props.id();
	const controlId = `${uid}-control`;
	const descriptionId = `${uid}-description`;
	const errorId = `${uid}-error`;

	const hasDescription = $derived(description !== undefined);
	const hasError = $derived(error !== undefined);

	/*
		Only ids that actually exist. `aria-describedby` pointing at a missing id is
		invalid — axe flags it under `aria-valid-attr-value` — and nothing is
		announced for the dangling reference, so it is a silent loss rather than a
		visible bug.

		The error comes first: when a field is wrong, that is the part the user needs
		to hear before the standing help text.
	*/
	const describedby = $derived(
		[hasError ? errorId : undefined, hasDescription ? descriptionId : undefined]
			.filter(Boolean)
			.join(' ') || undefined
	);

	const controlProps: FieldControlProps = $derived({
		id: controlId,
		'aria-describedby': describedby,
		'aria-invalid': hasError ? true : undefined,
		required: required ? true : undefined
	});

	/*
		The one failure this API can have is a caller who forgets to spread `props`.
		Nothing breaks visibly: the label just stops pointing at anything. So say so,
		loudly, in the browser where it can be checked.
	*/
	$effect(() => {
		if (document.getElementById(controlId)) return;
		console.error(
			`[sve-ui] <Field> rendered a label for "${controlId}" but no element has that id. ` +
				'Spread the props the `control` snippet is given onto your control ' +
				'(`{#snippet control(props)}<Input {...props} />{/snippet}`). Until you do, ' +
				'the label, the description and the error are attached to nothing.'
		);
	});
</script>

<!--
  Ties a control to its label, its help text and its validation message with ids
  that actually match.

  Why the control arrives through a snippet instead of being a child component:
  `aria-describedby` must name only ids that exist, and that has to be true in
  the SERVER-rendered HTML, not resolved later by an effect. Taking `description`
  and `error` as props means the value is exact at render time. A parts-based
  `<Field.Description>` sibling could only register itself after the control had
  already rendered, so the first paint would either miss the reference or point
  at an id that is not there yet.

  It also means this works with any control, including a plain `<input>` — the
  library never has to know about yours.
-->
<div
	class={['sve-field', cls].filter(Boolean).join(' ')}
	{...rest}
	data-sve-field-invalid={hasError ? '' : undefined}
	data-sve-field-control={controlId}
>
	<Label for={controlId} {required}>
		{#if typeof label === 'string'}{label}{:else}{@render label()}{/if}
	</Label>

	{@render control(controlProps)}

	{#if hasDescription}
		<p class="sve-field__description" id={descriptionId}>
			{#if typeof description === 'string'}{description}{:else}{@render description!()}{/if}
		</p>
	{/if}

	{#if hasError}
		<p class="sve-field__error" id={errorId}>
			{#if typeof error === 'string'}{error}{:else}{@render error!()}{/if}
		</p>
	{/if}
</div>

<style>
	.sve-field {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-1);
		font-family: var(--sve-font-family-sans);
	}

	.sve-field__description,
	.sve-field__error {
		margin: 0;
		font-size: var(--sve-font-size-sm);
		line-height: var(--sve-line-height-normal);
	}

	.sve-field__description {
		color: var(--sve-color-default-foreground);
		opacity: 0.75;
	}

	.sve-field__error {
		color: var(--sve-color-danger);
	}
</style>
