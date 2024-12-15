import React, { CSSProperties } from 'react';
interface CheckboxProps {
    id?: string;
    onChange?: (value: boolean, target: HTMLInputElement) => void;
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
    private ref;
    constructor(props: CheckboxProps);
    componentDidUpdate(prevProps: Readonly<CheckboxProps>): void;
    onChange: () => void;
    render(): React.JSX.Element;
}
export {};
