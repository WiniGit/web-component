import React, { useEffect, useState } from "react";
import styles from './winicon.module.css'
import { CSSProperties } from "react";

interface WiniconProps {
    src?: string,
    link?: string,
    className?: string
    style?: CSSProperties,
    size?: number | string,
    color?: string
}

export function Winicon({ src, link, className, style, size, color }: WiniconProps) {
    const [svgData, setSvgData] = useState<string>()
    const cdnSrc = "https://cdn.jsdelivr.net/gh/WiniGit/wini-icons@latest/icons/"

    useEffect(() => {
        if (src) {
            fetch(cdnSrc + src + ".svg").then(async (res) => { setSvgData(await res.text()) })
        } else if (link) {
            fetch(link).then(async (res) => { setSvgData(await res.text()) })
        }
    }, [src, link])

    return <div className={`${styles['wini-icon']} ${className ?? ''}`} style={(style ? { ...style, '--size': size, '--color': color } : { '--size': size, '--color': color }) as any} dangerouslySetInnerHTML={{ __html: svgData ?? '' }} />
}