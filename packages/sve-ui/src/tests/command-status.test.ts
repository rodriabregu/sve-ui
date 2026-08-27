import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import CommandStatusFixture from './CommandStatusFixture.svelte';

/**
 * Bits filters the Command list internally and announces nothing, so the list
 * shrank in silence: a screen reader user typed and never learned how many
 * results they had. It reports the count through `onStateChange` and exposes it
 * nowhere else, so `Command.Root` intercepts that hook and publishes it.
 *
 * The debounce is the part worth testing. Without it, typing "banana" fires six
 * announcements and the user hears a torrent instead of an answer.
 */
describe('Command.Status', () => {
	afterEach(() => vi.useRealTimers());

	it('is a polite, atomic live region', () => {
		const { getByRole } = render(CommandStatusFixture);
		const status = getByRole('status');
		expect(status.getAttribute('aria-live')).toBe('polite');
		// Atomic, so the count is read as one message rather than a changed word.
		expect(status.getAttribute('aria-atomic')).toBe('true');
	});

	it('says nothing before the user has searched', () => {
		const { getByRole } = render(CommandStatusFixture);
		// The count of an unfiltered list is not news when a palette opens.
		expect(getByRole('status').textContent?.trim()).toBe('');
	});

	it('announces the count once typing settles', async () => {
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, { delay: 20 });
		await fireEvent.input(getByPlaceholderText('Search'), { target: { value: 'ap' } });

		// apple + apricot
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('2 results'));
	});

	it('uses the singular for one result', async () => {
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, { delay: 20 });
		await fireEvent.input(getByPlaceholderText('Search'), { target: { value: 'banana' } });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('1 result'));
	});

	it('announces no results rather than zero', async () => {
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, { delay: 20 });
		await fireEvent.input(getByPlaceholderText('Search'), { target: { value: 'zzzz' } });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('No results'));
	});

	it('takes a translated label, because a count needs the app language', async () => {
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, {
			delay: 20,
			label: (n: number) => `${n} resultados`
		});
		await fireEvent.input(getByPlaceholderText('Search'), { target: { value: 'ap' } });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('2 resultados'));
	});

	it('does not announce mid-typing', async () => {
		vi.useFakeTimers();
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, { delay: 500 });
		const input = getByPlaceholderText('Search');

		await fireEvent.input(input, { target: { value: 'a' } });
		vi.advanceTimersByTime(200);
		await fireEvent.input(input, { target: { value: 'ap' } });
		vi.advanceTimersByTime(200);

		// 400ms in, two keystrokes deep, and still silent: each keystroke restarts
		// the wait, so the user hears one answer instead of one per character.
		expect(getByRole('status').textContent?.trim()).toBe('');
	});

	it("still calls the caller's own onStateChange", async () => {
		const onStateChange = vi.fn();
		const { getByPlaceholderText } = render(CommandStatusFixture, { delay: 20, onStateChange });
		await fireEvent.input(getByPlaceholderText('Search'), { target: { value: 'ap' } });

		// Intercepting the hook must not steal it.
		await waitFor(() => expect(onStateChange).toHaveBeenCalled());
	});

	it('falls silent when the search is cleared', async () => {
		const { getByRole, getByPlaceholderText } = render(CommandStatusFixture, { delay: 20 });
		const input = getByPlaceholderText('Search');

		await fireEvent.input(input, { target: { value: 'ap' } });
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe('2 results'));

		await fireEvent.input(input, { target: { value: '' } });
		// Back to an unfiltered list, which is not a result count worth reporting.
		await waitFor(() => expect(getByRole('status').textContent?.trim()).toBe(''));
	});
});
