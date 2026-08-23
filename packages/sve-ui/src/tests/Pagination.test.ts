import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import PaginationFixture from './PaginationFixture.svelte';

describe('Pagination', () => {
  it('renders inside a named navigation landmark', () => {
    const { getByRole } = render(PaginationFixture, { props: {} });
    expect(getByRole('navigation', { name: 'Pagination' })).toBeTruthy();
  });

  it('derives the page count from count and perPage', () => {
    // 100 items at 10 per page = 10 pages, so the last page button is 10.
    const { getByRole } = render(PaginationFixture, { props: {} });
    expect(getByRole('button', { name: /10/ })).toBeTruthy();
  });

  it('marks the current page as selected', () => {
    const { container } = render(PaginationFixture, { props: {} });
    const selected = container.querySelectorAll('.sve-pagination__page[data-selected]');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent?.trim()).toBe('1');
  });

  it('disables Previous on the first page', () => {
    const { getByRole } = render(PaginationFixture, { props: {} });
    expect((getByRole('button', { name: 'Previous page' }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('leaves Next enabled on the first page', () => {
    const { getByRole } = render(PaginationFixture, { props: {} });
    expect((getByRole('button', { name: 'Next page' }) as HTMLButtonElement).disabled).toBe(false);
  });

  it('advances on Next and reflects it via bind:page', async () => {
    const { getByRole, getByTestId } = render(PaginationFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Next page' }));
    await waitFor(() => expect(getByTestId('page').textContent).toBe('2'));
  });

  it('jumps to a page when its button is clicked', async () => {
    const { container, getByTestId } = render(PaginationFixture, { props: {} });
    const pages = Array.from(container.querySelectorAll('.sve-pagination__page'));
    const three = pages.find((p) => p.textContent?.trim() === '3') as HTMLElement;
    await fireEvent.click(three);
    await waitFor(() => expect(getByTestId('page').textContent).toBe('3'));
  });

  it('enables Previous once past the first page', async () => {
    const { getByRole, getByTestId } = render(PaginationFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Next page' }));
    await waitFor(() => expect(getByTestId('page').textContent).toBe('2'));
    expect((getByRole('button', { name: 'Previous page' }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it('renders an ellipsis when there are more pages than fit', () => {
    const { getAllByTestId } = render(PaginationFixture, { props: {} });
    // Bits owns the ellipsis logic; we only assert it is exercised at 10 pages.
    expect(getAllByTestId('ellipsis').length).toBeGreaterThan(0);
  });

  it('needs no ellipsis when every page fits', () => {
    const { queryAllByTestId } = render(PaginationFixture, { props: { count: 20, perPage: 10 } });
    expect(queryAllByTestId('ellipsis').length).toBe(0);
  });
});
