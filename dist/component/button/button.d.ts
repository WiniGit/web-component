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
     * status button: button-primary | button-infor | button-warning | button-error | button-success | button-grey | button-neutral | button-infor-main | button-warning-main | button-error-main | button-success-main
     * */
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
export declare class Button extends React.Component<ButtonProps> {
    render(): React.JSX.Element;
}
export {};
