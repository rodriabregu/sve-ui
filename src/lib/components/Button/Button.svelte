<!-- TO DO
La idea seria que reciba Padding 1, 2, 3, 4
Y utilizar una clase css global para que se aplique el padding

ej:
.padding-style-1 {
	padding: 2px 4px;
}

-->

<script lang="ts">
	export let label = 'Button';
	export let onClick = () => {};
	export let color = 'blue';
	export let size = 'md'; // xsm | sm | md | lg | xl | xxl | xxxl
	export let disabled = false;
	export let style = '';
	export let bg = '';
	export let p = '3';

	let props = { ...$$restProps };
</script>

<button
	class={`${props.class} button ${bg} padding-${p} ${color} ${size} ${style}`}
	on:click={onClick}
	style={`background-color: ${bg}`}
	{disabled}
>
	<slot>{label}</slot>
</button>

<style>
	.button {
		border: none;
		border-radius: 4px;
		font-size: 1rem;
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

	.xsm {
		font-size: 8px;
		padding: 2px 4px;
	}

	.sm {
		font-size: 12px;
		padding: 4px 8px;
	}

	.md {
		font-size: 16px;
		padding: 8px 16px;
	}

	.lg {
		font-size: 24px;
		padding: 12px 24px;
	}

	.xl {
		font-size: 32px;
		padding: 16px 32px;
	}

	.xxl {
		font-size: 48px;
		padding: 24px 48px;
	}

	.xxxl {
		font-size: 64px;
		padding: 32px 64px;
	}

	.button:hover {
		opacity: 0.94;
		transition: 0.2s ease-in-out;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	button:disabled:hover {
		opacity: 0.5;
	}

	.padding-1 {
		padding: 2px 4px;
	}

	.padding-2 {
		padding: 4px 8px;
	}

	.padding-3 {
		padding: 8px 16px;
	}

	.padding-4 {
		padding: 16px 32px;
	}
</style>
