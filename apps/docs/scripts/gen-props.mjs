/**
 * Generates the prop metadata the docs prop tables render.
 *
 * The tables used to be hand-authored `PropRow[]` arrays on 26 pages, which
 * drifts the moment a component's props change. This reads the components
 * themselves so the docs cannot disagree with the code.
 *
 * Defaults live in THREE distinct places in this codebase, so each is looked up
 * explicitly rather than inferred:
 *
 *   1. An `@default` JSDoc tag on the prop — authoritative, and it also shows in
 *      editor hover for consumers. Prefer this.
 *   2. The `$props()` destructuring — e.g. `size = 'md'`.
 *   3. `defineVariants({ defaultVariants })` — variant axes like Button's
 *      `variant` carry no destructuring default; theirs lives in the resolver.
 *
 * First hit wins. A prop with no default in any of the three is reported with
 * none, which is the honest answer.
 *
 * INHERITED PROPS. Most components here are thin Bits UI wrappers whose Props
 * read `extends Omit<ComponentProps<typeof Bits.Root>, …>` and declare almost
 * nothing of their own — every real prop (`count`, `perPage`, `onComplete`,
 * `loop`, …) is inherited and forwarded through the spread. Reading the AST alone
 * saw none of them, so six pages had ZERO generated coverage and five had no
 * entry at all, which is why their tables stayed hand-written.
 *
 * So this resolves the heritage clause with the real TypeScript checker. The hard
 * part is not reading the type, it is subtracting the HTML attribute surface:
 * `ComponentProps<typeof Popover.Content>` includes every `div` attribute, and a
 * naive expansion produces useless 200-row tables. The filter is by DECLARATION
 * FILE — a property is kept only when it is declared inside `bits-ui` — so
 * anything from `svelte/elements` or `lib.dom` is dropped without a hardcoded
 * name list to maintain.
 *
 * Output is COMMITTED and guarded by `pnpm gen:props:check`, so a stale file
 * fails CI instead of silently shipping wrong docs.
 *
 * Run: pnpm gen:props
 */
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const HERE = dirname(fileURLToPath(import.meta.url));
const COMPONENTS = join(HERE, '../../../packages/sve-ui/src/lib/components');
const OUT = join(HERE, '../src/lib/docs/generated/props.json');

// ---------------------------------------------------------------------------
// Svelte file -> TypeScript source
// ---------------------------------------------------------------------------

/**
 * Concatenates every <script> block so module-level type aliases (declared in
 * `<script module>`) are visible alongside the instance-level `interface Props`.
 */
function extractScripts(source) {
	const blocks = [];
	const re = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
	let m;
	while ((m = re.exec(source)) !== null) blocks.push(m[1]);
	return blocks.join('\n');
}

// ---------------------------------------------------------------------------
// Collectors
// ---------------------------------------------------------------------------

/** `type Size = 'sm' | 'md' | 'lg'` -> { Size: "'sm' | 'md' | 'lg'" } */
function collectTypeAliases(sourceFile) {
	const aliases = {};
	sourceFile.forEachChild((node) => {
		if (ts.isTypeAliasDeclaration(node)) {
			aliases[node.name.text] = node.type.getText(sourceFile);
		}
	});
	return aliases;
}

/** Finds `interface Props`, wherever it sits in the file. */
function findPropsInterface(sourceFile) {
	let found;
	const visit = (node) => {
		if (ts.isInterfaceDeclaration(node) && node.name.text === 'Props') found = node;
		if (!found) ts.forEachChild(node, visit);
	};
	ts.forEachChild(sourceFile, visit);
	return found;
}

/** The single-line JSDoc description, with `@tag` lines stripped out. */
function jsDocDescription(member) {
	const parts = ts.getJSDocCommentsAndTags(member).flatMap((doc) => {
		if (!ts.isJSDoc(doc)) return [];
		return typeof doc.comment === 'string' ? [doc.comment] : [];
	});
	return parts.join(' ').replace(/\s+/g, ' ').trim() || undefined;
}

