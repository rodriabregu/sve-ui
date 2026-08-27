/**
 * Every class a component renders must have its CSS reachable from that
 * component.
 *
 * This exists because of a bug that shipped for four versions. Svelte compiles
 * styles per component, so a rule written in `DatePickerTrigger.svelte` lives
 * only there — and `DateRangePicker.Trigger` reused the same class name. A
 * consumer importing only `DateRangePicker` got a completely unstyled trigger.
 *
 * It was invisible until `sideEffects` was declared and tree-shaking started
 * working, which is the uncomfortable part: the fix for one problem uncovered
 * another that had been hiding behind it. Five classes across three namespaces
 * were affected.
 *
 * The architecture that resolves it: shared rules go in a plain `.css` file that
 * every component using them imports. A CSS import survives tree-shaking because
 * `sideEffects` is `["**\/*.css"]`, which is the other half of why that value is
 * an array and not `false`.
 *
 * So the rule this enforces is: a component referencing `sve-foo` must declare
 * it in its own `<style>`, or import a `.css` file that declares it.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPONENTS = fileURLToPath(new URL('../src/lib/components', import.meta.url));

/**
 * Classes applied as styling hooks with no rules anywhere, on purpose: a
 * consumer can target them, and the library has nothing to say about them.
 * Anything NOT listed here that has no CSS is a mistake, not a hook.
 */
const HOOKS = new Set([
	'sve-menu-group',
	'sve-accordion__label',
	'sve-calendar__grid-head',
	'sve-calendar__grid-body',
	'sve-calendar__grid-row',
	'sve-table__header',
	'sve-table__body',
	'sve-table__row'
]);

function walk(dir) {
	return readdirSync(dir).flatMap((e) => {
		const full = join(dir, e);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});
}

const files = walk(COMPONENTS);
const svelte = files.filter((f) => f.endsWith('.svelte'));

/** class names declared by a stylesheet or a <style> block */
function declaredIn(text) {
	return new Set([...text.matchAll(/\.(sve-[a-z0-9_-]+)/g)].map((m) => m[1]));
}

const cssCache = new Map();
function cssDeclares(path) {
	if (!cssCache.has(path)) {
		try {
			cssCache.set(path, declaredIn(readFileSync(path, 'utf8')));
		} catch {
			cssCache.set(path, new Set());
		}
	}
	return cssCache.get(path);
}

/** Everything declared anywhere in this component's own namespace directory. */
const nsCache = new Map();
function namespaceDeclares(file) {
	const rel = file.slice(COMPONENTS.length + 1);
	const ns = rel.split(/[\\/]/)[0];
	if (!nsCache.has(ns)) {
		const set = new Set();
		for (const f of walk(join(COMPONENTS, ns))) {
			if (f.endsWith('.svelte')) {
				const m = readFileSync(f, 'utf8').match(/<style>([\s\S]*?)<\/style>/);
				if (m) for (const c of declaredIn(m[1])) set.add(c);
			} else if (f.endsWith('.css')) {
				for (const c of cssDeclares(f)) set.add(c);
			}
		}
		nsCache.set(ns, set);
	}
	return nsCache.get(ns);
}

const problems = [];

for (const file of svelte) {
	const src = readFileSync(file, 'utf8');
	const styleMatch = src.match(/<style>([\s\S]*?)<\/style>/);
	const markup = src.slice(0, styleMatch ? src.indexOf('<style>') : src.length);

	/*
		Reachable means: this component's own <style>, every `.css` it imports, and
		anything declared elsewhere in the SAME namespace directory.

		That last part is not laxness. The library exposes namespaces wholesale
		(`export * as Calendar from './components/Calendar/index.js'`), so importing
		`Calendar` pulls every part of it and their styles with it. Intra-namespace
		sharing therefore cannot produce unstyled markup; only CROSS-namespace
		sharing can, which is exactly the bug this guard exists for.
	*/
	const reachable = new Set(styleMatch ? declaredIn(styleMatch[1]) : []);
	for (const imp of markup.matchAll(/import\s+['"]([^'"]+\.css)['"]/g)) {
		for (const cls of cssDeclares(resolve(dirname(file), imp[1]))) reachable.add(cls);
	}
	for (const cls of namespaceDeclares(file)) reachable.add(cls);

	// Referenced: class-name string literals in the markup/script.
	const referenced = new Set([...markup.matchAll(/['"](sve-[a-z0-9_-]+)['"]/g)].map((m) => m[1]));

	for (const cls of referenced) {
		if (HOOKS.has(cls)) continue;
		if (reachable.has(cls)) continue;
		// A modifier is fine when its base is reachable — `--invalid` rules live
		// beside the base rule by construction.
		const base = cls.replace(/--[a-z0-9-]+$/, '');
		if (base !== cls && reachable.has(base)) continue;
		problems.push({ file: file.slice(COMPONENTS.length + 1), cls });
	}
}

if (problems.length > 0) {
	console.error('check-css-coverage: FAILED\n');
	for (const p of problems) {
		console.error(`  - ${p.file} renders .${p.cls} but its CSS is not reachable from there`);
	}
	console.error(
		'\nSvelte compiles styles per component, so a rule written in one file does not\n' +
			'travel to another that reuses the class. A consumer importing only the second\n' +
			'namespace gets unstyled markup.\n\n' +
			'Fix it by moving the shared rules into a .css file next to them and importing\n' +
			'that file from every component that needs it. A CSS import is never\n' +
			'tree-shaken away, because `sideEffects` is ["**/*.css"].\n\n' +
			'If the class is a deliberate styling hook with no rules anywhere, add it to\n' +
			'HOOKS in this script with a reason.'
	);
	process.exit(1);
}

console.log(
	`check-css-coverage: ${svelte.length} components, every rendered class has reachable CSS.`
);
