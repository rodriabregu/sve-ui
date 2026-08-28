import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		// `200.html`, not `index.html`: the fallback would otherwise overwrite the
		// prerendered home page, and then the built output has no markup to inspect.
		adapter: adapter({ fallback: '200.html' })
	}
};
