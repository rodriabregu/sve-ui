import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AlertTitleFixture from './AlertTitleFixture.svelte';

describe('AlertTitle', () => {
  it('renders a semantic <p> by default (not a bare div)', () => {
    const { container } = render(AlertTitleFixture, { props: {} });
    const el = container.querySelector('.sve-alert__title');
    expect(el?.tagName).toBe('P');
  });

  it('respects the `as` prop for a custom element', () => {
    const { container } = render(AlertTitleFixture, { props: { as: 'h3' } });
    const el = container.querySelector('.sve-alert__title');
    expect(el?.tagName).toBe('H3');
  });

  it('renders its children content', () => {
    const { getByText } = render(AlertTitleFixture, { props: {} });
    expect(getByText('My title')).toBeTruthy();
  });
});
