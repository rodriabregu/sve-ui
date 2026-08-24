<script lang="ts">
	import { PinInput } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof PinInput.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value'> {
		/** The entered code. Bindable. */
		value?: string;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	// `value` must be destructured and passed as `bind:value`. Forwarding it in
	// the spread makes it one-way, so typed digits would not reach the caller.
	let { value = $bindable(''), class: cls, children, ...rest }: Props = $props();
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
	class={['sve-pin-input', cls].filter(Boolean).join(' ')}
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
</style>
