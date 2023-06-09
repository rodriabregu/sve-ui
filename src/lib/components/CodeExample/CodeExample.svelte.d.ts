/** @typedef {typeof __propDef.props}  CodeExampleProps */
/** @typedef {typeof __propDef.events}  CodeExampleEvents */
/** @typedef {typeof __propDef.slots}  CodeExampleSlots */

/**
 * A code example component is used to show a code example with UI experiencie.
 * @see Docs https://sveui.org/components/codeexample
 */
export default class CodeExample extends SvelteComponentTyped<{
  /**
  * The type code label text, show in the top of the code example component.
  * @default 'Sve-UI'
  * @type {string}
  * @example <CodeExample typeCodeLabel="Svelte">
  */
  typeCodeLabel?: string | undefined;
  /**
   * If you want a more compact and simpler version, without the top copy button, you can use the basic option of the component with this property set to true.
   * @default false
   * @type {boolean}
   * @example <CodeExample isBasic={true}>
   */
  basic?: boolean | undefined;
}, {
  [evt: string]: CustomEvent<any>;
}, {
  default: {};
}> {
}
export type CodeExampleProps = typeof __propDef.props;
export type CodeExampleEvents = typeof __propDef.events;
export type CodeExampleSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
  props: {
      typeCodeLabel?: string | undefined;
      basic?: boolean | undefined;
  };
  events: {
      [evt: string]: CustomEvent<any>;
  };
  slots: {
      default: {};
  };
};
export { CodeExample, CodeExampleProps };
