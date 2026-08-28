/**
 * Serves the prerendered docs output for the visual test run.
 *
 * `vite preview` cannot be used: the docs build through adapter-vercel, so the
 * pages land in `.vercel/output/static` and vite knows nothing about them.
 * Written by hand rather than pulling in a static-server dependency, because
 * this needs to do exactly one thing and never surprise the baseline.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../.vercel/output/static', import.meta.url));
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8'
};

async function resolve(urlPath) {
	// normalize() collapses `..`, so a request cannot escape ROOT.
	const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
	const candidates = [
		join(ROOT, clean),
		join(ROOT, `${clean}.html`),
		join(ROOT, clean, 'index.html')
	];
	for (const c of candidates) {
		if (!c.startsWith(ROOT)) continue;
		try {
			if ((await stat(c)).isFile()) return c;
		} catch {
			/* try the next candidate */
		}
	}
	return null;
}

createServer(async (req, res) => {
	const file = await resolve(req.url ?? '/');
	if (!file) {
		res.writeHead(404, { 'content-type': 'text/plain' });
		res.end('not found');
		return;
	}
	res.writeHead(200, {
		'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
		'cache-control': 'no-store'
	});
	res.end(await readFile(file));
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
