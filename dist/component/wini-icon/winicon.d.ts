import React from "react";
import { CSSProperties, ReactNode } from "react";
interface WiniconProps {
    svg: ReactNode;
    className?: string;
    style?: CSSProperties;
    size?: number | string;
    color?: string;
}
export default function Winicon({ svg, className, style, size, color }: WiniconProps): React.JSX.Element;
export {};
