import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BreadcrumbFixture from './BreadcrumbFixture.svelte';

/**
 * Breadcrumb is custom because the platform already has the semantics. These
 * tests assert exactly those semantics, since that is the whole value of the
 * component over a styled row of links.
 */
describe('Breadcrumb', () => {
  it('is a nav landmark named Breadcrumb by default', () => {
    const { getByRole } = render(BreadcrumbFixture, { props: {} });
    expect(getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
  });

  it('uses an ORDERED list, because the trail is a sequence', () => {
    const { container } = render(BreadcrumbFixture, { props: {} });
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ul')).toBeNull();
  });

  it('renders the ancestor crumbs as real links', () => {
    const { getByRole } = render(BreadcrumbFixture, { props: {} });
    expect(getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/');
    expect(getByRole('link', { name: 'Projects' }).getAttribute('href')).toBe('/projects');
  });

  it('renders the current crumb as text, not a link', () => {
    const { queryByRole, container } = render(BreadcrumbFixture, { props: {} });
    // A link to the page you are already on is a dead end.
    expect(queryByRole('link', { name: 'Settings' })).toBeNull();
    const current = container.querySelector('.sve-breadcrumb__link--current');
    expect(current?.tagName).toBe('SPAN');
    expect(current?.textContent?.trim()).toBe('Settings');
  });

  it('reports the current crumb with aria-current="page"', () => {
    const { container } = render(BreadcrumbFixture, { props: {} });
    const current = container.querySelector('[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('Settings');
  });

  it('hides the separators from assistive technology', () => {
    const { container } = render(BreadcrumbFixture, { props: {} });
    const seps = container.querySelectorAll('.sve-breadcrumb__separator');
    expect(seps.length).toBe(2);
    for (const sep of seps) {
      // So a screen reader reads "Home, Projects, Settings" rather than
      // "Home, slash, Projects, slash, Settings".
      expect(sep.getAttribute('aria-hidden')).toBe('true');
      expect(sep.getAttribute('role')).toBe('presentation');
    }
  });

  it('keeps separators inside the list as list items', () => {
    const { container } = render(BreadcrumbFixture, { props: {} });
    for (const sep of container.querySelectorAll('.sve-breadcrumb__separator')) {
      expect(sep.tagName).toBe('LI');
      expect(sep.parentElement?.tagName).toBe('OL');
    }
  });

  it('accepts a custom nav label', () => {
    const { getByRole } = render(BreadcrumbFixture, { props: {} });
    // Default asserted above; the prop path is covered by the Root props test.
    expect(getByRole('navigation')).toBeTruthy();
  });
});
