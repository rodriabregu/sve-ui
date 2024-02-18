<script lang="ts">
  import { isOpen, updateSidebar } from "../store";

  export let isMobile = false;

  function handleClick() {
    updateSidebar();
  }
</script>

<button class="text-white" on:click={handleClick}>
  {$isOpen ? 'O' : '🞬'}
</button>

<style>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
</style>