/** Reads an `@default` / `@defaultValue` JSDoc tag. */
function jsDocDefault(member) {
	for (const tag of ts.getJSDocTags(member)) {
		const name = tag.tagName.text;
		if (name !== 'default' && name !== 'defaultValue') continue;
		const text = typeof tag.comment === 'string' ? tag.comment.trim() : '';
		if (text) return text;
	}
	return undefined;
}

/** `let { size = 'md', class: cls } = $props()` -> { size: "'md'" } */
function collectDestructuringDefaults(sourceFile) {
	const defaults = {};
	const visit = (node) => {
		if (
			ts.isVariableDeclaration(node) &&
			node.initializer &&
			ts.isCallExpression(node.initializer) &&
			node.initializer.expression.getText(sourceFile) === '$props' &&
			ts.isObjectBindingPattern(node.name)
		) {
			for (const element of node.name.elements) {
				if (!element.initializer) continue;
				// `propertyName` is set only when renamed (`class: cls`); the wire name
				// is the property, not the local binding.
				const wireName = element.propertyName ?? element.name;
				if (!ts.isIdentifier(wireName)) continue;
				let text = element.initializer.getText(sourceFile);
				// `$bindable()` is a binding mechanism, not a default value.
				if (/^\$bindable\(\s*\)$/.test(text)) continue;
				const bindableWithDefault = /^\$bindable\(\s*([\s\S]*?)\s*\)$/.exec(text);
				if (bindableWithDefault) text = bindableWithDefault[1];
				if (text) defaults[wireName.text] = text;
			}
		}
		ts.forEachChild(node, visit);
	};
	ts.forEachChild(sourceFile, visit);
	return defaults;
}

/**
 * `defineVariants({ variants: {...}, defaultVariants: { variant: 'solid' } })`
 * -> { variant: "'solid'" }
 */
function collectVariantDefaults(sourceFile) {
	const defaults = {};
	const visit = (node) => {
		if (
			ts.isCallExpression(node) &&
			node.expression.getText(sourceFile) === 'defineVariants' &&
			node.arguments.length > 0 &&
			ts.isObjectLiteralExpression(node.arguments[0])
		) {
			for (const prop of node.arguments[0].properties) {
				if (
					!ts.isPropertyAssignment(prop) ||
					prop.name.getText(sourceFile) !== 'defaultVariants' ||
					!ts.isObjectLiteralExpression(prop.initializer)
				) {
					continue;
				}
				for (const axis of prop.initializer.properties) {
					if (!ts.isPropertyAssignment(axis)) continue;
					defaults[axis.name.getText(sourceFile)] = axis.initializer.getText(sourceFile);
				}
			}
		}
		ts.forEachChild(node, visit);
	};
	ts.forEachChild(sourceFile, visit);
	return defaults;
}

/** What the `{...rest}` spread forwards, read off `extends Omit<X, …>`. */
function collectSpreadSource(propsInterface, sourceFile) {
	const clause = propsInterface.heritageClauses?.[0];
	if (!clause) return undefined;
	return clause.types.map((t) => t.getText(sourceFile)).join(', ');
}

// ---------------------------------------------------------------------------
// One TypeScript Program over every component, for inherited props
// ---------------------------------------------------------------------------

/**
 * Virtual `<Component>.svelte.ts` files, each sitting NEXT TO its real component
 * so both relative imports and the `bits-ui` lookup resolve exactly as they do
 * for the real file.
 */
function buildVirtualFiles(files) {
	const virtual = new Map();
	for (const file of files) {
		virtual.set(file + '.ts', extractScripts(readFileSync(file, 'utf8')));
	}
	return virtual;
}

/**
 * Namespace `index.ts` files, so re-exported Bits parts can be resolved.
 *
 * Eleven components — `Dialog.Root`, `Tooltip.Provider`, `Select.Root` and the
 * rest — have no `.svelte` file at all: the index does
 * `export const Root = BitsDialog.Root`, because Root renders nothing visual.
 * Reading only the `.svelte` files therefore documented nothing for them, which
 * is why their pages stayed hand-written.
 */
function namespaceIndexes(files) {
	const dirs = new Set(files.map((f) => dirname(f)));
	return [...dirs].map((d) => join(d, 'index.ts')).filter((f) => existsSync(f));
}

