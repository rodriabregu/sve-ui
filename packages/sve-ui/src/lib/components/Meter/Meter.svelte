<script module lang="ts">
	export type Size = 'sm' | 'md' | 'lg';
	export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
	// Aliased: see scripts/check-dts.mjs.
	import { Meter as MeterPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof MeterPrimitive.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'value' | 'max' | 'min'> {
		/** @default 0 */
		value?: number;
		/** @default 100 */
		max?: number;
		/** @default 0 */
		min?: number;
		/** @default 'md' */
		size?: Size;
		/** @default 'primary' */
		color?: Color;
		/** Extra classes merged onto the track. */
		class?: string;
	}

	let {
		value = 0,
		max = 100,
		min = 0,
		size = 'md',
		color = 'primary',
		class: cls,
		...rest
	}: Props = $props();

	const className = $derived(
		['sve-meter', `sve-meter--${size}`, `sve-c-${color}`, cls].filter(Boolean).join(' ')
	);

	const percent = $derived(Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)));
</script>

<!--
  Meter vs Progress: a meter reports a STATIC measurement within a known range
  (disk usage, password strength, score). Progress reports advancement toward
  completion. Bits owns `role="meter"` and the aria-value* attributes; the
  accessible NAME is yours — pass `aria-label` or `aria-labelledby`.
-->
<MeterPrimitive.Root {value} {max} {min} class={className} data-slot="meter" {...rest}>
	<div class="sve-meter__fill" style:width={`${percent}%`}></div>
</MeterPrimitive.Root>

<style>
	:global(.sve-meter) {
		position: relative;
		overflow: hidden;
		width: 100%;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default-surface);
	}

	/* --- Sizes --- */
	:global(.sve-meter--sm) {
		height: 0.25rem;
	}
	:global(.sve-meter--md) {
		height: 0.5rem;
	}
	:global(.sve-meter--lg) {
		height: 0.75rem;
	}

	:global(.sve-meter__fill) {
		height: 100%;
		border-radius: inherit;
		background-color: currentColor;
		transition: width 0.25s ease;
	}

	/* --- Colors via currentColor on the track --- */
	:global(.sve-c-primary) {
		color: var(--sve-color-primary);
	}
	:global(.sve-c-secondary) {
		color: var(--sve-color-secondary);
	}
	:global(.sve-c-success) {
		color: var(--sve-color-success);
	}
	:global(.sve-c-warning) {
		color: var(--sve-color-warning);
	}
	:global(.sve-c-danger) {
		color: var(--sve-color-danger);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-meter__fill) {
			transition: none;
		}
	}
</style>
