import { describe, it, expect } from 'vitest';
import { defineVariants } from '$lib/internal/variants';

const buttonVariants = defineVariants({
  base: 'sve-button',
  variants: {
    variant: {
      solid:   'sve-button--solid',
      outline: 'sve-button--outline',
      ghost:   'sve-button--ghost',
      flat:    'sve-button--flat',
    },
    color: {
      primary:   'sve-c-primary',
      secondary: 'sve-c-secondary',
      success:   'sve-c-success',
      warning:   'sve-c-warning',
      danger:    'sve-c-danger',
      default:   'sve-c-default',
    },
    size: {
      sm: 'sve-button--sm',
      md: 'sve-button--md',
      lg: 'sve-button--lg',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color:   'primary',
    size:    'md',
  },
});

describe('defineVariants', () => {
  it('returns a resolver function', () => {
    expect(typeof buttonVariants).toBe('function');
  });

  it('calling resolver with no args returns default class string', () => {
    const result = buttonVariants();
    expect(result).toContain('sve-button');
    expect(result).toContain('sve-button--solid');
    expect(result).toContain('sve-c-primary');
    expect(result).toContain('sve-button--md');
  });

  it('explicit props return the correct merged class string', () => {
    const result = buttonVariants({ variant: 'ghost', color: 'danger', size: 'sm' });
    expect(result).toContain('sve-button');
    expect(result).toContain('sve-button--ghost');
    expect(result).toContain('sve-c-danger');
    expect(result).toContain('sve-button--sm');
    // Should not contain other variant classes
    expect(result).not.toContain('sve-button--solid');
    expect(result).not.toContain('sve-c-primary');
    expect(result).not.toContain('sve-button--md');
  });

  it('extra class prop is appended to the output', () => {
    const result = buttonVariants({ class: 'my-custom-class' });
    expect(result).toContain('my-custom-class');
    expect(result).toContain('sve-button');
  });

  it('partial props use defaults for unspecified axes', () => {
    const result = buttonVariants({ size: 'lg' });
    expect(result).toContain('sve-button--solid');  // default variant
    expect(result).toContain('sve-c-primary');       // default color
    expect(result).toContain('sve-button--lg');      // explicit size
  });
});
