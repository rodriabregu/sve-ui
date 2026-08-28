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
