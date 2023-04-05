import { SvelteComponentTyped } from "svelte";

export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
declare const __propDef: {
    props: {
        [x: string]: any;
        label?: string | undefined;
        onClick?: (() => void) | undefined;
        color?: string | undefined;
        size?: ButtonSize | undefined;
        disabled?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
