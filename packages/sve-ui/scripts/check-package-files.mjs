/**
 * Asserts that files the package PROMISES to ship are actually in the tarball.
 *
 * This exists because the agent skill was maintained for months, linked from the
 * docs site, and described there as something the package ships — while
 * `files: ["dist"]` meant zero skill files ever reached a consumer. The docs
 * even told people to `cp -r sve-ui/skills/... .claude/skills/`, a path that did
 * not exist in an installed copy.
 *
 * The repo being right is not evidence about the published artifact, so this
 * asks npm for the real file list rather than reading the filesystem.
 */

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = fileURLToPath(new URL('..', import.meta.url));

/**
 * Every entry must be matched by at least one packed file. Prefixes, because
 * exact names churn and the point is that the directory arrives at all.
 */
const REQUIRED = [
	'dist/index.js',
	'dist/index.d.ts',
	'dist/theme/theme.css',
	'skills/sve-ui-usage/SKILL.md',
	'skills/sve-ui-usage/references/components.md'
];

function packedFiles() {
	// `--dry-run` builds the same file list as a real publish without emitting a
	// tarball or touching the registry.
	const raw = execFileSync('npm', ['pack', '--dry-run', '--json'], {
		cwd: PKG_ROOT,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'ignore']
	});

	const parsed = JSON.parse(raw);
	const entry = Array.isArray(parsed) ? parsed[0] : parsed;
	const files = entry?.files;

	if (!Array.isArray(files) || files.length === 0) {
		throw new Error('npm pack reported no files; refusing to pass on an empty list');
	}

	return files.map((f) => f.path);
}

const paths = packedFiles();
const missing = REQUIRED.filter((req) => !paths.includes(req));

if (missing.length > 0) {
	console.error('check-package-files: FAILED\n');
	for (const m of missing) console.error(`  - promised but not packed: ${m}`);
	console.error(
		`\nThe tarball has ${paths.length} files and none of them match the above.\n` +
			'Check the `files` field in package.json. A consumer only ever receives what\n' +
			'is packed, no matter what the repo or the documentation says.'
	);
	process.exit(1);
}

console.log(
	`check-package-files: ${paths.length} files packed, all ${REQUIRED.length} required present.`
);
