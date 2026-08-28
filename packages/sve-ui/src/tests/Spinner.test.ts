import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Spinner from '$lib/components/Spinner/Spinner.svelte';
import BusySpinnerFixture from './BusySpinnerFixture.svelte';

/**
 * The contract here CHANGED, reversing an earlier deliberate decision of mine,
 * and the old tests caught it — which is what they were for.
 *
 * `label` used to default to `'Loading'`, so every spinner was a live region
 * announcing itself on insertion. That was defensible when `Spinner` was the only
 * thing in the library that could say anything. Once `Busy` and `Button loading`
 * existed it stopped being defensible:
 *
 *   <Busy label="Loading projects"><Spinner /></Busy>
 *
 * produced TWO announcements for one event — the spinner's immediately, and
 * Busy's 400ms later — and the immediate one defeated the debounce that exists
 * to prevent exactly that. Measured by counting `role="status"` in the subtree.
 *
 * So a spinner is now decoration unless named. `'Loading'` said nothing useful
 * anyway: loading what?
 */
describe('Spinner', () => {
	it('is decoration when unnamed', () => {
		const { container } = render(Spinner, { props: {} });
		const el = container.querySelector('.sve-spinner')!;
		// Hidden rather than a silent status: a status region with nothing to say
		// still occupies the accessibility tree.
		expect(el.getAttribute('aria-hidden')).toBe('true');
		expect(container.querySelector('[role="status"]')).toBeNull();
	});

	it('becomes a named status region when given a label', () => {
		const { container } = render(Spinner, { props: { label: 'Loading data' } });
		const el = container.querySelector('[role="status"]')!;
		expect(el).not.toBeNull();
		expect(el.getAttribute('aria-label')).toBe('Loading data');
		expect(el.hasAttribute('aria-hidden')).toBe(false);
	});

	it('does not announce twice inside a Busy region', () => {
		const { container } = render(BusySpinnerFixture);
		// THE case that forced the change. One event, one announcement.
		expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
		expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);
	});

	it('keeps its classes either way', () => {
		for (const props of [{}, { label: 'Loading' }]) {
			const { container, unmount } = render(Spinner, { props });
			expect(container.querySelector('.sve-spinner')).not.toBeNull();
			unmount();
		}
	});

	it('applies size and colour classes', () => {
		const sm = render(Spinner, { props: { size: 'sm' as const } });
		expect(sm.container.querySelector('.sve-spinner--sm')).not.toBeNull();
		sm.unmount();

		const lg = render(Spinner, { props: { size: 'lg' as const } });
		expect(lg.container.querySelector('.sve-spinner--lg')).not.toBeNull();
		lg.unmount();

		const primary = render(Spinner, { props: { color: 'primary' as const } });
		expect(primary.container.querySelector('.sve-c-primary')).not.toBeNull();
	});

	it('renders no sr-only span: the label alone carries the announcement', () => {
		const { container } = render(Spinner, { props: { label: 'Loading' } });
		expect(container.querySelector('.sve-sr-only')).toBeNull();
	});

	it('contains no Tailwind utility classes', () => {
		const { container } = render(Spinner, { props: {} });
		const classList = Array.from(container.querySelector('.sve-spinner')?.classList ?? []);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});
});
