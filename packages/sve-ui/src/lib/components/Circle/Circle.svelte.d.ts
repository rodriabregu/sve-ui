/** @typedef {typeof __propDef.props}  CircleProps */
/** @typedef {typeof __propDef.events}  CircleEvents */
/** @typedef {typeof __propDef.slots}  CircleSlots */
/**
 * A square flex component with full border radius apply.
 * @see Docs https://sveui.org/components/circle
 */
export default class Circle extends SvelteComponentTyped<{
  [x: string]: any;
  size?: string | undefined;
}, {
  [evt: string]: CustomEvent<any>;
}, {
  default: {};
}> {
}
export type CircleProps = typeof __propDef.props;
export type CircleEvents = typeof __propDef.events;
export type CircleSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
import type { SquareProps } from "../Square/Square.svelte";
declare const __propDef: {
  props: {
      [x: string]: any;
      size?: string | undefined;
  } & SquareProps
  events: {
      [evt: string]: CustomEvent<any>;
  };
  slots: {
      default: {};
  };
};
export { Circle, CircleProps };
