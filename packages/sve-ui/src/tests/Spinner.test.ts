import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Spinner from '$lib/components/Spinner/Spinner.svelte';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    const { container } = render(Spinner, { props: {} });
    const el = container.querySelector('[role="status"]');
    expect(el).not.toBeNull();
  });

  it('has base class sve-spinner', () => {
    const { container } = render(Spinner, { props: {} });
    const el = container.querySelector('[role="status"]');
    expect(el?.classList.contains('sve-spinner')).toBe(true);
  });

  it('applies size class sm', () => {
    const { container } = render(Spinner, { props: { size: 'sm' as const } });
    const el = container.querySelector('[role="status"]');
    expect(el?.classList.contains('sve-spinner--sm')).toBe(true);
  });

  it('applies size class lg', () => {
    const { container } = render(Spinner, { props: { size: 'lg' as const } });
    const el = container.querySelector('[role="status"]');
    expect(el?.classList.contains('sve-spinner--lg')).toBe(true);
  });

  it('applies color class for primary', () => {
    const { container } = render(Spinner, { props: { color: 'primary' as const } });
    const el = container.querySelector('[role="status"]');
    expect(el?.classList.contains('sve-c-primary')).toBe(true);
  });

  it('has aria-label with the provided label text', () => {
    const { container } = render(Spinner, { props: { label: 'Loading data' } });
    const el = container.querySelector('[role="status"]');
    expect(el?.getAttribute('aria-label')).toBe('Loading data');
  });

  it('uses default aria-label "Loading" when no label provided', () => {
    const { container } = render(Spinner, { props: {} });
    const el = container.querySelector('[role="status"]');
    expect(el?.getAttribute('aria-label')).toBe('Loading');
  });

  it('does not render an sr-only span (single announcement via aria-label only)', () => {
    const { container } = render(Spinner, { props: {} });
    expect(container.querySelector('.sve-sr-only')).toBeNull();
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Spinner, { props: {} });
    const el = container.querySelector('[role="status"]');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});
