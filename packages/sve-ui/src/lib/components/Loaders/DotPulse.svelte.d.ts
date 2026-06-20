import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
         * The size of the dots, expressed in rem style system.
         * @default 14
         * @type {1 | 1.5 | "px" | 0.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96}
         * @example <DotPulse size={20}>
         */
        size?: 1 | 1.5 | "px" | 0.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96 | undefined;
        /**
         * The color of the dots.
         * @default 'white'
         * @type {string}
         * @example <DotPulse color={'black'}>
         */
        color?: string | undefined;
        /**
         * The speed of the animation, expressed in seconds.
         * @default '1.2'
         * @type {string}
         * @example <DotPulse speed={'.8'}>
         */
        speed?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DotPulseProps = typeof __propDef.props;
export type DotPulseEvents = typeof __propDef.events;
export type DotPulseSlots = typeof __propDef.slots;
/**
 * A dot pulse loader.
 * @see Docs https://sveui.org/components/loaders/dot-pulse
 */
export default class DotPulse extends SvelteComponentTyped<DotPulseProps, DotPulseEvents, DotPulseSlots> {
}
export { DotPulse, DotPulseProps };
