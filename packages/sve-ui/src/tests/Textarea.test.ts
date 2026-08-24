import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Textarea from '$lib/components/Textarea/Textarea.svelte';
import TextareaFixture from './TextareaFixture.svelte';

describe('Textarea', () => {
	it('renders a <textarea> element', () => {
		const { container } = render(Textarea, { props: {} });
		expect(container.querySelector('textarea')).not.toBeNull();
	});

	it('has base class sve-textarea', () => {
		const { container } = render(Textarea, { props: {} });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea')).toBe(true);
	});

	it('applies outline variant by default', () => {
		const { container } = render(Textarea, { props: {} });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--outline')).toBe(true);
	});

	it('applies filled variant', () => {
		const { container } = render(Textarea, { props: { variant: 'filled' as const } });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--filled')).toBe(true);
	});

	it('applies md size by default', () => {
		const { container } = render(Textarea, { props: {} });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--md')).toBe(true);
	});

	it('applies sm size', () => {
		const { container } = render(Textarea, { props: { size: 'sm' as const } });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--sm')).toBe(true);
	});

	it('applies lg size', () => {
		const { container } = render(Textarea, { props: { size: 'lg' as const } });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--lg')).toBe(true);
	});

	it('defaults rows to 3', () => {
		const { container } = render(Textarea, { props: {} });
		const el = container.querySelector('textarea');
		expect(el?.rows).toBe(3);
	});

	it('forwards an explicit rows value', () => {
		const { container } = render(Textarea, { props: { rows: 8 } });
		const el = container.querySelector('textarea');
		expect(el?.rows).toBe(8);
	});

	it('applies vertical resize by default', () => {
		const { container } = render(Textarea, { props: {} });
		const el = container.querySelector('textarea') as HTMLTextAreaElement;
		expect(el.style.resize).toBe('vertical');
	});

	it('applies the resize prop', () => {
		const { container } = render(Textarea, { props: { resize: 'none' as const } });
		const el = container.querySelector('textarea') as HTMLTextAreaElement;
		expect(el.style.resize).toBe('none');
	});

	it('sets aria-invalid when invalid is true', () => {
		const { container } = render(Textarea, { props: { invalid: true } });
		const el = container.querySelector('textarea');
		expect(el?.getAttribute('aria-invalid')).toBe('true');
	});

	it('does not set aria-invalid when invalid is false', () => {
		const { container } = render(Textarea, { props: { invalid: false } });
		const el = container.querySelector('textarea');
		expect(el?.getAttribute('aria-invalid')).toBeNull();
	});

	it('applies invalid class when invalid is true', () => {
		const { container } = render(Textarea, { props: { invalid: true } });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('sve-textarea--invalid')).toBe(true);
	});

	it('forwards disabled attribute', () => {
		const { container } = render(Textarea, { props: { disabled: true } });
		const el = container.querySelector('textarea');
		expect(el?.disabled).toBe(true);
	});

	it('forwards placeholder attribute', () => {
		const { container } = render(Textarea, { props: { placeholder: 'Tell us more' } });
		const el = container.querySelector('textarea');
		expect(el?.placeholder).toBe('Tell us more');
	});

	it('accepts an extra class via the class prop', () => {
		const { container } = render(Textarea, { props: { class: 'extra-textarea-class' } });
		const el = container.querySelector('textarea');
		expect(el?.classList.contains('extra-textarea-class')).toBe(true);
	});

	it('reflects a provided value to the textarea', () => {
		const { container } = render(Textarea, { props: { value: 'hello' } });
		const el = container.querySelector('textarea');
		expect(el?.value).toBe('hello');
	});

	it('supports two-way bind:value (input updates the bound state)', async () => {
		const { container, getByTestId } = render(TextareaFixture, { props: {} });
		const el = container.querySelector('textarea') as HTMLTextAreaElement;
		await fireEvent.input(el, { target: { value: 'typed text' } });
		expect(getByTestId('bound').textContent).toBe('typed text');
	});

	it('contains no Tailwind utility classes', () => {
		const { container } = render(Textarea, {
			props: { variant: 'outline' as const, size: 'md' as const }
		});
		const el = container.querySelector('textarea');
		const classList = Array.from(el?.classList ?? []);
		const hasTailwind = classList.some((cls) =>
			/^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(
				cls
			)
		);
		expect(hasTailwind).toBe(false);
	});
});
