import React, { CSSProperties, ReactNode } from 'react';
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
     * recommend: size64: button-text-1 | size56: button-text-1 | size48: button-text-1 | size40: button-text-3 | size32: button-text-3 | size24: button-text-5
     * */
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Button extends React.Component<ButtonProps> {
    render() {
        return this.props.linkTo ? <a id={this.props.id} href={this.props.disabled ? undefined : this.props.linkTo} target={this.props.target} className={`${styles['button-container']} row ${this.props.className ?? "button-text-3"}`} style={this.props.style}>
            {this.props.prefix}
            <Text maxLine={1} className={styles['button-label']}>{this.props.label}</Text>
            {this.props.suffix}
        </a> : <button id={this.props.id} type={this.props.type ?? "button"} disabled={this.props.disabled} className={`${styles['button-container']} row ${this.props.className ?? "button-text-3"}`} style={this.props.style} onClick={this.props.onClick}>
            {this.props.prefix}
            <Text maxLine={1} className={styles['button-label']}>{this.props.label}</Text>
            {this.props.suffix}
        </button>
    }
}
