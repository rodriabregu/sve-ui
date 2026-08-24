import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LinkPreviewFixture from './LinkPreviewFixture.svelte';

/**
 * LinkPreview is hover-only enrichment, and Bits makes two choices worth
 * pinning down because both surprise people:
 *
 *   1. The trigger is a real `<a href>` — so the destination is reachable
 *      without the card ever opening. That is what keeps the pattern usable for
 *      keyboard and touch users, who never see the card at all.
 *   2. Bits OVERRIDES the anchor's role to `button` with
 *      `aria-haspopup="dialog"`. A screen reader therefore announces "button",
 *      not "link", so the element does not advertise that it navigates.
 *
 * Point 2 is a real trade-off, not a detail. These tests fail loudly if either
 * behaviour changes, because the docs describe both.
 */
describe('LinkPreview', () => {
	it('renders the trigger as a real anchor with an href', () => {
		const { container } = render(LinkPreviewFixture, { props: {} });
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		expect(anchor).not.toBeNull();
		expect(anchor.getAttribute('href')).toBe('https://svelte.dev');
		expect(anchor.textContent?.trim()).toBe('Svelte');
	});

	it('is announced as a button, not a link — Bits overrides the role', () => {
		const { container } = render(LinkPreviewFixture, { props: {} });
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		expect(anchor.getAttribute('role')).toBe('button');
		expect(anchor.getAttribute('aria-haspopup')).toBe('dialog');
	});

	it('reports the closed state on the trigger', () => {
		const { container } = render(LinkPreviewFixture, { props: {} });
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		expect(anchor.getAttribute('aria-expanded')).toBe('false');
		expect(anchor.getAttribute('data-state')).toBe('closed');
	});

	it('keeps the card closed until hovered', () => {
		const { baseElement } = render(LinkPreviewFixture, { props: {} });
		expect(baseElement.querySelector('.sve-link-preview-content')).toBeNull();
	});

	it('leaves the trigger keyboard-focusable', () => {
		const { container } = render(LinkPreviewFixture, { props: {} });
		const anchor = container.querySelector('a') as HTMLAnchorElement;
		// A real <a href> is focusable with no tabindex management, so the
		// destination stays reachable even though the card never opens on focus.
		expect(anchor.getAttribute('tabindex')).not.toBe('-1');
	});
});
