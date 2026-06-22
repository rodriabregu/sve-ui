<script lang="ts">
	import {
		Button,
		Badge,
		Text,
		Heading,
		Avatar,
		Spinner,
		Alert,
		Input,
		Dialog,
		DropdownMenu,
		Tooltip,
		Popover,
		ThemeProvider
	} from 'sve-ui';

	const REPO = 'https://github.com/rodriabregu/sve-ui';
	const NPM = 'https://www.npmjs.com/package/sve-ui';
	const VERSION = 'v0.1.2';

	// --- Live theming sandbox state (scoped to the Theming section panel) ---
	const ACCENTS = [
		{ id: 'coral', label: 'Coral', fill: '#F56565', strong: '#EF4444', textDark: '#FF8A8A', textLight: '#DC3A3A' },
		{ id: 'orange', label: 'Orange', fill: '#ED8936', strong: '#DD6B20', textDark: '#F6AD55', textLight: '#C05621' },
		{ id: 'violet', label: 'Violet', fill: '#8B5CF6', strong: '#7C3AED', textDark: '#A78BFA', textLight: '#6D28D9' },
		{ id: 'emerald', label: 'Emerald', fill: '#10B981', strong: '#059669', textDark: '#34D399', textLight: '#047857' },
		{ id: 'ocean', label: 'Ocean', fill: '#3B82F6', strong: '#2563EB', textDark: '#60A5FA', textLight: '#1D4ED8' }
	];

	let accentId = $state('coral');
	let demoScheme = $state<'light' | 'dark'>('dark');

	let acc = $derived(ACCENTS.find((a) => a.id === accentId) ?? ACCENTS[0]);
	// Override the real --sve-color-primary token set from the chosen accent.
	// surface/border are derived with color-mix so each swatch needs only 2 hex values.
	let accentStyle = $derived(
		`--sve-color-primary:${acc.fill};` +
			`--sve-color-primary-hover:${acc.strong};` +
			`--sve-color-primary-active:${acc.strong};` +
			`--sve-color-primary-foreground:#ffffff;` +
			`--sve-color-primary-surface:color-mix(in srgb, ${acc.fill} 14%, transparent);` +
			`--sve-color-primary-border:color-mix(in srgb, ${acc.fill} 50%, transparent);` +
			`--doc-primary-text:${demoScheme === 'dark' ? acc.textDark : acc.textLight};`
	);

	// Overlay demo state
	let dialogOpen = $state(false);
</script>

<svelte:head>
	<title>Sve·UI — Styled, accessible Svelte 5 components. Zero config.</title>
	<meta
		name="description"
		content="Fully styled, fully accessible Svelte 5 components built on Bits UI. No Tailwind, no config in your project — install, import, ship. Theme everything with CSS variables."
	/>
</svelte:head>

<!-- ===================== HERO ===================== -->
<section
	class="relative mx-auto max-w-[1180px] px-7 pb-16 pt-20"
	style="background-image: radial-gradient(var(--doc-dot) 1px, transparent 1px); background-size: 26px 26px;"
