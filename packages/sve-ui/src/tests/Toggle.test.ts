import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ToggleFixture from './ToggleFixture.svelte';

describe('Toggle', () => {
	it('renders a button with an accessible name (Bits UI a11y)', () => {
		const { getByRole } = render(ToggleFixture, { props: {} });
		expect(getByRole('button', { name: 'Bold' })).toBeTruthy();
	});

	it('has base and default variant classes', () => {
		const { getByRole } = render(ToggleFixture, { props: {} });
		const el = getByRole('button', { name: 'Bold' });
		expect(el.classList.contains('sve-toggle')).toBe(true);
		expect(el.classList.contains('sve-toggle--outline')).toBe(true);
		expect(el.classList.contains('sve-toggle--md')).toBe(true);
	});

	it('applies the ghost variant', () => {
		const { getByRole } = render(ToggleFixture, { props: { variant: 'ghost' as const } });
		expect(getByRole('button', { name: 'Bold' }).classList.contains('sve-toggle--ghost')).toBe(
			true
		);
	});

	it('applies the sm size', () => {
		const { getByRole } = render(ToggleFixture, { props: { size: 'sm' as const } });
		expect(getByRole('button', { name: 'Bold' }).classList.contains('sve-toggle--sm')).toBe(true);
	});

	it('applies the lg size', () => {
		const { getByRole } = render(ToggleFixture, { props: { size: 'lg' as const } });
		expect(getByRole('button', { name: 'Bold' }).classList.contains('sve-toggle--lg')).toBe(true);
	});

	it('starts in the off state', () => {
		const { getByRole } = render(ToggleFixture, { props: {} });
		expect(getByRole('button', { name: 'Bold' }).getAttribute('data-state')).toBe('off');
	});

	it('toggles to on when clicked and reflects via bind:pressed', async () => {
		const { getByRole, getByTestId } = render(ToggleFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'Bold' }));

		await waitFor(() => {
			expect(getByRole('button', { name: 'Bold' }).getAttribute('data-state')).toBe('on');
			expect(getByTestId('pressed').textContent).toBe('true');
		});
	});

	it('exposes the pressed state to assistive technology', async () => {
		const { getByRole } = render(ToggleFixture, { props: {} });
		const el = getByRole('button', { name: 'Bold' });
		expect(el.getAttribute('aria-pressed')).toBe('false');
		await fireEvent.click(el);
		await waitFor(() => expect(el.getAttribute('aria-pressed')).toBe('true'));
	});

	it('does not toggle when disabled', async () => {
		const { getByRole, getByTestId } = render(ToggleFixture, { props: { disabled: true } });
		const el = getByRole('button', { name: 'Bold' });
		await fireEvent.click(el);
		expect(getByTestId('pressed').textContent).toBe('false');
	});

	it('contains no Tailwind utility classes', () => {
		const { getByRole } = render(ToggleFixture, { props: {} });
		const classList = Array.from(getByRole('button', { name: 'Bold' }).classList);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});
});
