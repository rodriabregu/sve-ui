<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAnchorAttributes, 'class'> {
    /**
     * Marks this as the page the user is on. The last crumb should set it: it
     * renders as plain text instead of a link and reports `aria-current="page"`,
     * because a link to the page you are already on is a dead end.
     * @default false
     */
    current?: boolean;
    /** Extra classes merged onto the link. */
    class?: string;
    children?: Snippet;
  }

  let { current = false, class: cls, children, ...rest }: Props = $props();

  const className = $derived(
    ['sve-breadcrumb__link', current ? 'sve-breadcrumb__link--current' : '', cls]
      .filter(Boolean)
      .join(' ')
  );
</script>

{#if current}
  <span class={className} aria-current="page" data-slot="breadcrumb-link">
    {@render children?.()}
  </span>
{:else}
  <a class={className} data-slot="breadcrumb-link" {...rest}>
    {@render children?.()}
  </a>
{/if}

<style>
  .sve-breadcrumb__link {
    color: var(--sve-color-primary);
    text-decoration: none;
    border-radius: var(--sve-radius-sm);
  }

  .sve-breadcrumb__link:hover {
    text-decoration: underline;
  }

  .sve-breadcrumb__link:focus-visible {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  /* The current page is not a link, so it should not look like one. */
  .sve-breadcrumb__link--current {
    color: var(--sve-color-default-foreground);
    opacity: 0.7;
    text-decoration: none;
  }

  .sve-breadcrumb__link--current:hover {
    text-decoration: none;
  }
</style>
