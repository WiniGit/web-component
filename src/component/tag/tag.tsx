import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../text/text';
import styles from './tag.module.css'

interface TagProps {
    id?: string,
    label: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    disabled?: boolean,
    style?: CSSProperties,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Tag extends React.Component<TagProps> {
    render() {
        return <button id={this.props.id} type={"button"} disabled={this.props.disabled} className={`${styles['tag-container']} row ${this.props.className ?? "button-text-3"}`} style={this.props.style} onClick={this.props.onClick}>
            {this.props.prefix}
            <Text maxLine={1} className={styles['tag-label']}>{this.props.label}</Text>
            {this.props.suffix}
        </button>
    }
}


