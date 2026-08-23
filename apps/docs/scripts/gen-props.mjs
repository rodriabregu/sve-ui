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
 * Output is COMMITTED and guarded by `pnpm gen:props:check`, so a stale file
 * fails CI instead of silently shipping wrong docs.
 *
 * Run: pnpm gen:props
 */
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
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

function parse(code, fileName) {
  return ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
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
// Per-component extraction
// ---------------------------------------------------------------------------

function extractComponent(file) {
  const raw = readFileSync(file, 'utf8');
  const sourceFile = parse(extractScripts(raw), basename(file) + '.ts');

  const propsInterface = findPropsInterface(sourceFile);
  if (!propsInterface) return undefined;

  const aliases = collectTypeAliases(sourceFile);
  const destructured = collectDestructuringDefaults(sourceFile);
  const variantDefaults = collectVariantDefaults(sourceFile);

  const props = propsInterface.members.flatMap((member) => {
    if (!ts.isPropertySignature(member) || !member.type || !ts.isIdentifier(member.name)) return [];
    const name = member.name.text;
    const typeText = member.type.getText(sourceFile);

    return [
      {
        prop: name,
        // Expand a local alias (`Size`) to the union the consumer actually writes.
        type: aliases[typeText] ?? typeText,
        required: member.questionToken === undefined,
        default: jsDocDefault(member) ?? destructured[name] ?? variantDefaults[name],
        description: jsDocDescription(member)
      }
    ];
  });

  return {
    props,
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

const generated = {};
const skipped = [];

for (const file of files) {
  const name = basename(file, '.svelte');
  const result = extractComponent(file);
  if (!result) {
    skipped.push(relative(COMPONENTS, file));
    continue;
  }
  generated[name] = result;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(generated, null, '\t') + '\n');

const propCount = Object.values(generated).reduce((n, c) => n + c.props.length, 0);
console.log(`gen-props: ${Object.keys(generated).length} components, ${propCount} props → ${relative(process.cwd(), OUT)}`);
if (skipped.length > 0) {
  console.warn(`gen-props: ${skipped.length} file(s) had no \`interface Props\` and were skipped:`);
  for (const s of skipped) console.warn(`  ${s}`);
}
