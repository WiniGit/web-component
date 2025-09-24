import ReactDOM from "react-dom";
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Text } from '../text/text';
import styles from './button.module.css'
import { showTooltipElement } from "../wini-icon/winicon";

interface ButtonProps {
    id?: string,
    label: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    disabled?: boolean,
    linkTo?: string,
    target?: string,
    style?: CSSProperties,
    type?: "button" | "reset" | "submit",
    /** 
     * default: size32: button-text-3 \
     * recommend: size64: button-text-1 | size56: button-text-1 | size48: button-text-1 | size40: button-text-3 | size32: button-text-3 | size24: button-text-5 \
     * status button: button-primary | button-infor | button-warning | button-error | button-success | button-grey | button-neutral | button-infor-main | button-warning-main | button-error-main | button-success-main
     * */
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    onFocus?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    onMouseMove?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    tooltip?: { message: string, position?: "top" | "bottom" | "left" | "right" },
}

export function Button({ tooltip, disabled, linkTo, className, type = "button", prefix, suffix, label, target, ...props }: ButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null)
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    const timoutRef = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        if (btnRef.current) {
            switch (type) {
                case "submit":
                    function handleSubmit(ev: any) {
                        switch (ev.key.toLowerCase()) {
                            case "enter":
                                btnRef.current!.click()
                                break;
                            default:
                                break;
                        }
                    }
                    window.addEventListener("keydown", handleSubmit)
                    return () => { window.removeEventListener("keydown", handleSubmit) }
                default:
                    break;
            }
        }
    }, [type, btnRef.current])

    const onMouseOver = () => {
        timoutRef.current = setTimeout(() => {
            if (timoutRef.current) setShowTooltip(true)
        }, 500)
    }

    const onMouseOut = () => {
        if (timoutRef.current) clearTimeout(timoutRef.current)
        timoutRef.current = null
        setShowTooltip(false)
    }

    const onMouseLeave = () => {
        if (timoutRef.current) clearTimeout(timoutRef.current)
        timoutRef.current = null
        setShowTooltip(false)
    }

    return <>
        {linkTo ? <a ref={btnRef as any} href={disabled ? undefined : linkTo} target={target} className={`${styles['button-container']} row ${className ?? "button-text-3"}`}
            onMouseOver={tooltip ? onMouseOver : undefined} onMouseOut={tooltip ? onMouseOut : undefined} onMouseLeave={tooltip ? onMouseLeave : undefined}
            {...props}>
            {prefix}
            <Text maxLine={1} className={styles['button-label']}>{label}</Text>
            {suffix}
        </a> : <button ref={btnRef} type={type} disabled={disabled} className={`${styles['button-container']} row ${className ?? "button-text-3"}`}
            onMouseOver={tooltip ? onMouseOver : undefined} onMouseOut={tooltip ? onMouseOut : undefined} onMouseLeave={tooltip ? onMouseLeave : undefined}
            {...props}>
            {prefix}
            <Text maxLine={1} className={styles['button-label']}>{label}</Text>
            {suffix}
        </button>}
        {tooltip && showTooltip && ReactDOM.createPortal(showTooltipElement({ element: btnRef.current, tooltip: tooltip }), document.body)}
    </>
}

export function SimpleButton(props: ButtonProps) {
    return <button id={props.id} type={"button"} disabled={props.disabled} className={`row ${props.className ?? ""}`} style={props.style} onClick={props.onClick} onFocus={props.onFocus} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} onMouseMove={props.onMouseMove}>
        {props.prefix}
        <Text maxLine={1} className={styles['button-label']}>{props.label}</Text>
        {props.suffix}
    </button>
}
