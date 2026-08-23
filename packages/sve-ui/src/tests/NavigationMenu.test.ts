import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import NavigationMenuFixture from './NavigationMenuFixture.svelte';

/**
 * The reason to reach for NavigationMenu over Menubar on the web is that its
 * triggers respond to click and Enter as well as hover — so the menu is usable
 * without a pointer. That is what these assert.
 */
describe('NavigationMenu', () => {
  it('renders a named navigation landmark', () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    expect(getByRole('navigation', { name: 'Site' })).toBeTruthy();
  });

  it('renders the items as a real list', () => {
    const { container } = render(NavigationMenuFixture, { props: {} });
    expect(container.querySelector('ul.sve-nav-menu__list')).not.toBeNull();
    expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  it('renders a trigger with aria-expanded closed', () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    const trigger = getByRole('button', { name: 'Products' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('keeps the panel closed until the trigger is used', () => {
    const { container } = render(NavigationMenuFixture, { props: {} });
    expect(container.querySelector('.sve-nav-menu__content')).toBeNull();
  });

  it('opens on click — no pointer hover required', async () => {
    const { getByRole, container, getByTestId } = render(NavigationMenuFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Products' }));

    await waitFor(() => {
      expect(container.querySelector('.sve-nav-menu__content')).not.toBeNull();
      expect(getByRole('button', { name: 'Products' }).getAttribute('data-state')).toBe('open');
      expect(getByTestId('value').textContent).toBe('products');
    });
  });

  it('reveals the panel links once open', async () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Products' }));

    await waitFor(() => {
      expect(getByRole('link', { name: 'Analytics' }).getAttribute('href')).toBe('/analytics');
      expect(getByRole('link', { name: 'Reports' }).getAttribute('href')).toBe('/reports');
    });
  });

  it('keeps links as real anchors, so middle-click still works', () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    const link = getByRole('link', { name: 'Pricing' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/pricing');
  });

  it('marks the active link with aria-current="page"', () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    // `active` must do more than colour the link — it has to be announced.
    expect(getByRole('link', { name: 'Pricing' }).getAttribute('aria-current')).toBe('page');
  });

  it('leaves non-active links without aria-current', async () => {
    const { getByRole } = render(NavigationMenuFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Products' }));
    await waitFor(() =>
      expect(getByRole('link', { name: 'Analytics' }).getAttribute('aria-current')).toBeNull()
    );
  });

  it('closes on Escape', async () => {
    const { getByRole, container } = render(NavigationMenuFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Products' }));
    await waitFor(() => expect(container.querySelector('.sve-nav-menu__content')).not.toBeNull());

    await fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
    await waitFor(() => expect(container.querySelector('.sve-nav-menu__content')).toBeNull());
  });

  it.todo('hover opens after delayDuration, and skipDelayDuration between triggers (needs Playwright e2e)');
});
