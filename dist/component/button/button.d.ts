import React, { CSSProperties, ReactNode } from 'react';
interface ButtonProps {
    id?: string;
    label: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    style?: CSSProperties;
    type?: "button" | "reset" | "submit";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare class Button extends React.Component<ButtonProps> {
    render(): React.JSX.Element;
}
export {};
