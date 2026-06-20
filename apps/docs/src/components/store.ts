import { writable } from 'svelte/store'

export const isOpen = writable(true)

export function updateSidebar() {
  isOpen.update((value) => !value)
}

