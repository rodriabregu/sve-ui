# Verification Report — phase1-foundation

**Change:** phase1-foundation
**Mode:** hybrid (Engram id 612 + this file)
**Date:** 2026-06-20
**Branch:** feat/2026-rebuild
**Verdict:** PASS WITH WARNINGS

---

## Evidence — Command Execution

| Command | Result |
|---------|--------|
| `pnpm --filter sve-ui test` | 22/22 tests, 5 suites — GREEN |
| `pnpm --filter sve-ui check` | 770 files, 0 errors, 0 warnings — GREEN |
| `pnpm --filter sve-ui build` | vite build + svelte-package + publint — GREEN |
| `publint` (standalone) | 0 errors, 1 suggestion (git URL format) — GREEN |

---

## Task Completeness

All 26 tasks (WU-1 through WU-7) are marked `[x]` in `tasks.md`. No unchecked tasks. **26/26 complete.**

---

## Spec Compliance Matrix

| Requirement | Status | Notes |
|-------------|--------|-------|
| §1.1 `--sve-*` namespace | PASS | All tokens use `--sve-` prefix exclusively |
| §1.2 Six color roles | PASS | primary, secondary, success, warning, danger, default — all present |
| §1.2 Sub-tokens (foreground, surface, border) | PASS | All four sub-tokens per role |
| §1.3 Spacing `--sve-space-1..16` | PASS | 10 stops in theme.css |
| §1.3 Radius tokens | PASS | none/sm/md/lg/full |
| §1.3 Typography tokens | PASS | All font-family/size/weight/line-height tokens present |
| §1.4 Light + dark sets | PASS | :root (light), @media + :where(.dark) (dark) |
| §1.5 `sve-ui/theme` typed exports | PASS | lightTokens, darkTokens, SveTheme, palette scales |
| §2.1 ThemeProvider props | PASS | theme, colorScheme, class, children — all declared |
| §2.2 Synthesis model | PASS | div.sve-theme + class:dark/light + inline vars only when theme prop given |
| §2.3 SSR safety | PASS | No window/document usage; themeToVars is pure |
| §2.4 Consumer override | PASS | CSS cascade; scoped with :where() |
| §3.1 Three variant axes | PASS | variant × color × size |
| §3.1 Variant name 'outlined' | **WARNING** | Spec says `'outlined'`, implementation uses `'outline'` (design also uses `'outline'`) |
| §3.2 Returns class string | PASS | defineVariants returns joined string |
| §3.3 No `any` in public surface | PASS | Fully generic types; no any |
| §3.3 Default = solid/default/md | **WARNING** | Spec says default color is `'default'`; Button.svelte uses `color: 'primary'` |
| §3.4 Exportable helper | PASS | defineVariants exported from main index |
| §4.1 exports map | PASS | Exact spec shape; ./theme.css bonus |
| §4.2 peerDeps svelte ^5 | PASS | Confirmed in package.json |
| §4.2 bits-ui in dependencies | PASS | `"bits-ui": "2.18.1"` |
| §4.2 devDeps use catalog: | PASS | All major devDeps use catalog: |
| §4.3 dist/ contents | PASS | index.js, index.d.ts, theme/index.js, theme/index.d.ts, theme.css, *.svelte.d.ts |
| §4.3 publint zero errors | PASS | 0 errors |
| §5.1 Native `<button>` | PASS | Root element is `<button>` |
| §5.1 Variant×color×size via helper | PASS | defineVariants used; classes correct |
| §5.1 onclick + native attrs forwarded | PASS | onclick guarded by disabled; {...rest} spreads |
| §5.1 disabled: native attr + cursor:not-allowed | PASS | Confirmed in CSS + test |
| §5.1 Snippet children | PASS | `{@render children?.()}` |
| §5.1 No Tailwind classes | PASS | Test verifies; none present |
| §5.1 Accessible name | PASS | Native button + snippet content |
| §5.2 Styled wrapper over bits-ui | PASS | Compose pattern confirmed |
| §5.2 role=dialog + aria-modal | PASS | Bits UI provides; test confirms |
| §5.2 Portal | PASS | Dialog.Portal inside DialogContent |
| §5.2 ESC dismiss | PASS | Test green |
| §5.2 Overlay click dismiss | ACCEPTED DEVIATION | jsdom cannot test; documented; Escape path tested instead. E2E scope. |
| §5.2 Focus trap | ACCEPTED (jsdom limited) | Focus-move-from-trigger confirmed; Tab-cycle is browser scope |
| §5.3 Full chain | PASS | All three commands pass under `--filter sve-ui` |