>
	<div
		class="pointer-events-none absolute left-1/2 top-[-40px] -translate-x-1/2"
		style="width: 620px; height: 340px; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--sve-color-primary) 22%, transparent), transparent 70%); filter: blur(30px); opacity: 0.6;"
	></div>

	<div class="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
		<!-- left -->
		<div>
			<span
				class="inline-flex items-center gap-2"
				style="padding: 5px 12px 5px 8px; border-radius: 999px; border: 1px solid var(--doc-border-2); background: var(--doc-surface); font-size: 12.5px; font-weight: 600; color: var(--doc-fg-muted);"
			>
				<span
					class="inline-flex items-center"
					style="padding: 2px 7px; border-radius: 999px; background: var(--sve-color-primary); color: var(--sve-color-primary-foreground); font-size: 11px; font-weight: 700;"
					>NEW</span
				>
				Now on Svelte 5 + Runes
			</span>

			<h1
				class="mt-6"
				style="font-size: clamp(38px, 6vw, 54px); line-height: 1.04; letter-spacing: -0.035em; font-weight: 800; color: var(--doc-fg);"
			>
				Styled, accessible<br />Svelte&nbsp;5 components —<br /><span
					style="color: var(--doc-primary-text);">zero config.</span
				>
			</h1>

			<p
				class="mt-6 max-w-[480px]"
				style="font-size: 17.5px; line-height: 1.55; color: var(--doc-fg-muted);"
			>
				Fully styled, fully accessible components built on Bits&nbsp;UI.
				<strong style="color: var(--doc-fg); font-weight: 600;">No Tailwind. No config</strong>
				in your project — <code class="doc-mono" style="font-size: 14.5px; color: var(--doc-primary-text);">pnpm&nbsp;add&nbsp;sve-ui</code>, import, ship. Theme it all with CSS variables.
			</p>

			<div class="mt-7 flex flex-wrap items-center gap-3">
				<Button variant="solid" color="primary" size="lg" onclick={() => (window.location.href = '/components')}>
					Explore Components
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
				</Button>
				<Button variant="outline" color="default" size="lg" onclick={() => window.open(REPO, '_blank')}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>
					GitHub
				</Button>
			</div>

			<div
				class="doc-mono mt-6 flex max-w-[330px] items-center gap-2.5"
				style="padding: 11px 14px; border-radius: 11px; background: var(--doc-code-bg); border: 1px solid var(--doc-border); font-size: 14px;"
			>
				<span style="color: #34d399;">$</span>
				<span style="color: #e6e6ec;">pnpm add <span style="color: #f6ad55;">sve-ui</span></span>
			</div>
		</div>

		<!-- right: a real component composition (dogfooding the library) -->
		<div class="sve-float relative" style="animation: sveFloat 7s ease-in-out infinite;">
			<div
				style="border-radius: 18px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow); overflow: hidden;"
			>
				<div
					class="flex items-center gap-2"
					style="padding: 13px 16px; border-bottom: 1px solid var(--doc-border);"
				>
					<span class="h-[11px] w-[11px] rounded-full" style="background: #ff5f57;"></span>
					<span class="h-[11px] w-[11px] rounded-full" style="background: #febc2e;"></span>
					<span class="h-[11px] w-[11px] rounded-full" style="background: #28c840;"></span>
					<span class="doc-mono ml-2" style="font-size: 12px; color: var(--doc-fg-subtle);">+page.svelte</span>
				</div>
				<div class="p-6">
					<div class="mb-1 flex items-center justify-between">
						<span class="doc-eyebrow">Pro plan</span>
						<Badge color="success" variant="subtle">Active</Badge>
					</div>
					<Heading level={3} size="lg" weight="bold" style="letter-spacing: -0.02em;">Upgrade your workspace</Heading>
					<Text size="sm" class="mb-4 mt-1" style="color: var(--doc-fg-muted);">Unlimited components and priority support.</Text>

					<Text as="label" size="sm" weight="medium" class="mb-1.5 block" style="color: var(--doc-fg-subtle);">Work email</Text>
					<Input value="dev@studio.io" class="mb-4" />

					<div class="flex items-center gap-2.5">
						<Button variant="solid" color="primary" class="flex-1">Upgrade</Button>
						<Button variant="outline" color="default">Later</Button>
						<div class="ml-1 flex">
							<span class="h-[30px] w-[30px] rounded-full" style="background: linear-gradient(135deg, #f56565, #ed8936); border: 2px solid var(--doc-surface);"></span>
							<span class="-ml-2.5 h-[30px] w-[30px] rounded-full" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); border: 2px solid var(--doc-surface);"></span>
							<span class="-ml-2.5 inline-flex h-[30px] w-[30px] items-center justify-center rounded-full" style="background: var(--doc-surface-2); border: 2px solid var(--doc-surface); font-size: 10px; font-weight: 700; color: var(--doc-fg-muted);">+9</span>
						</div>
					</div>
				</div>
			</div>

			<div
				class="doc-mono absolute -bottom-4 -left-5 flex items-center gap-2"
				style="padding: 8px 12px; border-radius: 10px; background: var(--doc-code-bg); color: #e6e6ec; font-size: 12.5px; font-weight: 600; box-shadow: 0 12px 30px -12px rgba(0,0,0,0.6); border: 1px solid var(--doc-border-2);"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
				WAI-ARIA via Bits UI
			</div>
		</div>
	</div>
