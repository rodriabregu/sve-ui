import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from "../Box/Box.svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        columns?: number | undefined;
        gap?: string | undefined;
        flow?: string | undefined;
    } & BoxProps
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type GridProps = typeof __propDef.props;
export type GridEvents = typeof __propDef.events;
export type GridSlots = typeof __propDef.slots;
/**
 * A grid component that can be used to create layouts.
 * @see Docs https://sveui.org/components/grid
 */
export default class Grid extends SvelteComponentTyped<GridProps, GridEvents, GridSlots> {
}
export { Grid, GridProps };
