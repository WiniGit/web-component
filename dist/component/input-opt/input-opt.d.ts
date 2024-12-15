import React, { CSSProperties, ReactNode } from "react";
interface Props {
    id?: string;
    onChange?: (value: string, target: HTMLDivElement) => void;
    disabled?: boolean;
    value?: string;
    length?: number;
    inputStyle?: CSSProperties;
    style?: CSSProperties;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
}
export declare class InputOpt extends React.Component<Props> {
    private containerRef;
    constructor(props: Props | Readonly<Props>);
    getValue: () => string;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void;
    render(): ReactNode;
}
export {};
