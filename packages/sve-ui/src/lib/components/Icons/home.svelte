<script lang="ts">
	export let size = '2.5';
	export let color = '#000000';
	export let stroke = '1.5';
</script>

<svg
	width={`${size}rem`}
	height={`${size}rem`}
	viewBox="0 0 24 24"
	stroke-width={stroke}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{color}
	><path
		d="M10 18v-3a2 2 0 012-2v0a2 2 0 012 2v3M2 8l9.732-4.866a.6.6 0 01.536 0L22 8"
		stroke={color}
		stroke-width={stroke}
		stroke-linecap="round"
		stroke-linejoin="round"
	/><path
		d="M20 11v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8"
		stroke={color}
		stroke-width={stroke}
		stroke-linecap="round"
		stroke-linejoin="round"
	/></svg
>
