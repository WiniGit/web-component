import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../text/text';
import styles from './button.module.css'

interface ButtonProps {
    id?: string,
    label: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    disabled?: boolean,
    style?: CSSProperties,
    type?: "button" | "reset" | "submit",
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Button extends React.Component<ButtonProps> {
    render() {
        return <button id={this.props.id} type={this.props.type ?? "button"} disabled={this.props.disabled} className={`${styles['button-container']} row ${this.props.className ?? "button-text-3"}`} style={this.props.style} onClick={this.props.onClick}>
            <Text maxLine={1} className={styles['button-label']}>{this.props.label}</Text>
        </button>
    }
}


