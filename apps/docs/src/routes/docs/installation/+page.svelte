<script lang="ts">
	import DocPage from '$lib/docs/DocPage.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import { Button, Code, Alert } from 'sve-ui';

	const crumb = { href: '/docs', label: 'Docs' };
	const toc: TocEntry[] = [
		{ id: 'install', label: 'Install' },
		{ id: 'stylesheet', label: 'Import the stylesheet' },
		{ id: 'use', label: 'Use a component' },
		{ id: 'provider', label: 'ThemeProvider (optional)' }
	];

	const installCode = `pnpm add sve-ui
# or: npm install sve-ui
# or: yarn add sve-ui`;

	const styleCode = `// src/routes/+layout.svelte (or your root)
import 'sve-ui/theme.css';`;

	const useCode = `<script>
  import { Button } from 'sve-ui';
</` + `script>

<Button color="primary">Ship it</Button>`;

	const providerCode = `<script>
  import { ThemeProvider } from 'sve-ui';
</` + `script>

<ThemeProvider colorScheme="dark">
  <!-- your app -->
</ThemeProvider>`;
</script>

<DocPage
	group="Getting started"
	name="Installation"
	description="Add the package, import the stylesheet once, and start using components. No Tailwind, no config."
	{toc}
	{crumb}
>
	<section id="install" class="sec">
		<h2 class="sec__h">Install</h2>
		<p class="sec__p">Works with pnpm, npm and yarn.</p>
		<Code code={installCode} label="Terminal" />
	</section>

	<section id="stylesheet" class="sec">
		<h2 class="sec__h">Import the stylesheet</h2>
		<p class="sec__p">
			Import <code class="ic">sve-ui/theme.css</code> <strong>once</strong> at your app root. This ships
			all component styles and the default theme tokens.
		</p>
		<Code code={styleCode} label="+layout.svelte" />
		<div class="mt-4">
			<Alert.Root color="warning" variant="subtle">
				<Alert.Title>Without the stylesheet, components render unstyled.</Alert.Title>
				<Alert.Description>It's the only required setup step — there is no Tailwind or config to add.</Alert.Description>
			</Alert.Root>
		</div>
	</section>

	<section id="use" class="sec">
		<h2 class="sec__h">Use a component</h2>
		<p class="sec__p">Import and use. Single components are default imports.</p>
		<Preview code={useCode}>
			<Button color="primary">Ship it</Button>
		</Preview>
	</section>

	<section id="provider" class="sec">
		<h2 class="sec__h">ThemeProvider (optional)</h2>
		<p class="sec__p">
			Wrap your app (or any subtree) in <code class="ic">ThemeProvider</code> to control light/dark and
			scope theme overrides. See <a class="lnk" href="/docs/theming">Theming</a>.
		</p>
		<Code code={providerCode} label="+layout.svelte" />
	</section>
</DocPage>

<style>
	.sec {
		margin-bottom: 48px;
		scroll-margin-top: 84px;
	}
	.sec__h {
		font-size: 21px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--doc-fg);
		margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px;
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.lnk {
		color: var(--doc-primary-text);
		text-decoration: none;
		font-weight: 500;
	}
	.lnk:hover {
		text-decoration: underline;
	}
</style>
