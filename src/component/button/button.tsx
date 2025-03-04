import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { Text } from '../text/text';
import styles from './button.module.css'

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
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

export function Button(props: ButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (btnRef.current) {
            switch (props.type) {
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
    }, [props.type, btnRef.current])

    return props.linkTo ? <a id={props.id} href={props.disabled ? undefined : props.linkTo} target={props.target} className={`${styles['button-container']} row ${props.className ?? "button-text-3"}`} style={props.style} onClick={props.onClick}>
        {props.prefix}
        <Text maxLine={1} className={styles['button-label']}>{props.label}</Text>
        {props.suffix}
    </a> : <button ref={btnRef} id={props.id} type={props.type ?? "button"} disabled={props.disabled} className={`${styles['button-container']} row ${props.className ?? "button-text-3"}`} style={props.style} onClick={props.onClick}>
        {props.prefix}
        <Text maxLine={1} className={styles['button-label']}>{props.label}</Text>
        {props.suffix}
    </button>
}
