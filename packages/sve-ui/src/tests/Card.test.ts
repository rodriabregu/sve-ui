import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import CardFixture from './CardFixture.svelte';

describe('Card.Root', () => {
  it('renders a <div> element with base class', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.tagName.toLowerCase()).toBe('div');
    expect(el?.classList.contains('sve-card')).toBe(true);
  });

  it('applies elevated variant by default', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.classList.contains('sve-card--elevated')).toBe(true);
  });

  it('applies outlined variant', () => {
    const { container } = render(CardFixture, { props: { variant: 'outlined' as const } });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.classList.contains('sve-card--outlined')).toBe(true);
  });

  it('applies filled variant', () => {
    const { container } = render(CardFixture, { props: { variant: 'filled' as const } });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.classList.contains('sve-card--filled')).toBe(true);
  });

  it('applies padding class when padding prop provided', () => {
    const { container } = render(CardFixture, { props: { padding: '4' as const } });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.classList.contains('sve-card--p4')).toBe(true);
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(CardFixture, { props: { class: 'extra-card-class' } });
    const el = container.querySelector('[data-testid="card-root"]');
    expect(el?.classList.contains('extra-card-class')).toBe(true);
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(CardFixture, { props: { variant: 'elevated' as const } });
    const el = container.querySelector('[data-testid="card-root"]');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});

describe('Card.Header', () => {
  it('renders header with base class', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-header"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-card__header')).toBe(true);
  });

  it('renders header text content', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-header"]');
    expect(el?.textContent?.trim()).toBe('Header');
  });
});

describe('Card.Content', () => {
  it('renders content with base class', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-content"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-card__content')).toBe(true);
  });

  it('renders content text content', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-content"]');
    expect(el?.textContent?.trim()).toBe('Content');
  });
});

describe('Card.Footer', () => {
  it('renders footer with base class', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-footer"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-card__footer')).toBe(true);
  });

  it('renders footer text content', () => {
    const { container } = render(CardFixture, { props: {} });
    const el = container.querySelector('[data-testid="card-footer"]');
    expect(el?.textContent?.trim()).toBe('Footer');
  });
});
