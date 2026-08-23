import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ToolbarFixture from './ToolbarFixture.svelte';

describe('Toolbar', () => {
  it('exposes role="toolbar" with an accessible name', () => {
    const { getByRole } = render(ToolbarFixture, { props: {} });
    expect(getByRole('toolbar', { name: 'Formatting' })).toBeTruthy();
  });

  it('applies the base classes to root and parts', () => {
    const { container } = render(ToolbarFixture, { props: {} });
    expect(container.querySelector('.sve-toolbar')).not.toBeNull();
    expect(container.querySelector('.sve-toolbar__group')).not.toBeNull();
    expect(container.querySelector('.sve-toolbar__group-item')).not.toBeNull();
    expect(container.querySelector('.sve-toolbar__button')).not.toBeNull();
    expect(container.querySelector('.sve-toolbar__link')).not.toBeNull();
  });

  it('keeps Link a real anchor so navigation semantics survive', () => {
    const { getByRole } = render(ToolbarFixture, { props: {} });
    const link = getByRole('link', { name: 'Help' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/help');
  });

  it('renders Button as a button, not a link', () => {
    const { getByRole } = render(ToolbarFixture, { props: {} });
    expect(getByRole('button', { name: 'Save' }).tagName).toBe('BUTTON');
  });

  it('reflects the group value as pressed state', () => {
    const { getByRole } = render(ToolbarFixture, { props: {} });
    expect(getByRole('button', { name: 'Bold' }).getAttribute('data-state')).toBe('on');
    expect(getByRole('button', { name: 'Italic' }).getAttribute('data-state')).toBe('off');
  });

  it('toggles a group item and reflects it via bind:value', async () => {
    const { getByRole, getByTestId } = render(ToolbarFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Italic' }));

    await waitFor(() => {
      expect(getByRole('button', { name: 'Italic' }).getAttribute('data-state')).toBe('on');
      expect(getByTestId('marks').textContent).toBe('bold,italic');
    });
  });

  // The reason to use Toolbar over a row of buttons: roving focus makes the
  // whole thing one tab stop instead of one per control.
  it('uses roving tabindex so the toolbar is a single tab stop', () => {
    const { container } = render(ToolbarFixture, { props: {} });
    const focusables = Array.from(
      container.querySelectorAll('[data-slot^="toolbar-"]')
    ).filter((el) => el.hasAttribute('tabindex'));
    const zeroTab = focusables.filter((el) => el.getAttribute('tabindex') === '0');
    expect(focusables.length).toBeGreaterThan(1);
    expect(zeroTab.length).toBe(1);
  });
});
