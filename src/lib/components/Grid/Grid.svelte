<script lang="ts">
	export let columns = 3;
	export let gap = '1rem';
	export let flow = 'row';
</script>

<div
	style="
    display: grid;
    grid-template-columns: repeat({columns}, 1fr);
    grid-gap: {gap};
    grid-auto-flow: {flow};
  "
	{...$$restProps}
>
	<slot />
</div>
