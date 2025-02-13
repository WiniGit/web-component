import React, { CSSProperties, ReactNode } from 'react';
interface ButtonProps {
    id?: string;
    label: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    linkTo?: string;
    target?: string;
    style?: CSSProperties;
    type?: "button" | "reset" | "submit";
    /**
     * default: size32: button-text-3 \
     * recommend: size64: button-text-1 | size56: button-text-1 | size48: button-text-1 | size40: button-text-3 | size32: button-text-3 | size24: button-text-5
     * */
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare class Button extends React.Component<ButtonProps> {
    render(): React.JSX.Element;
}
export {};
