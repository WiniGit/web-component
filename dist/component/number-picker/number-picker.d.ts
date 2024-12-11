import React, { CSSProperties } from "react";
interface Props {
    id?: string;
    value?: number;
    onChange?: (ev: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    /** default: 1 */
    volume?: number;
    style?: CSSProperties;
    min?: number;
    max?: number;
    type?: "outline" | "icon-button";
}
export declare const NumberPicker: ({ id, value, onChange, disabled, readOnly, className, helperText, helperTextColor, max, min, style, type, volume }: Props) => React.JSX.Element;
export {};
