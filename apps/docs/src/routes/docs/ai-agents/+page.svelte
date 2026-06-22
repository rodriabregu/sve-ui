<script lang="ts">
	import DocPage from '$lib/docs/DocPage.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import { Code, Alert } from 'sve-ui';

	const crumb = { href: '/docs', label: 'Docs' };
	const REPO = 'https://github.com/rodriabregu/sve-ui';
	const toc: TocEntry[] = [
		{ id: 'why', label: 'Why a skill' },
		{ id: 'install', label: 'Add the skill' },
		{ id: 'encodes', label: 'What it encodes' },
		{ id: 'status', label: 'Status' }
	];

	const pathCode = `skills/sve-ui-usage/
├── SKILL.md              # runtime instruction contract
└── references/
    └── components.md     # full catalog + per-component snippets`;

	const useCode = `# Claude Code: copy the skill into your project (or user) skills dir
cp -r sve-ui/skills/sve-ui-usage .claude/skills/

# Then just ask your agent to build UI with sve-ui — it will
# follow the real API instead of guessing props.`;
</script>

<DocPage
	group="Guides"
	name="AI & Agents"
	description="A packaged skill so AI agents (Claude Code, Cursor, …) generate correct sve-ui code instead of hallucinating props."
	{toc}
	{crumb}
>
	<section id="why" class="sec">
		<h2 class="sec__h">Why a skill</h2>
		<p class="sec__p">
			LLMs guess component APIs. sve-ui ships an <strong>LLM-first skill</strong> that teaches an agent
			the real rules: the <code class="ic">theme.css</code> setup, single-vs-namespace imports, the
			Bits <code class="ic">child</code> snippet for overlay triggers, the body-class theming gotcha, and
			the <code class="ic">--sve-*</code> model. The result: generated code that compiles and matches the
			library.
		</p>
	</section>

	<section id="install" class="sec">
		<h2 class="sec__h">Add the skill</h2>
		<p class="sec__p">The skill lives in the repo:</p>
		<Code code={pathCode} label="skills/" />
		<p class="sec__p" style="margin-top: 16px;">
			Drop it into your agent's skills directory:
		</p>
		<Code code={useCode} label="Terminal" />
	</section>

	<section id="encodes" class="sec">
		<h2 class="sec__h">What it encodes</h2>
		<ul class="sec__list">
			<li>Import <code class="ic">sve-ui/theme.css</code> once; no Tailwind/config in the consumer.</li>
			<li>Single (default) vs namespace (<code class="ic">Dialog.*</code>, <code class="ic">Select.*</code>) imports.</li>
			<li>Overlays portal to <code class="ic">&lt;body&gt;</code> → mirror the theme class onto it.</li>
			<li>Custom overlay triggers use the Bits <code class="ic">child</code> snippet.</li>
			<li><code class="ic">Slider</code> uses <code class="ic">value</code> + <code class="ic">onValueChange</code> (+ <code class="ic">thumbLabel</code>); controls need accessible names.</li>
			<li>Theme via <code class="ic">--sve-*</code>; don't put Tailwind layout utilities on components.</li>
		</ul>
	</section>

	<section id="status" class="sec">
		<h2 class="sec__h">Status</h2>
		<Alert.Root color="default" variant="outline">
			<Alert.Title>Skill: available · llms.txt &amp; MCP: planned</Alert.Title>
			<Alert.Description>
				The skill ships in the repo today. A bundled <code class="ic">llms.txt</code> and an evaluation
				of an MCP server are on the roadmap (§12).
			</Alert.Description>
		</Alert.Root>
		<p class="sec__p" style="margin-top: 16px;">
			Source: <a class="lnk" href={REPO} target="_blank" rel="noopener">github.com/rodriabregu/sve-ui</a>.
		</p>
	</section>
</DocPage>

<style>
	.sec {
		margin-bottom: 48px;
		scroll-margin-top: 84px;
	}
	.sec__h {
		font-size: 21px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--doc-fg);
		margin: 0 0 6px;
	}
	.sec__p {
		margin: 0 0 16px;
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--doc-fg-muted);
	}
	.sec__list {
		margin: 0;
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.ic {
		font-family: var(--doc-mono);
		font-size: 0.85em;
		padding: 1px 5px;
		border-radius: 5px;
		background: var(--doc-surface-2);
		color: var(--doc-primary-text);
	}
	.lnk {
		color: var(--doc-primary-text);
		text-decoration: none;
		font-weight: 500;
	}
	.lnk:hover {
		text-decoration: underline;
	}
</style>
