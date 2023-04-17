import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
         * @default "p"
         */
        as?: "div" | "p" | "br" | "a" | "abbr" | "address" | "b" | "bdi" | "bdo" | "blockquote" | "cite" | "code" | "del" | "dfn" | "em" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "i" | "ins" | "kbd" | "mark" | "meter" | "pre" | "q" | "span" | "var" | undefined;
        /**
         * @default "black"
         */
        color?: string | undefined;
        fontWeight?: "normal" | "hairline" | "thin" | "light" | "medium" | "semibold" | "bold" | "extrabold" | "black" | undefined;
        /**
         * @default "md"
         */
        fontSize?: "sm" | "md" | "lg" | "xl" | "6xs" | "5xs" | "4xs" | "3xs" | "2xs" | "xs" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | undefined;
        fontStyle?: string | undefined;
        textDecoration?: string | undefined;
        /**
         * @default "normal"
         */
        letterSpacing?: "normal" | "tighter" | "tight" | "wide" | "wider" | "widest" | undefined;
        /**
         * @default "normal"
         */
        lineHeight?: string | undefined;
        textAlign?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextProps = typeof __propDef.props;
export type TextEvents = typeof __propDef.events;
export type TextSlots = typeof __propDef.slots;
/**
 * Text is the used to render text and paragraphs of text.
 * @see Docs https://sveui.org/components/text
 */
export default class Text extends SvelteComponentTyped<TextProps, TextEvents, TextSlots> {
}
export { Text, TextProps };
