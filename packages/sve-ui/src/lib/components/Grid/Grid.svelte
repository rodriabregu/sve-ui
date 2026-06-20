<script lang="ts">
	export let columns = 1;
	export let gap = 1;
	export let flow = 'row';
</script>

<div
	style="
    display: grid;
    grid-template-columns: repeat({columns}, 1fr);
    grid-gap: {gap}rem;
    grid-auto-flow: {flow};
  "
	{...$$restProps}
>
	<slot />
</div>
