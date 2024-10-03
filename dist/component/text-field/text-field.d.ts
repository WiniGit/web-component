import React, { CSSProperties, ReactNode } from "react";
import './text-field.css';
import { UseFormRegister } from "react-hook-form";
interface TextFieldProps {
    id?: string;
    value?: string;
    maxLength?: number;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    helperText?: string;
    name?: string;
    suffix?: ReactNode;
    prefix?: ReactNode;
    helperTextColor?: string;
    style?: CSSProperties;
    type?: React.HTMLInputTypeAttribute;
    autoFocus?: boolean;
    register?: UseFormRegister<{}>;
}
export declare class TextField extends React.Component<TextFieldProps> {
    private containerRef;
    getInput: () => HTMLInputElement | null | undefined;
    render(): React.ReactNode;
}
export {};
