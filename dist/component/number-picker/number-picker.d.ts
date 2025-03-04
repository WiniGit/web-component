import React, { CSSProperties } from "react";
interface Props {
    id?: string;
    value?: number;
    onChange?: (ev: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * default: size32: body-3 \
     * recommend: size40: body-2 | size24: body-3
     * */
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
