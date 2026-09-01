import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import KbdFixture from './KbdFixture.svelte';

describe('Kbd', () => {
	it('renders a real <kbd> element', () => {
		const { container } = render(KbdFixture, { text: 'Esc' });
		const kbd = container.querySelector('kbd.sve-kbd');
		expect(kbd).not.toBeNull();
		expect(kbd!.textContent?.trim()).toBe('Esc');
	});

	it('defaults to the md size', () => {
		const { container } = render(KbdFixture);
		expect(container.querySelector('.sve-kbd--md')).not.toBeNull();
	});

	it('applies the size modifier', () => {
		const { container } = render(KbdFixture, { size: 'sm' });
		expect(container.querySelector('.sve-kbd--sm')).not.toBeNull();
	});

	/*
		The reason this component exists. Without a label the glyph is the only thing
		in the accessibility tree, and `⌘` is punctuation a screen reader may skip
		entirely — so the shortcut is announced as nothing at all.
	*/
	it('hides the glyph and exposes the label when one is given', () => {
		const { container } = render(KbdFixture, { text: '⌘', label: 'Command' });
		const glyph = container.querySelector('[aria-hidden="true"]');
		expect(glyph?.textContent).toBe('⌘');
		expect(container.querySelector('.sve-kbd__label')?.textContent).toBe('Command');
	});

	it('leaves an unlabelled key entirely in the accessibility tree', () => {
		const { container } = render(KbdFixture, { text: 'Enter' });
		expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
		expect(container.querySelector('.sve-kbd__label')).toBeNull();
	});
});
