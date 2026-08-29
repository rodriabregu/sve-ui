import { componentGroups } from '$lib/docs/registry';
import { guideGroups } from '$lib/docs/guides';
import { SITE_URL } from '$lib/seo/site';

/**
 * /sitemap.xml — generated from the component registry and guide nav, exactly
 * like /llms.txt, so a new component page is discoverable by search engines the
 * moment it is registered. A hand-maintained list would drift on the first PR.
 */
export const prerender = true;

/** Only pages that actually render. `ready: false` components are 404s. */
function urls(): string[] {
	const components = componentGroups.flatMap((g) =>
		g.items.filter((it) => it.ready).map((it) => `/components/${it.slug}`)
	);
	const guides = guideGroups.flatMap((g) => g.items.map((it) => it.href));

	return ['/', '/components', ...guides, ...components, '/playground'];
}

export function GET() {
	// Prerendered, so this is the build timestamp — which for this site is the
	// deploy that followed the last content or release change.
	const lastmod = new Date().toISOString();

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls()
	.map(
		(path) =>
			`\t<url>\n\t\t<loc>${SITE_URL}${path === '/' ? '/' : path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
}
