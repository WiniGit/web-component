import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../text/text';
import styles from './tag.module.css'
import { ComponentStatus } from '../component-status';

interface TagProps {
    id?: string,
    title: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    disabled?: boolean,
    style?: CSSProperties,
    className?: string,
    status: ComponentStatus,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export class Tag extends React.Component<TagProps> {
    render() {
        return <div id={this.props.id} tag-type={this.state ?? ComponentStatus.INFOR} className={`${styles['tag-container']} row ${this.props.onClick ? styles['type-button'] : ''} ${this.props.disabled ? styles['disabled'] : ""} ${this.props.className ?? "button-text-2"} `} style={this.props.style} onClick={this.props.onClick}>
            {this.props.prefix}
            <Text maxLine={1} className={styles['tag-label']}>{this.props.title}</Text>
            {this.props.suffix}
        </div>
    }
}


