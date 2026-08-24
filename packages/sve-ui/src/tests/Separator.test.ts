import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Separator from '$lib/components/Separator/Separator.svelte';

describe('Separator', () => {
	it('has base class sve-separator', () => {
		const { container } = render(Separator, { props: {} });
		const el = container.querySelector('.sve-separator');
		expect(el).not.toBeNull();
	});

	it('applies the horizontal orientation class by default', () => {
		const { container } = render(Separator, { props: {} });
		expect(container.querySelector('.sve-separator--horizontal')).not.toBeNull();
	});

	it('applies the vertical orientation class', () => {
		const { container } = render(Separator, { props: { orientation: 'vertical' as const } });
		expect(container.querySelector('.sve-separator--vertical')).not.toBeNull();
	});

	it('exposes role="separator" by default', () => {
		const { container } = render(Separator, { props: {} });
		const el = container.querySelector('.sve-separator');
		expect(el?.getAttribute('role')).toBe('separator');
	});

	it('reports aria-orientation when vertical', () => {
		const { container } = render(Separator, { props: { orientation: 'vertical' as const } });
		const el = container.querySelector('.sve-separator');
		expect(el?.getAttribute('aria-orientation')).toBe('vertical');
	});

	it('drops the separator role when decorative', () => {
		const { container } = render(Separator, { props: { decorative: true } });
		const el = container.querySelector('.sve-separator');
		expect(el?.getAttribute('role')).toBe('none');
	});

	it('accepts an extra class via the class prop', () => {
		const { container } = render(Separator, { props: { class: 'extra-separator-class' } });
		expect(container.querySelector('.extra-separator-class')).not.toBeNull();
	});

	it('contains no Tailwind utility classes', () => {
		const { container } = render(Separator, { props: {} });
		const classList = Array.from(container.querySelector('.sve-separator')?.classList ?? []);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});
});
