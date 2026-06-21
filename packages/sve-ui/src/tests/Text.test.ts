import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Text from '$lib/components/Text/Text.svelte';
import TextFixture from './TextFixture.svelte';

describe('Text', () => {
  it('renders a <p> element by default', () => {
    const { container } = render(Text, { props: {} });
    const el = container.querySelector('p');
    expect(el).not.toBeNull();
  });

  it('renders <span> when as="span"', () => {
    const { container } = render(Text, { props: { as: 'span' } });
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('renders <div> when as="div"', () => {
    const { container } = render(Text, { props: { as: 'div' } });
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('renders <label> when as="label"', () => {
    const { container } = render(Text, { props: { as: 'label' } });
    expect(container.querySelector('label')).not.toBeNull();
  });

  it('applies size class for sm', () => {
    const { container } = render(Text, { props: { size: 'sm' as const } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--sm')).toBe(true);
  });

  it('applies size class for lg', () => {
    const { container } = render(Text, { props: { size: 'lg' as const } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--lg')).toBe(true);
  });

  it('applies weight class for bold', () => {
    const { container } = render(Text, { props: { weight: 'bold' as const } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--bold')).toBe(true);
  });

  it('applies weight class for medium', () => {
    const { container } = render(Text, { props: { weight: 'medium' as const } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--medium')).toBe(true);
  });

  it('applies truncate class when truncate=true', () => {
    const { container } = render(Text, { props: { truncate: true } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--truncate')).toBe(true);
  });

  it('does not apply truncate class when truncate is not set', () => {
    const { container } = render(Text, { props: {} });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-text--truncate')).toBe(false);
  });

  it('passes through HTML attributes', () => {
    const { container } = render(Text, { props: { id: 'my-text' } });
    const el = container.querySelector('p');
    expect(el?.getAttribute('id')).toBe('my-text');
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Text, { props: { size: 'lg' as const, weight: 'medium' as const } });
    const el = container.querySelector('p');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });

  it('renders children text content', () => {
    const { container } = render(TextFixture, { props: { content: 'Sample text content' } });
    const el = container.querySelector('[data-testid="text-el"]');
    expect(el?.textContent?.trim()).toBe('Sample text content');
  });

  it('applies warning color using foreground token class (WCAG contrast)', () => {
    const { container } = render(Text, { props: { color: 'warning' as const } });
    const el = container.querySelector('p');
    expect(el?.classList.contains('sve-c-warning')).toBe(true);
  });
});
