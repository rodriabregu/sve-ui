<script lang="ts">
	import { theme } from '$lib/theme';

	export let as:
		| 'p'
		| 'span'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'a'
		| 'abbr'
		| 'address'
		| 'b'
		| 'bdi'
		| 'bdo'
		| 'blockquote'
		| 'br'
		| 'var'
		| 'cite'
		| 'code'
		| 'del'
		| 'dfn'
		| 'em'
		| 'i'
		| 'ins'
		| 'kbd'
		| 'mark'
		| 'meter'
		| 'pre'
		| 'q'
		| 'div' = 'p';
	export let color = 'black';
	export let fontWeight: keyof typeof theme.fontWeights = 'normal';
	export let fontSize: keyof typeof theme.fontSizes = 'md';
	export let fontStyle = 'normal';
	export let textDecoration = 'none';
	export let letterSpacing: keyof typeof theme.letterSpacings = 'normal';
	export let lineHeight = 'normal';
	export let textAlign = 'left';
</script>

<svelte:element
	this={as}
	style={`
    font-size: ${theme.fontSizes[fontSize]};
    color: ${color};
    font-weight: ${theme.fontWeights[fontWeight]};
    font-style: ${fontStyle};
    text-decoration: ${textDecoration};
    letter-spacing: ${theme.letterSpacings[letterSpacing]};
    line-height: ${lineHeight};
    text-align: ${textAlign};
  `}
>
	<slot />
</svelte:element>
