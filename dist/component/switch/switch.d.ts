import React, { CSSProperties } from 'react';
import './switch.css';
interface SwitchProps {
    onChange?: (value: boolean) => void;
    value?: boolean;
    disabled: false;
    style: CSSProperties;
    size?: number | string;
    dotColor?: string;
    onBackground?: string;
    offBackground?: string;
    name?: string;
    className?: string;
}
interface SwitchState {
    value?: boolean;
}
export declare class Switch extends React.Component<SwitchProps, SwitchState> {
    state: Readonly<SwitchState>;
    componentDidUpdate(prevProps: Readonly<SwitchProps>): void;
    render(): React.JSX.Element;
}
export {};