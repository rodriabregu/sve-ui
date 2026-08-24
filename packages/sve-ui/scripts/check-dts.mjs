/**
 * Guards the published type surface.
 *
 * `svelte-package` silently emits `declare const X: any` when a component's
 * name shadows an identifier it imports — e.g. `import { Label } from 'bits-ui'`
 * inside a component also called `Label`. The source type-checks, publint and
 * attw pass, and consumers get a component with NO prop types at all.
 *
 * That shipped once (Label + Separator in 0.4.0). This runs after
 * svelte-package so it can never ship again.
 *
 * Fix when this fails: alias the import (`import { Label as LabelPrimitive }`).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

/** `declare const Foo: any;` — the collapsed-to-any component type. */
const COLLAPSED = /^declare const (\w+): any;$/m;

function walk(dir) {
	return readdirSync(dir).flatMap((entry) => {
		const full = join(dir, entry);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});
}

const declarations = walk(DIST).filter((f) => f.endsWith('.svelte.d.ts'));

if (declarations.length === 0) {
	console.error('check-dts: no .svelte.d.ts files found in dist — did svelte-package run?');
	process.exit(1);
}

const broken = declarations
	.map((file) => ({ file, match: COLLAPSED.exec(readFileSync(file, 'utf8')) }))
	.filter(({ match }) => match !== null)
	.map(({ file, match }) => `  ${relative(DIST, file)} → declare const ${match[1]}: any`);

if (broken.length > 0) {
	console.error(
		`check-dts: ${broken.length} component type(s) collapsed to \`any\`, so consumers get no prop types:\n${broken.join(
			'\n'
		)}\n\nUsually a name collision between the component and something it imports.\nAlias the import — e.g. \`import { Label as LabelPrimitive } from 'bits-ui'\`.`
	);
	process.exit(1);
}

console.log(`check-dts: ${declarations.length} component types OK (no \`any\`).`);
