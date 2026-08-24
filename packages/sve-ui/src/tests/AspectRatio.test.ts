import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AspectRatio from '$lib/components/AspectRatio/AspectRatio.svelte';

describe('AspectRatio', () => {
	it('has base class sve-aspect-ratio', () => {
		const { container } = render(AspectRatio, { props: {} });
		expect(container.querySelector('.sve-aspect-ratio')).not.toBeNull();
	});

	it('carries the data-slot hook', () => {
		const { container } = render(AspectRatio, { props: {} });
		expect(container.querySelector('[data-slot="aspect-ratio"]')).not.toBeNull();
	});

	it('reserves the box for the default 1:1 ratio', () => {
		const { container } = render(AspectRatio, { props: {} });
		// Bits reserves space with padding-bottom on the wrapper it renders AROUND
		// our styled box, so the space exists before the media loads — that is what
		// prevents the layout shift. 1:1 -> 100%.
		const wrapper = container.querySelector('.sve-aspect-ratio')?.parentElement as HTMLElement;
		expect(wrapper.style.paddingBottom).toBe('100%');
	});

	it('translates a 16:9 ratio into the right reserved height', () => {
		const { container } = render(AspectRatio, { props: { ratio: 16 / 9 } });
		const wrapper = container.querySelector('.sve-aspect-ratio')?.parentElement as HTMLElement;
		expect(wrapper.style.paddingBottom).toBe('56.25%');
	});

	it('translates a 4:3 ratio into the right reserved height', () => {
		const { container } = render(AspectRatio, { props: { ratio: 4 / 3 } });
		const wrapper = container.querySelector('.sve-aspect-ratio')?.parentElement as HTMLElement;
		expect(wrapper.style.paddingBottom).toBe('75%');
	});

	it('adds no ARIA of its own — it is presentational', () => {
		const { container } = render(AspectRatio, { props: {} });
		const el = container.querySelector('.sve-aspect-ratio') as HTMLElement;
		expect(el.getAttribute('role')).toBeNull();
		expect(el.getAttribute('aria-label')).toBeNull();
	});

	it('accepts an extra class via the class prop', () => {
		const { container } = render(AspectRatio, { props: { class: 'extra-ratio-class' } });
		expect(container.querySelector('.extra-ratio-class')).not.toBeNull();
	});

	it('contains no Tailwind utility classes', () => {
		const { container } = render(AspectRatio, { props: {} });
		const classList = Array.from(container.querySelector('.sve-aspect-ratio')?.classList ?? []);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});
});
