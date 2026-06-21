<script lang="ts">
	import '../app.css';
	import { ThemeProvider } from 'sve-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	type ColorScheme = 'light' | 'dark' | 'system';
	let colorScheme = $state<ColorScheme>('system');

	function toggleTheme() {
		colorScheme = colorScheme === 'dark' ? 'light' : 'dark';
	}

	let isDark = $derived(colorScheme === 'dark');
</script>

<ThemeProvider {colorScheme}>
	<div class="min-h-screen flex flex-col" style="background: var(--sve-color-default-surface); color: var(--sve-color-default-foreground);">
		<!-- Navbar -->
		<nav class="sticky top-0 z-50 border-b flex items-center justify-between px-6 py-3"
			style="background: var(--sve-color-default-surface); border-color: var(--sve-color-default-border);">
			<a href="/" class="flex items-center gap-2 font-bold text-lg no-underline"
				style="color: var(--sve-color-default-foreground);">
				<span style="color: var(--sve-color-primary);">Sve</span><span>-UI</span>
			</a>

			<div class="flex items-center gap-4">
				<a href="/components"
					class="text-sm font-medium no-underline hover:opacity-80 transition-opacity"
					style="color: var(--sve-color-default-foreground);">
					Components
				</a>
				<a href="https://github.com/rodriabregu/sve-ui" target="_blank" rel="noopener"
					class="text-sm font-medium no-underline hover:opacity-80 transition-opacity"
					style="color: var(--sve-color-default-foreground);">
					GitHub
				</a>
				<a href="https://www.npmjs.com/package/sve-ui" target="_blank" rel="noopener"
					class="text-sm font-medium no-underline hover:opacity-80 transition-opacity"
					style="color: var(--sve-color-default-foreground);">
					npm
				</a>

				<!-- Dark mode toggle -->
				<button
					onclick={toggleTheme}
					class="p-2 rounded-lg transition-colors cursor-pointer border-0"
					style="background: var(--sve-color-default); color: var(--sve-color-default-foreground);"
					aria-label="Toggle dark mode">
					{#if isDark}
						<!-- Sun icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
						</svg>
					{:else}
						<!-- Moon icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
						</svg>
					{/if}
				</button>
			</div>
		</nav>

		<!-- Main content -->
		<main class="flex-1 w-full max-w-5xl mx-auto px-6 py-10">
			{@render children()}
		</main>

		<!-- Footer -->
		<footer class="text-center py-6 text-sm border-t"
			style="color: var(--sve-color-default-foreground); border-color: var(--sve-color-default-border); opacity: 0.7;">
			<p>
				Sve-UI — MIT License ·
				<a href="https://github.com/rodriabregu/sve-ui" target="_blank" rel="noopener"
					style="color: var(--sve-color-primary);">GitHub</a> ·
				<a href="https://www.npmjs.com/package/sve-ui" target="_blank" rel="noopener"
					style="color: var(--sve-color-primary);">npm</a>
			</p>
		</footer>
	</div>
</ThemeProvider>
