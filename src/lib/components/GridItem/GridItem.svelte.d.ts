import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from "../Box/Box.svelte";
declare const __propDef: {
    props: {
        colStart?: string | undefined;
        colEnd?: string | undefined;
        rowStart?: string | undefined;
        rowEnd?: string | undefined;
        area?: string | undefined;
        justifySelf?: "center" | "inherit" | "auto" | "flex-start" | "stretch" | "start" | "end" | "initial" | "unset" | "revert" | "normal" | "baseline" | "first baseline" | "last baseline" | "self-start" | "self-end" | "left" | "right" | "safe center" | "unsafe center" | "flex-end" | undefined;
        alignSelf?: "center" | "inherit" | "auto" | "stretch" | "start" | "end" | "initial" | "unset" | "revert" | "normal" | "baseline" | "first baseline" | "last baseline" | undefined;
    } & BoxProps
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type GridItemProps = typeof __propDef.props;
export type GridItemEvents = typeof __propDef.events;
export type GridItemSlots = typeof __propDef.slots;
/**
 * A item component inside a grid layout.
 * @see Docs https://sveui.org/components/griditem
 */
export default class GridItem extends SvelteComponentTyped<GridItemProps, GridItemEvents, GridItemSlots> {
}
export { GridItem, GridItemProps };
