/** @typedef {typeof __propDef.props}  SquareProps */
/** @typedef {typeof __propDef.events}  SquareEvents */
/** @typedef {typeof __propDef.slots}  SquareSlots */
/**
 * A square flex component that can be used to create layouts.
 * @see Docs https://sveui.org/components/square
 */
export default class Square extends SvelteComponentTyped<{
  [x: string]: any;
  size?: string | undefined;
}, {
  [evt: string]: CustomEvent<any>;
}, {
  default: {};
}> {
}
export type SquareProps = typeof __propDef.props;
export type SquareEvents = typeof __propDef.events;
export type SquareSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
import type { FlexProps } from "../Flex/Flex.svelte";
declare const __propDef: {
  props: {
      [x: string]: any;
      size?: string | undefined;
  } & FlexProps
  events: {
      [evt: string]: CustomEvent<any>;
  };
  slots: {
      default: {};
  };
};
export { Square, SquareProps };
