import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from "../Box/Box.svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        /**
         * The number of columns in the grid.
         * @default 1
         * @type {number}
         * @example <Grid columns={2}>
         */
        columns?: number | undefined;
        /**
         * The number of gap in the grid, expressed in rem.
         * @default 1
         * @type {number}
         * @example <Grid gap={2}>
         */
        gap?: string | undefined;
        /**
         * The grid-auto-flow CSS property controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.
         * @default 'row'
         * @type {string}
         * @example <Grid flow={'column'}>
         */
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
