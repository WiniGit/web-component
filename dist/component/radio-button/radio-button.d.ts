import { default as React, CSSProperties } from 'react';
interface RadioButtonProps {
    id?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
    disabled?: boolean;
    style?: CSSProperties;
    size?: number | string;
    checked?: boolean;
    name?: string;
    activeColor?: string;
    offColor?: string;
    className?: string;
}
export declare const RadioButton: (props: RadioButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=radio-button.d.ts.map