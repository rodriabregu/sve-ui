/*
	Prerender is set on the LAYOUT, not per page.

	It used to be one `+page.ts` per route, which meant a new route silently
	shipped without ever being server-rendered: `/browse` compiled fine, produced
	no HTML, and the SPA fallback covered it up. Every SSR problem in those
	components would have stayed invisible.
*/
export const prerender = true;
