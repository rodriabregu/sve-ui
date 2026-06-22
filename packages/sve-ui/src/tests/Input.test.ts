import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Input from '$lib/components/Input/Input.svelte';
import InputFixture from './InputFixture.svelte';

describe('Input', () => {
  it('renders an <input> element', () => {
    const { container } = render(Input, { props: {} });
    const el = container.querySelector('input');
    expect(el).not.toBeNull();
  });

  it('has base class sve-input', () => {
    const { container } = render(Input, { props: {} });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input')).toBe(true);
  });

  it('applies outline variant by default', () => {
    const { container } = render(Input, { props: {} });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--outline')).toBe(true);
  });

  it('applies filled variant', () => {
    const { container } = render(Input, { props: { variant: 'filled' as const } });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--filled')).toBe(true);
  });

  it('applies md size by default', () => {
    const { container } = render(Input, { props: {} });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--md')).toBe(true);
  });

  it('applies sm size', () => {
    const { container } = render(Input, { props: { size: 'sm' as const } });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--sm')).toBe(true);
  });

  it('applies lg size', () => {
    const { container } = render(Input, { props: { size: 'lg' as const } });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--lg')).toBe(true);
  });

  it('sets aria-invalid when invalid is true', () => {
    const { container } = render(Input, { props: { invalid: true } });
    const el = container.querySelector('input');
    expect(el?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when invalid is false', () => {
    const { container } = render(Input, { props: { invalid: false } });
    const el = container.querySelector('input');
    expect(el?.getAttribute('aria-invalid')).toBeNull();
  });

  it('applies invalid class when invalid is true', () => {
    const { container } = render(Input, { props: { invalid: true } });
    const el = container.querySelector('input');
    expect(el?.classList.contains('sve-input--invalid')).toBe(true);
  });

  it('forwards disabled attribute', () => {
    const { container } = render(Input, { props: { disabled: true } });
    const el = container.querySelector('input');
    expect(el?.disabled).toBe(true);
  });

  it('forwards type attribute', () => {
    const { container } = render(Input, { props: { type: 'email' } });
    const el = container.querySelector('input');
    expect(el?.type).toBe('email');
  });

  it('forwards placeholder attribute', () => {
    const { container } = render(Input, { props: { placeholder: 'Enter text' } });
    const el = container.querySelector('input');
    expect(el?.placeholder).toBe('Enter text');
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(Input, { props: { class: 'extra-input-class' } });
    const el = container.querySelector('input');
    expect(el?.classList.contains('extra-input-class')).toBe(true);
  });

  it('reflects a provided value to the input', () => {
    const { container } = render(Input, { props: { value: 'hello' } });
    const el = container.querySelector('input');
    expect(el?.value).toBe('hello');
  });

  it('supports two-way bind:value (input updates the bound state)', async () => {
    const { container, getByTestId } = render(InputFixture, { props: {} });
    const el = container.querySelector('input') as HTMLInputElement;
    await fireEvent.input(el, { target: { value: 'typed text' } });
    expect(getByTestId('bound').textContent).toBe('typed text');
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Input, { props: { variant: 'outline' as const, size: 'md' as const } });
    const el = container.querySelector('input');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});