</section>

<!-- ===================== WEDGE / FEATURES ===================== -->
<section class="mx-auto max-w-[1180px] px-7" style="padding-bottom: 72px;">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each [{ icon: 'tailwind', tone: 'var(--doc-primary-text)', surf: 'color-mix(in srgb, var(--sve-color-primary) 14%, transparent)', title: 'No Tailwind', body: 'Styles ship with the package. Your project needs no Tailwind, no PostCSS, no utility classes.' }, { icon: 'zap', tone: 'var(--doc-warning)', surf: 'var(--doc-warning-surf)', title: 'Zero config', body: 'Install, import the stylesheet once, and use. No setup step, no CLI, no copy-pasting source.' }, { icon: 'a11y', tone: 'var(--doc-success)', surf: 'var(--doc-success-surf)', title: 'Accessible', body: 'Dialog, Dropdown, Tooltip & Popover are built on Bits UI — WAI-ARIA, focus traps, keyboard nav.' }, { icon: 'palette', tone: 'var(--doc-primary-text)', surf: 'color-mix(in srgb, var(--sve-color-primary) 14%, transparent)', title: 'Themeable', body: 'Every color, radius & spacing value is a --sve-* variable. Light & dark out of the box.' }] as f (f.title)}
			<div style="padding: 24px 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border);">
				<div class="mb-4 inline-flex h-10 w-10 items-center justify-center" style="border-radius: 11px; background: {f.surf}; color: {f.tone};">
					{#if f.icon === 'tailwind'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m3 21 18-18" /><path d="M7 7c-2 0-3 1-3.5 3 .75-1 1.5-1.4 2.5-1.2.6.1 1 .5 1.5 1.1.8.9 1.7 1.9 3.5 1.9 2 0 3-1 3.5-3-.75 1-1.5 1.4-2.5 1.2-.6-.1-1-.5-1.5-1.1C13.2 8 12.3 7 10.5 7Z" /></svg>
					{:else if f.icon === 'zap'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></svg>
					{:else if f.icon === 'a11y'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="2" /><path d="M4 8.5h16M12 8.5v6M12 14.5 8 21M12 14.5 16 21" /></svg>
					{:else}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="12" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="13" r="2.5" /><path d="M12 22a10 10 0 1 1 0-20c4 0 6 2.5 6 5s-2 3-4 3h-1.5a2.5 2.5 0 0 0 0 5c1.5 0 2 1 2 2a3 3 0 0 1-2.5 5Z" /></svg>
					{/if}
				</div>
				<Heading level={3} size="md" weight="bold" class="mb-1.5" style="letter-spacing: -0.01em;">{f.title}</Heading>
				<Text size="sm" style="color: var(--doc-fg-muted); line-height: 1.55;">{f.body}</Text>
			</div>
		{/each}
	</div>
</section>

<!-- ===================== COMPONENT SHOWCASE ===================== -->
<section id="components" class="mx-auto max-w-[1180px] px-7 py-8">
	<div class="mx-auto mb-11 max-w-[620px] text-center">
		<span class="doc-eyebrow">13 components</span>
		<h2 class="mb-3 mt-3" style="font-size: 38px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; color: var(--doc-fg);">Everything you need,<br />already styled.</h2>
		<Text size="lg" align="center" style="color: var(--doc-fg-muted); line-height: 1.55;">Display, form, feedback and overlays — composed, accessible and ready to drop in. Every example below is the real component.</Text>
	</div>

	{#snippet panel(label: string, hint: string | undefined)}
		<div class="mb-4 flex items-center gap-2">
			<span style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">{label}</span>
			{#if hint}<span style="font-size: 11px; color: var(--doc-fg-subtle);">{hint}</span>{/if}
		</div>
	{/snippet}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-6">
		<!-- Button -->
		<div class="md:col-span-4" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Button', '— variants × tones')}
			<div class="flex flex-wrap items-center gap-2.5">
				<Button variant="solid" color="primary">Primary</Button>
				<Button variant="solid" color="success">Success</Button>
				<Button variant="outline" color="danger">Danger</Button>
				<Button variant="outline" color="default">Outline</Button>
				<Button variant="ghost" color="default">Ghost</Button>
				<Button variant="solid" color="primary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
					With icon
				</Button>
			</div>
		</div>

		<!-- Badge + Spinner -->
		<div class="md:col-span-2" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Badge · Spinner', undefined)}
			<div class="mb-4 flex flex-wrap items-center gap-2">
				<Badge color="primary" variant="subtle">Primary</Badge>
				<Badge color="success" variant="subtle">Success</Badge>
				<Badge color="warning" variant="subtle">Warning</Badge>
				<Badge color="default" variant="outline">Default</Badge>
			</div>
			<div class="flex items-center gap-3">
				<Spinner size="sm" color="primary" />
				<Spinner size="sm" color="success" />
				<Text size="sm" style="color: var(--doc-fg-subtle);">Loading…</Text>
			</div>
		</div>

		<!-- Input -->
		<div class="md:col-span-2" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Input', undefined)}
			<Text as="label" size="sm" weight="medium" class="mb-1.5 block" style="color: var(--doc-fg-muted);">Email</Text>
			<Input type="email" placeholder="you@example.com" class="mb-3" />
			<Text as="label" size="sm" weight="medium" class="mb-1.5 block" style="color: var(--doc-fg-muted);">Password</Text>
			<Input type="password" value="••••••" invalid class="mb-1.5" />
			<Text size="sm" color="danger">At least 8 characters.</Text>
		</div>

		<!-- Avatar -->
		<div class="md:col-span-2" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Avatar', undefined)}
			<div class="flex items-center gap-3.5">
				<Avatar.Root size="lg">
					<Avatar.Image src="https://github.com/rodriabregu.png" alt="Rodrigo" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="lg" shape="square">
					<Avatar.Fallback>SQ</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="md">
					<Avatar.Fallback>PF</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</div>

		<!-- Heading + Text -->
		<div class="md:col-span-2" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Heading · Text', undefined)}
			<Heading level={3} size="lg" weight="bold" style="letter-spacing: -0.02em;">Display</Heading>
			<Heading level={4} size="md" weight="medium" class="mt-1.5">Title weight</Heading>
			<Text size="sm" class="mt-2" style="color: var(--doc-fg-muted); line-height: 1.55;">Body copy in a comfortable measure with muted foreground for secondary information.</Text>
		</div>

		<!-- Alert (wide) -->
		<div class="md:col-span-6" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
			{@render panel('Alert', '— color × variant')}
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<Alert.Root color="success" variant="subtle">
					<Alert.Title>Saved successfully</Alert.Title>
					<Alert.Description>Your changes are live.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="warning" variant="subtle">
					<Alert.Title>Review settings</Alert.Title>
					<Alert.Description>Check before continuing.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="danger" variant="subtle">
					<Alert.Title>Payment failed</Alert.Title>
					<Alert.Description>Card was declined.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="default" variant="outline">
					<Alert.Title>New version</Alert.Title>
					<Alert.Description>{VERSION} is available.</Alert.Description>
				</Alert.Root>
			</div>
		</div>
	</div>

	<!-- Overlays row — real Bits UI overlays, interactive -->
	<div class="mb-4 mt-9 flex items-center gap-2.5">
		<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">Overlays</span>
		<span style="font-size: 12.5px; color: var(--doc-fg-subtle);">— real Bits UI overlays. Open them.</span>
		<span class="h-px flex-1" style="background: var(--doc-border);"></span>
	</div>

	<Tooltip.Provider>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Dialog -->
			<div class="flex min-h-[180px] flex-col" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
				<span class="mb-4" style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">Dialog</span>
				<div class="flex flex-1 items-center justify-center">
					<Dialog.Root bind:open={dialogOpen}>
						<Dialog.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="danger" {...props}>Delete project?</Button>
							{/snippet}
						</Dialog.Trigger>
						<Dialog.Overlay />
						<Dialog.Content>
							<Dialog.Title>Delete project?</Dialog.Title>
							<Dialog.Description>This action can't be undone.</Dialog.Description>
							<div class="mt-4 flex justify-end gap-2">
								<Dialog.Close>
									{#snippet child({ props })}
										<Button variant="outline" color="default" size="sm" {...props}>Cancel</Button>
									{/snippet}
								</Dialog.Close>
								<Button variant="solid" color="danger" size="sm" onclick={() => (dialogOpen = false)}>Delete</Button>
							</div>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>

			<!-- Dropdown -->
			<div class="flex min-h-[180px] flex-col" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
				<span class="mb-4" style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">Dropdown Menu</span>
				<div class="flex flex-1 items-center justify-center">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" {...props}>
									Options
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>Profile</DropdownMenu.Item>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Sign out</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>

			<!-- Tooltip -->
			<div class="flex min-h-[180px] flex-col" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
				<span class="mb-4" style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">Tooltip</span>
				<div class="flex flex-1 items-center justify-center">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" {...props}>Hover me</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							<Text size="sm">Copy to clipboard</Text>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</div>

			<!-- Popover -->
			<div class="flex min-h-[180px] flex-col" style="padding: 22px; border-radius: 16px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
				<span class="mb-4" style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--doc-fg-subtle);">Popover</span>
				<div class="flex flex-1 items-center justify-center">
					<Popover.Root>
						<Popover.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="primary" {...props}>Accent color</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content>
							<Heading level={4} size="sm" weight="bold" class="mb-2">Accent color</Heading>
							<div class="flex gap-2">
								{#each ['#F56565', '#ED8936', '#8B5CF6', '#10B981'] as c (c)}
									<span class="h-6 w-6" style="border-radius: 7px; background: {c};"></span>
								{/each}
							</div>
						</Popover.Content>
					</Popover.Root>
				</div>
			</div>
		</div>
	</Tooltip.Provider>
</section>

<!-- ===================== THEMING (live sandbox) ===================== -->
<section
	id="theming"
	class="mt-10"
	style="background: var(--doc-bg-2); border-top: 1px solid var(--doc-border); border-bottom: 1px solid var(--doc-border);"
>
	<div class="mx-auto max-w-[1180px] px-7" style="padding-top: 70px; padding-bottom: 70px;">
		<div class="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
			<div>
				<span class="doc-eyebrow">Theming</span>
				<h2 class="mb-3.5 mt-3" style="font-size: 36px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--doc-fg);">Yours to theme —<br />live, right here.</h2>
				<Text size="lg" class="mb-5" style="color: var(--doc-fg-muted); line-height: 1.6;">Every token is a CSS custom property. Recolor the whole component cluster or flip its theme — no rebuild, no config. Try it:</Text>

				<div class="mb-5 flex flex-wrap items-center gap-3.5">
					<div class="flex items-center gap-2.5">
						<span style="font-size: 12px; font-weight: 600; color: var(--doc-fg-subtle); text-transform: uppercase; letter-spacing: 0.08em;">Accent</span>
						{#each ACCENTS as sw (sw.id)}
							<button
								onclick={() => (accentId = sw.id)}
								aria-label={sw.label}
								aria-pressed={accentId === sw.id}
								class="h-[30px] w-[30px] cursor-pointer"
								style="border-radius: 9px; border: 2px solid var(--doc-surface); background: {sw.fill}; outline-offset: 2px; outline: {accentId === sw.id ? `2px solid ${sw.fill}` : '2px solid transparent'};"
							></button>
						{/each}
					</div>
					<button
						onclick={() => (demoScheme = demoScheme === 'dark' ? 'light' : 'dark')}
						class="inline-flex cursor-pointer items-center gap-2"
						style="padding: 9px 15px; border-radius: 10px; border: 1px solid var(--doc-border-2); background: var(--doc-surface); color: var(--doc-fg); font-weight: 600; font-size: 13.5px;"
					>
						{#if demoScheme === 'dark'}
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
							Switch to light
						{:else}
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5 19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5 19 5" /></svg>
							Switch to dark
						{/if}
					</button>
				</div>

				<div class="doc-mono" style="border-radius: 12px; background: var(--doc-code-bg); border: 1px solid var(--doc-border); padding: 16px 18px; font-size: 13px; line-height: 1.7;">
					<div style="color: #7c7c8a;">:root &#123;</div>
					<div style="padding-left: 16px;"><span style="color: #f6ad55;">--sve-color-primary</span><span style="color: #e6e6ec;">: </span><span style="color: #34d399;">{acc.fill}</span><span style="color: #e6e6ec;">;</span></div>
					<div style="padding-left: 16px;"><span style="color: #f6ad55;">--sve-radius-md</span><span style="color: #e6e6ec;">: </span><span style="color: #34d399;">0.375rem</span><span style="color: #e6e6ec;">;</span></div>
					<div style="color: #7c7c8a;">&#125;</div>
				</div>
			</div>

			<!-- live cluster: real components, scoped theme + accent override -->
			<ThemeProvider colorScheme={demoScheme}>
				<div style="{accentStyle} padding: 30px; border-radius: 18px; background: var(--doc-surface); border: 1px solid var(--doc-border); box-shadow: var(--doc-shadow);">
					<div class="mb-5 flex items-center justify-between">
						<div class="flex items-center gap-2.5">
							<span class="inline-flex h-10 w-10 items-center justify-center font-extrabold" style="border-radius: 11px; background: var(--sve-color-primary); color: var(--sve-color-primary-foreground);">S</span>
							<div>
								<div style="font-weight: 700; font-size: 15px; color: var(--doc-fg);">Sve·UI</div>
								<div style="font-size: 12px; color: var(--doc-fg-subtle);">themed live</div>
							</div>
						</div>
						<Badge color="primary" variant="subtle">{demoScheme === 'dark' ? 'Dark' : 'Light'}</Badge>
					</div>
					<div class="mb-4 flex gap-2.5">
						<Button variant="solid" color="primary" class="flex-1">Primary</Button>
						<Button variant="outline" color="primary" class="flex-1">Outline</Button>
					</div>
					<Input value="Focused input" class="mb-4" />
					<div class="flex flex-wrap items-center gap-2">
						<Badge color="primary" variant="subtle">Accent</Badge>
						<Badge color="success" variant="subtle">Stable</Badge>
						<Spinner size="sm" color="primary" />
					</div>
				</div>
			</ThemeProvider>
		</div>
	</div>
</section>

<!-- ===================== SETUP / IMPORT & USE ===================== -->
<section class="mx-auto max-w-[1180px] px-7" style="padding-top: 70px; padding-bottom: 70px;">
	<div class="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
		<div>
			<span class="doc-eyebrow">Setup</span>
			<h2 class="mb-3.5 mt-3" style="font-size: 36px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--doc-fg);">Three lines.<br />That's the setup.</h2>
			<Text size="lg" class="mb-4" style="color: var(--doc-fg-muted); line-height: 1.6;">No <code class="doc-mono" style="font-size: 13px; color: var(--doc-primary-text);">tailwind.config</code>, no PostCSS plugins, no component scaffolding. Add the package, import the stylesheet once, and use the components.</Text>
			<ul class="m-0 flex list-none flex-col gap-2.5 p-0">
				{#each ['Works with npm, pnpm and yarn', 'Tree-shakeable — import only what you use', 'Fully typed with SvelteKit support'] as item (item)}
					<li class="flex items-center gap-2.5" style="font-size: 14.5px; color: var(--doc-fg);">
						<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--doc-success)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
						{item}
					</li>
				{/each}
			</ul>
		</div>
		<div style="border-radius: 16px; background: var(--doc-code-bg); border: 1px solid var(--doc-border); overflow: hidden; box-shadow: var(--doc-shadow);">
			<div class="flex items-center gap-2" style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">
				<span class="h-[11px] w-[11px] rounded-full" style="background: #ff5f57;"></span>
				<span class="h-[11px] w-[11px] rounded-full" style="background: #febc2e;"></span>
				<span class="h-[11px] w-[11px] rounded-full" style="background: #28c840;"></span>
				<span class="doc-mono ml-2" style="font-size: 12px; color: #6c6c78;">App.svelte</span>
			</div>
			<pre class="doc-mono m-0 overflow-x-auto" style="padding: 20px 22px; font-size: 13.5px; line-height: 1.85; color: #e6e6ec;"><span style="color: #5e6a7a;"># 1 · install — no Tailwind needed</span>
<span style="color: #34d399;">$</span> pnpm add <span style="color: #f6ad55;">sve-ui</span>

<span style="color: #5e6a7a;">// 2 · import the stylesheet once</span>
<span style="color: #c792ea;">import</span> <span style="color: #f6ad55;">'sve-ui/theme.css'</span><span style="color: #7c7c8a;">;</span>

<span style="color: #5e6a7a;">// 3 · use it — zero config</span>
<span style="color: #c792ea;">import</span> &#123; <span style="color: #82aaff;">Button</span>, <span style="color: #82aaff;">Dialog</span> &#125; <span style="color: #c792ea;">from</span> <span style="color: #f6ad55;">'sve-ui'</span><span style="color: #7c7c8a;">;</span>

<span style="color: #7c7c8a;">&lt;</span><span style="color: #f07178;">Button</span> <span style="color: #ffcb6b;">color</span>=<span style="color: #c3e88d;">"primary"</span><span style="color: #7c7c8a;">&gt;</span>Ship it<span style="color: #7c7c8a;">&lt;/</span><span style="color: #f07178;">Button</span><span style="color: #7c7c8a;">&gt;</span></pre>
		</div>
	</div>
</section>

<!-- ===================== COMPARISON ===================== -->
<section id="compare" style="background: var(--doc-bg-2); border-top: 1px solid var(--doc-border); border-bottom: 1px solid var(--doc-border);">
	<div class="mx-auto max-w-[1080px] px-7" style="padding-top: 70px; padding-bottom: 70px;">
		<div class="mx-auto mb-11 max-w-[560px] text-center">
			<span class="doc-eyebrow">Why Sve·UI</span>
			<h2 class="mb-3 mt-3" style="font-size: 36px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--doc-fg);">The only one that<br />skips Tailwind.</h2>
			<Text size="lg" align="center" style="color: var(--doc-fg-muted); line-height: 1.55;">Most Svelte libraries need Tailwind wired into your project. Sve·UI doesn't.</Text>
		</div>

		{#snippet yes()}
			<span class="inline-flex h-6 w-6 items-center justify-center" style="border-radius: 50%; background: var(--doc-success-surf); color: var(--doc-success);">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
			</span>
		{/snippet}
		{#snippet no(note: string)}
			<span class="inline-flex h-6 w-6 items-center justify-center" style="border-radius: 50%; background: var(--doc-surface-2); color: var(--doc-fg-subtle);">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
			</span>
			{#if note}<div style="font-size: 11px; color: var(--doc-fg-subtle); margin-top: 4px;">{note}</div>{/if}
		{/snippet}

		<div class="overflow-x-auto" style="border-radius: 16px; border: 1px solid var(--doc-border); background: var(--doc-surface); box-shadow: var(--doc-shadow);">
			<table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 560px;">
				<thead>
					<tr>
						<th style="text-align: left; padding: 16px 20px; font-weight: 600; color: var(--doc-fg-muted); font-size: 13px; background: var(--doc-surface-2);"></th>
						<th style="padding: 16px 14px; background: color-mix(in srgb, var(--sve-color-primary) 12%, var(--doc-surface)); border-left: 1px solid var(--doc-border); border-right: 1px solid var(--doc-border);">
							<div class="flex items-center justify-center gap-2" style="font-weight: 800; font-size: 15px; color: var(--doc-primary-text);">
								<span class="inline-flex h-5 w-5 items-center justify-center" style="border-radius: 6px; background: var(--sve-color-primary); color: var(--sve-color-primary-foreground); font-size: 12px;">S</span>Sve·UI
							</div>
						</th>
						<th style="padding: 16px 14px; font-weight: 600; color: var(--doc-fg-muted); background: var(--doc-surface-2);">shadcn-svelte</th>
						<th style="padding: 16px 14px; font-weight: 600; color: var(--doc-fg-muted); background: var(--doc-surface-2);">SV5UI</th>
						<th style="padding: 16px 14px; font-weight: 600; color: var(--doc-fg-muted); background: var(--doc-surface-2);">Flowbite</th>
					</tr>
				</thead>
				<tbody>
					{#each [{ label: 'No Tailwind in your project', cells: [true, 'required', 'required', 'required'] }, { label: 'Zero config to start', cells: [true, 'CLI setup', 'config', 'config'] }, { label: 'Styled out of the box', cells: [true, 'copy & own', true, true] }, { label: 'Accessible (Bits UI / ARIA)', cells: [true, true, 'partial', 'partial'] }, { label: 'Theme via CSS variables', cells: [true, 'TW config', '', 'TW config'] }, { label: 'Svelte 5 + Runes', cells: [true, true, true, true] }, { label: 'Light + dark included', cells: [true, true, 'partial', true] }] as row (row.label)}
						<tr style="border-top: 1px solid var(--doc-border);">
							<td style="text-align: left; padding: 15px 20px; font-weight: 600; color: var(--doc-fg);">{row.label}</td>
							{#each row.cells as cell, i (i)}
								<td
									style="padding: 15px 14px; text-align: center; {i === 0
										? 'background: color-mix(in srgb, var(--sve-color-primary) 7%, var(--doc-surface)); border-left: 1px solid var(--doc-border); border-right: 1px solid var(--doc-border);'
										: 'color: var(--doc-fg-muted);'}"
								>
									{#if cell === true}
										{@render yes()}
									{:else}
										{@render no(typeof cell === 'string' ? cell : '')}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<Text size="sm" align="center" class="mt-4" style="color: var(--doc-fg-subtle);">Comparison reflects each library's default setup. All are excellent — Sve·UI's wedge is the zero-config, no-Tailwind path.</Text>
	</div>
</section>

<!-- ===================== CLOSING CTA + TRUST ===================== -->
<section class="relative mx-auto max-w-[1180px] px-7 text-center" style="padding-top: 84px; padding-bottom: 70px;">
	<div
		class="pointer-events-none absolute left-1/2 top-[30px] -translate-x-1/2"
		style="width: 540px; height: 260px; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--sve-color-primary) 20%, transparent), transparent 70%); filter: blur(34px); opacity: 0.55;"
	></div>
	<div class="relative">
		<h2 class="mb-3.5" style="font-size: 44px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.06; color: var(--doc-fg);">Ready to build?</h2>
		<div class="mx-auto mb-7 max-w-[480px]">
			<Text size="lg" align="center" style="color: var(--doc-fg-muted); line-height: 1.55;">13 components, full theming, accessible by default — and not a line of Tailwind in sight.</Text>
		</div>
		<div class="mb-9 flex flex-wrap items-center justify-center gap-3">
			<Button variant="solid" color="primary" size="lg" onclick={() => (window.location.href = '/components')}>
				View all components
				<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
			</Button>
			<Button variant="outline" color="default" size="lg" onclick={() => window.open(NPM, '_blank')}>View on npm</Button>
		</div>

		<div class="inline-flex items-center overflow-hidden" style="border: 1px solid var(--doc-border); border-radius: 12px; background: var(--doc-surface);">
			<div class="flex items-center gap-2" style="padding: 12px 18px;">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--doc-fg-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.3 4.5-2.6 4.5 2.6v5.2L12 12 7.5 9.5z" transform="translate(0 1)" /><path d="M3 7.3 7.5 4.7 12 7.3v5.2L7.5 15 3 12.5z" /><path d="M12 7.3 16.5 4.7 21 7.3v5.2L16.5 15 12 12.5z" /></svg>
				<span class="doc-mono" style="font-size: 13px; font-weight: 500; color: var(--doc-fg);">{VERSION}</span>
			</div>
			<div class="self-stretch" style="width: 1px; background: var(--doc-border);"></div>
			<div class="flex items-center gap-2" style="padding: 12px 18px;">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--doc-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
				<span style="font-size: 13.5px; font-weight: 600; color: var(--doc-fg);">MIT license</span>
			</div>
			<div class="self-stretch" style="width: 1px; background: var(--doc-border);"></div>
			<a href={REPO} target="_blank" rel="noopener" class="flex items-center gap-2 no-underline" style="padding: 12px 18px; color: var(--doc-fg);">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>
				<span style="font-size: 13.5px; font-weight: 600;">GitHub</span>
			</a>
		</div>
	</div>
</section>
