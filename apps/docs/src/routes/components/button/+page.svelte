<script lang="ts">
	import { Button } from 'sve-ui';
</script>

<section>
	<h2>Button <Button /></h2>

	<h3>import</h3>
	<article>
		<span class="code">import {'{ Button }'} from 'sve-ui'</span>
	</article>

	<h3>Example</h3>
	<article>
		<span class="code"
			>{`<Button color="red" onClick={console.log('example')}>Example</Button>`}</span
		>
	</article>

	<h3>Props</h3>
	<article>
		<h4>label</h4>

		<div>
			<span>Description:</span> A label o title for the button.
		</div>

		<div>
			<span>Type:</span> string
		</div>

		<div>
			<span>Default:</span> 'Button'
		</div>
	</article>

	<article>
		<h4>onClick</h4>

		<div>
			<span>Description:</span> A function that will be executed when the button is clicked.
		</div>

		<div>
			<span>Type:</span> function
		</div>

		<div>
			<span>Default:</span>
			{'() => {}'}
		</div>
	</article>

	<article>
		<h4>color</h4>

		<div>
			<span>Description:</span> A color for the button.
		</div>

		<div>
			<span>Type:</span> 'blue', 'red', 'green'
		</div>

		<div>
			<span>Default:</span> 'blue'
		</div>
	</article>

	<article>
		<h4>size</h4>

		<div>
			<span>Description:</span> The size of the button.
		</div>

		<div>
			<span>Type:</span> 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'
		</div>

		<div>
			<span>Default:</span> 'md'
		</div>
	</article>

	<article>
		<h4>disabled</h4>

		<div>
			<span>Description:</span> A boolean that indicates if the button is disabled.
		</div>

		<div>
			<span>Type:</span> boolean
		</div>

		<div>
			<span>Default:</span> false
		</div>
	</article>

	<article>
		<h4>style</h4>

		<div>
			<span>Description:</span> A boolean that indicates if the button is disabled.
		</div>

		<div>
			<span>Type:</span> boolean
		</div>

		<div>
			<span>Default:</span> false
		</div>
	</article>

	<article>
		<h4>bg</h4>

		<div>
			<span>Description:</span> The background color of the button.
		</div>

		<div>
			<span>Type:</span> string
		</div>

		<div>
			<span>Default:</span> none
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
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 0.4rem;
	}

	.code {
		font-family: monospace;
		font-size: 1.2rem;
	}
</style>