function createProgram(virtual, extraRoots = []) {
	const options = {
		target: ts.ScriptTarget.Latest,
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.Bundler,
		skipLibCheck: true,
		strict: true,
		noEmit: true,
		// Nothing here needs ambient @types, and loading them slows the Program
		// down for no gain.
		types: []
	};

	const host = ts.createCompilerHost(options, true);
	const readFile = host.readFile.bind(host);
	const fileExists = host.fileExists.bind(host);
	const getSourceFile = host.getSourceFile.bind(host);

	host.readFile = (name) => (virtual.has(name) ? virtual.get(name) : readFile(name));
	host.fileExists = (name) => virtual.has(name) || fileExists(name);
	host.getSourceFile = (name, ...args) =>
		virtual.has(name)
			? ts.createSourceFile(name, virtual.get(name), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
			: getSourceFile(name, ...args);

	return ts.createProgram([...virtual.keys(), ...extraRoots], options, host);
}

/**
 * Where a property is DECLARED decides whether it is API or noise.
 *
 * Filtering by declaration file rather than by name means the HTML attribute
 * surface is excluded structurally: `class`, `id`, every `on*`, every `aria-*`
 * and `data-*` all come from `svelte/elements` or `lib.dom`, and nothing has to
 * be listed by hand or kept in sync as those grow.
 */
/**
 * Bits REDECLARES a few plain HTML attributes on its own prop types, so the
 * declaration-file filter keeps them. They are pass-throughs with nothing to
 * say, and at 120 occurrences each they would be the most common rows in the
 * whole catalog.
 *
 * Only `style`. `id` is real API here — this library's own guidance is to wire
 * ids by hand (`aria-labelledby` on a Sidebar group, `Field`'s control id). And
 * `dir` changes which arrow key moves forward in a Bits menu, so it is
 * behaviour, not presentation; filtering it out was a mistake.
 */
const PASSTHROUGH = new Set(['style']);

/**
 * The handful of HTML attributes that ARE the point of their component.
 *
 * The declaration-file filter drops everything from `svelte/elements`, which is
 * right for the 200 attributes nobody documents and wrong for these five: an
 * `Input` without `value` in its table, or a `Label` without `for`, documents
 * everything except the reason the component exists.
 *
 * Keyed by component so it stays five exceptions rather than five globally
 * resurrected attributes.
 */
const HTML_PROPS_WORTH_KEEPING = new Map([
	['Input', new Set(['value'])],
	['Textarea', new Set(['value', 'rows'])],
	['Label', new Set(['for'])],
	['Button', new Set(['disabled', 'onclick'])],
	['AvatarImage', new Set(['src', 'alt'])],
	['ComboboxInput', new Set(['value', 'placeholder', 'oninput'])],
	// A link component whose `href` is undocumented documents everything but the
	// destination.
	['LinkPreviewTrigger', new Set(['href'])],
	['NavigationMenuLink', new Set(['href'])]
]);

function isBitsDeclaration(symbol) {
	const declarations = symbol.getDeclarations() ?? [];
	return declarations.some((d) => /[\\/]bits-ui[\\/]/.test(d.getSourceFile().fileName));
}

/** Bits' resolved types can be enormous; a table row has to stay readable. */
function truncateType(text) {
	const flat = text.replace(/\s+/g, ' ').trim();
	if (flat.length <= 90) return flat;
	// Cut at a union boundary when there is one, so the result is still valid to read.
	const cut = flat.lastIndexOf(' | ', 90);
	return (cut > 40 ? flat.slice(0, cut) : flat.slice(0, 90)) + ' | …';
}

/**
 * Props the component inherits from Bits and forwards, minus anything declared
 * locally (the local declaration is the documented one, with real defaults) and
 * minus the HTML attribute surface.
 */
function inheritedProps(checker, propsInterface, localNames, componentName) {
	if (!propsInterface.heritageClauses?.length) return [];

	const symbol = checker.getSymbolAtLocation(propsInterface.name);
	if (!symbol) return [];

	const type = checker.getDeclaredTypeOfSymbol(symbol);
	const out = [];

	for (const prop of checker.getPropertiesOfType(type)) {
		const name = prop.getName();
		if (localNames.has(name)) continue;
		if (PASSTHROUGH.has(name)) continue;

		const kept = HTML_PROPS_WORTH_KEEPING.get(componentName);
		const isWorthKeeping = kept?.has(name) === true;
		if (!isBitsDeclaration(prop) && !isWorthKeeping) continue;

		const declaration = prop.getDeclarations()?.[0];
		if (!declaration) continue;

		const docs = ts.displayPartsToString(prop.getDocumentationComment(checker));
		const tags = prop.getJsDocTags(checker);
		const defaultTag = tags.find((t) => t.name === 'default' || t.name === 'defaultValue');

		out.push({
			prop: name,
			type: truncateType(
				checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, declaration))
			),
			required: (prop.flags & ts.SymbolFlags.Optional) === 0,
			default: defaultTag
				? ts.displayPartsToString(defaultTag.text ?? []).trim() || undefined
				: undefined,
			description: docs.replace(/\s+/g, ' ').trim() || undefined,
			// Provenance, so a reader knows whose contract they are reading. An HTML
			// attribute is not Bits', and saying so would send them to the wrong docs.
			from: isBitsDeclaration(prop) ? 'bits-ui' : 'html'
		});
	}

	return out.sort((a, b) => a.prop.localeCompare(b.prop));
}

