<div align="center">

# Sve·UI

**Styled, accessible Svelte 5 components — zero config.**

[![npm](https://img.shields.io/npm/v/sve-ui?color=F56565)](https://www.npmjs.com/package/sve-ui)
[![CI](https://github.com/rodriabregu/sve-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/rodriabregu/sve-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/sve-ui?color=F56565)](./LICENSE)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00)](https://svelte.dev)

</div>

A library of ready-made, fully **styled** and fully **accessible** Svelte 5
components built on [Bits UI](https://bits-ui.com). **No Tailwind, no config** in
your project — install, import the stylesheet, and theme everything with CSS
custom properties.

```sh
pnpm add sve-ui
```

➡️ **Usage, components and theming:** see the [package README](./packages/sve-ui/README.md).

## Upgrading from 0.1.x

`0.2.0` was a rewrite, not an upgrade, and it is Svelte 5 only. See
[MIGRATION.md](./MIGRATION.md) for what each old export maps to and what was
removed on purpose.

## Repository

This is a [pnpm](https://pnpm.io) + [Turborepo](https://turborepo.dev) monorepo.

```
packages/
  sve-ui/            # the published library (Svelte 5 + Bits UI)
  eslint-config/     # shared @repo/eslint-config (flat config)
  typescript-config/ # shared @repo/typescript-config
apps/
  docs/              # documentation site (SvelteKit 2 + Tailwind 4) → sveui.org
```

Shared dependency versions live in the pnpm **catalog** in `pnpm-workspace.yaml`
(single source of truth). pnpm is mandatory (`preinstall` enforces it).

## Development

```sh
pnpm install          # install the workspace
pnpm dev              # run dev tasks (docs at localhost:5173)
pnpm build            # build all packages (turbo)
pnpm lint             # eslint (.svelte) + oxlint (.ts/.js)
pnpm check            # svelte-check
pnpm test             # vitest
```

Linting is hybrid: **Oxlint** for `.ts`/`.js`, **eslint-plugin-svelte** for
`.svelte` templates.

## Releasing

Versioning and publishing use [Changesets](https://github.com/changesets/changesets)
with npm **Trusted Publishing (OIDC)** — no tokens, automatic provenance.

1. Add a changeset describing your change: `pnpm changeset`
2. Merge to `main` → a **"Version Packages"** PR is opened automatically.
3. Merge that PR → the library is built, validated and published to npm.

## License

[MIT](./LICENSE) © Rodrigo Abregu
