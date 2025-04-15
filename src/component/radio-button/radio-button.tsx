import React, { CSSProperties, useMemo } from 'react';
import styles from './radio-button.module.css';

interface RadioButtonProps {
    id?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string | number | readonly string[],
    disabled?: boolean,
    style?: CSSProperties,
    size?: number | string,
    defaultChecked?: boolean,
    name?: string,
    activeColor?: string,
    offColor?: string,
    className?: string,
    [key: string]: any
}


export const RadioButton = ({ id, style, size, activeColor, className, offColor, ...props }: RadioButtonProps) => {
    const convertStyle: CSSProperties = useMemo(() => {
        let tmp: any = { '--size': size ? (typeof size === 'number') ? `${size}px` : size : '20px' }
        if (offColor) tmp['--off-color'] = offColor
        if (offColor) tmp['--active-color'] = activeColor
        if (style) {
            delete style.width
            delete style.minWidth
            delete style.maxWidth
            delete style.height
            delete style.minHeight
            delete style.maxHeight
            tmp = {
                ...style,
                ...tmp,
            }
        }
        return tmp
    }, [style, offColor, activeColor, size])

    return <label id={id} className={`row ${styles['radio-btn-container']} ${className ?? ''}`} style={convertStyle} >
        <input type="radio" {...props} />
        <span className={styles['checkmark']}></span>
    </label>
}