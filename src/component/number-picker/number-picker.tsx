import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from './number-picker.module.css'

interface Props {
    id?: string,
    value?: number,
    onChange?: (ev: number) => void,
    disabled?: boolean,
    readOnly?: boolean,
    /**
     * default: size32: body-3 \
     * recommend: size40: body-2 | size24: body-3
     * */
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    /** default: 1 */
    volume?: number,
    style?: CSSProperties,
    min?: number,
    max?: number,
    type?: "outline" | "icon-button",
}

export const NumberPicker = ({ id, value, onChange, disabled, readOnly, className, helperText, helperTextColor, max, min, style, type = "icon-button", volume = 1 }: Props) => {
    const [val, setValue] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            setValue(value ?? 0)
            inputRef.current.value = `${value ?? 0}`
        }
    }, [value, inputRef])

    return <div id={id}
        className={`row ${styles["number-picker-container"]} ${className ?? "body-2"} ${helperText?.length && styles['helper-text']}`}
        number-picker-type={type ?? "icon-button"}
        helper-text={helperText}
        style={style ? { ...({ '--helper-text-color': helperTextColor ?? '#e14337' } as CSSProperties), ...style } : ({ '--helper-text-color': helperTextColor ?? '#e14337' } as CSSProperties)}
    >
        <div className="row" onClick={() => {
            let newValue = val - volume
            if (min === undefined || newValue >= min) {
                if (volume % 1 === 0) newValue = Math.round(newValue)
                else newValue = parseFloat(newValue.toFixed(1))
                setValue(newValue)
                if (inputRef.current) inputRef.current.value = `${newValue}`
                if (onChange) onChange(newValue)
            }
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 7.93907C1.3335 7.60435 1.60484 7.33301 1.93956 7.33301H14.0608C14.3955 7.33301 14.6668 7.60435 14.6668 7.93907C14.6668 8.27379 14.3955 8.54513 14.0608 8.54513H1.93956C1.60484 8.54513 1.3335 8.27379 1.3335 7.93907Z" />
            </svg>
        </div>
        <input
            ref={inputRef}
            readOnly={readOnly}
            disabled={disabled}
            onKeyDown={(ev) => {
                switch (ev.key.toLowerCase()) {
                    case "enter":
                        (ev.target as HTMLInputElement).blur()
                        break;
                    default:
                        break;
                }
            }}
            onFocus={(ev) => { (ev.target as HTMLInputElement).select() }}
            onBlur={(ev) => {
                let newValue = volume % 1 === 0 ? parseInt(ev.target.value.trim()) : parseFloat(ev.target.value.trim())
                if (isNaN(newValue)) ev.target.value = `${val}`
                else {
                    if (volume % 1 === 0) newValue = Math.round(newValue)
                    else newValue = parseFloat(newValue.toFixed(1))
                    if (min !== undefined && newValue < min) {
                        setValue(min)
                        if (inputRef.current) inputRef.current.value = `${min}`
                        if (onChange) onChange(min)
                    } else if (max !== undefined && newValue > max) {
                        setValue(max)
                        if (inputRef.current) inputRef.current.value = `${max}`
                        if (onChange) onChange(max)
                    } else {
                        setValue(newValue)
                        if (inputRef.current) inputRef.current.value = `${newValue}`
                        if (onChange) onChange(newValue)
                    }
                }
            }}
        />
        <div className="row" onClick={() => {
            let newValue = val + volume
            if (max === undefined || newValue <= max) {
                if (volume % 1 === 0) newValue = Math.round(newValue)
                else newValue = parseFloat(newValue.toFixed(1))
                setValue(newValue)
                if (inputRef.current) inputRef.current.value = `${newValue}`
                if (onChange) onChange(newValue)
            }
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.60622 1.93907C8.60622 1.60435 8.33488 1.33301 8.00016 1.33301C7.66544 1.33301 7.3941 1.60435 7.3941 1.93907V7.39361H1.93956C1.60484 7.39361 1.3335 7.66496 1.3335 7.99967C1.3335 8.33439 1.60484 8.60574 1.93956 8.60574H7.3941V14.0603C7.3941 14.395 7.66544 14.6663 8.00016 14.6663C8.33488 14.6663 8.60622 14.395 8.60622 14.0603V8.60574H14.0608C14.3955 8.60574 14.6668 8.33439 14.6668 7.99967C14.6668 7.66496 14.3955 7.39361 14.0608 7.39361H8.60622V1.93907Z" />
            </svg>
        </div>
    </div>
}