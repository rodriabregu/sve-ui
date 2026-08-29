/**
 * The README is the npm page. Every component must appear on it.
 *
 * This exists because it had already rotted all the way through: the README
 * listed 18 of 61 exports and sold a 60-component library as sixteen. Forty-three
 * components — `Table`, `Toast`, `Sidebar`, `Combobox`, `Command`, the whole date
 * family — were not named anywhere in the file. Nobody noticed, because nothing
 * was looking. `check-docs-coverage` guards the registry, the docs pages and the
 * agent skill; the one surface a person actually lands on had no guard at all.
 *
 * That surface is also the only one a search engine indexes for the package, so
 * an incomplete README is both a documentation bug and a discovery bug.
 *
 * Like its sibling, this checks that the prose EXISTS, not that it is good.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG = fileURLToPath(new URL('..', import.meta.url));
const LIB_INDEX = join(PKG, 'src/lib/index.ts');
const README = join(PKG, 'README.md');

/**
 * Exports that legitimately need no entry in the component table. Each needs a
 * reason, so the list cannot quietly absorb a component someone forgot.
 */
const NOT_IN_TABLE = new Map([
	['ThemeProvider', 'infrastructure, not a component: documented in Quick start and Theming']
]);

function exportedSymbols() {
	const src = readFileSync(LIB_INDEX, 'utf8');
	return [
		...[...src.matchAll(/export \* as (\w+) from/g)].map((m) => ({ name: m[1], namespace: true })),
		...[...src.matchAll(/export \{ default as (\w+) \}/g)].map((m) => ({
			name: m[1],
			namespace: false
		}))
	];
}

const readme = readFileSync(README, 'utf8');
const exported = exportedSymbols();
const problems = [];

for (const { name, namespace } of exported) {
	if (NOT_IN_TABLE.has(name)) continue;

	// Namespaces are written `Dialog.*` in the table; singles as plain `Button`.
	// Requiring the backticks is deliberate — a component named only in passing
	// prose is not the same as one listed where a reader goes looking.
	const listed = namespace
		? readme.includes(`\`${name}.*\``)
		: new RegExp('`' + name + '`').test(readme);

	if (!listed) {
		problems.push(
			namespace
				? `${name} is exported but never listed as \`${name}.*\` in the README`
				: `${name} is exported but never listed as \`${name}\` in the README`
		);
	}
}

// The headline count is prose, and prose drifts. Check it against the exports.
const components = exported.length - NOT_IN_TABLE.size;
const claimed = readme.match(/\*\*(\d+) components\*\*/);
if (!claimed) {
	problems.push('the README no longer states a component count in the form **N components**');
} else if (Number(claimed[1]) !== components) {
	problems.push(`the README claims ${claimed[1]} components but the library exports ${components}`);
}

if (problems.length > 0) {
	console.error('check-readme-coverage: FAILED\n');
	for (const p of problems) console.error(`  - ${p}`);
	console.error(
		'\nThe README is the npm page — a component missing from it is a component\n' +
			'nobody installing this package will know exists. Add it to the component\n' +
			'table, or, if the export genuinely is not a component, add it to\n' +
			'NOT_IN_TABLE in this script with a reason.'
	);
	process.exit(1);
}

console.log(
	`check-readme-coverage: ${components} components, all listed in the README, ` +
		'and the stated count matches.'
);
