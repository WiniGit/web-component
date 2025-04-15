import { default as React, CSSProperties } from 'react';
interface RadioButtonProps {
    id?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
    disabled?: boolean;
    style?: CSSProperties;
    size?: number | string;
    defaultChecked?: boolean;
    name?: string;
    activeColor?: string;
    offColor?: string;
    className?: string;
    [key: string]: any;
}
export declare const RadioButton: ({ id, style, size, activeColor, className, offColor, ...props }: RadioButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=radio-button.d.ts.map