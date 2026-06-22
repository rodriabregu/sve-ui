# Contributing to Sve·UI

Thanks for helping! This guide takes you from clone to merged PR.

## Quick path

1. Fork and clone, then `pnpm install` (pnpm is required — `npm`/`yarn` are blocked).
2. Branch off `main`.
3. Make your change **and a test** for it.
4. Run `pnpm changeset` to describe the change (see [Changesets](#changesets)).
5. Verify locally — all green:
   ```sh
   pnpm build && pnpm lint && pnpm check && pnpm test
   ```
6. Open a PR to `main`. CI runs the same four checks.

## Setup

| Requirement | Version                                        |
| ----------- | ---------------------------------------------- |
| Node        | `>= 22.14`                                     |
| pnpm        | `>= 11` (Corepack-pinned via `packageManager`) |

Repo layout and dev scripts are documented in the [README](./README.md#repository).

## Project conventions

| Area            | Convention                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Package manager | **pnpm only.** A `preinstall` guard rejects `npm`/`yarn`.                                             |
| Styling         | Scoped Svelte `<style>` reading `--sve-*` CSS variables. **No Tailwind** in the library.              |
| Components      | Svelte 5 runes. Interactive/overlay components wrap [Bits UI](https://bits-ui.com) for accessibility. |
| Linting         | Hybrid: **Oxlint** for `.ts`/`.js`, **eslint-plugin-svelte** for `.svelte`.                           |
| Commits         | [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`, …).            |
| Tests           | Vitest + `@testing-library/svelte`. One test per component (render, props, variants, behavior).       |

## Adding a component

1. Create `packages/sve-ui/src/lib/components/<Name>/` with the component (+ a namespace `index.ts` for composed/Bits-backed components).
2. Style it with `--sve-*` tokens only — light and dark must both work.
3. Export it from `packages/sve-ui/src/lib/index.ts`.
4. Add a test + fixture under `packages/sve-ui/src/tests/`.
5. Document it on the docs `components` page and in the package README.

## Changesets

Anything user-facing needs a changeset so the version bumps and the changelog updates:

```sh
pnpm changeset      # pick patch / minor / major + write a summary
```

Commit the generated file with your change. Docs-only or internal-tooling changes that don't affect the published package don't need one.

## Submitting a PR

- [ ] Tests added/updated and passing
- [ ] `pnpm lint && pnpm check && pnpm build` all green
- [ ] A changeset is included (for user-facing changes)
- [ ] Docs updated (README / components page) if the public API changed

A maintainer reviews, then merges. On merge to `main`, Changesets opens a **"Version Packages"** PR; merging that publishes to npm automatically.

## Reporting bugs & requesting features

Use the [issue templates](https://github.com/rodriabregu/sve-ui/issues/new/choose). Please include a minimal reproduction for bugs.

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
