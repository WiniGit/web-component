import React, { CSSProperties, ReactNode } from 'react';
import './text.css';
interface TextProps {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    maxLine?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onHover?: React.MouseEventHandler<HTMLDivElement>;
}
export declare class Text extends React.Component<TextProps> {
    render(): React.ReactNode;
}
export {};
