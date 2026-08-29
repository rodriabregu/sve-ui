# docs

The documentation site for `sve-ui` — [sveui.org](https://sveui.org). SvelteKit 2
with Tailwind 4, fully prerendered, deployed on Vercel.

Tailwind is used **here only**, for page chrome. It is deliberately absent from
the library and from consumer projects; that is the whole pitch.

```sh
pnpm dev              # localhost:5173
pnpm build            # prerenders every route into .vercel/output/static
pnpm preview
```

## What is generated, and from what

Nothing on this site states a fact twice. Anything that could drift is derived
from a single source, because it already drifted once: a hardcoded "13
components" shipped against a registry of 58.

| Output                         | Source                                                                                              | Command                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Prop tables                    | the library's TypeScript types, via the compiler's checker (so inherited Bits UI props resolve too) | `pnpm gen:props` — runs on `build` |
| `/sitemap.xml`                 | `src/lib/docs/registry.ts` + `src/lib/docs/guides.ts`                                               | prerendered on `build`             |
| `/llms.txt`                    | the same registry and guide nav                                                                     | prerendered on `build`             |
| Component counts on every page | `readyComponents` from the registry                                                                 | —                                  |
| `static/og.png` (social card)  | `scripts/gen-og.mjs`, rendered with Playwright's Chromium                                           | `pnpm gen:og`                      |

`gen:og` is **not** part of `build` — the Vercel builder has no browser — so the
PNG is committed. Re-run it after changing the tagline, the count or the
branding.

## Guards

```sh
pnpm check:render     # structural: element skeleton of all prerendered pages
pnpm test:visual      # appearance: screenshots of every live preview
pnpm gen:props:check   # fails if the committed prop data is stale
```

`check:render` compares an ordered element skeleton (attribute values and text
dropped) against `render-baseline.json`, so copy edits are free while a changed
tag, a lost attribute or a reordered element fails. Accept an intended
structural change with `pnpm check:render:update`.

## Visual regression

`tests/visual.spec.ts` screenshots every component page's live previews — the
`.preview__canvas` regions — in both themes, and compares them to committed
baselines in `tests/__screenshots__/`.

It exists because the structural guard cannot see appearance. `check:render`
compares an element skeleton, so in 0.6.1 the `DateRangePicker` trigger rendered
exactly the right markup with no CSS reaching it: same skeleton, unstyled
control, guard green. Only pixels catch that.

### Baselines are Linux-only, and that is enforced

They are byte-compared, and Linux and macOS rasterise fonts differently, so a
baseline written on a laptop fails every CI run. So:

- The suite **throws** if asked to write baselines on anything but Linux.
- `updateSnapshots` is `none`, because Playwright's default silently _writes_ a
  missing baseline during an ordinary run and reports a pass. That default
  produced eight unusable macOS baselines here before it was caught.
- The only sanctioned path is the `visual-baselines` workflow.

### Accepting a visual change

A failing visual check means one of two things, and only you can say which.

**It is a regression** — fix the component. The failed run uploads a
`visual-diff` artifact with the expected, actual and diff images.

**It is intended** — regenerate the baselines and review the image diff in the
pull request:

```sh
gh workflow run visual-baselines.yml --ref <your-branch> -f reason="<what changed and why>"
```

It builds the docs, writes the baselines on ubuntu, then **runs the comparison
again against what it just wrote**. Captures that do not reproduce on the very
same runner never reach a commit. The result is pushed to your branch, so the
new PNGs land in the PR as a reviewable diff rather than appearing silently.

### Running it locally

```sh
pnpm build            # the suite screenshots the prerendered output
pnpm exec playwright install chromium
pnpm test:visual
```

On macOS this compares your rendering against Linux baselines, so expect
font-level differences. It is useful for catching a component that vanished or
lost its styling entirely; it is not useful for judging a few pixels.
