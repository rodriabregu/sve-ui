import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Heading from '$lib/components/Heading/Heading.svelte';
import HeadingFixture from './HeadingFixture.svelte';

describe('Heading', () => {
  it('renders <h2> by default (level=2)', () => {
    const { container } = render(Heading, { props: {} });
    expect(container.querySelector('h2')).not.toBeNull();
  });

  it('renders <h1> when level=1', () => {
    const { container } = render(Heading, { props: { level: 1 as const } });
    expect(container.querySelector('h1')).not.toBeNull();
  });

  it('renders <h3> when level=3', () => {
    const { container } = render(Heading, { props: { level: 3 as const } });
    expect(container.querySelector('h3')).not.toBeNull();
  });

  it('renders <h6> when level=6', () => {
    const { container } = render(Heading, { props: { level: 6 as const } });
    expect(container.querySelector('h6')).not.toBeNull();
  });

  it('applies the base heading class', () => {
    const { container } = render(Heading, { props: {} });
    const el = container.querySelector('h2');
    expect(el?.classList.contains('sve-heading')).toBe(true);
  });

  it('applies size class when size is provided', () => {
    const { container } = render(Heading, { props: { size: 'lg' as const } });
    const el = container.querySelector('h2');
    expect(el?.classList.contains('sve-heading--lg')).toBe(true);
  });

  it('applies weight class for bold', () => {
    const { container } = render(Heading, { props: { weight: 'bold' as const } });
    const el = container.querySelector('h2');
    expect(el?.classList.contains('sve-heading--bold')).toBe(true);
  });

  it('passes through HTML attributes', () => {
    const { container } = render(Heading, { props: { id: 'section-title' } });
    const el = container.querySelector('h2');
    expect(el?.getAttribute('id')).toBe('section-title');
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Heading, { props: { level: 1 as const, size: 'lg' as const } });
    const el = container.querySelector('h1');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });

  it('renders children text content', () => {
    const { container } = render(HeadingFixture, { props: { content: 'Section title' } });
    const el = container.querySelector('[data-testid="heading-el"]');
    expect(el?.textContent?.trim()).toBe('Section title');
  });

  it('applies bold weight by default (L-2)', () => {
    const { container } = render(Heading, { props: {} });
    const el = container.querySelector('h2');
    expect(el?.classList.contains('sve-heading--bold')).toBe(true);
  });
});
