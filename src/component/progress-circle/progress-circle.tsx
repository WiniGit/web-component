import { CSSProperties } from 'react'
import './progress-circle.css'

export function ProgressCircle(props: {
    id?: string,
    /** value:  0 - 100 (%)*/
    percent?: number,
    style?: CSSProperties,
    className?: string,
    fillColor?: string,
    percentColor?: string,
    strokeWidth?: number,
    strokeColor?: string,
    textStyle?: CSSProperties,
    title?: string
}) {
    const radius = 30 - (props.strokeWidth ?? 4)
    const diameter = Math.PI * 2 * radius;
    const strokeOffset = (1 - ((props.percent ?? 0) / 100)) * diameter;
    return <svg id={props.id} className={props.className} width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '6rem', height: '6rem', ...(props.style ?? {}) }} >
        <path d={`M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`} style={{ fill: "none", stroke: props.strokeColor ?? "var(--neutral-main-background-color, #EFEFF0)", strokeWidth: props.strokeWidth ?? '4px', }} />
        <path d={`M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`} style={{ stroke: props.percentColor ?? "var(--primary-main-color, #287CF0)", strokeWidth: props.strokeWidth ?? '4px', strokeLinecap: 'round', strokeDasharray: `${diameter}px ${diameter}px`, strokeDashoffset: `${strokeOffset}px` }} />
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" style={{ fontSize: "1.6rem", fontWeight: "600", fill: "var(--neutral-text-title-color, #18181b)", ...(props.textStyle ?? {}) }}>{props.title ?? `${props.percent ?? 0}%`}</text>
    </svg>
}

