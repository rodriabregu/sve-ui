<!-- <script>
  export let type = 'button';
  export let disabled = false;
  export let variant = 'primary';
  export let size = 'medium';
  export let icon = null;
  export let iconPosition = 'left';
  export let iconOnly = false;
  export let loading = false;
  export let loadingText = 'Loading...';
  export let loadingIcon = 'spinner';
  export let loadingIconPosition = 'left';
  export let loadingIconOnly = false;
  export let loadingVariant = 'primary';
  export let loadingSize = 'medium';
  export let loadingDisabled = true;
  export let loadingType = 'button';
  export let loadingClass = '';
  export let loadingStyle = '';
  export let loadingAttributes = {};
  export let className = '';
  export let style = '';
  export let attributes = {};
</script>

{#if loading}
  <button
    type={'button'}
    disabled={loadingDisabled}
    class={loadingClass}
    style={loadingStyle}
    {...loadingAttributes}
  >
    {loadingText}
  </button>
{:else}
  <button
    {type}
    {disabled}
    class="button {variant} {size} {icon ? 'icon' : ''} {iconOnly
      ? 'icon-only'
      : ''} {iconPosition} {className}"
    {style}
    {...attributes}
  >
    {#if icon}
      <Icon name={icon} />
    {/if}
    <slot />
  </button>
{/if} -->
<script lang="ts">
  export let label = 'Button';
  export let onClick = () => {};
  export let color = 'blue';
  export let size = 'medium';
  export let disabled = false;
  // export let variant = 'primary';
</script>

<button class={`button ${color} ${size}`} on:click={onClick} {disabled}>
  <slot>{label}</slot>
</button>

<style>
  .button {
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
    cursor: pointer;
  }

  .blue {
    background-color: #007bff;
    color: #fff;
  }

  .red {
    background-color: #dc3545;
    color: #fff;
  }

  .green {
    background-color: #28a745;
    color: #fff;
  }

  .small {
    font-size: 12px;
    padding: 4px 8px;
  }

  .medium {
    font-size: 16px;
    padding: 8px 16px;
  }

  .large {
    font-size: 24px;
    padding: 12px 24px;
  }

  .button:hover {
    opacity: 0.94;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  button:disabled:hover {
    opacity: 0.5;
  }
</style>
