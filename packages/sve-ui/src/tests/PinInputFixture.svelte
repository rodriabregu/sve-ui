<script lang="ts">
  import * as PinInput from '$lib/components/PinInput/index.js';

  let value = $state('');
  let completed = $state('');
</script>

<!--
  The real input's id is Bits-internal and unpredictable, so `<label for>` has
  nothing to point at. A VISIBLE label is still possible: give it an id and
  reference it with `aria-labelledby` on Root, which the spread forwards to the
  input.
-->
<span id="otp-label">Verification code</span>
<PinInput.Root
  bind:value
  maxlength={6}
  aria-labelledby="otp-label"
  onComplete={(v: string) => (completed = v)}
>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}
      <PinInput.Cell {cell} />
    {/each}
  {/snippet}
</PinInput.Root>
<output data-testid="value">{value}</output>
<output data-testid="completed">{completed}</output>
