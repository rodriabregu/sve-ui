<script lang="ts">
  // Dev playground — old Svelte 3 components removed in WU-1.
  // Will be updated in WU-7 to demonstrate the new component set.
  import ThemeProvider from '$lib/ThemeProvider.svelte';
  import Button from '$lib/components/Button/Button.svelte';
</script>

<ThemeProvider colorScheme="light">
  <Button variant="solid" color="primary" size="md">Click me</Button>
</ThemeProvider>
