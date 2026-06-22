## What & why

<!-- One or two sentences: what this changes and why it matters. -->

## Review path

<!-- Where should a reviewer start? What's intentionally out of scope?
     Link the previous/next PR if this is part of a chain. -->

## Checklist

- [ ] Tests added/updated and passing (`pnpm test`)
- [ ] `pnpm lint && pnpm check && pnpm build` all green
- [ ] Changeset included for user-facing changes (`pnpm changeset`)
- [ ] Docs updated (README / components page) if the public API changed
- [ ] No Tailwind / config required in consumer projects (styles via `--sve-*`)
