import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from "../Box/Box.svelte";
declare const __propDef: {
    props: {
        size?: number | undefined;
    } & BoxProps
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SpacerProps = typeof __propDef.props;
export type SpacerEvents = typeof __propDef.events;
export type SpacerSlots = typeof __propDef.slots;
/**
 * A spacer component that can be used to create layouts.
 * @see Docs https://sveui.org/components/spacer
 */
export default class Spacer extends SvelteComponentTyped<SpacerProps, SpacerEvents, SpacerSlots> {
}
export { Spacer, SpacerProps };
