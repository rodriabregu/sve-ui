import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ToggleGroupFixture from './ToggleGroupFixture.svelte';
import ToggleGroupMultiFixture from './ToggleGroupMultiFixture.svelte';

/**
 * Bits gives the two modes DIFFERENT semantics, which is correct and worth
 * pinning down:
 *   type="single"   → items are role="radio" with aria-checked (pick one of a set)
 *   type="multiple" → items are buttons with aria-pressed  (independent toggles)
 * A refactor that flattened both to plain buttons would be an a11y regression,
 * so each mode is asserted on its own role.
 */
describe('ToggleGroup', () => {
	describe('single mode', () => {
		it('exposes a group containing one radio per item, each named', () => {
			const { getByRole } = render(ToggleGroupFixture, { props: {} });
			expect(getByRole('group', { name: 'Text alignment' })).toBeTruthy();
			expect(getByRole('radio', { name: 'Align left' })).toBeTruthy();
			expect(getByRole('radio', { name: 'Align center' })).toBeTruthy();
			expect(getByRole('radio', { name: 'Align right' })).toBeTruthy();
		});

		it('applies the root and item base classes', () => {
			const { container, getByRole } = render(ToggleGroupFixture, { props: {} });
			expect(container.querySelector('.sve-toggle-group')).not.toBeNull();
			expect(container.querySelector('.sve-toggle-group--md')).not.toBeNull();
			expect(
				getByRole('radio', { name: 'Align left' }).classList.contains('sve-toggle-group__item')
			).toBe(true);
		});

		it('marks the bound value as checked', () => {
			const { getByRole } = render(ToggleGroupFixture, { props: {} });
			expect(getByRole('radio', { name: 'Align left' }).getAttribute('aria-checked')).toBe('true');
			expect(getByRole('radio', { name: 'Align center' }).getAttribute('aria-checked')).toBe(
				'false'
			);
		});

		it('selects another item on click and reflects via bind:value', async () => {
			const { getByRole, getByTestId } = render(ToggleGroupFixture, { props: {} });
			await fireEvent.click(getByRole('radio', { name: 'Align center' }));

			await waitFor(() => {
				expect(getByRole('radio', { name: 'Align center' }).getAttribute('data-state')).toBe('on');
				expect(getByRole('radio', { name: 'Align left' }).getAttribute('data-state')).toBe('off');
				expect(getByTestId('value').textContent).toBe('center');
			});
		});

		it('keeps exactly one item active', async () => {
			const { getByRole, getAllByRole } = render(ToggleGroupFixture, { props: {} });
			await fireEvent.click(getByRole('radio', { name: 'Align right' }));

			await waitFor(() => {
				const on = getAllByRole('radio').filter((b) => b.getAttribute('data-state') === 'on');
				expect(on).toHaveLength(1);
			});
		});

		it('uses roving tabindex so the group is one tab stop', () => {
			const { getByRole } = render(ToggleGroupFixture, { props: {} });
			expect(getByRole('radio', { name: 'Align left' }).getAttribute('tabindex')).toBe('0');
			expect(getByRole('radio', { name: 'Align center' }).getAttribute('tabindex')).toBe('-1');
		});

		it('contains no Tailwind utility classes', () => {
			const { getByRole } = render(ToggleGroupFixture, { props: {} });
			const classList = Array.from(getByRole('radio', { name: 'Align left' }).classList);
			const hasTailwind = classList.some((cls) =>
				/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
					cls
				)
			);
			expect(hasTailwind).toBe(false);
		});
	});

	describe('multiple mode', () => {
		it('exposes buttons with aria-pressed instead of radios', () => {
			const { getByRole } = render(ToggleGroupMultiFixture, { props: {} });
			expect(getByRole('button', { name: 'Bold' }).getAttribute('aria-pressed')).toBe('true');
			expect(getByRole('button', { name: 'Italic' }).getAttribute('aria-pressed')).toBe('false');
		});

		it('allows several items active at once', async () => {
			const { getByRole, getByTestId } = render(ToggleGroupMultiFixture, { props: {} });
			await fireEvent.click(getByRole('button', { name: 'Italic' }));

			await waitFor(() => {
				expect(getByRole('button', { name: 'Bold' }).getAttribute('data-state')).toBe('on');
				expect(getByRole('button', { name: 'Italic' }).getAttribute('data-state')).toBe('on');
				expect(getByTestId('value').textContent).toBe('bold,italic');
			});
		});

		it('deselects an active item on click', async () => {
			const { getByRole, getByTestId } = render(ToggleGroupMultiFixture, { props: {} });
			await fireEvent.click(getByRole('button', { name: 'Bold' }));

			await waitFor(() => {
				expect(getByRole('button', { name: 'Bold' }).getAttribute('aria-pressed')).toBe('false');
				expect(getByTestId('value').textContent).toBe('');
			});
		});
	});
});
