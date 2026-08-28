import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test, type Page } from '@playwright/test';

/*
	What this guards, and why it is not the structural render guard.

	`check-render.mjs` compares an element skeleton, so it catches a lost
	attribute or a reordered node and is blind to appearance. The regression that
	prompted this was invisible to it: in 0.6.1 the DateRangePicker trigger
	rendered exactly the right markup with no CSS reaching it. Same skeleton,
	unstyled control. Only pixels catch that.

	It screenshots `.preview__canvas` — the region where the docs render a live
	component — rather than whole pages. The previews are what regress, they are
	small enough to keep in git, and page chrome edits do not churn them.
*/

const BUILD = fileURLToPath(new URL('../.vercel/output/static', import.meta.url));

function componentPages(): string[] {
	const dir = join(BUILD, 'components');
	let entries: string[];
	try {
		entries = readdirSync(dir);
	} catch {
		throw new Error(
			`No build output at ${dir}. Run \`pnpm build\` in apps/docs first — this ` +
				'suite screenshots what was actually rendered.'
		);
	}
	const pages = entries
		.filter((e) => e.endsWith('.html') && statSync(join(dir, e)).isFile())
		.map((e) => e.replace(/\.html$/, ''))
		.sort();

	// A floor for the same reason check-render has one: a broken listing that
	// silently covers three pages would report success.
	if (pages.length < 40) {
		throw new Error(
			`Only ${pages.length} component pages found under ${dir}. That is too few to ` +
				'be a complete build; the listing is probably broken.'
		);
	}
	return pages;
}

/**
 * Baselines are byte-compared and Linux and macOS rasterise fonts differently,
 * so a macOS `--update-snapshots` would replace every baseline with one that CI
 * can never match. Refuse instead of producing that.
 */
const WRITING = process.argv.some((a) => a.startsWith('--update-snapshots') || a.startsWith('-u'));

if (WRITING && process.platform !== 'linux') {
	throw new Error(
		`Refusing to write screenshot baselines on ${process.platform}.\n\n` +
			'They are byte-compared and font rasterisation differs from Linux CI, so\n' +
			'baselines written here would fail every CI run. Regenerate them on Linux:\n' +
			'  gh workflow run visual-baselines.yml --ref <your-branch>\n' +
			'It commits the new baselines to that branch.'
	);
}

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.fonts.ready);
	// Bits UI ids and any enter transition are done by now; the config also
	// disables animations at screenshot time.
	await page.waitForTimeout(150);
}

for (const name of componentPages()) {
	test(`components/${name}`, async ({ page }) => {
		await page.goto(`/components/${name}`);
		await settle(page);

		const canvases = page.locator('.preview__canvas');
		const count = await canvases.count();

		// Every component page has at least one live preview. Zero means the page
		// stopped rendering its examples, which is exactly a regression.
		expect(count, `no .preview__canvas on /components/${name}`).toBeGreaterThan(0);

		// The docs default to dark. Capture that, then the light half through the
		// real toggle rather than by forcing a class the app would fight.
		for (let i = 0; i < count; i++) {
			await expect(canvases.nth(i)).toHaveScreenshot(`${name}-${i}-dark.png`);
		}

		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await settle(page);

		for (let i = 0; i < count; i++) {
			await expect(canvases.nth(i)).toHaveScreenshot(`${name}-${i}-light.png`);
		}
	});
}
