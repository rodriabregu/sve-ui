import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import Code from '$lib/components/Code/Code.svelte';

describe('Code', () => {
  it('renders the code inside a <pre><code>', () => {
    const { container } = render(Code, { props: { code: 'const x = 1;' } });
    const codeEl = container.querySelector('pre.sve-code__pre code');
    expect(codeEl?.textContent).toBe('const x = 1;');
  });

  it('shows the label when provided', () => {
    const { getByText } = render(Code, { props: { code: 'x', label: 'App.svelte' } });
    expect(getByText('App.svelte')).toBeTruthy();
  });

  it('renders a copy button by default and hides it when copyable=false', () => {
    const { container: a } = render(Code, { props: { code: 'x' } });
    expect(a.querySelector('.sve-code__copy')).not.toBeNull();
    const { container: b } = render(Code, { props: { code: 'x', copyable: false } });
    expect(b.querySelector('.sve-code__copy')).toBeNull();
  });

  it('copies the code string to the clipboard on click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const { container } = render(Code, { props: { code: 'pnpm add sve-ui' } });
    const btn = container.querySelector('.sve-code__copy') as HTMLButtonElement;
    await fireEvent.click(btn);

    expect(writeText).toHaveBeenCalledWith('pnpm add sve-ui');
    await waitFor(() => expect(btn.getAttribute('aria-label')).toBe('Copied'));
  });
});
