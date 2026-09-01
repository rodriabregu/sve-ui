/**
 * Fails when the example app stops rendering some part of the public API.
 *
 * This guard exists because the example was built, declared a success, and then
 * missed two user-reported bugs in a row — a PIN Input that displayed nothing
 * you typed, and date pickers that opened a transparent panel. Both components
 * were exported, documented, tested and never once rendered by the example.
 * Coverage was 10 of 62.
 *
 * A one-time sweep does not hold: every new component lands uncovered by
 * default. So the sweep is the build.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const INDEX = join(here, '../../../packages/sve-ui/src/lib/index.ts');
const SRC = join(here, '../src');

const index = readFileSync(INDEX, 'utf8');
const exports = new Set([
	...[...index.matchAll(/export \{ default as (\w+)/g)].map((m) => m[1]),
	...[...index.matchAll(/export \* as (\w+)/g)].map((m) => m[1]),
	...[...index.matchAll(/export \{ (focus\w+)/g)].map((m) => m[1])
]);

if (exports.size < 50) {
	console.error(
		`check-example-coverage: only parsed ${exports.size} exports from index.ts — the parser is broken, not the example.`
	);
	process.exit(1);
}

function walk(dir) {
	let out = '';
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) out += walk(full);
		else if (/\.(svelte|ts)$/.test(entry)) out += readFileSync(full, 'utf8');
	}
	return out;
}

const source = walk(SRC);

/*
	A member of one namespace is not proof that another export is used.

	`\bEmpty\b` matched `Command.Empty` on the browse screen, so this guard
	reported the top-level `Empty` namespace as covered while nothing rendered it.
	The lookbehind requires the name to appear as itself — `Empty.Root` counts,
	`Command.Empty` does not.

	Same shape as the `sve-nav-menu` false positive in the CSS audit: a
	word-boundary match cannot tell a qualified name from a bare one.
*/
const missing = [...exports]
	.filter((name) => !new RegExp(`(?<!\\.)\\b${name}\\b`).test(source))
	.sort();

if (missing.length > 0) {
	console.error(
		`check-example-coverage: ${missing.length} of ${exports.size} exports are never rendered by the example.\n` +
			missing.map((m) => `  - ${m}`).join('\n') +
			`\n\nAdd them to a screen. An exported component the example never renders is a component\n` +
			`no one has actually used, and that is exactly where the last two shipped bugs were.`
	);
	process.exit(1);
}

console.log(`check-example-coverage: all ${exports.size} exports are rendered by the example.`);
