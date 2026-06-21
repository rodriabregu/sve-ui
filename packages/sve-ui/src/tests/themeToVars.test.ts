/**
 * Unit tests for themeToVars — verifies generated CSS var names match theme.css exactly.
 *
 * These are the regression tests for the typography prefix bug:
 * flattenToVars with prefix '--sve-font' and nested key 'fontFamilySans' would
 * previously produce '--sve-font-font-family-sans' (doubled 'font-'). The fix
 * restructured SveTypography into nested sub-objects so the output is exact.
 */
import { describe, it, expect } from 'vitest';
import { themeToVars } from '$lib/theme/tokens';

describe('themeToVars', () => {
  it('typography: family sub-group produces --sve-font-family-sans', () => {
    const result = themeToVars({
      typography: { family: { sans: 'Arial, sans-serif' } },
    });
    expect(result).toContain('--sve-font-family-sans:Arial, sans-serif;');
    expect(result).not.toContain('--sve-font-font-');
  });

  it('typography: size sub-group produces --sve-font-size-xs/sm/md/lg', () => {
    const result = themeToVars({
      typography: { size: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem' } },
    });
    expect(result).toContain('--sve-font-size-xs:0.75rem;');
    expect(result).toContain('--sve-font-size-sm:0.875rem;');
    expect(result).toContain('--sve-font-size-md:1rem;');
    expect(result).toContain('--sve-font-size-lg:1.125rem;');
  });

  it('typography: weight sub-group produces --sve-font-weight-normal/medium/bold', () => {
    const result = themeToVars({
      typography: { weight: { normal: '400', medium: '500', bold: '700' } },
    });
    expect(result).toContain('--sve-font-weight-normal:400;');
    expect(result).toContain('--sve-font-weight-medium:500;');
    expect(result).toContain('--sve-font-weight-bold:700;');
  });

  it('typography: lineHeight sub-group produces --sve-line-height-* (not --sve-font-line-height-*)', () => {
    const result = themeToVars({
      typography: { lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' } },
    });
    expect(result).toContain('--sve-line-height-tight:1.25;');
    expect(result).toContain('--sve-line-height-normal:1.5;');
    expect(result).toContain('--sve-line-height-relaxed:1.75;');
    // Must NOT be double-prefixed
    expect(result).not.toContain('--sve-font-line-height');
  });

  it('colors: override produces --sve-color-primary with correct value', () => {
    const result = themeToVars({
      colors: { primary: { DEFAULT: '#ff0000' } },
    });
    expect(result).toContain('--sve-color-primary:#ff0000;');
  });

  it('spacing: override produces --sve-space-{n} with correct value', () => {
    const result = themeToVars({
      spacing: { 4: '2rem' },
    });
    expect(result).toContain('--sve-space-4:2rem;');
  });

  it('returns empty string when called with empty object', () => {
    expect(themeToVars({})).toBe('');
  });

  it('all generated var names exactly match theme.css naming convention', () => {
    const result = themeToVars({
      typography: {
        family:     { sans: 'system-ui' },
        size:       { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem' },
        weight:     { normal: '400', medium: '500', bold: '700' },
        lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
      },
      colors: { primary: { DEFAULT: '#f56565', foreground: '#fff' } },
      spacing: { 4: '1rem' },
    });

    // Exact names from theme.css — none of these should be missing or doubled
    const expectedVars = [
      '--sve-font-family-sans',
      '--sve-font-size-xs',
      '--sve-font-size-sm',
      '--sve-font-size-md',
      '--sve-font-size-lg',
      '--sve-font-weight-normal',
      '--sve-font-weight-medium',
      '--sve-font-weight-bold',
      '--sve-line-height-tight',
      '--sve-line-height-normal',
      '--sve-line-height-relaxed',
      '--sve-color-primary',
      '--sve-color-primary-foreground',
      '--sve-space-4',
    ];

    for (const varName of expectedVars) {
      expect(result, `Expected "${varName}" in output`).toContain(varName);
    }

    // No doubled prefix
    expect(result).not.toMatch(/--sve-font-font-/);
    expect(result).not.toMatch(/--sve-font-line-height-/);
  });
});
