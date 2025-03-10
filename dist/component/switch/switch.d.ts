import { default as React, CSSProperties } from 'react';
interface SwitchProps {
    id?: string;
    onChange?: (value: boolean) => void;
    value?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    size?: number | string;
    dotColor?: string;
    onBackground?: string;
    offBackground?: string;
    name?: string;
}
interface SwitchState {
    value?: boolean;
}
export declare class Switch extends React.Component<SwitchProps, SwitchState> {
    state: Readonly<SwitchState>;
    componentDidUpdate(prevProps: Readonly<SwitchProps>): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
//# sourceMappingURL=switch.d.ts.map