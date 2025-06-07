import { default as React, CSSProperties } from 'react';
interface CheckboxProps {
    id?: string;
    name?: string;
    onChange?: (value: boolean, target: HTMLInputElement) => void;
    value?: boolean | null;
    checkColor?: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    /** default 2.4rem **/
    size?: number | string;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
}
export declare const Checkbox: (props: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=checkbox.d.ts.map