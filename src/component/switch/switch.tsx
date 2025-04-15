import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import styles from './switch.module.css';

interface SwitchProps {
    id?: string,
    onChange?: (value: boolean) => void,
    value?: boolean,
    disabled?: boolean,
    className?: string,
    style?: CSSProperties,
    size?: number | string,
    dotColor?: string,
    onBackground?: string,
    offBackground?: string,
    name?: string,
    label?: string,
}

export const Switch = (props: SwitchProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const convertStyle = useMemo<CSSProperties>(() => {
        let propStyle: any = { '--size': props.size ? (typeof props.size === 'number') ? `${props.size}px` : props.size : '2rem' }
        if (props.offBackground) propStyle['--off-bg'] = props.offBackground
        if (props.onBackground) propStyle['--on-bg'] = props.onBackground
        if (props.dotColor) propStyle['--dot-color'] = props.dotColor
        let tmp: CSSProperties = {
            height: props.size ?? '2rem',
            width: `calc(${props.size ? (typeof props.size === 'number') ? `${props.size}px` : props.size : '2rem'} * 9 / 5)`,
            ...propStyle
        }
        if (props.style) {
            delete props.style.width
            delete props.style.minWidth
            delete props.style.maxWidth
            delete props.style.height
            delete props.style.minHeight
            delete props.style.maxHeight
            tmp = {
                ...props.style,
                ...tmp,
            }
        }
        return tmp
    }, [props.size, props.style, props.offBackground, props.onBackground, props.dotColor])

    return <label id={props.id} className={`${styles['switch-container']} row ${props.className ?? ''}`} style={convertStyle}>
        <input ref={inputRef} type="checkbox" checked={!!props.value} hidden name={props.name} disabled={props.disabled}
            onChange={(ev) => {
                if (props.onChange) props.onChange(ev.target.checked)
            }}
        />
        <span className={styles['slider']} />
    </label>
}