import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import TableFixture from './TableFixture.svelte';

/**
 * Custom rather than a Bits wrapper, so every semantic here is ours to get
 * right. A data table is already a solved accessibility problem in HTML, which
 * means these tests are mostly about not breaking what the platform gives us —
 * and about the three places this component deliberately refuses to help.
 */
describe('Table', () => {
  it('renders a real table named by its caption', () => {
    const { getByRole } = render(TableFixture);
    // Resolved by role + name, the way assistive technology does it, so this
    // asserts the caption is wired as the accessible name rather than merely
    // rendered somewhere.
    expect(getByRole('table', { name: 'Quarterly revenue' })).toBeTruthy();
  });

  it('does NOT claim role="grid"', () => {
    const { getByRole, queryByRole } = render(TableFixture);
    // `grid` promises arrow-key cell navigation this component does not
    // implement. Claiming it leaves a screen reader user pressing keys that do
    // nothing, so the role must stay the native `table`.
    expect(queryByRole('grid')).toBeNull();
    expect(getByRole('table').hasAttribute('role')).toBe(false);
  });

  it('gives column headers scope="col" and the row header scope="row"', () => {
    const { getByRole } = render(TableFixture);
    // scope is what lets a screen reader announce "Revenue, Argentina, 1200"
    // instead of a bare number.
    expect(getByRole('columnheader', { name: 'Region' }).getAttribute('scope')).toBe('col');
    expect(getByRole('rowheader', { name: 'Argentina' }).getAttribute('scope')).toBe('row');
  });

  it('exposes aria-sort only on the sortable header', () => {
    const { getByRole } = render(TableFixture);
    expect(getByRole('columnheader', { name: /Revenue/ }).getAttribute('aria-sort')).toBe('none');
    // A non-sortable column with aria-sort="none" claims it could be sorted.
    expect(getByRole('columnheader', { name: 'Region' }).hasAttribute('aria-sort')).toBe(false);
  });

  it('maps sort direction onto the aria-sort token, not the prop value', () => {
    // The prop takes 'asc'/'desc' because that is what application code says;
    // ARIA only accepts 'ascending'/'descending'. Forwarding the prop verbatim
    // would produce an invalid attribute that reads as no sort at all.
    const asc = render(TableFixture, { sort: 'asc' });
    expect(asc.getByRole('columnheader', { name: /Revenue/ }).getAttribute('aria-sort')).toBe(
      'ascending'
    );
    asc.unmount();

    const desc = render(TableFixture, { sort: 'desc' });
    expect(desc.getByRole('columnheader', { name: /Revenue/ }).getAttribute('aria-sort')).toBe(
      'descending'
    );
  });

  it('renders the sortable label as a real button inside the cell', () => {
    const { getByRole } = render(TableFixture);
    // A clickable <th> is neither focusable nor operable by keyboard.
    const button = getByRole('button', { name: /Revenue/ });
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.closest('th')).not.toBeNull();
  });

  it('cycles none -> asc -> desc -> none', async () => {
    const onSortChange = vi.fn();

    const none = render(TableFixture, { sort: 'none', onSortChange });
    await fireEvent.click(none.getByRole('button', { name: /Revenue/ }));
    expect(onSortChange).toHaveBeenLastCalledWith('asc');
    none.unmount();

    const asc = render(TableFixture, { sort: 'asc', onSortChange });
    await fireEvent.click(asc.getByRole('button', { name: /Revenue/ }));
    expect(onSortChange).toHaveBeenLastCalledWith('desc');
    asc.unmount();

    // The third state is the point: without it there is no way back to the
    // order the rows arrived in, which is often meaningful on its own.
    const desc = render(TableFixture, { sort: 'desc', onSortChange });
    await fireEvent.click(desc.getByRole('button', { name: /Revenue/ }));
    expect(onSortChange).toHaveBeenLastCalledWith('none');
  });

  it('leaves the sort control keyboard-operable', () => {
    const { getByRole } = render(TableFixture);
    const button = getByRole('button', { name: /Revenue/ }) as HTMLButtonElement;

    // A native, non-disabled button with no negative tabindex gets Tab, Enter
    // and Space from the platform — which is the whole reason the control is a
    // button and not the <th>. jsdom does not synthesize a click from Enter, so
    // asserting that here would test jsdom, not this component.
    button.focus();
    expect(document.activeElement).toBe(button);
    expect(button.hasAttribute('tabindex')).toBe(false);
    expect(button.disabled).toBe(false);
  });

  it('hides the sort indicator from assistive technology', () => {
    const { getByRole } = render(TableFixture, { sort: 'asc' });
    // aria-sort already carries the direction; announcing an arrow glyph on top
    // of it says the same thing twice.
    const icon = getByRole('button', { name: /Revenue/ }).querySelector('[aria-hidden="true"]');
    expect(icon).not.toBeNull();
    expect(icon!.textContent).toBe('↑');
  });

  it('marks a selected row with data-selected and NOT aria-selected', () => {
    const { getByRole } = render(TableFixture, { selected: true });
    // aria-selected is only valid inside grid/listbox/treegrid; on a plain <tr>
    // it is invalid and ignored, so selection is expressed as a data attribute
    // and the operable control is a Checkbox the consumer supplies.
    const row = getByRole('rowheader', { name: 'Argentina' }).closest('tr')!;
    expect(row.hasAttribute('data-selected')).toBe(true);
    expect(row.hasAttribute('aria-selected')).toBe(false);
  });

  it('makes the scroll container a focusable named region only when labelled', () => {
    const bare = render(TableFixture);
    const plain = bare.container.querySelector('.sve-table-scroll')!;
    // An unnamed focusable region is announced as nothing at all, which is
    // worse than one that is not focusable.
    expect(plain.hasAttribute('tabindex')).toBe(false);
    expect(plain.hasAttribute('role')).toBe(false);
    bare.unmount();

    const labelled = render(TableFixture, { scrollLabel: 'Revenue table, scrollable' });
    const region = labelled.getByRole('region', { name: 'Revenue table, scrollable' });
    expect(region.getAttribute('tabindex')).toBe('0');
  });

  it('keeps a visually hidden caption in the accessibility tree', () => {
    const { getByRole, container } = render(TableFixture, { hiddenCaption: true });
    // Clipped, not display:none — the name has to survive being hidden.
    expect(getByRole('table', { name: 'Quarterly revenue' })).toBeTruthy();
    expect(container.querySelector('caption')!.className).toContain('sve-table__caption--hidden');
  });

  it('renders totals in a tfoot rather than as a body row', () => {
    const { container } = render(TableFixture);
    const foot = container.querySelector('tfoot');
    expect(foot).not.toBeNull();
    expect(foot!.textContent).toContain('Total');
    expect(container.querySelector('tbody')!.textContent).not.toContain('Total');
  });

  it('right-aligns numeric cells with tabular figures', () => {
    const { container } = render(TableFixture);
    // The class is the contract; the rule lives in a :global block jsdom does
    // not resolve. Both the header and the cell need it, or the column heading
    // sits over a right-aligned column.
    expect(container.querySelector('td.sve-table__cell--numeric')).not.toBeNull();
    expect(container.querySelector('th.sve-table__cell--numeric')).not.toBeNull();
  });

  it('caps the scroll container height only when the header is sticky', () => {
    const loose = render(TableFixture);
    expect(loose.container.querySelector('.sve-table-scroll--capped')).toBeNull();
    loose.unmount();

    // Sticky needs something to stick inside: with no bounded height the page
    // scrolls instead of the table and the header never detaches.
    const sticky = render(TableFixture, { stickyHeader: true });
    expect(sticky.container.querySelector('.sve-table-scroll--capped')).not.toBeNull();
    expect(sticky.container.querySelector('.sve-table--sticky')).not.toBeNull();
  });
});
