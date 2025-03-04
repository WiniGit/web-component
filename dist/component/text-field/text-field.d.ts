import React, { CSSProperties, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
interface TextFieldProps {
    id?: string;
    value?: string;
    maxLength?: number;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onComplete?: React.KeyboardEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3 | size24: body-3
     *  */
    className?: string;
    helperText?: string;
    name?: string;
    suffix?: ReactNode;
    prefix?: ReactNode;
    helperTextColor?: string;
    style?: CSSProperties;
    type?: React.HTMLInputTypeAttribute;
    autoFocus?: boolean;
    autoComplete?: React.HTMLInputAutoCompleteAttribute;
    register?: UseFormRegister<{}>;
}
export declare class TextField extends React.Component<TextFieldProps> {
    private containerRef;
    getInput: () => HTMLInputElement | null | undefined;
    render(): React.ReactNode;
}
export {};
