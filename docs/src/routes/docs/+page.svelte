<svelte:head>
	<title>Docs - Sve-UI</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1>Docs</h1>
	<span>Documentation of Sve-UI</span>

	<h2>Install</h2>
	<span>Install Sve-UI with pnpm, npm or yarn: </span>
	<pre>
		<code>
			pnpm install sve-ui
			npm install sve-ui
			yarn install sve-ui
		</code>
	</pre>

	<h2>Use</h2>
	<span>Import named the components you want to use: </span>
	<pre>
		<code>
			{`import { Button } from 'sve-ui'`}

			{`<Button>Use this button</Button>`}
		</code>
	</pre>

	<h2>Components list (in progress):</h2>
	<ul>
		<li><a href="/components">All components</a></li>
		<li><a href="/components/button">Button</a></li>
		<li><a href="/components/codeexample">CodeExample</a></li>
		<li><a href="/components/box">Box</a></li>
		<li><a href="/components/text" class="disabled-link">Text</a></li>
		<li><a href="/components/link" class="disabled-link">Link</a></li>
		<li><a href="/components/flex">Flex</a></li>
		<li><a href="/components/center">Center</a></li>
		<li><a href="/components/spacer">Spacer</a></li>
		<li><a href="/components/square">Square</a></li>
		<li><a href="/components/circle">Circle</a></li>
		<li><a href="/components/grid" class="disabled-link">Grid</a></li>
		<li><a href="/components/badge" class="disabled-link">Badge</a></li>
		<li><a href="/components/code" class="disabled-link">Code</a></li>
		<li><a href="/components/divider" class="disabled-link">Divider</a></li>
		<li><a href="/components/list" class="disabled-link">List</a></li>
		<li><a href="/components/card" class="disabled-link">Card</a></li>
		<li><a href="/components/checkbox" class="disabled-link">Checkbox</a></li>
		<li><a href="/components/dropdown" class="disabled-link">Dropdown</a></li>
		<li><a href="/components/input" class="disabled-link">Input</a></li>
		<li><a href="/components/radio" class="disabled-link">Radio</a></li>
		<li><a href="/components/select" class="disabled-link">Select</a></li>
		<li><a href="/components/switch" class="disabled-link">Switch</a></li>
		<li><a href="/components/textarea" class="disabled-link">Textarea</a></li>
		<li><a href="/components/avatar" class="disabled-link">Avatar</a></li>
		<li><a href="/components/icon" class="disabled-link">Icon</a></li>
		<li><a href="/components/image" class="disabled-link">Image</a></li>
		<li><a href="/components/alert" class="disabled-link">Alert</a></li>
		<li><a href="/components/toast" class="disabled-link">Toast</a></li>
		<li><a href="/components/navbar" class="disabled-link">Navbar</a></li>
		<li><a href="/components/tooltips" class="disabled-link">Tooltips</a></li>
		<li><a href="/components/cmdPalette" class="disabled-link">Command Palette</a></li>
	</ul>
</div>

<style>
	.disabled-link {
		color: #888888;
		pointer-events: none;
	}
</style>
