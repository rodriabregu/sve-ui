import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Progress from '$lib/components/Progress/Progress.svelte';

const NAME = { 'aria-label': 'Upload' };

describe('Progress', () => {
	it('exposes role="progressbar" with an accessible name (Bits UI a11y)', () => {
		const { getByRole } = render(Progress, { props: { ...NAME } });
		expect(getByRole('progressbar', { name: 'Upload' })).toBeTruthy();
	});

	it('has base and default variant classes', () => {
		const { getByRole } = render(Progress, { props: { ...NAME } });
		const el = getByRole('progressbar');
		expect(el.classList.contains('sve-progress')).toBe(true);
		expect(el.classList.contains('sve-progress--md')).toBe(true);
		expect(el.classList.contains('sve-c-primary')).toBe(true);
	});

	it('applies size and color props', () => {
		const { getByRole } = render(Progress, {
			props: { ...NAME, size: 'lg' as const, color: 'success' as const }
		});
		const el = getByRole('progressbar');
		expect(el.classList.contains('sve-progress--lg')).toBe(true);
		expect(el.classList.contains('sve-c-success')).toBe(true);
	});

	it('reports the value range to assistive technology', () => {
		const { getByRole } = render(Progress, { props: { ...NAME, value: 40, max: 200 } });
		const el = getByRole('progressbar');
		expect(el.getAttribute('aria-valuenow')).toBe('40');
		expect(el.getAttribute('aria-valuemax')).toBe('200');
	});

	it('fills proportionally to value within min and max', () => {
		const { container } = render(Progress, { props: { ...NAME, value: 25, max: 100 } });
		const fill = container.querySelector('.sve-progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('25%');
	});

	it('accounts for a non-zero min when computing the fill', () => {
		const { container } = render(Progress, { props: { ...NAME, value: 150, min: 100, max: 200 } });
		const fill = container.querySelector('.sve-progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('50%');
	});

	it('clamps a value above max to 100%', () => {
		const { container } = render(Progress, { props: { ...NAME, value: 500, max: 100 } });
		const fill = container.querySelector('.sve-progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('100%');
	});

	it('clamps a value below min to 0%', () => {
		const { container } = render(Progress, { props: { ...NAME, value: -20, max: 100 } });
		const fill = container.querySelector('.sve-progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('0%');
	});

	it('marks a null value as indeterminate and sets no inline width', () => {
		const { getByRole, container } = render(Progress, { props: { ...NAME, value: null } });
		expect(getByRole('progressbar').hasAttribute('data-indeterminate')).toBe(true);
		const fill = container.querySelector('.sve-progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('');
	});

	it('is not indeterminate for a numeric value', () => {
		const { getByRole } = render(Progress, { props: { ...NAME, value: 0 } });
		expect(getByRole('progressbar').hasAttribute('data-indeterminate')).toBe(false);
	});

	it('accepts an extra class via the class prop', () => {
		const { getByRole } = render(Progress, { props: { ...NAME, class: 'extra-progress-class' } });
		expect(getByRole('progressbar').classList.contains('extra-progress-class')).toBe(true);
	});
});
