import React from "react";
import { CSSProperties } from "react";
interface WiniconProps {
    src?: string;
    link?: string;
    className?: string;
    style?: CSSProperties;
    size?: number | string;
    color?: string;
}
export declare function Winicon({ src, link, className, style, size, color }: WiniconProps): React.JSX.Element;
export {};
