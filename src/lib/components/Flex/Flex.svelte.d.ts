import { SvelteComponentTyped } from "svelte";
import type { BoxProps } from '../Box/Box.svelte';

declare const __propDef: {
    props: {
        [x: string]: any;
        dir?: string | undefined;
        direction?: string | undefined;
        justify?: string | undefined;
        align?: string | undefined;
        wrap?: string | undefined;
        gap?: number | undefined;
        d?: string | undefined;
        display?: string | undefined;
        style?: string | undefined;
    } & BoxProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        // eslint-disable-next-line @typescript-eslint/ban-types
        default: {};
    };
};
export type FlexProps = typeof __propDef.props;
export type FlexEvents = typeof __propDef.events;
export type FlexSlots = typeof __propDef.slots;
/**
 * A flex box component that can be used to create layouts.
 * @see Docs https://sveui.org/components/flex
 */
export default class Flex extends SvelteComponentTyped<FlexProps, FlexEvents, FlexSlots> {
}
export { Flex, FlexProps };
