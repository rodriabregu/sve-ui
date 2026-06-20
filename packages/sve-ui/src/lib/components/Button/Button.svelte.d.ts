import { SvelteComponentTyped } from "svelte";

export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
declare const __propDef: {
    props: {
        [x: string]: any;
        
        /**
         * The button label o title
         *  @default "Button"
         */
        label?: string | undefined;

        /**
         * The button click handler
         */
        onClick?: (() => void) | undefined;

        /**
         * The button color
         */
        color?: string | undefined;

        /**
         * The button size (xsm, sm, md, lg, xl, xxl, xxxl)
         */
        size?: ButtonSize | undefined;

        /**
         * The button disabled state
         * @default false
         */
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

/**
 * A button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 * @see Docs https://sveui.org/components/button
 */
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export { Button, ButtonProps };
