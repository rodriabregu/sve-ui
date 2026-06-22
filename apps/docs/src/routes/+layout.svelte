<script lang="ts">
	import '../app.css';
	import { ThemeProvider } from 'sve-ui';
	import type { Snippet } from 'svelte';
	import { SVE_UI_VERSION } from '$lib/version';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const VERSION = SVE_UI_VERSION;
	const REPO = 'https://github.com/rodriabregu/sve-ui';
	const NPM = 'https://www.npmjs.com/package/sve-ui';

	type ColorScheme = 'light' | 'dark';
	let colorScheme = $state<ColorScheme>('dark');

	function toggleTheme() {
		colorScheme = colorScheme === 'dark' ? 'light' : 'dark';
	}

	let isDark = $derived(colorScheme === 'dark');

	// ThemeProvider toggles .dark/.light on its own wrapper, but Bits UI overlays
	// (Dialog/Dropdown/Tooltip/Popover) portal to <body> — OUTSIDE that wrapper —
	// so they would render with the light :root tokens regardless of theme.
	// Mirroring the class onto <body> gives portaled content the right --sve-* tokens.
	$effect(() => {
		document.body.classList.toggle('dark', isDark);
		document.body.classList.toggle('light', !isDark);
	});
</script>

<ThemeProvider {colorScheme}>
	<div class="flex min-h-screen flex-col" style="background: var(--doc-bg); color: var(--doc-fg);">
		<!-- ============ NAV ============ -->
		<header
			class="sticky top-0 z-50"
			style="backdrop-filter: blur(14px); background: color-mix(in srgb, var(--doc-bg) 78%, transparent); border-bottom: 1px solid var(--doc-border);"
		>
			<nav class="mx-auto flex h-16 max-w-[1180px] items-center gap-7 px-7">
				<a href="/" class="flex items-center gap-2 no-underline" style="color: var(--doc-fg);">
					<span
						class="inline-flex h-[30px] w-[30px] items-center justify-center font-extrabold"
						style="border-radius: 8px; background: var(--sve-color-primary); color: var(--sve-color-primary-foreground); font-size: 16px; box-shadow: 0 4px 14px -4px var(--sve-color-primary);"
					>S</span>
					<span class="font-bold" style="font-size: 17px; letter-spacing: -0.02em;"
						>Sve<span style="color: var(--doc-primary-text);">·</span>UI</span
					>
				</a>
				<span
					class="doc-mono inline-flex items-center"
					style="padding: 3px 9px; border-radius: 999px; border: 1px solid var(--doc-border-2); font-size: 11px; font-weight: 600; color: var(--doc-fg-muted);"
					>{VERSION}</span
				>

				<div class="flex-1"></div>

				<div class="flex items-center gap-6">
					<a
						href="/docs"
						class="hidden no-underline transition-opacity hover:opacity-70 sm:inline"
						style="color: var(--doc-fg-muted); font-size: 14.5px; font-weight: 500;">Docs</a
					>
					<a
						href="/components"
						class="hidden no-underline transition-opacity hover:opacity-70 sm:inline"
						style="color: var(--doc-fg-muted); font-size: 14.5px; font-weight: 500;">Components</a
					>
					<a
						href="/#theming"
						class="hidden no-underline transition-opacity hover:opacity-70 sm:inline"
						style="color: var(--doc-fg-muted); font-size: 14.5px; font-weight: 500;">Theming</a
					>
					<a
						href="/#compare"
						class="hidden no-underline transition-opacity hover:opacity-70 sm:inline"
						style="color: var(--doc-fg-muted); font-size: 14.5px; font-weight: 500;">Compare</a
					>
					<a
						href={REPO}
						target="_blank"
						rel="noopener"
						class="flex items-center gap-2 no-underline"
						style="color: var(--doc-fg); font-size: 14px; font-weight: 600; padding: 7px 12px; border: 1px solid var(--doc-border-2); border-radius: 9px;"
					>
						<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
							><path
								d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
							/></svg
						>
						GitHub
					</a>
					<button
						onclick={toggleTheme}
						aria-label="Toggle theme"
						class="inline-flex h-9 w-9 cursor-pointer items-center justify-center"
						style="border-radius: 9px; border: 1px solid var(--doc-border-2); background: var(--doc-surface); color: var(--doc-fg);"
					>
						{#if isDark}
							<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"
								><circle cx="12" cy="12" r="4" /><path
									d="M12 2v2M12 20v2M5 5l1.5 1.5M17.5 17.5 19 19M2 12h2M20 12h2M5 19l1.5-1.5M17.5 6.5 19 5"
								/></svg
							>
						{:else}
							<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
								><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg
							>
						{/if}
					</button>
				</div>
			</nav>
		</header>

		<!-- Main content — each page owns its own container -->
		<main class="w-full flex-1">
			{@render children()}
		</main>

		<!-- ============ FOOTER ============ -->
		<footer style="border-top: 1px solid var(--doc-border);">
			<div
				class="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-7 py-8"
			>
				<div class="flex items-center gap-3">
					<span
						class="inline-flex h-[26px] w-[26px] items-center justify-center font-extrabold"
						style="border-radius: 7px; background: var(--sve-color-primary); color: var(--sve-color-primary-foreground); font-size: 14px;"
						>S</span
					>
					<span style="font-size: 14px; color: var(--doc-fg-muted);"
						>Sve·UI — MIT licensed. Built for Svelte 5.</span
					>
				</div>
				<div class="flex items-center gap-6" style="font-size: 14px;">
					<a href={REPO} target="_blank" rel="noopener" class="no-underline transition-opacity hover:opacity-70" style="color: var(--doc-fg-muted);">GitHub</a>
					<a href={NPM} target="_blank" rel="noopener" class="no-underline transition-opacity hover:opacity-70" style="color: var(--doc-fg-muted);">npm</a>
					<a href="/components" class="no-underline transition-opacity hover:opacity-70" style="color: var(--doc-fg-muted);">Components</a>
					<a href="/#theming" class="no-underline transition-opacity hover:opacity-70" style="color: var(--doc-fg-muted);">Theming</a>
				</div>
			</div>
		</footer>
	</div>
</ThemeProvider>
