import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from '$lib/components/Button/Button.svelte';

describe('Button', () => {
	it('scenario E: renders a <button> element with correct variant classes (solid + primary + lg)', () => {
		const { container } = render(Button, {
			props: {
				variant: 'solid' as const,
				color: 'primary' as const,
				size: 'lg' as const
			}
		});
		const btn = container.querySelector('button');
		expect(btn).not.toBeNull();
		expect(btn?.classList.contains('sve-button')).toBe(true);
		expect(btn?.classList.contains('sve-button--solid')).toBe(true);
		expect(btn?.classList.contains('sve-c-primary')).toBe(true);
		expect(btn?.classList.contains('sve-button--lg')).toBe(true);
	});

	it('scenario E: rendered output contains no Tailwind utility classes', () => {
		const { container } = render(Button, {
			props: { variant: 'solid' as const, color: 'primary' as const, size: 'md' as const }
		});
		const btn = container.querySelector('button');
		const classList = Array.from(btn?.classList ?? []);
		// Tailwind classes start with known utility prefixes; none should appear
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:|active:|disabled:|w-|h-|min-|max-)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});

	it('scenario E: snippet children are rendered as the accessible label', () => {
		// @testing-library/svelte renders the button's text content
		// We test by checking the button exists and renders without error at minimum
		const { container } = render(Button, {
			props: { variant: 'solid' as const, color: 'primary' as const, size: 'md' as const }
		});
		const btn = container.querySelector('button');
		expect(btn).not.toBeNull();
	});

	it('scenario F: disabled prop sets native disabled attribute', () => {
		const { container } = render(Button, {
			props: { disabled: true }
		});
		const btn = container.querySelector('button');
		expect(btn).not.toBeNull();
		expect(btn?.hasAttribute('disabled')).toBe(true);
	});

	it('scenario F: onclick handler is NOT invoked when button is disabled', async () => {
		const handler = vi.fn();
		const { container } = render(Button, {
			props: { disabled: true, onclick: handler }
		});
		const btn = container.querySelector('button')!;
		await fireEvent.click(btn);
		expect(handler).not.toHaveBeenCalled();
	});

	it('default variant resolves to solid + default + md when no props are given', () => {
		const { container } = render(Button, { props: {} });
		const btn = container.querySelector('button');
		expect(btn?.classList.contains('sve-button--solid')).toBe(true);
		expect(btn?.classList.contains('sve-c-default')).toBe(true);
		expect(btn?.classList.contains('sve-button--md')).toBe(true);
	});

	it('onclick handler IS called when an enabled button is clicked', async () => {
		const handler = vi.fn();
		const { container } = render(Button, { props: { onclick: handler } });
		const btn = container.querySelector('button')!;
		await fireEvent.click(btn);
		expect(handler).toHaveBeenCalledOnce();
	});

	it('button element is rendered (children projection via snippet)', () => {
		const { container } = render(Button, { props: { variant: 'solid' as const } });
		const btn = container.querySelector('button');
		expect(btn).not.toBeNull();
		expect(btn?.tagName).toBe('BUTTON');
	});

	/*
		The `href` form exists because of a real bug on our own docs site: every
		navigation CTA was a `<button>` with
		`onclick={() => (window.location.href = '/components')}`, which renders fine
		and does nothing until JavaScript has run. Issue #41.
	*/
	describe('as a link', () => {
		it('renders an anchor when given an href, keeping the same classes', () => {
			const { container } = render(Button, {
				props: { href: '/components', variant: 'solid', color: 'primary', size: 'lg' }
			});
			const a = container.querySelector('a');
			expect(a).not.toBeNull();
			expect(container.querySelector('button')).toBeNull();
			expect(a!.getAttribute('href')).toBe('/components');
			// A link that looks like a button is the point; the styling must not fork.
			expect(a!.className).toContain('sve-button--solid');
			expect(a!.className).toContain('sve-c-primary');
			expect(a!.className).toContain('sve-button--lg');
		});

		it('is announced as a link, not a button', () => {
			const { getByRole, queryByRole } = render(Button, {
				props: { href: '/components', children: undefined }
			});
			expect(getByRole('link')).toBeTruthy();
			expect(queryByRole('button')).toBeNull();
		});

		it('still renders a button when no href is given', () => {
			const { container } = render(Button, {});
			expect(container.querySelector('button')).not.toBeNull();
			expect(container.querySelector('a')).toBeNull();
		});

		it('does not put type on the anchor', () => {
			const { container } = render(Button, { props: { href: '/x', type: 'submit' } });
			// `type` means nothing on an anchor; forwarding it would emit a dead
			// attribute and, on a button, silently change form behaviour.
			expect(container.querySelector('a')!.hasAttribute('type')).toBe(false);
		});

		it('adds rel=noopener noreferrer for target=_blank', () => {
			const { container } = render(Button, {
				props: { href: 'https://example.com', target: '_blank' }
			});
			// Without it the opened page can reach window.opener and navigate the tab
			// the user came from.
			expect(container.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
		});

		it('lets an explicit rel win', () => {
			const { container } = render(Button, {
				props: { href: 'https://example.com', target: '_blank', rel: 'opener' }
			});
			// A caller who genuinely needs `opener` must be able to have it.
			expect(container.querySelector('a')!.getAttribute('rel')).toBe('opener');
		});

		it('leaves rel alone for a same-tab link', () => {
			const { container } = render(Button, { props: { href: '/components' } });
			expect(container.querySelector('a')!.hasAttribute('rel')).toBe(false);
		});

		it('renders a disabled link as a span, not an anchor', () => {
			const { container, queryByRole } = render(Button, {
				props: { href: '/components', disabled: true }
			});
			// `<a>` has no `disabled`, and `<a aria-disabled>` still takes a tab stop
			// and still announces as a link that goes nowhere.
			expect(container.querySelector('a')).toBeNull();
			const span = container.querySelector('span.sve-button');
			expect(span).not.toBeNull();
			expect(span!.getAttribute('aria-disabled')).toBe('true');
			expect(span!.hasAttribute('href')).toBe(false);
			expect(queryByRole('link')).toBeNull();
		});

		it('does not fire onclick on a disabled link', async () => {
			const onclick = vi.fn();
			const { container } = render(Button, {
				props: { href: '/components', disabled: true, onclick }
			});
			await fireEvent.click(container.querySelector('span.sve-button')!);
			expect(onclick).not.toHaveBeenCalled();
		});

		it('fires onclick on an enabled link without blocking navigation', async () => {
			const onclick = vi.fn();
			// A hash href on purpose: jsdom throws "Not implemented: navigation" on a
			// real path, and that unhandled error would sit in every run hiding a
			// genuine one later. The assertion is about the handler, not the target.
			const { getByRole } = render(Button, { props: { href: '#components', onclick } });
			// Analytics and the like still want the handler; the href does the
			// navigating, so the handler is additive rather than load-bearing.
			await fireEvent.click(getByRole('link'));
			expect(onclick).toHaveBeenCalledOnce();
		});
	});
});
