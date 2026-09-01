import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import EmptyFixture from './EmptyFixture.svelte';

describe('Empty', () => {
	it('renders its parts', () => {
		const { container, getByText } = render(EmptyFixture);
		expect(container.querySelector('.sve-empty')).not.toBeNull();
		expect(getByText('No projects yet')).toBeTruthy();
		expect(getByText('Projects you create will show up here.')).toBeTruthy();
		expect(container.querySelector('.sve-empty__actions')).not.toBeNull();
	});

	/*
		The media restates the title. In the accessibility tree it either announces
		nothing (an inline SVG with no title) or says the same thing twice, so it is
		hidden unconditionally — there is no prop to un-hide it.
	*/
	it('always hides the media from the accessibility tree', () => {
		const { container } = render(EmptyFixture);
		expect(container.querySelector('.sve-empty__media')!.getAttribute('aria-hidden')).toBe('true');
	});

	/*
		Off by default: an empty state present on first paint is just the page, and a
		live region there interrupts a screen reader reading the heading above it.
	*/
	it('is not a live region unless asked', () => {
		// `omitAnnounce` renders Root with the prop genuinely absent. Passing
		// `announce: false` here would assert the fixture's default, not the
		// component's — and a mutation flipping the component default to `true`
		// proved that by staying green.
		const { container } = render(EmptyFixture, { omitAnnounce: true });
		const root = container.querySelector('.sve-empty')!;
		expect(root.hasAttribute('role')).toBe(false);
		expect(root.hasAttribute('aria-live')).toBe(false);
	});

	it('becomes a polite status region with announce', () => {
		const { container } = render(EmptyFixture, { announce: true });
		const root = container.querySelector('.sve-empty')!;
		expect(root.getAttribute('role')).toBe('status');
		expect(root.getAttribute('aria-live')).toBe('polite');
	});

	/*
		A heading is not the safe default. An empty state inside a card or a table
		cell has no section of its own, and an <h3> there puts "No results" into the
		document outline where a user navigating by heading will land on it.
	*/
	it('renders the title as a paragraph until a level is given', () => {
		const { container } = render(EmptyFixture);
		expect(container.querySelector('p.sve-empty__title')).not.toBeNull();
		expect(container.querySelector('h2, h3, h4, h5, h6')).toBeNull();
	});

	it('renders the requested heading level', () => {
		const { container } = render(EmptyFixture, { level: 3 });
		expect(container.querySelector('h3.sve-empty__title')).not.toBeNull();
	});
});
