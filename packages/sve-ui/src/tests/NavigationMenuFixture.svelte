<script lang="ts">
	import * as NavigationMenu from '$lib/components/NavigationMenu/index.js';

	let value = $state('');
</script>

<NavigationMenu.Root bind:value aria-label="Site">
	<NavigationMenu.List>
		<NavigationMenu.Item value="products">
			<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link>
				<NavigationMenu.Link href="/reports">Reports</NavigationMenu.Link>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item value="pricing">
			<NavigationMenu.Link href="/pricing" active>Pricing</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
	<NavigationMenu.Viewport />
</NavigationMenu.Root>
<output data-testid="value">{value}</output>
