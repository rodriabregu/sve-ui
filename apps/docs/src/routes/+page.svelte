<script lang="ts">
	import { Button, Badge, Alert, Spinner } from 'sve-ui';
</script>

<svelte:head>
	<title>Sve-UI — Fast and modern Svelte UI library</title>
	<meta
		name="description"
		content="Boost your Svelte development with our powerful and easy-to-use library of reusable UI components. With a wide range of customizable options and full dark mode support, Sve-UI helps you build stunning web applications with ease."
	/>
</svelte:head>

<!-- Hero -->
<section class="flex flex-col items-center text-center gap-6 py-16">
	<Badge color="primary" variant="subtle">Now on Svelte 5 + Runes</Badge>

	<h1 class="text-5xl font-bold leading-tight max-w-2xl"
		style="color: var(--sve-color-default-foreground);">
		Make <span style="color: var(--sve-color-primary);">beautiful</span> websites with
		<span style="color: var(--sve-color-primary);">Sve-UI</span>.
	</h1>

	<p class="text-lg max-w-xl" style="color: var(--sve-color-default-foreground); opacity: 0.75;">
		A collection of accessible, themeable UI components for Svelte 5. Zero runtime style
		calculations. Full dark mode. CSS custom properties for complete design control.
	</p>

	<div class="flex flex-wrap gap-3 justify-center mt-2">
		<Button color="primary" variant="solid" onclick={() => (window.location.href = '/components')}>
			Explore Components
		</Button>
		<Button color="default" variant="outline" onclick={() => window.open('https://github.com/rodriabregu/sve-ui', '_blank')}>
			GitHub
		</Button>
	</div>

	<!-- Install snippet -->
	<div class="mt-4 code-block text-left w-full max-w-sm">
		<span style="color: #68d391;">$</span> pnpm add <span style="color: #f6ad55;">sve-ui</span>
	</div>
</section>

<!-- Feature highlights -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
	<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border); background: var(--sve-color-default-surface);">
		<div class="text-2xl mb-3">⚡</div>
		<h3 class="font-semibold text-lg mb-2" style="color: var(--sve-color-default-foreground);">Svelte 5 Runes</h3>
		<p class="text-sm" style="color: var(--sve-color-default-foreground); opacity: 0.7;">
			Built from the ground up with Svelte 5 runes and snippets. No legacy compatibility shims.
		</p>
	</div>
	<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border); background: var(--sve-color-default-surface);">
		<div class="text-2xl mb-3">🎨</div>
		<h3 class="font-semibold text-lg mb-2" style="color: var(--sve-color-default-foreground);">Themeable</h3>
		<p class="text-sm" style="color: var(--sve-color-default-foreground); opacity: 0.7;">
			CSS custom properties drive every color, spacing, and radius token. Light and dark out of the box.
		</p>
	</div>
	<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border); background: var(--sve-color-default-surface);">
		<div class="text-2xl mb-3">♿</div>
		<h3 class="font-semibold text-lg mb-2" style="color: var(--sve-color-default-foreground);">Accessible</h3>
		<p class="text-sm" style="color: var(--sve-color-default-foreground); opacity: 0.7;">
			Overlay components (Dialog, Tooltip, Popover, Dropdown) built on bits-ui for WAI-ARIA compliance.
		</p>
	</div>
</section>

<!-- Live examples -->
<section class="py-8">
	<h2 class="text-2xl font-bold mb-6" style="color: var(--sve-color-default-foreground);">See it live</h2>

	<div class="flex flex-col gap-6">
		<!-- Buttons -->
		<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border);">
			<p class="text-sm font-medium mb-4" style="color: var(--sve-color-default-foreground); opacity: 0.6;">Buttons — variants × colors</p>
			<div class="flex flex-wrap gap-3">
				<Button color="primary" variant="solid">Primary</Button>
				<Button color="success" variant="solid">Success</Button>
				<Button color="danger" variant="outline">Danger</Button>
				<Button color="default" variant="ghost">Ghost</Button>
				<Button color="secondary" variant="flat">Flat</Button>
			</div>
		</div>

		<!-- Badges + Spinner -->
		<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border);">
			<p class="text-sm font-medium mb-4" style="color: var(--sve-color-default-foreground); opacity: 0.6;">Badges + Spinner</p>
			<div class="flex flex-wrap items-center gap-3">
				<Badge color="primary">Primary</Badge>
				<Badge color="success" variant="subtle">Success</Badge>
				<Badge color="warning" variant="outline">Warning</Badge>
				<Badge color="danger">Danger</Badge>
				<Spinner color="primary" size="md" />
			</div>
		</div>

		<!-- Alerts -->
		<div class="p-6 rounded-xl border" style="border-color: var(--sve-color-default-border);">
			<p class="text-sm font-medium mb-4" style="color: var(--sve-color-default-foreground); opacity: 0.6;">Alerts</p>
			<div class="flex flex-col gap-3">
				<Alert.Root color="success" variant="subtle">
					<Alert.Title>Success</Alert.Title>
					<Alert.Description>Your changes have been saved.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="warning" variant="subtle">
					<Alert.Title>Warning</Alert.Title>
					<Alert.Description>Review your settings before continuing.</Alert.Description>
				</Alert.Root>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="text-center py-12">
	<h2 class="text-2xl font-bold mb-4" style="color: var(--sve-color-default-foreground);">Ready to build?</h2>
	<p class="mb-6" style="color: var(--sve-color-default-foreground); opacity: 0.7;">
		13 components, full theming, zero config.
	</p>
	<Button color="primary" variant="solid" onclick={() => (window.location.href = '/components')}>
		View all components →
	</Button>
</section>
