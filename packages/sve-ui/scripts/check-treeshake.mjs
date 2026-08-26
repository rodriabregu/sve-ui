/**
 * Guards the library's central claim: import one component, ship one component.
 *
 * Bundles a consumer entry that imports ONLY `Button` against the freshly built
 * `dist/`, then asserts the output carries Button's CSS and essentially nobody
 * else's.
 *
 * This exists because the claim was quietly false. Before `sideEffects` was
 * declared, a Button-only build emitted 34 KB of JS and 52 KB of CSS covering
 * 42 components, including Calendar, Sheet, Toolbar and Command. Nothing caught
 * it, because nothing measured it, and it got worse with every component added.
 *
 * A budget test rather than an exact number: the point is to fail loudly if the
 * whole catalog starts coming along again, not to bikeshed a few hundred bytes.
 */

import { build } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mkdtemp, writeFile, rm, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = fileURLToPath(new URL('..', import.meta.url));

/** Distinct `.sve-<name>` component prefixes allowed in a Button-only build. */
const MAX_COMPONENT_PREFIXES = 4;
/** Bytes of JS, excluding the Svelte runtime, which the consumer already has. */
const MAX_JS_BYTES = 12_000;

async function main() {
	const dir = await mkdtemp(join(tmpdir(), 'sve-treeshake-'));

	try {
		// Import the built package by path: this must measure what is published,
		// not the source tree.
		await writeFile(
			join(dir, 'entry.js'),
			`import { Button } from ${JSON.stringify(join(PKG_ROOT, 'dist/index.js'))};\nexport { Button };\n`
		);

		await build({
			root: dir,
			logLevel: 'silent',
			plugins: [svelte({ compilerOptions: { runes: true } })],
			build: {
				lib: { entry: join(dir, 'entry.js'), formats: ['es'], fileName: 'out' },
				outDir: join(dir, 'dist'),
				// Svelte is a peerDependency; bundling it would hide our own cost
				// behind ~25 KB of runtime.
				rollupOptions: { external: ['svelte', /^svelte\//] },
				minify: 'esbuild',
				emptyOutDir: true
			}
		});

		const outDir = join(dir, 'dist');
		const files = await readdir(outDir);

		let js = 0;
		let jsFiles = 0;
		const prefixes = new Set();

		for (const f of files) {
			const body = await readFile(join(outDir, f), 'utf8');
			// `.mjs`, not just `.js`: vite picks the extension from the emitting
			// package's `type`, and matching only `.js` measured zero bytes and
			// passed silently. A budget that cannot fail is not a budget.
			if (/\.[cm]?js$/.test(f)) {
				js += Buffer.byteLength(body);
				jsFiles += 1;
			}
			if (f.endsWith('.css')) {
				for (const m of body.matchAll(/\.sve-([a-z][a-z0-9]*)/g)) prefixes.add(m[1]);
			}
		}

		// `sve-c-*` are the shared colour classes every variant needs, so `c` is
		// expected alongside `button`.
		const list = [...prefixes].sort();
		const problems = [];

		// Nothing measured means the check silently proved nothing.
		if (jsFiles === 0) {
			problems.push(`no JS emitted to inspect (saw: ${files.join(', ') || 'nothing'})`);
		}
		if (prefixes.size === 0) {
			problems.push('no component CSS emitted to inspect; Button has styles, so this is wrong');
		}

		if (prefixes.size > MAX_COMPONENT_PREFIXES) {
			problems.push(
				`CSS for ${prefixes.size} components in a Button-only bundle ` +
					`(budget ${MAX_COMPONENT_PREFIXES}): ${list.join(', ')}`
			);
		}
		if (js > MAX_JS_BYTES) {
			problems.push(`${js} bytes of JS in a Button-only bundle (budget ${MAX_JS_BYTES})`);
		}

		if (problems.length > 0) {
			console.error('check-treeshake: FAILED\n');
			for (const p of problems) console.error(`  - ${p}`);
			console.error(
				'\nA Button-only build is pulling in the rest of the library. The usual cause is\n' +
					'a missing or weakened `sideEffects` field in package.json, or a new module that\n' +
					'does observable work at import time.\n\n' +
					'`sideEffects` must stay ["**/*.css"] and must NOT become `false`: ./theme.css is\n' +
					'an exported subpath consumers import for its effect alone, and a blanket false\n' +
					'lets bundlers drop it, taking every --sve-* token with it.'
			);
			process.exit(1);
		}

		console.log(
			`check-treeshake: Button-only bundle is ${js} B of JS and CSS for ` +
				`${prefixes.size} component(s) (${list.join(', ')}).`
		);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
}

await main();