/**
 * Props of a component that exists only as a re-export.
 *
 * Both shapes in this codebase resolve the same way — `export const Root =
 * BitsDialog.Root` and `export const Root: Component<TooltipRootProps> = ...` —
 * because the checker is asked for the type of the exported symbol rather than
 * for the text of the assignment.
 */
function reExportedProps(checker, sourceFile, namespace) {
	const results = {};

	for (const stmt of sourceFile.statements) {
		if (!ts.isVariableStatement(stmt)) continue;
		const exported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
		if (!exported) continue;

		for (const decl of stmt.declarationList.declarations) {
			if (!ts.isIdentifier(decl.name)) continue;
			const partName = decl.name.text;

			const type = checker.getTypeAtLocation(decl.name);
			// A Svelte 5 component is `Component<Props, …>`; the props are the first
			// type argument. Falling back to the aliased arguments covers the form
			// that annotates the constant explicitly.
			const args = checker.getTypeArguments(type) ?? [];
			const propsType = args[0] ?? type.aliasTypeArguments?.[0];
			if (!propsType) continue;

			const props = [];
			for (const prop of checker.getPropertiesOfType(propsType)) {
				const name = prop.getName();
				if (PASSTHROUGH.has(name)) continue;
				/*
					The allowlist applies here too. `LinkPreview.Trigger` is a re-export,
					and its `href` — the destination, the whole point of the component —
					is declared in `svelte/elements`, so the Bits-only filter dropped it.
				*/
				const keptHere = HTML_PROPS_WORTH_KEEPING.get(namespace + partName);
				if (!isBitsDeclaration(prop) && keptHere?.has(name) !== true) continue;

				const d = prop.getDeclarations()?.[0];
				if (!d) continue;

				const tags = prop.getJsDocTags(checker);
				const def = tags.find((t) => t.name === 'default' || t.name === 'defaultValue');
				props.push({
					prop: name,
					type: truncateType(checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, d))),
					required: (prop.flags & ts.SymbolFlags.Optional) === 0,
					default: def ? ts.displayPartsToString(def.text ?? []).trim() || undefined : undefined,
					description:
						ts
							.displayPartsToString(prop.getDocumentationComment(checker))
							.replace(/\s+/g, ' ')
							.trim() || undefined,
					from: isBitsDeclaration(prop) ? 'bits-ui' : 'html'
				});
			}

			if (props.length === 0) continue;
			props.sort((a, b) => a.prop.localeCompare(b.prop));
			results[namespace + partName] = {
				props,
				// No wrapper of ours means nothing of ours to forward: every prop here
				// belongs to Bits.
				spreads: undefined
			};
		}
	}

	return results;
}

// ---------------------------------------------------------------------------
// Per-component extraction
// ---------------------------------------------------------------------------

