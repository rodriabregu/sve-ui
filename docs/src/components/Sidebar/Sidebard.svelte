<script>
  import { onMount, onDestroy } from 'svelte';

	import { page } from "$app/stores";
	import { isOpen } from '../store';
	import { MOBILE_WIDTH_THRESHOLD } from '../../constants';

  const COMPONENTS_PATHS = [
    '/components/button',
    '/components/codeexample',
  ];

  let isMobile = false;

  function handleResize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= MOBILE_WIDTH_THRESHOLD) {
        isOpen.update(() => false);
        isMobile = true;
      } else {
        isOpen.update(() => true);
      }
    }
  }

  onMount(() => {
    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

{#if $page.route.id !== '/'}
<div class="fixed left-0 top-0 h-full backdrop-blur-sm bg-opacity-50 text-white w-72 overflow-y-auto transition-all duration-300 ease-in-out pt-12 pl-32" class:translate-x-0={$isOpen}  class:translate-x-full={!$isOpen}
  class:z-99={$isOpen} class:z-0={!$isOpen}
  class:opacity-100={$isOpen} class:opacity-0={!$isOpen}
>
  <a href="/components" class="text-xl font-extralight block mt-8 mb-4">Components</a>
  <ul class="font-light text-sm text-gray-400">
    <li class="py-2">
      <a href="/components/button" class="block
        hover:text-gray-100 {$page.route.id === '/components/button' ? 'text-white' : ''}">Button</a>
    </li>

    <li class="py-2">
      <a href="/components/codeexample" class="block
        hover:text-gray-300 {$page.route.id === '/components/codeexample' ? 'text-white' : ''}">Code example</a>
    </li>
  </ul>

  <!-- <div class="p-4">
    <p class="text-sm">© 2024 SveUI</p>
  </div> -->
</div>
{/if}