---

## Issues

### WARNING 1 — Spec variant name 'outlined' vs implementation 'outline'

- **File:** `packages/sve-ui/src/lib/components/Button/Button.svelte:24`
- **Spec §3.1** says `'solid' | 'outlined' | 'ghost' | 'flat'`.
- **Implementation** uses `'outline'` (no trailing "d"). The design document also uses `'outline'`.
- Not a runtime failure. The spec should be updated to match the design/implementation, or vice versa. Before public release, this naming must be settled consistently.

### WARNING 2 — Button default color is 'primary', spec §3.3 says 'default'

- **File:** `packages/sve-ui/src/lib/components/Button/Button.svelte:45`
- **Spec §3.3** states the no-argument baseline is `{ variant: 'solid', color: 'default', size: 'md' }`.
- **Implementation** uses `color: 'primary'` as the default. The helper itself is configurable and correct; the mismatch is in the Button's usage.
- Tests pass against the implementation. This may be intentional UX (primary is more visible), but contradicts the spec literally.

### WARNING 3 — Test files and DialogFixture.svelte shipped in dist/

- **Files:** `dist/ThemeProvider.test.js`, `dist/components/Button/Button.test.js`, `dist/components/Dialog/Dialog.test.js`, `dist/internal/variants.test.js`, `dist/smoke.test.js`, `dist/components/Dialog/DialogFixture.svelte`
- `svelte-package` copies everything from `src/lib` without filtering. None of these are reachable via the exports map, but they inflate package size and expose test internals.
- **Fix:** Add exclusion rules to `svelte.config.js` or a `.sveltepkg` config to filter out `*.test.*` and `*Fixture.svelte` from the package output.

### WARNING 4 — Old flat theme files remain in src/lib/theme and compile into dist/theme

- **Files:** `src/lib/theme/breakpoints.ts`, `spacing.ts`, `radius.ts`, `typography.ts`, `sizes.ts`
- Task 1.2 targeted component directories; these Svelte 3-era flat theme files were not removed.
- They are NOT exported from `theme/index.ts` and NOT in the exports map — consumers cannot import them via public subpaths. No functional impact, but they increase package size.

### SUGGESTION 1 — pkg.repository.url format

`publint` suggests `git+https://github.com/rodriabregu/sve-ui.git` over the bare HTTPS URL. Cosmetic; non-blocking.

### SUGGESTION 2 — Button children test doesn't assert actual content projection

- **File:** `packages/sve-ui/src/lib/components/Button/Button.test.ts:35-43`
- The "snippet children are rendered as the accessible label" test renders a Button with no children content and only checks the button element exists. The scenario is not fully covered as written.

### SUGGESTION 3 — Type-level test file for scenario K

`@ts-expect-error` in `variants.test.ts` covers type safety. A dedicated `*.test-d.ts` file using `expectTypeOf` or `assertType` would be more robust and conventional for library type testing.

---

## Accepted Deviations (confirmed real, confirmed acceptable)

1. **Overlay-click dismiss in jsdom:** Bits UI DismissibleLayer uses 10ms debounce + composed-path inspection that jsdom cannot simulate. Test documents this and covers Escape dismiss + structural overlay invariant. Playwright e2e is the right venue. Spec note explicitly acknowledges this.

2. **apps/docs excluded from root build:** `apps/docs` is Svelte 3 and out of scope (Phase 3). Root-level `pnpm build` fails because of docs only. `--filter sve-ui` chain is fully green. Confirmed acceptable per spec §6.

---

## Final Verdict: PASS WITH WARNINGS

- **0 CRITICAL**
- **4 WARNINGS** (2 naming-spec deviations, 2 dist hygiene issues)
- **3 SUGGESTIONS** (cosmetic/quality)

The package is functionally correct. The full chain passes: 22/22 tests, 0 type errors, 0 build errors, 0 publint errors. No blocking issues prevent committing.

**Next recommended:** `sdd-archive` (accepting the WARNINGs as cleanup items for the next phase) or address WARNINGs 1-2 (naming alignment) before archiving.
