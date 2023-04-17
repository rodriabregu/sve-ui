<script lang="ts">
	export let typeCodeLabel = 'Sve-UI';
	export let basic: Boolean = false;

	let copied = false;
	const copyToClipboard = async () => {
		try {
			const codeElement = document.querySelector('.code-box code');
			if (codeElement) {
				const text = codeElement.textContent;
				text && (await navigator.clipboard.writeText(text));
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 1500);
			}
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};
</script>

<pre class="code-box">
	{#if basic}
		<code>
    	<slot />
  	</code>
	{:else}
		<article class="button-copy">
		<span>{typeCodeLabel}</span>
		<button on:click={copyToClipboard}>
			{#if copied}
					<span>Copied</span>
				{:else}
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
						/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
					>
				<span>Copy</span>
				{/if}
		</button>
	</article>

  <code id="textCode" class={copied ? 'textCode' : ''}>
    <slot />
  </code>
	{/if}
</pre>

<style>
	.code-box {
		background-color: #070606;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		border-radius: 4px;
		max-width: 75ch;
		margin: 0 auto;
		color: #fffdfa;
		position: relative;
	}

	.code-box code {
		font-size: 0.9rem;
		font-family: 'Söhne Mono', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
		display: block;
		padding: 0 0.6rem;
		overflow: auto;
		transition: background-color 0.2s ease-in-out;
	}

	.textCode {
		background-color: #71c562;
		transition: background-color 0.2s ease-in-out;
	}

	.button-copy {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(52, 53, 65, 0.6);
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
		padding: 0.8rem;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	button {
		display: flex;
		gap: 0.5rem;
		cursor: pointer;
		background-color: transparent;
		border: none;
		color: #fffdfa;
		transition: background-color 0.2s ease-in-out;
	}

	button:hover {
		background-color: #71c56250;
		border-radius: 4px;
	}

	button:active {
		background-color: #71c562;
		border-radius: 4px;
	}

	@media only screen and (max-width: 768px) {
		.code-box {
			max-width: 100%;
		}

		.button-copy {
			padding: 0.8rem 1.8rem;
		}
	}
</style>
