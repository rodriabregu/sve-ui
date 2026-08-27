<script lang="ts">
	import { Command } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { setCommandResults } from './context.js';

	/*
		Derived from Bits' own prop rather than mirrored by hand. My first attempt
		wrote the shape out and missed a field, which svelte-check caught — and a
		hand-copied type would have drifted the next time Bits changed it anyway.
	*/
	type CommandState = Parameters<NonNullable<BitsRootProps['onStateChange']>>[0];

	type BitsRootProps = ComponentProps<typeof Command.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value'> {
		/** The highlighted item's value. Bindable. */
		value?: string;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	// `value` must be destructured and passed as `bind:value`. Forwarding it in
	// the spread makes it one-way, so the highlighted item would not reach the
	// caller.
	let { value = $bindable(''), onStateChange, class: cls, children, ...rest }: Props = $props();

	/*
		Bits reports the filtered count through `onStateChange` and exposes it
		nowhere else — no snippet prop, no context of its own. So the hook is
		intercepted here and the count published for `Command.Status`, which is the
		only way a screen reader user learns how many results their typing produced.

		The caller's own handler still runs, first, and unchanged.
	*/
	let results = $state({ count: 0, searching: false });

	setCommandResults(() => results);

	function handleStateChange(state: Readonly<CommandState>) {
		onStateChange?.(state);
		results = {
			count: state.filtered.count,
			// An empty query is not a search, and the count of an unfiltered list is
			// not worth announcing when a palette opens.
			searching: state.search.length > 0
		};
	}
</script>

<!--
  Bits owns the filtering, the scoring and the arrow-key navigation between
  visible items.

  Pass `label`: it renders a visually hidden <label> that the Input references,
  so it names the SEARCH FIELD — not the whole palette. Verified in the rendered
  DOM rather than assumed from the prop name.

  The LIST is named separately, via `ariaLabel` on `Command.List`, which Bits
  defaults to "Suggestions...". Override it with something that says what the
  suggestions are.

  Set `shouldFilter={false}` when you filter server-side; you then render only
  the items you want shown.
-->
<Command.Root
	onStateChange={handleStateChange}
	bind:value
	class={['sve-command', cls].filter(Boolean).join(' ')}
	data-slot="command"
	{children}
	{...rest}
/>

<style>
	:global(.sve-command) {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-lg);
		background-color: var(--sve-color-default-surface);
		font-family: var(--sve-font-family-sans);
		color: var(--sve-color-default-foreground);
	}
</style>
