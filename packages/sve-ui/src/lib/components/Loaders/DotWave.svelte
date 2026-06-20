<script lang="ts">
	import { theme } from '$lib/theme';

	export let size: keyof typeof theme.spacing = 14;
	export let color = 'white';
	export let speed = '1';
</script>

<div
	class="dot-wave"
	style="
  --sve-size: {theme.spacing[size]};
  --sve-speed: {speed}s;
  --sve-color: {color};
"
>
	<div class="dot-wave__dot" />
	<div class="dot-wave__dot" />
	<div class="dot-wave__dot" />
	<div class="dot-wave__dot" />
</div>

<style>
	.dot-wave {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		width: var(--sve-size);
		height: calc(var(--sve-size) * 0.17);
		padding-top: calc(var(--sve-size) * 0.34);
	}

	.dot-wave__dot {
		flex-shrink: 0;
		width: calc(var(--sve-size) * 0.17);
		height: calc(var(--sve-size) * 0.17);
		border-radius: 50%;
		background-color: var(--sve-color);
		will-change: transform;
	}

	.dot-wave__dot:nth-child(1) {
		animation: jump var(--sve-speed) ease-in-out calc(var(--sve-speed) * -0.45) infinite;
	}

	.dot-wave__dot:nth-child(2) {
		animation: jump var(--sve-speed) ease-in-out calc(var(--sve-speed) * -0.3) infinite;
	}

	.dot-wave__dot:nth-child(3) {
		animation: jump var(--sve-speed) ease-in-out calc(var(--sve-speed) * -0.15) infinite;
	}

	.dot-wave__dot:nth-child(4) {
		animation: jump var(--sve-speed) ease-in-out infinite;
	}

	@keyframes jump {
		0%,
		100% {
			transform: translateY(0px);
		}

		50% {
			transform: translateY(-200%);
		}
	}
</style>
