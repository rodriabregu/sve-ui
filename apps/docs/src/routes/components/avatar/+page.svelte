<script lang="ts">
	import { Avatar } from 'sve-ui';
	import DocPage from '$lib/docs/DocPage.svelte';
	import Preview from '$lib/docs/Preview.svelte';
	import PropsTable from '$lib/docs/PropsTable.svelte';
	import type { TocEntry } from '$lib/docs/DocPage.svelte';
	import type { PropRow } from '$lib/docs/PropsTable.svelte';
	import { componentBySlug } from '$lib/docs/registry';

	const meta = componentBySlug.avatar;

	const toc: TocEntry[] = [
		{ id: 'usage', label: 'Usage' },
		{ id: 'sizes', label: 'Sizes' },
		{ id: 'shapes', label: 'Shapes' },
		{ id: 'fallback', label: 'Fallback' },
		{ id: 'props', label: 'Props' }
	];

	const rootProps: PropRow[] = [
		{ prop: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'` },
		{ prop: 'shape', type: `'circle' | 'square'`, default: `'circle'` },
		{ prop: 'class', type: 'string', description: 'Extra classes merged onto the root.' },
		{ prop: 'children', type: 'Snippet', description: 'Avatar.Image and/or Avatar.Fallback.' }
	];

	const imageProps: PropRow[] = [
		{ prop: 'src', type: 'string', description: 'Image URL.' },
		{ prop: 'alt', type: 'string', description: 'Required. Describes the image for screen readers.' },
		{ prop: 'class', type: 'string', description: 'Extra classes.' }
	];

	const fallbackProps: PropRow[] = [
		{ prop: 'class', type: 'string', description: 'Extra classes.' },
		{ prop: 'children', type: 'Snippet', description: 'Fallback content, typically initials.' }
	];

	const usageCode = `<script>
  import { Avatar } from 'sve-ui';
<\/script>

<Avatar.Root>
  <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="Jane Doe" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>`;

	const sizesCode = `<Avatar.Root size="sm">
  <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
  <Avatar.Fallback>SM</Avatar.Fallback>
</Avatar.Root>
<Avatar.Root size="md">
  <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
  <Avatar.Fallback>MD</Avatar.Fallback>
</Avatar.Root>
<Avatar.Root size="lg">
  <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
  <Avatar.Fallback>LG</Avatar.Fallback>
</Avatar.Root>`;

	const shapesCode = `<!-- Circle (default) -->
<Avatar.Root size="lg" shape="circle">
  <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
  <Avatar.Fallback>CR</Avatar.Fallback>
</Avatar.Root>

<!-- Square -->
<Avatar.Root size="lg" shape="square">
  <Avatar.Fallback>SQ</Avatar.Fallback>
</Avatar.Root>`;

	const fallbackCode = `<!-- Fallback shows when no image is provided or image fails to load -->
<Avatar.Root size="md">
  <Avatar.Fallback>RA</Avatar.Fallback>
</Avatar.Root>

<!-- With broken image — fallback kicks in automatically -->
<Avatar.Root size="md">
  <Avatar.Image src="https://example.invalid/avatar.jpg" alt="User" />
  <Avatar.Fallback>PF</Avatar.Fallback>
</Avatar.Root>`;
</script>

<DocPage group={meta.group} name={meta.name} description={meta.blurb} {toc}>
	<section id="usage" class="sec">
		<h2 class="sec__h">Usage</h2>
		<p class="sec__p">
			Compose <code class="ic">Avatar.Root</code>, <code class="ic">Avatar.Image</code>, and
			<code class="ic">Avatar.Fallback</code> together. The fallback renders automatically when the
			image is absent or fails to load.
		</p>
		<Preview code={usageCode}>
			<Avatar.Root>
				<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="Jane Doe" />
				<Avatar.Fallback>JD</Avatar.Fallback>
			</Avatar.Root>
		</Preview>
	</section>

	<section id="sizes" class="sec">
		<h2 class="sec__h">Sizes</h2>
		<p class="sec__p">Three sizes via the <code class="ic">size</code> prop on <code class="ic">Avatar.Root</code>.</p>
		<Preview code={sizesCode}>
			<Avatar.Root size="sm">
				<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
				<Avatar.Fallback>SM</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="md">
				<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
				<Avatar.Fallback>MD</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="lg">
				<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
				<Avatar.Fallback>LG</Avatar.Fallback>
			</Avatar.Root>
		</Preview>
	</section>

	<section id="shapes" class="sec">
		<h2 class="sec__h">Shapes</h2>
		<p class="sec__p">
			<code class="ic">circle</code> (default) or <code class="ic">square</code> via the
			<code class="ic">shape</code> prop.
		</p>
		<Preview code={shapesCode}>
			<Avatar.Root size="lg" shape="circle">
				<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User" />
				<Avatar.Fallback>CR</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="lg" shape="square">
				<Avatar.Fallback>SQ</Avatar.Fallback>
			</Avatar.Root>
		</Preview>
	</section>

	<section id="fallback" class="sec">
		<h2 class="sec__h">Fallback</h2>
		<p class="sec__p">
			<code class="ic">Avatar.Fallback</code> renders when no image is provided or when the image
			fails to load. Typically used with initials.
		</p>
		<Preview code={fallbackCode}>
			<Avatar.Root size="md">
				<Avatar.Fallback>RA</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="md">
				<Avatar.Image src="https://example.invalid/avatar.jpg" alt="User" />
				<Avatar.Fallback>PF</Avatar.Fallback>
			</Avatar.Root>
		</Preview>
	</section>

	<section id="props" class="sec">
		<h2 class="sec__h">Props</h2>
		<p class="sec__p"><code class="ic">Avatar.Root</code></p>
		<PropsTable rows={rootProps} />
		<p class="sec__p" style="margin-top: 24px;"><code class="ic">Avatar.Image</code></p>
		<PropsTable rows={imageProps} />
		<p class="sec__p" style="margin-top: 24px;"><code class="ic">Avatar.Fallback</code></p>
		<PropsTable rows={fallbackProps} />
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
</style>
