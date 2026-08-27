/**
 * Structural render guard for the prerendered docs site.
 *
 * The Prettier sweep is why this exists. It reformatted 291 `.svelte` files, and
 * `prettier-plugin-svelte` rewrites markup — where whitespace between inline
 * elements is visible to a reader. Nothing in the repo could tell me whether the
 * rendered output had changed, so I hand-rolled a differ, and my first attempt
 * collapsed `>\s+<` to `><`, which would have classified a real spacing change
 * as harmless. Having to improvise that, and getting it wrong, is the argument
 * for a permanent version.
 *
 * What it compares is a DIGEST, not the HTML: per page, the ordered element
 * skeleton plus each element's attribute names, with values and text dropped.
 * That keeps baselines small and their diffs readable, and it draws the line in
 * the right place — copy edits are free, while a changed tag, a lost attribute
 * or a reordered element is not.
 *
 * Complements the axe suite rather than repeating it: axe answers "is this
 * page accessible", this answers "did this page change".
 *
 *   node scripts/check-render.mjs            # verify
 *   node scripts/check-render.mjs --update   # accept the current output
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const DOCS_ROOT = fileURLToPath(new URL('..', import.meta.url));
const BUILD_DIR = join(DOCS_ROOT, '.vercel/output/static');
const BASELINE = join(DOCS_ROOT, 'render-baseline.json');

/**
 * Everything here changes on every build without the page having changed, so
 * leaving any of it in would make the baseline churn constantly and get ignored.
 */
function normalize(html) {
	return (
		html
			// Svelte derives scope hashes from component SOURCE TEXT, so any reformat
			// rewrites all of them. This was why a no-op sweep looked like 64 changed pages.
			.replace(/svelte-[a-z0-9]{6,10}/g, 'svelte-H')
			.replace(/_app\/immutable\/[^"')\s]*/g, '_app/A')
			// Bits generates sequential ids that shift when unrelated components mount.
			.replace(/bits-[a-z0-9-]+/g, 'bits-ID')
			// SvelteKit's per-build bootstrap token.
			.replace(/__sveltekit_[a-z0-9]+/g, '__sveltekit_T')
	);
}

/** Ordered `tag[sorted attribute names]`, values and text discarded. */
function digest(html) {
	const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
	let source = normalize(body ? body[1] : html);
	source = source.replace(/<script[\s\S]*?<\/script>/g, '');

	const parts = [];
	for (const tag of source.matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*?)?)\/?>/g)) {
		const attrs = [...tag[2].matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=/g)].map((a) => a[1]).sort();
		parts.push(attrs.length > 0 ? `${tag[1]}[${attrs.join(',')}]` : tag[1]);
	}
	return parts;
}

/**
 * Recursive on purpose. A flat `readdir` found 3 pages out of 64 — the rest are
 * nested under their route directories — and reported success, which is the
 * worst possible outcome for a guard.
 */
async function htmlFiles(dir, prefix = '') {
	const entries = await readdir(dir, { withFileTypes: true });
	const out = [];
	for (const e of entries) {
		const rel = prefix ? `${prefix}/${e.name}` : e.name;
		if (e.isDirectory()) out.push(...(await htmlFiles(join(dir, e.name), rel)));
		else if (e.name.endsWith('.html')) out.push(rel);
	}
	return out;
}

async function currentDigests() {
	let files;
	try {
		files = (await htmlFiles(BUILD_DIR)).sort();
	} catch {
		throw new Error(
			`No build output at ${BUILD_DIR}. Run \`pnpm build\` in apps/docs first — this ` +
				'guard inspects what was actually rendered, not the source.'
		);
	}

	if (files.length === 0) throw new Error('Build output contains no HTML pages');

	// A floor, because the flat-readdir bug silently covered 3 pages and passed.
	// The site has ~64; anything near zero means the walk broke, not that pages
	// were deleted — the baseline diff would catch a real deletion.
	if (files.length < 20) {
		throw new Error(
			`Only ${files.length} pages found under ${BUILD_DIR}. That is too few to be a ` +
				'complete build; the directory walk is probably broken.'
		);
	}

	const out = {};
	for (const f of files) {
		const parts = digest(await readFile(join(BUILD_DIR, f), 'utf8'));
		out[f] = {
			elements: parts.length,
			hash: createHash('sha256').update(parts.join('\n')).digest('hex').slice(0, 16)
		};
	}
	return out;
}

const current = await currentDigests();

if (process.argv.includes('--update')) {
	await writeFile(BASELINE, JSON.stringify(current, null, 2) + '\n');
	console.log(`check-render: baseline updated for ${Object.keys(current).length} pages.`);
	process.exit(0);
}

let baseline;
try {
	baseline = JSON.parse(await readFile(BASELINE, 'utf8'));
} catch {
	console.error(
		'check-render: no baseline. Create one with `pnpm check:render:update` and commit it.'
	);
	process.exit(1);
}

const added = Object.keys(current).filter((p) => !(p in baseline));
const removed = Object.keys(baseline).filter((p) => !(p in current));
const changed = Object.keys(current).filter(
	(p) => p in baseline && baseline[p].hash !== current[p].hash
);

if (added.length || removed.length || changed.length) {
	console.error('check-render: the rendered structure changed\n');
	for (const p of changed) {
		const d = current[p].elements - baseline[p].elements;
		const delta = d === 0 ? 'same element count' : `${d > 0 ? '+' : ''}${d} elements`;
		console.error(`  ~ ${p} (${delta})`);
	}
	for (const p of added) console.error(`  + ${p} (new page)`);
	for (const p of removed) console.error(`  - ${p} (page gone)`);
	console.error(
		'\nText and attribute VALUES are ignored, so copy edits never reach here. This is a\n' +
			'changed tag, attribute name, or element order. If it was intended, re-run with\n' +
			'`pnpm check:render:update` and commit the baseline as part of the same change.'
	);
	process.exit(1);
}

console.log(`check-render: ${Object.keys(current).length} pages structurally unchanged.`);
