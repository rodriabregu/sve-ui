---
'sve-ui': patch
---

Ship the agent skill inside the package.

`files` was `["dist"]`, so the tarball contained **zero** skill files — while the
docs site described the skill as something the package ships and told people to
copy it from a path an installed copy never had. Its whole purpose is that a
_consumer's_ agent writes correct `sve-ui` code, so it was useless living only in
this repo.

```bash
mkdir -p .claude/skills
cp -r node_modules/sve-ui/skills/sve-ui-usage .claude/skills/
```

Guarded by `check-package-files`, which asks `npm pack --dry-run --json` for the
real file list rather than reading the repo.
