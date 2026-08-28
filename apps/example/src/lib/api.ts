/**
 * A stand-in backend with real latency and real server-side validation.
 *
 * The latency is the point. The docs site renders everything synchronously from
 * a static registry, which is exactly why it never surfaced anything about
 * loading states — and why `aria-busy` appears in two components out of sixty.
 */

export interface Project {
	id: string;
	name: string;
	owner: string;
	budget: number;
}

const DB: Project[] = [
	{ id: 'p1', name: 'Atlas migration', owner: 'Ana', budget: 42000 },
	{ id: 'p2', name: 'Billing rewrite', owner: 'Bruno', budget: 18500 },
	{ id: 'p3', name: 'Search revamp', owner: 'Carla', budget: 7300 }
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function listProjects(): Promise<Project[]> {
	await sleep(900);
	return structuredClone(DB);
}

/** Field-keyed errors, the shape a real server sends back. */
export type FieldErrors = Partial<Record<'name' | 'owner' | 'budget', string>>;

export async function createProject(input: {
	name: string;
	owner: string;
	budget: string;
}): Promise<{ ok: true; project: Project } | { ok: false; errors: FieldErrors }> {
	await sleep(700);

	const errors: FieldErrors = {};
	if (input.name.trim().length < 3) errors.name = 'Use at least three characters.';
	if (DB.some((p) => p.name.toLowerCase() === input.name.trim().toLowerCase())) {
		errors.name = 'A project with that name already exists.';
	}
	if (!input.owner) errors.owner = 'Pick an owner.';
	const budget = Number(input.budget);
	if (!input.budget || Number.isNaN(budget) || budget <= 0) {
		errors.budget = 'Enter an amount greater than zero.';
	}

	if (Object.keys(errors).length > 0) return { ok: false, errors };

	const project: Project = {
		id: `p${DB.length + 1}`,
		name: input.name.trim(),
		owner: input.owner,
		budget
	};
	DB.push(project);
	return { ok: true, project };
}

export interface Asset {
	id: string;
	title: string;
	owner: string;
	kind: 'doc' | 'sheet' | 'image';
	updated: string;
}

const OWNERS = ['Ana', 'Bruno', 'Carla', 'Diego'];

const ASSETS: Asset[] = Array.from({ length: 34 }, (_, i) => ({
	id: `a${i + 1}`,
	title: `${['Brief', 'Report', 'Mockup', 'Contract', 'Budget'][i % 5]} ${i + 1}`,
	owner: OWNERS[i % OWNERS.length],
	kind: (['doc', 'sheet', 'image'] as const)[i % 3],
	updated: `2026-0${(i % 8) + 1}-1${i % 9}`
}));

export const assetOwners = OWNERS;

/** Server-side pagination and filtering — the client never holds the full set. */
export async function listAssets(options: {
	page: number;
	perPage: number;
	owner?: string;
}): Promise<{ rows: Asset[]; total: number }> {
	await sleep(800);
	const filtered = options.owner ? ASSETS.filter((a) => a.owner === options.owner) : ASSETS;
	const start = (options.page - 1) * options.perPage;
	return {
		rows: structuredClone(filtered.slice(start, start + options.perPage)),
		total: filtered.length
	};
}
