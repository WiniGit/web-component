import React, { CSSProperties, ReactNode } from 'react';
import { ComponentStatus } from '../component-status';
interface TagProps {
    id?: string;
    title: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    style?: CSSProperties;
    className?: string;
    status: ComponentStatus;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare class Tag extends React.Component<TagProps> {
    render(): React.JSX.Element;
}
export {};
