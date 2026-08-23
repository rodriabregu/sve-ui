/**
 * Pagination namespace — sve-ui styled wrappers over bits-ui Pagination.
 *
 * Root takes `count` (total items) and `perPage`, then exposes a `pages`
 * snippet prop so YOU render the buttons:
 *
 *   <Pagination.Root count={100} perPage={10} bind:page>
 *     {#snippet children({ pages, currentPage })}
 *       <Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
 *       {#each pages as p (p.key)}
 *         {#if p.type === 'page'}
 *           <Pagination.Page page={p}>{p.value}</Pagination.Page>
 *         {:else}
 *           <span>…</span>
 *         {/if}
 *       {/each}
 *       <Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
 *     {/snippet}
 *   </Pagination.Root>
 *
 * That indirection is the point: Bits owns the ellipsis logic, the page range
 * and keyboard navigation, while the markup stays yours.
 *
 * `page` is bindable. Wrap the whole thing in `<nav aria-label="Pagination">`,
 * and give arrow-only Prev/Next buttons an `aria-label`.
 */

export { default as Root } from './PaginationRoot.svelte';
export { default as Page } from './PaginationPage.svelte';
export { default as PrevButton } from './PaginationPrevButton.svelte';
export { default as NextButton } from './PaginationNextButton.svelte';
