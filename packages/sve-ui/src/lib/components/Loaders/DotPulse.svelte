<script lang="ts">
	import { theme } from '$lib/theme';

	export let size: keyof typeof theme.spacing = 14;
	export let color = 'white';
	export let speed = '1.2';
</script>

<div
	class="dot-pulse"
	style="
  --sve-size: {theme.spacing[size]};
  --sve-speed: {speed}s;
  --sve-color: {color};
"
>
	<div class="dot-pulse__dot" />
</div>

<style>
	.dot-pulse {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: var(--sve-size);
		height: calc(var(--sve-size) * 0.27);
	}

	.dot-pulse__dot,
	.dot-pulse::before,
	.dot-pulse::after {
		content: '';
		display: block;
		height: calc(var(--sve-size) * 0.18);
		width: calc(var(--sve-size) * 0.18);
		border-radius: 50%;
		background-color: var(--sve-color);
		transform: scale(0);
	}

	.dot-pulse::before {
		animation: pulse var(--sve-speed) ease-in-out infinite;
	}

	.dot-pulse__dot {
		animation: pulse var(--sve-speed) ease-in-out calc(var(--sve-speed) * 0.125) infinite both;
	}

	.dot-pulse::after {
		animation: pulse var(--sve-speed) ease-in-out calc(var(--sve-speed) * 0.25) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0);
		}

		50% {
			transform: scale(1.5);
		}
	}
</style>
