/**
 * Generates static/og.png — the 1200×630 social card referenced by og:image.
 *
 * Rendered with the Playwright Chromium already installed for the visual suite,
 * so there is no extra dependency. It must be a raster image: X, Slack, LinkedIn
 * and Facebook all refuse to render an SVG og:image, which is why the brand SVG
 * cannot simply be pointed at.
 *
 * Run with `pnpm gen:og` after changing the tagline, the count or the branding.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const version = JSON.parse(
	readFileSync(resolve(root, '../../packages/sve-ui/package.json'), 'utf8')
).version;

// Counted from the registry rather than hardcoded so the card cannot claim a
// number the site itself contradicts. Comments are stripped first: the file's
// own header documents `ready: true` in prose and would inflate the count by one.
const registry = readFileSync(resolve(root, 'src/lib/docs/registry.ts'), 'utf8')
	.replace(/\/\*[\s\S]*?\*\//g, '')
	.replace(/\/\/.*$/gm, '');
const readyCount = (registry.match(/ready:\s*true/g) ?? []).length;

const BG = '#0d0d11';
const FG = '#f4f4f6';
const MUTED = '#9a9aa6';
const PRIMARY = '#f56565';
const PRIMARY_TEXT = '#ff8a8a';
const BORDER = '#26262f';

const html = `<!doctype html>
<html>
<head><meta charset="utf-8" />
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		width: 1200px; height: 630px; background: ${BG}; color: ${FG};
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
		display: flex; flex-direction: column; justify-content: center;
		padding: 0 82px; position: relative; overflow: hidden;
	}
	.dots {
		position: absolute; inset: 0;
		background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);
		background-size: 26px 26px;
	}
	.glow {
		position: absolute; top: -220px; left: 50%; transform: translateX(-50%);
		width: 1000px; height: 620px; filter: blur(60px); opacity: 0.55;
		background: radial-gradient(ellipse at center, ${PRIMARY}44, transparent 68%);
	}
	.inner { position: relative; }
	.brand { display: flex; align-items: center; gap: 15px; margin-bottom: 40px; }
	.mark {
		width: 62px; height: 62px; border-radius: 16px; background: ${PRIMARY};
		color: #fff; font-size: 34px; font-weight: 800; line-height: 62px;
		text-align: center; box-shadow: 0 10px 34px -8px ${PRIMARY};
	}
	.name { font-size: 35px; font-weight: 800; letter-spacing: -0.02em; }
	.name span { color: ${PRIMARY_TEXT}; }
	.ver {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 17px; font-weight: 600; color: ${MUTED};
		border: 1px solid ${BORDER}; border-radius: 999px; padding: 6px 15px; margin-left: 6px;
	}
	h1 {
		font-size: 67px; font-weight: 800; letter-spacing: -0.038em;
		line-height: 1.08; max-width: 1010px;
	}
	h1 em { font-style: normal; color: ${PRIMARY_TEXT}; }
	p { margin-top: 30px; font-size: 29px; line-height: 1.4; color: ${MUTED}; max-width: 900px; }
	.pills { display: flex; gap: 12px; margin-top: 44px; }
	.pill {
		border: 1px solid ${BORDER}; border-radius: 999px; padding: 11px 22px;
		font-size: 20px; font-weight: 600; color: ${FG}; background: rgba(255,255,255,0.03);
	}
	.rule { position: absolute; left: 0; right: 0; bottom: 0; height: 7px; background: ${PRIMARY}; }
</style>
</head>
<body>
	<div class="dots"></div>
	<div class="glow"></div>
	<div class="inner">
		<div class="brand">
			<div class="mark">S</div>
			<div class="name">Sve<span>·</span>UI</div>
			<div class="ver">v${version}</div>
		</div>
		<h1>The Svelte&nbsp;5 UI component<br />library — <em>zero&nbsp;config.</em></h1>
		<p>Fully styled, fully accessible components built on Bits&nbsp;UI.</p>
		<div class="pills">
			<div class="pill">${readyCount} components</div>
			<div class="pill">No Tailwind</div>
			<div class="pill">Accessible</div>
			<div class="pill">CSS variables</div>
		</div>
	</div>
	<div class="rule"></div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1
});
await page.setContent(html, { waitUntil: 'load' });
const buffer = await page.screenshot({ type: 'png' });
await browser.close();

const out = resolve(root, 'static/og.png');
writeFileSync(out, buffer);
console.log(`og.png written — ${readyCount} components, v${version}, ${buffer.length} bytes`);
