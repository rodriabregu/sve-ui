<script lang="ts">
	import { PinInput } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof PinInput.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value'> {
		/** The entered code. Bindable. */
		value?: string;
		/** Extra classes merged onto the root. */
		/**
		 * Marks the control as failing validation.
		 *
		 * Always applies the invalid styling. Does NOT set `aria-invalid`: this renders as `container; Bits owns the inputs`, and ARIA does not
		 * support the attribute there, so assistive technology is free to ignore it.
		 * axe does NOT flag it either way — verified by injecting it and watching the
		 * suite still pass — so this is a decision taken from the spec, not one a
		 * tool enforces. The accessible signal comes
		 * from `Field` wiring the error message through `aria-describedby`.
		 *
		 * Prefer letting `Field` drive this: passing `Field` an `error` is what makes
		 * a field invalid, so the message the user reads and the state of the control
		 * cannot disagree.
		 * @default false
		 */
		invalid?: boolean;
		class?: string;
	}

	// `value` must be destructured and passed as `bind:value`. Forwarding it in
	// the spread makes it one-way, so typed digits would not reach the caller.
	let { invalid = false, value = $bindable(''), class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Root renders ONE real input behind the cells, which is what makes autofill,
  paste and mobile SMS autofill work. The cells are visual — they are not
  separate inputs, so the user never has to tab between them and a screen reader
  hears one field rather than six.

  `maxlength` is required: it is how many cells there are. Root hands you a
  `cells` array through a snippet, so you render them:

    {#snippet children({ cells })}
      {#each cells as cell (cell)}
        <PinInput.Cell {cell} />
      {/each}
    {/snippet}

  NAMING IT — `<label for>` does NOT work here, which is worth knowing before
  you ship an unnamed field. Verified in the rendered DOM: `id` lands on the
  wrapper DIV, and the real input gets a Bits-INTERNAL id you cannot predict
  (`bits-c1-input`), so there is nothing for a `for` attribute to point at.

  The spread reaches the input, so name it from Root instead:

    - `aria-label="Verification code"` — simplest.
    - `aria-labelledby="my-label-id"` — when you want a VISIBLE label; give your
      own element an id and point at it.

  Use `onComplete` to submit rather than making the user hunt for a button.
-->
<PinInput.Root
	bind:value
	class={['sve-pin-input', invalid && 'sve-pin-input--invalid', cls].filter(Boolean).join(' ')}
	data-slot="pin-input"
	{children}
	{...rest}
/>

<style>
	:global(.sve-pin-input) {
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
		font-family: var(--sve-font-family-sans);
	}

	:global(.sve-pin-input[data-disabled]) {
		opacity: 0.5;
	}

	/* Colour is never the only signal: `Field` supplies the message that says why. */
	:global(.sve-pin-input--invalid) {
		border-color: var(--sve-color-danger);
	}

	:global(.sve-pin-input--invalid:focus-visible) {
		outline-color: var(--sve-color-danger);
	}
</style>
