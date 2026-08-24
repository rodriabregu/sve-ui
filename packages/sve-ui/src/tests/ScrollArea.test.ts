import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ScrollAreaFixture from './ScrollAreaFixture.svelte';

/**
 * Verified against the rendered DOM: with the default `type="hover"` Bits does
 * not mount the scrollbar at all until the pointer enters. That is worth
 * pinning down, because it is exactly the trade-off the docs warn about — a
 * scrollbar that does not exist gives no hint that more content does.
 */
describe('ScrollArea', () => {
	it('renders the root and viewport', () => {
		const { container } = render(ScrollAreaFixture, { props: {} });
		expect(container.querySelector('.sve-scroll-area')).not.toBeNull();
		expect(container.querySelector('.sve-scroll-area__viewport')).not.toBeNull();
	});

	it('does not mount the scrollbar under the default hover type', () => {
		const { container } = render(ScrollAreaFixture, { props: {} });
		expect(container.querySelector('.sve-scroll-area__scrollbar')).toBeNull();
	});

	it('mounts the scrollbar under type="always"', () => {
		const { container } = render(ScrollAreaFixture, { props: { type: 'always' as const } });
		expect(container.querySelector('.sve-scroll-area__scrollbar')).not.toBeNull();
	});

	it('computes the thumb size on the scrollbar even before the thumb mounts', () => {
		const { container } = render(ScrollAreaFixture, { props: { type: 'always' as const } });
		const bar = container.querySelector('.sve-scroll-area__scrollbar') as HTMLElement;
		// Bits publishes the measured size as a custom property; the Thumb element
		// itself needs real layout, so it does not mount in jsdom (see the todo).
		expect(bar.style.getPropertyValue('--bits-scroll-area-thumb-height')).not.toBe('');
	});

	it('keeps the viewport a real scroll container', () => {
		const { container } = render(ScrollAreaFixture, { props: {} });
		const viewport = container.querySelector('.sve-scroll-area__viewport') as HTMLElement;
		// Native overflow, so wheel, touch and keyboard scrolling all keep working.
		expect(viewport.style.overflowY).toBe('scroll');
	});

	it('keeps every row in the DOM — it is not virtualised', () => {
		const { container } = render(ScrollAreaFixture, { props: {} });
		const rows = container.querySelectorAll('p');
		expect(rows.length).toBe(20);
		expect(rows[0].textContent).toBe('Row 0');
		expect(rows[19].textContent).toBe('Row 19');
	});

	it('marks the scrollbar orientation so the CSS sizes the right axis', () => {
		const { container } = render(ScrollAreaFixture, { props: { type: 'always' as const } });
		const bar = container.querySelector('.sve-scroll-area__scrollbar') as HTMLElement;
		expect(bar.getAttribute('data-orientation')).toBe('vertical');
	});

	it('carries the data-slot hooks on every mounted part', () => {
		const { container } = render(ScrollAreaFixture, { props: { type: 'always' as const } });
		for (const slot of ['scroll-area', 'scroll-area-viewport', 'scroll-area-scrollbar']) {
			expect(container.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
		}
	});

	it('adds no ARIA of its own — the scroll behaviour stays native', () => {
		const { container } = render(ScrollAreaFixture, { props: {} });
		const root = container.querySelector('.sve-scroll-area') as HTMLElement;
		expect(root.getAttribute('role')).toBeNull();
	});

	// The Thumb element requires real layout and a ResizeObserver measurement, so
	// jsdom never mounts it even under type="always". Its size IS computed (see
	// the test above); the rendered element is a browser-mode concern.
	it.todo('thumb renders and tracks scroll position (needs Playwright e2e)');
	it.todo('hover type reveals the scrollbar on pointer enter (needs Playwright e2e)');
});