function extractComponent(file, program) {
	const checker = program.getTypeChecker();
	const sourceFile = program.getSourceFile(file + '.ts');
	if (!sourceFile) return undefined;

	const propsInterface = findPropsInterface(sourceFile);
	if (!propsInterface) return undefined;

	const aliases = collectTypeAliases(sourceFile);
	const destructured = collectDestructuringDefaults(sourceFile);
	const variantDefaults = collectVariantDefaults(sourceFile);

	/**
	 * Tidy a type as it will be READ, not as it happens to be written.
	 *
	 * Prettier breaks a long union onto its own lines with a leading pipe:
	 *
	 *   type As =
	 *     | 'div'
	 *     | 'section'
	 *
	 * `getText()` returns that verbatim, so the props table rendered a leading
	 * `| ` that is not part of the type. Collapsing the whitespace and dropping the
	 * leading pipe makes the output depend on the type, not on how it was formatted.
	 */
	function normalizeType(text) {
		return text
			.replace(/\s+/g, ' ')
			.replace(/^\|\s*/, '')
			.trim();
	}

	const props = propsInterface.members.flatMap((member) => {
		if (!ts.isPropertySignature(member) || !member.type || !ts.isIdentifier(member.name)) return [];
		const name = member.name.text;
		const typeText = member.type.getText(sourceFile);

		return [
			{
				prop: name,
				// Expand a local alias (`Size`) to the union the consumer actually writes.
				type: normalizeType(aliases[typeText] ?? typeText),
				required: member.questionToken === undefined,
				default: jsDocDefault(member) ?? destructured[name] ?? variantDefaults[name],
				description: jsDocDescription(member)
			}
		];
	});

	const localNames = new Set(props.map((pr) => pr.prop));
	const inherited = inheritedProps(checker, propsInterface, localNames, basename(file, '.svelte'));

	return {
		// Own props first: they are the ones this library chose, documented and
		// defaulted. Inherited ones follow, labelled.
		props: [...props, ...inherited],
		spreads: collectSpreadSource(propsInterface, sourceFile)
	};
}

// ---------------------------------------------------------------------------
// Walk + emit
// ---------------------------------------------------------------------------

function walk(dir) {
	return readdirSync(dir).flatMap((entry) => {
		const full = join(dir, entry);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});
}

const files = walk(COMPONENTS)
	.filter((f) => f.endsWith('.svelte'))
	.sort();

const indexes = namespaceIndexes(files);
const program = createProgram(buildVirtualFiles(files), indexes);

const generated = {};
const skipped = [];

for (const file of files) {
	const name = basename(file, '.svelte');
	const result = extractComponent(file, program);
	if (!result) {
		skipped.push(relative(COMPONENTS, file));
		continue;
	}
	generated[name] = result;
}

// Re-exported parts, keyed `<Namespace><Part>` to match how the docs ask for
// them. Anything already produced from a real `.svelte` file wins: our wrapper
// documents its own props and their defaults, which a Bits type cannot.
const checker = program.getTypeChecker();
let reExported = 0;
for (const indexPath of indexes) {
	const sourceFile = program.getSourceFile(indexPath);
	if (!sourceFile) continue;
	const namespace = basename(dirname(indexPath));
	for (const [key, entry] of Object.entries(reExportedProps(checker, sourceFile, namespace))) {
		if (generated[key]) continue;
		generated[key] = entry;
		reExported += 1;
	}
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(generated, null, '\t') + '\n');

const own = Object.values(generated).reduce(
	(n, c) => n + c.props.filter((pr) => !pr.from).length,
	0
);
const inheritedCount = Object.values(generated).reduce(
	(n, c) => n + c.props.filter((pr) => pr.from).length,
	0
);
console.log(
	`gen-props: ${Object.keys(generated).length} components ` +
		`(${reExported} of them re-exported Bits parts with no .svelte file), ` +
		`${own} own + ${inheritedCount} inherited props → ${relative(process.cwd(), OUT)}`
);
if (skipped.length > 0) {
	console.warn(`gen-props: ${skipped.length} file(s) had no \`interface Props\` and were skipped:`);
	for (const s of skipped) console.warn(`  ${s}`);
}
