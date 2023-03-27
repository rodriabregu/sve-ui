///<reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  color?: 'blue' | 'red' | 'green';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  class?: string;
  style?: string;
}

export default class Button extends SvelteComponentTyped<
  ButtonProps,
  { click: WindowEventMap['click'] },
  { default: {} }
> {}
