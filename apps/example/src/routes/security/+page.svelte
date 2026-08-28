<script lang="ts">
	import {
		Alert,
		AlertDialog,
		Busy,
		Button,
		Checkbox,
		Code,
		Dialog,
		Field,
		Heading,
		Input,
		Label,
		Meter,
		PinInput,
		Progress,
		RadioGroup,
		Separator,
		Switch,
		Tabs,
		Text,
		toast
	} from 'sve-ui';

	/*
		The PinInput here is the point. It showed nothing you typed in every published
		version, and this example never rendered one — so it never noticed.
	*/

	let code = $state('');
	let verifying = $state(false);
	let verified = $state(false);
	let codeError = $state<string | undefined>(undefined);

	let twoFactor = $state(true);
	let emailAlerts = $state(false);
	let sessionPolicy = $state('30');
	let acceptTerms = $state(false);
	let password = $state('');

	const strength = $derived(
		Math.min(100, password.length * 12 + (/[^a-z]/i.test(password) ? 20 : 0))
	);

	async function verify(value: string) {
		verifying = true;
		codeError = undefined;
		await new Promise((r) => setTimeout(r, 900));
		verifying = false;

		if (value !== '123456') {
			codeError = 'That code did not match. Check your authenticator app.';
			return;
		}
		verified = true;
		toast.success('Two-factor verified');
	}
</script>

<Heading level={1} size="lg">Security</Heading>
<Text color="secondary">Verification, session policy, and the destructive bits.</Text>

<Tabs.Root value="verify">
	<Tabs.List aria-label="Security settings">
		<Tabs.Trigger value="verify">Verification</Tabs.Trigger>
		<Tabs.Trigger value="policy">Policy</Tabs.Trigger>
		<Tabs.Trigger value="danger">Danger zone</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="verify">
		<div class="stack">
			{#if verified}
				<Alert.Root color="success">
					<Alert.Title>Verified</Alert.Title>
					<Alert.Description>This device is trusted for 30 days.</Alert.Description>
				</Alert.Root>
			{:else}
				<Field
					label="Six-digit code"
					description="From your authenticator app. It submits itself once complete."
					error={codeError}
					required
				>
					{#snippet control(props)}
						<Busy busy={verifying} label="Checking the code" doneLabel="Code checked">
							<PinInput.Root
								{...props}
								bind:value={code}
								maxlength={6}
								invalid={codeError !== undefined}
								onComplete={verify}
							>
								{#snippet children({ cells })}
									{#each cells as cell, i (i)}
										<PinInput.Cell {cell} />
									{/each}
								{/snippet}
							</PinInput.Root>
						</Busy>
					{/snippet}
				</Field>

				<Text size="sm" color="secondary">The code that works is 123456</Text>
				<Code code="123456" />
			{/if}
		</div>
	</Tabs.Content>

	<Tabs.Content value="policy">
		<div class="stack">
			<div class="row">
				<Switch.Root bind:checked={twoFactor} aria-labelledby="tf-label" />
				<Label id="tf-label">Require two-factor on every sign-in</Label>
			</div>

			<div class="row">
				<Switch.Root bind:checked={emailAlerts} aria-labelledby="ea-label" />
				<Label id="ea-label">Email me about new sign-ins</Label>
			</div>

			<Separator />

			<Field label="Sign out inactive sessions after" description="Minutes of inactivity.">
				{#snippet control(props)}
					<RadioGroup.Root {...props} bind:value={sessionPolicy} aria-label="Session timeout">
						<div class="row">
							<RadioGroup.Item value="15" aria-label="15 minutes" /><Label>15</Label>
						</div>
						<div class="row">
							<RadioGroup.Item value="30" aria-label="30 minutes" /><Label>30</Label>
						</div>
						<div class="row">
							<RadioGroup.Item value="120" aria-label="2 hours" /><Label>120</Label>
						</div>
					</RadioGroup.Root>
				{/snippet}
			</Field>

			<Separator />

			<Field label="New password" description="Strength is shown as you type.">
				{#snippet control(props)}
					<Input {...props} type="password" bind:value={password} />
				{/snippet}
			</Field>

			<Meter value={strength} max={100} aria-label="Password strength" />
			<Progress value={strength} max={100} aria-label="Setup progress" />

			<div class="row">
				<Checkbox.Root bind:checked={acceptTerms} aria-labelledby="terms-label" />
				<Label id="terms-label">I understand these apply to every device</Label>
			</div>

			<Button color="primary" disabled={!acceptTerms} onclick={() => toast.success('Policy saved')}>
				Save policy
			</Button>
		</div>
	</Tabs.Content>

	<Tabs.Content value="danger">
		<div class="stack">
			<Alert.Root color="warning">
				<Alert.Title>These cannot be undone</Alert.Title>
				<Alert.Description>Both actions ask for confirmation first.</Alert.Description>
			</Alert.Root>

			<Dialog.Root>
				<Dialog.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline">Export my data</Button>
					{/snippet}
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Title>Export my data</Dialog.Title>
					<Dialog.Description>We will email a link when the archive is ready.</Dialog.Description>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button {...props} color="primary" onclick={() => toast('Export queued')}>
								Start export
							</Button>
						{/snippet}
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>

			<AlertDialog.Root>
				<AlertDialog.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline" color="danger">Delete account</Button>
					{/snippet}
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Delete this account?</AlertDialog.Title>
					<AlertDialog.Description>
						Every project and every export goes with it. This cannot be undone.
					</AlertDialog.Description>
					<AlertDialog.Cancel>Keep the account</AlertDialog.Cancel>
					<AlertDialog.Action onclick={() => toast.error('Account deleted')}>
						Delete it
					</AlertDialog.Action>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</Tabs.Content>
</Tabs.Root>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--sve-space-4);
		align-items: flex-start;
		padding-top: var(--sve-space-4);
		max-width: 30rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
	}
</style>
