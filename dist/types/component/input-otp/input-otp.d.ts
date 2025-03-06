import { default as React, CSSProperties, ReactNode } from 'react';
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
    autoFocus?: boolean;
}
export declare class InputOtp extends React.Component<Props> {
    private containerRef;
    constructor(props: Props | Readonly<Props>);
    getValue: () => string;
    componentDidUpdate(prevProps: Readonly<Props>): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=input-otp.d.ts.map