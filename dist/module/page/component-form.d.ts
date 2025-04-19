import { CSSProperties, ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { OptionsItem } from '../../index';
interface FTextFieldProps {
    id?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    name?: string;
    methods: UseFormReturn<any, any, undefined>;
}
export declare function FTextField(props: FTextFieldProps): import("react/jsx-runtime").JSX.Element;
export declare function FInputPassword(props: FTextFieldProps): import("react/jsx-runtime").JSX.Element;
interface FTextAreaProps {
    id?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    name?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare function FTextArea(props: FTextAreaProps): import("react/jsx-runtime").JSX.Element;
interface FRadioButtonProps {
    id?: string;
    label?: string;
    labelPosition?: "left" | "right";
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
    disabled?: boolean;
    style?: CSSProperties;
    size?: number | string;
    name?: string;
    activeColor?: string;
    offColor?: string;
    className?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FRadioButton: ({ labelPosition, ...props }: FRadioButtonProps) => import("react/jsx-runtime").JSX.Element;
interface FCheckboxProps {
    id?: string;
    label?: string;
    labelPosition?: "left" | "right";
    checkColor?: string;
    activeColor?: string;
    shape?: "rectangle" | "circle";
    disabled?: boolean;
    style?: CSSProperties;
    size?: number | string;
    name?: string;
    className?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
interface FCheckbox1Props extends FCheckboxProps {
    value?: boolean;
    onChange?: (value: boolean, target: HTMLInputElement) => void;
}
export declare const FCheckbox: ({ labelPosition, shape, ...props }: FCheckbox1Props) => import("react/jsx-runtime").JSX.Element;
interface FSwitchProps {
    id?: string;
    label?: string;
    labelPosition?: "left" | "right";
    onChange?: (value: boolean) => void;
    value?: boolean;
    dotColor?: string;
    onBackground?: string;
    disabled?: boolean;
    style?: CSSProperties;
    size?: number | string;
    name?: string;
    className?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FSwitch: ({ labelPosition, ...props }: FSwitchProps) => import("react/jsx-runtime").JSX.Element;
interface FSelect1Props {
    id?: string;
    name?: string;
    value?: string | number;
    required?: boolean;
    options: Required<Array<OptionsItem>>;
    onChange?: (v?: OptionsItem) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>;
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    handleLoadChildren?: () => {};
    readOnly?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FSelect1: ({ options, methods, ...props }: FSelect1Props) => import("react/jsx-runtime").JSX.Element;
interface FSelectMultipleProps {
    id?: string;
    name?: string;
    value?: Array<string | number>;
    required?: boolean;
    options: Required<Array<OptionsItem>>;
    onChange?: (value?: Array<string | number>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>;
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    readOnly?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FSelectMultiple: ({ options, methods, ...props }: FSelectMultipleProps) => import("react/jsx-runtime").JSX.Element;
interface FGroupRadioButtonProps extends FRadioButtonProps {
    options: Array<{
        id: string;
        name: string;
    }>;
}
export declare const FGroupRadioButton: (props: FGroupRadioButtonProps) => import("react/jsx-runtime").JSX.Element[];
interface FGroupCheckboxProps extends FCheckboxProps {
    value?: string;
    options: Array<{
        id: string;
        name: string;
    }>;
    onChange?: (value?: string) => void;
}
export declare const FGroupCheckbox: ({ labelPosition, shape, ...props }: FGroupCheckboxProps) => import("react/jsx-runtime").JSX.Element | import("react/jsx-runtime").JSX.Element[];
interface FColorPickerProps {
    id?: string;
    placeholder?: string;
    type?: "input" | "select";
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    style?: CSSProperties;
    value?: string;
    onChange?: (v: string) => void;
    name?: string;
    required?: boolean;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FColorPicker: ({ type, methods, ...props }: FColorPickerProps) => import("react/jsx-runtime").JSX.Element;
interface FNumberPickerProps {
    id?: string;
    value?: number;
    onChange?: (ev: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    volume?: number;
    style?: CSSProperties;
    min?: number;
    max?: number;
    type?: "outline" | "icon-button";
    name?: string;
    required?: boolean;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FNumberPicker: ({ type, methods, ...props }: FNumberPickerProps) => import("react/jsx-runtime").JSX.Element;
interface FDateTimePickerProps {
    id?: string;
    value?: Date;
    endValue?: Date;
    min?: Date;
    max?: Date;
    pickOnly?: boolean;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    pickerType?: "date" | "datetime";
    prefix?: ReactNode;
    suffix?: ReactNode;
    onChange?: (ev?: Date | {
        [p: string]: any;
    }) => void;
    name?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FDateTimePicker: ({ methods, ...props }: FDateTimePickerProps) => import("react/jsx-runtime").JSX.Element;
interface FUploadFileProps {
    id?: string;
    value?: File | Array<File> | {
        [k: string]: any;
    } | Array<{
        [k: string]: any;
    }>;
    buttonOnly?: boolean;
    onChange?: (a?: Array<File> | Array<{
        [k: string]: any;
    }>) => void;
    label?: string;
    className?: string;
    style?: CSSProperties;
    allowType?: Array<string>;
    subTitle?: string;
    multiple?: boolean;
    disabled?: boolean;
    fileTagStyle?: CSSProperties;
    maxSize?: number;
    name?: string;
    required?: boolean;
    methods: UseFormReturn<FieldValues, any, undefined>;
}
export declare const FUploadFile: ({ methods, ...props }: FUploadFileProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component-form.d.ts.map