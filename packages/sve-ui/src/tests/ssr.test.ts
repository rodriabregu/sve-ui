// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import A11yFixture from './A11yFixture.svelte';
import FieldFixture from './FieldFixture.svelte';

/**
 * Every component, rendered on a server.
 *
 * SvelteKit renders on the server by default, and until this file existed not
 * one component had ever been server-rendered in a test — only Toast, and only
 * to prove its queue refuses to run there. That is the same blind spot that
 * produced the symptom in issue #41: the page is served, looks right, and
 * something does not work.
 *
 * It reuses the axe fixture rather than a new one on purpose. That fixture
 * already composes all ~58 components with the props and ancestors each needs,
 * so it stays correct as the catalog grows instead of drifting into a second,
 * staler list.
 *
 * A node environment, not jsdom: with a `window` present the components take
 * their browser path and this proves nothing.
 */
describe('server-side rendering', () => {
	it('has no window, so this really is the server path', () => {
		// Guards against the file silently regaining jsdom, which would make
		// every assertion below vacuous.
		expect(typeof window).toBe('undefined');
		expect(typeof document).toBe('undefined');
	});

	it('renders every component without throwing', () => {
		// The assertion IS that this does not throw. A component reaching for
		// `window`, `document` or `matchMedia` during setup fails here.
		const { body } = render(A11yFixture);
		expect(body.length).toBeGreaterThan(1000);
	});

	it('emits no literal "undefined" or "[object Object]" into the markup', () => {
		const { body } = render(A11yFixture);
		// The classic SSR leak: an unset prop interpolated into an attribute or a
		// text node. It renders, it validates, and the user reads `undefined`.
		expect(body).not.toContain('>undefined<');
		expect(body).not.toContain('="undefined"');
		expect(body).not.toContain('[object Object]');
	});

	it('emits no NaN', () => {
		const { body } = render(A11yFixture);
		// Arithmetic on a prop that arrived undefined. Shows up in aria-valuenow
		// and width styles, where it silently breaks the value rather than the page.
		expect(body).not.toContain('NaN');
	});

	it('server-renders the landmarks and names, not just the boxes', () => {
		const { body } = render(A11yFixture);
		// Accessible names are the thing most likely to be wired up only on the
		// client. If they are absent from the server HTML, the first paint and
		// anything that reads it without JS are unlabelled.
		expect(body).toContain('<aside');
		expect(body).toContain('<table');
		expect(body).toContain('aria-label');
		expect(body).toContain('aria-live');
		expect(body).toContain('scope="row"');
	});

	it('renders the head content it declares', () => {
		const { head } = render(A11yFixture);
		// `head` must at least be a string: a component throwing while building
		// head content is a failure mode invisible in the body.
		expect(typeof head).toBe('string');
	});
});

/**
 * Field's whole shape follows from this file.
 *
 * The control arrives through a snippet, and `description`/`error` are props
 * rather than sibling components, because `aria-describedby` must name only ids
 * that exist and that has to hold in the SERVER html — not be repaired later by
 * an effect. A parts-based `<Field.Description>` could only register itself
 * after the control had already rendered, so the first paint would either miss
 * the reference or point at an id that was not there yet.
 *
 * If these tests ever fail, the design argument is wrong and the API should
 * change, not the tests.
 */
describe('Field on the server', () => {
	it('resolves every aria-describedby id in the server html', () => {
		const { body } = render(FieldFixture, {
			props: { description: 'We never share it.', error: 'Enter a valid email address.' }
		});

		const described = body.match(/aria-describedby="([^"]+)"/);
		expect(described).not.toBeNull();

		const ids = described![1].split(' ');
		expect(ids).toHaveLength(2);
		for (const id of ids) {
			// Present in the very first byte of html the browser receives, before any
			// JavaScript has run.
			expect(body).toContain(`id="${id}"`);
		}
	});

	it('ties the label to the control in the server html', () => {
		const { body } = render(FieldFixture, { props: { label: 'Email' } });
		const forAttr = body.match(/for="([^"]+)"/);
		expect(forAttr).not.toBeNull();
		expect(body).toContain(`id="${forAttr![1]}"`);
	});

	it('omits aria-describedby on the server when there is nothing to describe', () => {
		const { body } = render(FieldFixture, {});
		// A dangling or empty reference is invalid and announces nothing, so it must
		// be absent rather than blank — on the server too.
		expect(body).not.toContain('aria-describedby');
	});

	it('marks invalid on the server, derived from the error', () => {
		const { body } = render(FieldFixture, { props: { error: 'Required.' } });
		expect(body).toContain('aria-invalid="true"');
	});
});
