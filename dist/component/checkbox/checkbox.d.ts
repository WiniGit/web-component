import React, { CSSProperties } from 'react';
import './checkbox.css';
interface CheckboxProps {
    onChange?: (value: boolean) => void;
    value?: boolean;
    checkColor?: string;
    disabled?: false;
    style?: CSSProperties;
    /** default 2.4rem **/
    size?: number | string;
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