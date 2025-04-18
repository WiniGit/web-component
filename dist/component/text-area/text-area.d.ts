import { default as React, CSSProperties, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
interface TextAreaProps {
    id?: string;
    value?: string;
    maxLength?: number;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    className?: string;
    helperText?: string;
    name?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    register?: UseFormRegister<{}>;
    simpleStyle?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
}
export declare class TextArea extends React.Component<TextAreaProps> {
    private containerRef;
    getTextarea: () => HTMLTextAreaElement | null | undefined;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=text-area.d.ts.map