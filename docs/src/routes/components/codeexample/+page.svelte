<script lang="ts">
	import { CodeExample } from 'sve-ui';
</script>

<section>
	<h2>Code Example component</h2>
	<CodeExample />

	<h3>import</h3>
	<article>
		<CodeExample>import {'{ CodeExample }'} from 'sve-ui'</CodeExample>
	</article>

	<h3>Example</h3>
	<article>
		<CodeExample>{`<CodeExample>import {'{ Button }'} from 'sve-ui'</CodeExample>`}</CodeExample>
	</article>

	<h3>Props:</h3>
	<article>
		<h4>typeCodeLabel</h4>

		<div>
			<span>Description:</span> The type code label text, show in the top of the code example component.
		</div>

		<div>
			<span>Type:</span> string | undefined
		</div>

		<div>
			<span>Default:</span> 'Sve-UI'
		</div>
	</article>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		padding: 0 4rem;
	}

	h2 {
		width: 100%;
		font-size: 3rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	article {
		margin-bottom: 4rem;
		gap: 0.6rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 0.4rem;
	}
</style>
