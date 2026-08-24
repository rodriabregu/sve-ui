import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Stack from '$lib/components/Stack/Stack.svelte';
import Flex from '$lib/components/Flex/Flex.svelte';
import StackFlexFixture from './StackFlexFixture.svelte';

/**
 * These are the two components most at risk of quietly becoming a styling
 * escape hatch — the pre-1.0 `Box` in this library did exactly that. So the
 * tests assert the CONSTRAINTS as much as the behaviour: the gap is bound to the
 * spacing scale, and no margin/padding/width prop leaks in.
 */
describe('Stack', () => {
	it('renders a column flex container', () => {
		const { container } = render(Stack, { props: {} });
		const el = container.querySelector('.sve-stack') as HTMLElement;
		expect(el).not.toBeNull();
		expect(el.dataset.slot).toBe('stack');
	});

	it('binds the gap to a spacing token rather than a raw length', () => {
		const { container } = render(Stack, { props: { gap: 6 } });
		const el = container.querySelector('.sve-stack') as HTMLElement;
		// The token indirection is what keeps rhythm consistent across the app.
		expect(el.style.gap).toBe('var(--sve-space-6)');
	});

	it('defaults the gap to token 4', () => {
		const { container } = render(Stack, { props: {} });
		expect((container.querySelector('.sve-stack') as HTMLElement).style.gap).toBe(
			'var(--sve-space-4)'
		);
	});

	it('defaults to stretch, so stacked fields fill the width', () => {
		const { container } = render(Stack, { props: {} });
		expect(container.querySelector('.sve-stack--stretch')).not.toBeNull();
	});

	it('applies the align prop', () => {
		const { container } = render(Stack, { props: { align: 'center' as const } });
		expect(container.querySelector('.sve-stack--center')).not.toBeNull();
	});

	it('renders the element named by `as`, keeping the markup semantic', () => {
		const { container } = render(Stack, { props: { as: 'ul' as const } });
		const el = container.querySelector('.sve-stack') as HTMLElement;
		expect(el.tagName).toBe('UL');
	});

	it('sets no margin, padding or width of its own', () => {
		const { container } = render(Stack, { props: { gap: 8 } });
		const el = container.querySelector('.sve-stack') as HTMLElement;
		// Margin is the PARENT's business — a component that sets its own outer
		// margin cannot be reused in a layout that spaces things differently.
		for (const prop of ['margin', 'marginTop', 'padding', 'width', 'height'] as const) {
			expect(el.style[prop]).toBe('');
		}
	});

	it('forwards arbitrary attributes', () => {
		const { getByTestId } = render(StackFlexFixture, { props: {} });
		expect(getByTestId('stack').tagName).toBe('UL');
	});
});

describe('Flex', () => {
	it('renders a flex container with row as the default direction', () => {
		const { container } = render(Flex, { props: {} });
		expect(container.querySelector('.sve-flex--row')).not.toBeNull();
	});

	it('centres on the cross axis by default', () => {
		const { container } = render(Flex, { props: {} });
		// A row of mixed-height things almost always wants centring; the flex
		// default of stretch visibly breaks it.
		expect(container.querySelector('.sve-flex--align-center')).not.toBeNull();
	});

	it('binds the gap to a spacing token', () => {
		const { container } = render(Flex, { props: { gap: 12 } });
		expect((container.querySelector('.sve-flex') as HTMLElement).style.gap).toBe(
			'var(--sve-space-12)'
		);
	});

	it('applies direction, align and justify', () => {
		const { container } = render(Flex, {
			props: {
				direction: 'column-reverse' as const,
				align: 'baseline' as const,
				justify: 'between' as const
			}
		});
		expect(container.querySelector('.sve-flex--column-reverse')).not.toBeNull();
		expect(container.querySelector('.sve-flex--align-baseline')).not.toBeNull();
		expect(container.querySelector('.sve-flex--justify-between')).not.toBeNull();
	});

	it('does not wrap unless asked', () => {
		const { container } = render(Flex, { props: {} });
		expect(container.querySelector('.sve-flex--wrap')).toBeNull();
	});

	it('wraps when wrap is set', () => {
		const { container } = render(Flex, { props: { wrap: true } });
		expect(container.querySelector('.sve-flex--wrap')).not.toBeNull();
	});

	it('renders the element named by `as`', () => {
		const { getByTestId } = render(StackFlexFixture, { props: {} });
		expect(getByTestId('flex').tagName).toBe('NAV');
	});

	it('sets no margin, padding or width of its own', () => {
		const { container } = render(Flex, { props: { gap: 2 } });
		const el = container.querySelector('.sve-flex') as HTMLElement;
		for (const prop of ['margin', 'marginTop', 'padding', 'width', 'height'] as const) {
			expect(el.style[prop]).toBe('');
		}
	});

	it('contains no Tailwind utility classes', () => {
		const { container } = render(Flex, { props: {} });
		const classList = Array.from(container.querySelector('.sve-flex')?.classList ?? []);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|gap-|items-|justify-)/.test(cls)
		);
		expect(hasTailwind).toBe(false);
	});
});
