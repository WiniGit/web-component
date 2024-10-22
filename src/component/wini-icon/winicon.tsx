import React from "react";
import { CSSProperties, ReactNode } from "react";

interface WiniconProps {
    svg: ReactNode,
    className?: string
    style?: CSSProperties,
    size?: number | string,
    color?: string
}

export default function Winicon({ svg, className, style, size, color }: WiniconProps) {
    const modifiedSvg = React.cloneElement(svg as React.ReactElement, {
        size,
        fill: color,  // Apply color to the fill attribute of the SVG
    });
    return <div className={`wini-icon ${className ?? ''}`} style={style}>{modifiedSvg}</div>
}