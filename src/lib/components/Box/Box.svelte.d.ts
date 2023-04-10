import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
         * @default 0
         * @description The padding around the box.
         * @type number | undefined
         */
        p?: number | undefined;
        /**
         * @default 0
         * @description The padding around the box.
         * @type number | undefined
         */
        padding?: number | undefined;
        /**
         * @default 0
         * @description The margin around the box.
         * @type number | undefined
         */
        m?: number | undefined;
        /**
         * @default 0
         * @description The margin around the box.
         * @type number | undefined
         */
        margin?: number | undefined;
        /**
         * @default undefined
         * @description The width of the box.
         * @type string | undefined
         */
        w?: string | undefined;
        /**
         * @default undefined
         * @description The width of the box.
         * @type string | undefined
         */
        width?: string | undefined;
        /**
         * @default undefined
         * @description The height of the box.
         * @type string | undefined
         */
        h?: string | undefined;
        /**
         * @default undefined
         * @description The height of the box.
         * @type string | undefined
         */
        height?: string | undefined;
        /**
         * @default undefined
         * @description The background color of the box.
         * @type string | undefined
         */
        bg?: string | undefined;
        /**
         * @default undefined
         * @description The background color of the box.
         * @type string | undefined
         */
        backgroundColor?: string | undefined;
        /**
         * @default 'white'
         * @description The color of the text.
         * @type string | undefined
         */
        color?: string | undefined;
        /**
         * @default undefined
         * @description The border of the box.
         * @type string | undefined
         */
        border?: string | undefined;
        /**
         * @default undefined
         * @description The border radius of the box.
         * @type string | undefined
         */
        br?: string | undefined;
        /**
         * @default undefined
         * @description The border radius of the box.
         * @type string | undefined
         */
        borderRadius?: string | undefined;
        /**
         * @default undefined
         * @description The display of the box.
         * @type string | undefined
         */
        d?: string | undefined;
        /**
         * @default undefined
         * @description The display of the box.
         * @type string | undefined
         */
        display?: string | undefined;
        /**
         * @default undefined
         * @description Style of the box.
         * @type string | undefined
         */
        style?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type BoxProps = typeof __propDef.props;
export type BoxEvents = typeof __propDef.events;
export type BoxSlots = typeof __propDef.slots;

/**
 * A box component is used to create a container for other components. Is a wrapper for the HTML div element.
 * @see Docs https://sveui.org/components/box
 */
export default class Box extends SvelteComponentTyped<BoxProps, BoxEvents, BoxSlots> {
}
export { Box, BoxProps };
