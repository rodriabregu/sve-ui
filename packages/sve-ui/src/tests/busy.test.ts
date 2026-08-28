import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import BusyFixture from './BusyFixture.svelte';

/**
 * This component exists because a real consumer needed it and the library had
 * nothing. Writing the example app, the loading branch had no way to express
 * "this region is loading": `Spinner` is decorative, and `aria-busy` appeared in
 * two components out of sixty. A screen reader user got silence for the length of
 * the request and then content appearing with no warning.
 *
 * Internal dogfooding never surfaced it, because the docs site renders
 * everything synchronously from a static registry.
 */
describe('Busy', () => {
	afterEach(() => vi.useRealTimers());

	it('marks the region busy while loading', () => {
		const { container } = render(BusyFixture, { busy: true });
		// aria-busy lets a screen reader hold off reading a half-built region.
		expect(container.querySelector('.sve-busy')!.getAttribute('aria-busy')).toBe('true');
	});

	it('drops aria-busy when finished', () => {
		const { container } = render(BusyFixture, { busy: false });
		expect(container.querySelector('.sve-busy')!.hasAttribute('aria-busy')).toBe(false);
	});

	it('renders its children throughout', () => {
		const { getByText } = render(BusyFixture, { busy: true });
		expect(getByText('content')).toBeTruthy();
	});

	it('is a polite atomic live region', () => {
		const { getByRole } = render(BusyFixture);
		const status = getByRole('status');
		expect(status.getAttribute('aria-live')).toBe('polite');
		expect(status.getAttribute('aria-atomic')).toBe('true');
	});

	it('says nothing for a wait too short to notice', () => {
		vi.useFakeTimers();
		const { getByRole } = render(BusyFixture, { busy: true, delay: 400 });

		vi.advanceTimersByTime(300);
		// A response that arrives in 300ms does not need narrating; announcing it
		// just talks over the user.
		expect(getByRole('status').textContent?.trim()).toBe('');
	});

	it('announces the wait once it is long enough to notice', async () => {
		const { getByRole } = render(BusyFixture, { busy: true, delay: 10 });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('Loading projects'));
	});

	it('announces what arrived, not that something did', async () => {
		const { getByRole, rerender } = render(BusyFixture, { busy: true, delay: 10 });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('Loading projects'));

		await rerender({ busy: false, delay: 10 });
		// "3 projects" rather than "done": the arrival of content is the part the
		// user cannot see coming, and the count is the answer they wanted.
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('3 projects'));
	});

	it('reports completion even when the wait was never announced', async () => {
		const { getByRole, rerender } = render(BusyFixture, { busy: true, delay: 10_000 });
		expect(getByRole('status').textContent?.trim()).toBe('');

		await rerender({ busy: false, delay: 10_000 });
		// The wait was too short to narrate, but the content arriving still is.
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('3 projects'));
	});

	it('stays silent on completion when given no doneLabel', async () => {
		const { getByRole, rerender } = render(BusyFixture, { busy: true, delay: 10, noDone: true });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('Loading projects'));

		await rerender({ busy: false, delay: 10, noDone: true });
		// Documented as the wrong choice — the user is told it is loading and never
		// told it finished — but it is the caller's to make.
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe(''));
	});
});
