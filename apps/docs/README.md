# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

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
