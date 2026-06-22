<script lang="ts">
	import DocPage from '$lib/docs/DocPage.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import { Button, Badge, Code, Alert } from 'sve-ui';

	const crumb = { href: '/docs', label: 'Docs' };
	const toc: TocEntry[] = [
		{ id: 'model', label: 'The token model' },
		{ id: 'override', label: 'Overriding tokens' },
		{ id: 'darkmode', label: 'Light & dark' },
		{ id: 'tokens', label: 'Token reference' }
	];

	const overrideCode = `:root {
  --sve-color-primary: #8b5cf6;
  --sve-color-primary-hover: #7c3aed;
  --sve-radius-md: 0.5rem;
}`;

	const scopeCode = `<!-- Scope overrides to any subtree -->
<div style="--sve-color-primary: #10b981;">
  <Button color="primary">Emerald</Button>
</div>`;

	const accentCode = `<div style="--sve-color-primary: #8b5cf6;
  --sve-color-primary-hover: #7c3aed;
  --sve-color-primary-foreground: #fff;">
  <Button color="primary">Themed</Button>
  <Badge color="primary" variant="subtle">Accent</Badge>
</div>`;

	const bodyClassCode = `// Overlays portal to <body>. Mirror the theme class onto
// <body> so portaled content gets the right tokens.
$effect(() => {
  document.body.classList.toggle('dark', isDark);
  document.body.classList.toggle('light', !isDark);
});`;
</script>

<DocPage
	group="Guides"
	name="Theming"
	description="Every color, radius and space is a --sve-* CSS variable. Override them anywhere — no rebuild, no config."
	{toc}
	{crumb}
>
	<section id="model" class="sec">
		<h2 class="sec__h">The token model</h2>
		<p class="sec__p">
			Components read <code class="ic">--sve-*</code> custom properties for every visual value. To theme,
			you set those variables — globally on <code class="ic">:root</code> or scoped to any element. There
			is no config file and no rebuild.
		</p>
	</section>

	<section id="override" class="sec">
		<h2 class="sec__h">Overriding tokens</h2>
		<p class="sec__p">Set tokens globally:</p>
		<Code code={overrideCode} label="app.css" />
		<p class="sec__p" style="margin-top: 16px;">…or scope them to a subtree:</p>
		<Code code={scopeCode} label="App.svelte" />
		<div class="mt-4">
			<Preview code={accentCode} align="center">
				<div style="--sve-color-primary: #8b5cf6; --sve-color-primary-hover: #7c3aed; --sve-color-primary-foreground: #fff; --sve-color-primary-surface: color-mix(in srgb, #8b5cf6 14%, transparent); display: flex; gap: 10px; align-items: center;">
					<Button color="primary">Themed</Button>
					<Badge color="primary" variant="subtle">Accent</Badge>
				</div>
			</Preview>
		</div>
		<p class="sec__p" style="margin-top: 16px;">
			Try the live accent sandbox on the <a class="lnk" href="/#theming">home page</a>.
		</p>
	</section>

	<section id="darkmode" class="sec">
		<h2 class="sec__h">Light &amp; dark</h2>
		<p class="sec__p">
			<code class="ic">ThemeProvider</code> toggles a <code class="ic">light</code>/<code class="ic"
				>dark</code
			> class that swaps the token set. One gotcha:
		</p>
		<Alert.Root color="warning" variant="subtle">
			<Alert.Title>Overlays portal to &lt;body&gt;</Alert.Title>
			<Alert.Description>
				Dialog, Dropdown, Tooltip, Popover, Select and Combobox render their content at the end of
				&lt;body&gt; — outside your ThemeProvider wrapper. Mirror the theme class onto &lt;body&gt; so
				they get the right tokens.
			</Alert.Description>
		</Alert.Root>
		<div class="mt-4">
			<Code code={bodyClassCode} label="+layout.svelte" />
		</div>
	</section>

	<section id="tokens" class="sec">
		<h2 class="sec__h">Token reference</h2>
		<p class="sec__p">The most-used token families. Each semantic color has hover / active / foreground / surface / border variants.</p>
		<div class="tok">
			<table class="tok__table">
				<thead><tr><th>Token</th><th>Purpose</th></tr></thead>
				<tbody>
					<tr><td><code class="ic">--sve-color-primary</code></td><td>Primary accent (+ secondary, success, warning, danger, default)</td></tr>
					<tr><td><code class="ic">--sve-color-*-foreground</code></td><td>Text/icon color on that surface</td></tr>
					<tr><td><code class="ic">--sve-color-*-surface</code></td><td>Subtle background tint (flat/ghost states)</td></tr>
					<tr><td><code class="ic">--sve-radius-md</code></td><td>Corner radius (sm / md / lg / full)</td></tr>
					<tr><td><code class="ic">--sve-space-*</code></td><td>Spacing scale</td></tr>
					<tr><td><code class="ic">--sve-font-family-sans</code></td><td>Base font family (and -mono)</td></tr>
				</tbody>
			</table>
		</div>
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
	.tok {
		border: 1px solid var(--doc-border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--doc-surface);
	}
	.tok__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
	}
	.tok__table th {
		text-align: left;
		padding: 12px 18px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		background: var(--doc-surface-2);
		border-bottom: 1px solid var(--doc-border);
	}
	.tok__table td {
		padding: 13px 18px;
		vertical-align: top;
		color: var(--doc-fg-muted);
		border-bottom: 1px solid var(--doc-border);
	}
	.tok__table tbody tr:last-child td {
		border-bottom: none;
	}
</style>
