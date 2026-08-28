/**
 * Every shipped component must be findable — in the registry, in the docs, and
 * in the agent skill.
 *
 * This is what "generate the registry and skill from types" turned into after
 * measuring it. The slugs and groups could be generated; the blurbs and the
 * reasoning cannot, and the reasoning is the valuable half — no generator will
 * produce "a link that goes nowhere takes a tab stop and lies". So the prose
 * stays hand-written and this checks that none of it is missing.
 *
 * The drift is real and has happened twice: `Collapsible` was absent from the
 * skill for a whole pull request, and `Busy` was added to SKILL.md while its
 * catalog entry was forgotten. Both were caught by a person noticing, which is
 * not a system.
 *
 * Nothing here checks whether the prose is GOOD. It checks that it exists.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const LIB_INDEX = join(ROOT, 'packages/sve-ui/src/lib/index.ts');
const REGISTRY = join(ROOT, 'apps/docs/src/lib/docs/registry.ts');
const PAGES = join(ROOT, 'apps/docs/src/routes/components');
const SKILL = join(ROOT, 'packages/sve-ui/skills/sve-ui-usage/references/components.md');

/**
 * Exports that are not components and have no page of their own. Each needs a
 * reason, so the list cannot quietly absorb a component someone forgot.
 */
const NOT_COMPONENTS = new Map([
	['ThemeProvider', 'infrastructure: sets the theme class, covered by the theming guide']
]);

function exportedSymbols() {
	const src = readFileSync(LIB_INDEX, 'utf8');
	return new Set([
		...[...src.matchAll(/export \* as (\w+) from/g)].map((m) => m[1]),
		...[...src.matchAll(/export \{ default as (\w+) \}/g)].map((m) => m[1])
	]);
}

function registryEntries() {
	const src = readFileSync(REGISTRY, 'utf8');
	const out = [];
	for (const m of src.matchAll(/slug: '([a-z0-9-]+)'/g)) {
		// An entry ends where the next one begins.
		const rest = src.slice(m.index);
		const next = rest.indexOf('slug:', 5);
		const seg = next > 0 ? rest.slice(0, next) : rest;
		const name = seg.match(/name: '([^']+)'/);
		out.push({ slug: m[1], name: name ? name[1] : m[1], ready: seg.includes('ready: true') });
	}
	return out;
}

/**
 * A component is named one way in prose ("Alert Dialog") and another in code
 * ("AlertDialog"). Both count — an earlier version of this check compared only
 * the display name and reported 19 false positives out of 19.
 */
function nameForms(name) {
	return new Set([name, name.replace(/\s+/g, ''), name.replace(/\s+/g, '').replace('PIN', 'Pin')]);
}

const exported = exportedSymbols();
const entries = registryEntries();
const pages = new Set(
	readdirSync(PAGES, { withFileTypes: true })
		.filter((e) => e.isDirectory() && existsSync(join(PAGES, e.name, '+page.svelte')))
		.map((e) => e.name)
);
const skill = readFileSync(SKILL, 'utf8');

const problems = [];

for (const symbol of exported) {
	if (NOT_COMPONENTS.has(symbol)) continue;
	if (!entries.some((e) => nameForms(e.name).has(symbol))) {
		problems.push(`${symbol} is exported from the library but has no registry entry`);
	}
}

for (const entry of entries) {
	if (!entry.ready) continue;
	if (!pages.has(entry.slug)) {
		problems.push(`${entry.name} is marked ready but has no docs page at components/${entry.slug}`);
	}
	if (![...nameForms(entry.name)].some((f) => skill.includes(f))) {
		problems.push(`${entry.name} is marked ready but never appears in the agent skill's catalog`);
	}
}

if (problems.length > 0) {
	console.error('check-docs-coverage: FAILED\n');
	for (const p of problems) console.error(`  - ${p}`);
	console.error(
		'\nA component nobody can find is a component nobody uses. Add the registry\n' +
			'entry, the docs page, or the skill section — or, if the export genuinely is\n' +
			'not a component, add it to NOT_COMPONENTS in this script with a reason.'
	);
	process.exit(1);
}

console.log(
	`check-docs-coverage: ${exported.size} exports, ${entries.length} registry entries, ` +
		`${pages.size} pages — all accounted for.`
);
