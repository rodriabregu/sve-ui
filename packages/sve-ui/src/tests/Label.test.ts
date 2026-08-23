import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LabelFixture from './LabelFixture.svelte';

describe('Label', () => {
  it('renders a <label> element', () => {
    const { container } = render(LabelFixture, { props: {} });
    expect(container.querySelector('label')).not.toBeNull();
  });

  it('has base class sve-label', () => {
    const { container } = render(LabelFixture, { props: {} });
    const el = container.querySelector('label');
    expect(el?.classList.contains('sve-label')).toBe(true);
  });

  it('applies md size by default', () => {
    const { container } = render(LabelFixture, { props: {} });
    const el = container.querySelector('label');
    expect(el?.classList.contains('sve-label--md')).toBe(true);
  });

  it('applies sm size', () => {
    const { container } = render(LabelFixture, { props: { size: 'sm' as const } });
    const el = container.querySelector('label');
    expect(el?.classList.contains('sve-label--sm')).toBe(true);
  });

  it('applies lg size', () => {
    const { container } = render(LabelFixture, { props: { size: 'lg' as const } });
    const el = container.querySelector('label');
    expect(el?.classList.contains('sve-label--lg')).toBe(true);
  });

  it('renders its children as the label text', () => {
    const { container } = render(LabelFixture, { props: { content: 'Full name' } });
    expect(container.querySelector('label')?.textContent).toContain('Full name');
  });

  it('forwards the for attribute so it names the control', () => {
    const { container } = render(LabelFixture, { props: {} });
    const el = container.querySelector('label');
    expect(el?.getAttribute('for')).toBe('fixture-input');
  });

  it('renders no required marker by default', () => {
    const { container } = render(LabelFixture, { props: {} });
    expect(container.querySelector('.sve-label__required')).toBeNull();
  });

  it('renders a required marker when required is true', () => {
    const { container } = render(LabelFixture, { props: { required: true } });
    const marker = container.querySelector('.sve-label__required');
    expect(marker).not.toBeNull();
    expect(marker?.textContent).toBe('*');
  });

  it('hides the required marker from assistive technology', () => {
    const { container } = render(LabelFixture, { props: { required: true } });
    const marker = container.querySelector('.sve-label__required');
    expect(marker?.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(LabelFixture, { props: { class: 'extra-label-class' } });
    const el = container.querySelector('label');
    expect(el?.classList.contains('extra-label-class')).toBe(true);
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(LabelFixture, { props: {} });
    const classList = Array.from(container.querySelector('label')?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});
