import React, { CSSProperties, ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import styles from './text-field.module.css'

interface TextFieldProps {
    id?: string,
    value?: string,
    maxLength?: number,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onComplete?: React.KeyboardEventHandler<HTMLInputElement>,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    /** 
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3 | size24: body-3
     *  */
    className?: string,
    helperText?: string,
    name?: string,
    suffix?: ReactNode,
    prefix?: ReactNode,
    helperTextColor?: string,
    style?: CSSProperties,
    type?: React.HTMLInputTypeAttribute,
    autoFocus?: boolean,
    autoComplete?: React.HTMLInputAutoCompleteAttribute,
    simpleStyle?: boolean
}

export interface TextFieldRef {
    element?: HTMLLabelElement;
    inputElement?: HTMLInputElement;
}

export const TextField = forwardRef<TextFieldRef, TextFieldProps>(({ id, simpleStyle, prefix, suffix, className, helperText, helperTextColor = "#e14337", style = {}, onKeyDown, onComplete, ...props }, ref) => {
    const containerRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        element: containerRef.current as any,
        inputElement: inputRef.current as any,
    }), [containerRef.current, inputRef.current])

    return <label
        id={id}
        ref={containerRef}
        className={`${simpleStyle ? styles['simple-text-field'] : styles['text-field-container']} row ${className ?? (simpleStyle ? "" : 'body-3')} ${helperText?.length ? styles['helper-text'] : ""}`}
        helper-text={helperText}
        style={{ '--helper-text-color': helperTextColor, ...style } as CSSProperties}
    >
        {prefix}
        <input
            ref={inputRef}
            {...props}
            type={props.type ?? 'text'}
            onKeyDown={onKeyDown ?? (onComplete ? (ev) => {
                if (onComplete) {
                    switch (ev.key.toLowerCase()) {
                        case "enter":
                            onComplete(ev)
                            break;
                        default:
                            break;
                    }
                }
            } : undefined)}
        />
        {suffix}
    </label>
})