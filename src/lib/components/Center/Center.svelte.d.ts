import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from "../Box/Box.svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        width?: string | undefined;
        height?: string | undefined;
    } & BoxProps
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CenterProps = typeof __propDef.props;
export type CenterEvents = typeof __propDef.events;
export type CenterSlots = typeof __propDef.slots;
/**
 * A box component that can be used to center its children.
 * @see Docs https://sveui.org/components/center
 */
export default class Center extends SvelteComponentTyped<CenterProps, CenterEvents, CenterSlots> {
}
export { Center, CenterProps };
