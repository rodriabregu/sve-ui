<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof SeparatorPrimitive.Root>;

	// Mirrors the Bits `Orientation` union. Spelled out rather than indexed off
	// BitsRootProps so the type reads as the two values a consumer actually
	// writes, in editor hover and in the generated prop table alike.
	type Orientation = 'horizontal' | 'vertical';

	// `orientation` and `decorative` come from the Bits props, but they ARE this
	// component's headline API — redeclared so the type surface and the generated
	// docs both name them instead of hiding them behind the spread.
	interface Props extends Omit<BitsRootProps, 'class' | 'orientation' | 'decorative'> {
		/**
		 * Reported to assistive technology as `aria-orientation`.
		 * @default 'horizontal'
		 */
		orientation?: Orientation;
		/**
		 * Drops the `separator` role so the divider is ignored by assistive
		 * technology. Use it for purely visual rules.
		 * @default false
		 */
		decorative?: boolean;
		class?: string;
	}

	let { orientation = 'horizontal', decorative = false, class: cls, ...rest }: Props = $props();

	const className = $derived(
		['sve-separator', `sve-separator--${orientation}`, cls].filter(Boolean).join(' ')
	);
</script>

<!--
  Bits owns the semantics: `role="separator"` with `aria-orientation`, or
  `role="none"` when `decorative` is set. Use `decorative` for purely visual
  rules that carry no structural meaning.
-->
<SeparatorPrimitive.Root
	class={className}
	data-slot="separator"
	{orientation}
	{decorative}
	{...rest}
/>

<style>
	:global(.sve-separator) {
		flex-shrink: 0;
		background-color: var(--sve-color-default-border);
		border: none;
	}

	:global(.sve-separator--horizontal) {
		width: 100%;
		height: 1px;
	}

	:global(.sve-separator--vertical) {
		width: 1px;
		height: 100%;
		align-self: stretch;
	}
</style>
