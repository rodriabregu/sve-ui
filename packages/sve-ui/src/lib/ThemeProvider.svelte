<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setThemeContext } from './context';
  import { themeToVars, type PartialSveTheme } from './theme/tokens';

  interface Props {
    colorScheme?: 'light' | 'dark' | 'system';
    theme?: PartialSveTheme;
    class?: string;
    children?: Snippet;
  }

  let {
    colorScheme = 'system',
    theme,
    class: cls,
    children,
  }: Props = $props();

  // TODO(phase-2): headSnippet for persisted scheme — inject a <script> into <head>
  // that reads localStorage/cookie before first paint to avoid FOUC when the user's
  // preferred scheme differs from the server-rendered default.

  /**
   * Inline CSS vars — only rendered when a theme override prop is provided.
   * SSR-safe: Svelte emits the style attribute on the server too.
   */
  const styleVars = $derived(theme ? themeToVars(theme) : undefined);

  // Expose color scheme to descendant components via Svelte context.
  setThemeContext({
    get colorScheme() {
      return colorScheme;
    },
  });
</script>

<div
  class={`sve-theme${cls ? ` ${cls}` : ''}`}
  data-scheme={colorScheme}
  class:dark={colorScheme === 'dark'}
  class:light={colorScheme === 'light'}
  style={styleVars}
>
  {@render children?.()}
</div>
