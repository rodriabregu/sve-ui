<script lang="ts">
	import 'sve-ui/theme.css';
	import { page } from '$app/state';
	import {
		Avatar,
		Badge,
		Breadcrumb,
		Button,
		DropdownMenu,
		Separator,
		Sidebar,
		ThemeProvider,
		Toast,
		Tooltip,
		toast
	} from 'sve-ui';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let dark = $state(false);
	let collapsed = $state(false);

	/*
		The theme class goes on <body>, not a wrapper: overlays portal to the body,
		so a class on an inner div never reaches them. The library documents this and
		an example should demonstrate it rather than assume the reader read.
	*/
	$effect(() => {
		document.body.classList.add('sve-theme');
		document.body.classList.toggle('dark', dark);
	});

	const NAV = [
		{ href: '/', label: 'Projects' },
		{ href: '/booking', label: 'Booking' },
		{ href: '/browse', label: 'Files' },
		{ href: '/security', label: 'Security' }
	];

	const current = $derived(NAV.find((n) => n.href === page.url.pathname));

	/*
		The brand colour comes through ThemeProvider, not a hand-written CSS var
		block: that is the supported way to retheme, so the example should use it.
	*/
	const brand = {
		colors: {
			primary: { DEFAULT: '#5b3df5', hover: '#4b31d6', surface: '#eeeaff', border: '#c9bcff' }
		},
		radius: { md: '0.625rem' }
	} as const;
</script>

<Toast.Viewport position="bottom-right" />

<ThemeProvider theme={brand} colorScheme={dark ? 'dark' : 'light'}>
	<Sidebar.Provider bind:collapsed collapsible="icon" shell>
		<Sidebar.Root label="Main navigation">
			<Sidebar.Header>
				<Sidebar.Trigger aria-label="Toggle navigation">&#9776;</Sidebar.Trigger>
				<strong>Acme</strong>
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group aria-labelledby="nav-main">
					<Sidebar.GroupLabel id="nav-main">Workspace</Sidebar.GroupLabel>
					<Sidebar.Menu>
						{#each NAV as item (item.href)}
							<Sidebar.Item
								href={item.href}
								label={item.label}
								active={page.url.pathname === item.href}
							>
								{item.label}
							</Sidebar.Item>
						{/each}
						<Sidebar.Item disabled label="Billing">Billing</Sidebar.Item>
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>
				<Badge color="secondary">Free plan</Badge>
			</Sidebar.Footer>
		</Sidebar.Root>

		<div class="main">
			<header>
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item><Breadcrumb.Link href="/">Acme</Breadcrumb.Link></Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<!-- The LAST crumb is `current`: text with aria-current, not a dead link. -->
							<Breadcrumb.Link current href={current?.href ?? '/'}>
								{current?.label ?? 'Projects'}
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<div class="spacer"></div>

				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button {...props} variant="outline" onclick={() => (dark = !dark)}>
									{dark ? 'Light' : 'Dark'}
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Switch the theme</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<button {...props} class="usermenu" aria-label="Account menu">
								<Avatar.Root size="sm">
									<Avatar.Fallback>AB</Avatar.Fallback>
								</Avatar.Root>
							</button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item onSelect={() => toast('Opening profile')}>Profile</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onSelect={() => toast('Signed out')}>Sign out</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</header>

			<Separator />

			<div class="content">{@render children()}</div>
		</div>
	</Sidebar.Provider>
</ThemeProvider>

<style>
	:global(body) {
		margin: 0;
		background: var(--sve-color-default-surface);
		color: var(--sve-color-default-foreground);
		font-family: var(--sve-font-family-sans);
	}

	.main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--sve-space-3);
		padding: var(--sve-space-4);
	}

	.spacer {
		flex: 1;
	}

	.usermenu {
		border: 0;
		background: none;
		padding: 0;
		cursor: pointer;
	}

	.content {
		padding: var(--sve-space-6);
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-6);
	}
</style>
