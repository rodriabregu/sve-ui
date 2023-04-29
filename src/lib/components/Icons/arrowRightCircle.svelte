<script lang="ts">
	export let size = '2.5';
	export let color = '#000000';
	export let stroke = '1.5';
</script>

<svg
	width={`${size}rem`}
	height={`${size}rem`}
	stroke-width={stroke}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{color}
	><path
		d="M8 12h8m0 0l-3.5-3.5M16 12l-3.5 3.5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
		stroke={color}
		stroke-width={stroke}
		stroke-linecap="round"
		stroke-linejoin="round"
	/></svg
>
