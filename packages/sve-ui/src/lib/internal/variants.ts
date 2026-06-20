/**
 * defineVariants — typed CVA-like variant resolver.
 *
 * Returns a resolver function that maps variant × color × size props to a
 * merged CSS class string. No external dependencies. No `any` in the public
 * surface. Visual values live in scoped CSS keyed by the emitted class names.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Maps axis value names to CSS class strings */
export type VariantSchema = Record<string, Record<string, string>>;

export interface VariantConfig<S extends VariantSchema> {
  /** Base class always included in the output */
  base?: string;
  /** Per-axis variant definitions: axis → value → class */
  variants: S;
  /** Default value for each axis (used when props are omitted) */
  defaultVariants?: {
    [K in keyof S]?: keyof S[K];
  };
}

/** Props accepted by the resolver (each axis is optional + extra class string) */
export type VariantProps<S extends VariantSchema> = {
  [K in keyof S]?: keyof S[K];
} & { class?: string };

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Create a variant resolver function from a config.
 *
 * @example
 * const button = defineVariants({
 *   base: 'btn',
 *   variants: {
 *     variant: { solid: 'btn--solid', ghost: 'btn--ghost' },
 *     size:    { sm: 'btn--sm', md: 'btn--md' },
 *   },
 *   defaultVariants: { variant: 'solid', size: 'md' },
 * });
 *
 * button()                          // → 'btn btn--solid btn--md'
 * button({ variant: 'ghost' })      // → 'btn btn--ghost btn--md'
 * button({ class: 'extra' })        // → 'btn btn--solid btn--md extra'
 */
export function defineVariants<S extends VariantSchema>(
  config: VariantConfig<S>,
): (props?: VariantProps<S>) => string {
  return function resolveVariants(props?: VariantProps<S>): string {
    const parts: string[] = [];

    // 1. Base class
    if (config.base) {
      parts.push(config.base);
    }

    // 2. Per-axis class resolution
    for (const axis in config.variants) {
      const axisMap = config.variants[axis];
      // Prefer explicit prop value, fall back to defaultVariants
      const value =
        props?.[axis as keyof S] ??
        config.defaultVariants?.[axis as keyof S];

      if (value !== undefined) {
        const cls = axisMap[value as string];
        if (cls) {
          parts.push(cls);
        }
      }
    }

    // 3. Extra class prop
    if (props?.class) {
      parts.push(props.class);
    }

    return parts.join(' ');
  };
}
