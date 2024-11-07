import React, { CSSProperties, ReactNode } from 'react';
import './text.css';
interface TextProps {
    id?: string;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    maxLine?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onHover?: React.MouseEventHandler<HTMLDivElement>;
    html?: string;
}
export declare class Text extends React.Component<TextProps> {
    render(): React.ReactNode;
}
export {};
