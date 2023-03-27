<script lang="ts">
	export let label = 'Button';
	export let onClick = () => {};
	export let color = 'blue';
	export let size = 'medium';
	export let disabled = false;
	let props = { ...$$restProps };
</script>

<button
	class={`${props.class} ${props.style} button ${color} ${size}`}
	on:click={onClick}
	{disabled}
>
	<slot>{label}</slot>
</button>

<style>
	.button {
		border: none;
		border-radius: 4px;
		font-size: 16px;
		font-weight: bold;
		padding: 8px 16px;
		cursor: pointer;
	}
	.blue {
		background-color: #007bff;
		color: #fff;
	}
	.red {
		background-color: #dc3545;
		color: #fff;
	}
	.green {
		background-color: #28a745;
		color: #fff;
	}
	.small {
		font-size: 12px;
		padding: 4px 8px;
	}
	.medium {
		font-size: 16px;
		padding: 8px 16px;
	}
	.large {
		font-size: 24px;
		padding: 12px 24px;
	}
	.button:hover {
		opacity: 0.94;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	button:disabled:hover {
		opacity: 0.5;
	}
</style>
