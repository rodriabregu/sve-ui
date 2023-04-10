<script>
	export let typeCodeLabel = 'Sve-UI';

	let copied = false;
	let text = globalThis?.document?.getElementById('textCode')?.innerHTML || '';

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};
</script>

<section class="code-box">
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

	<pre>
    <code id="textCode" class={copied ? 'textCode' : ''}>
      <slot />
    </code>
  </pre>
</section>

<style>
	.code-box {
		background-color: #070606;
		border-radius: 4px;
		max-width: 75ch;
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
		margin: 0 auto;
	}

	.code-box pre code {
		font-size: 0.9rem;
		font-family: 'Söhne Mono', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
		color: #fffdfa;
	}

	.textCode {
		background-color: #71c562;
	}

	button {
		display: flex;
		margin-left: auto;
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

	.button-copy {
		display: flex;
		align-items: center;
		background-color: rgba(52, 53, 65, 0.6);
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
		padding: 0.8rem;
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
