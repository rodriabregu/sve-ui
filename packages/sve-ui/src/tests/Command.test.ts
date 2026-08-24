import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import CommandFixture from './CommandFixture.svelte';

/**
 * The value of Command over a plain input plus a filtered list is the filtering,
 * the scoring and the keyboard model — so that is what these assert, not just
 * that the parts render.
 */
describe('Command', () => {
	// Verified against the rendered DOM: Root's `label` renders a visually hidden
	// <label> that the INPUT references — it names the search field, not the list.
	// The list is named separately by `ariaLabel` on Command.List, which Bits
	// defaults to "Suggestions...". Both are asserted so the docs cannot drift
	// from the behaviour.
	it('names the search field from Root label', () => {
		const { getByRole } = render(CommandFixture, { props: {} });
		expect(getByRole('combobox', { name: 'Command palette' })).toBeTruthy();
	});

	it('names the list from the Bits ariaLabel default when none is given', () => {
		const { getByRole } = render(CommandFixture, { props: {} });
		expect(getByRole('listbox', { name: 'Suggestions...' })).toBeTruthy();
	});

	it('renders the search input wired as a combobox', () => {
		const { getByRole } = render(CommandFixture, { props: {} });
		const input = getByRole('combobox');
		expect(input.getAttribute('placeholder')).toBe('Type a command');
	});

	it('shows every item before any query', () => {
		const { container } = render(CommandFixture, { props: {} });
		expect(container.querySelectorAll('.sve-command__item').length).toBe(4);
	});

	it('filters items down to the query', async () => {
		const { container, getByRole } = render(CommandFixture, { props: {} });
		await fireEvent.input(getByRole('combobox'), { target: { value: 'open' } });

		await waitFor(() => {
			const visible = Array.from(container.querySelectorAll('.sve-command__item'));
			expect(visible.length).toBe(1);
			expect(visible[0].textContent?.trim()).toBe('Open file');
		});
	});

	it('matches on keywords that are not in the label', async () => {
		const { container, getByRole } = render(CommandFixture, { props: {} });
		// "trash" appears nowhere in "Delete" — only in its keywords.
		await fireEvent.input(getByRole('combobox'), { target: { value: 'trash' } });

		await waitFor(() => {
			const visible = Array.from(container.querySelectorAll('.sve-command__item'));
			expect(visible.length).toBe(1);
			expect(visible[0].textContent?.trim()).toBe('Delete');
		});
	});

	it('hides a group once the filter empties it', async () => {
		const { container, getByRole } = render(CommandFixture, { props: {} });
		await fireEvent.input(getByRole('combobox'), { target: { value: 'docs' } });

		await waitFor(() => {
			// Bits sets the `hidden` attribute on the emptied group rather than
			// unmounting it, so the heading goes with its items instead of stranding
			// a heading over nothing.
			const groups = Array.from(container.querySelectorAll('.sve-command__group'));
			const visible = groups.filter((g) => !g.hasAttribute('hidden'));
			expect(visible.length).toBe(1);
			expect(visible[0].textContent).toContain('Help');

			const hidden = groups.filter((g) => g.hasAttribute('hidden'));
			expect(hidden.length).toBe(1);
			expect(hidden[0].textContent).toContain('Actions');
		});
	});

	it('shows the empty state when nothing matches', async () => {
		const { container, getByRole, getByText } = render(CommandFixture, { props: {} });
		await fireEvent.input(getByRole('combobox'), { target: { value: 'zzzzzz' } });

		await waitFor(() => {
			expect(getByText('No results found.')).toBeTruthy();
			expect(container.querySelectorAll('.sve-command__item').length).toBe(0);
		});
	});

	it('hides the empty state while results exist', () => {
		const { queryByText } = render(CommandFixture, { props: {} });
		expect(queryByText('No results found.')).toBeNull();
	});

	it('reflects the query via bind:value on the input', async () => {
		const { getByRole, getByTestId } = render(CommandFixture, { props: {} });
		await fireEvent.input(getByRole('combobox'), { target: { value: 'new' } });
		await waitFor(() => expect(getByTestId('search').textContent).toBe('new'));
	});

	it('highlights an item, and keeps focus in the input', async () => {
		const { container, getByRole } = render(CommandFixture, { props: {} });
		const input = getByRole('combobox');
		input.focus();
		await fireEvent.keyDown(input, { key: 'ArrowDown' });

		await waitFor(() => {
			expect(container.querySelector('.sve-command__item[data-selected]')).not.toBeNull();
			// The point of the pattern: type and navigate without leaving the field.
			expect(document.activeElement).toBe(input);
		});
	});

	it('renders a separator between groups', () => {
		const { container } = render(CommandFixture, { props: {} });
		expect(container.querySelector('.sve-command__separator')).not.toBeNull();
	});

	// Regression: without a Command.Viewport, Bits has no element to point
	// aria-controls at, and the combobox is invalid ARIA (axe: aria-required-attr).
	// Found by running axe over a Command that omitted the Viewport.
	it('points the combobox at the viewport via aria-controls', () => {
		const { getByRole, container } = render(CommandFixture, { props: {} });
		const controls = getByRole('combobox').getAttribute('aria-controls');
		expect(controls).toBeTruthy();
		expect(container.querySelector(`#${controls}`)).not.toBeNull();
	});
});
