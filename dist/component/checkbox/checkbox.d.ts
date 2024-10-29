import React, { CSSProperties } from 'react';
interface CheckboxProps {
    id?: string;
    onChange?: (value: boolean) => void;
    value?: boolean;
    checkColor?: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    /** default 2.4rem **/
    size?: number | string;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
}
interface CheckboxState {
    value?: boolean;
}
export declare class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    state: Readonly<CheckboxState>;
    componentDidUpdate(prevProps: Readonly<CheckboxProps>): void;
    render(): React.JSX.Element;
}
export {};
