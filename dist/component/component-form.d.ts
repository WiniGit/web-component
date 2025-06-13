import { FieldValues, UseFormReturn } from 'react-hook-form';
import { CSSProperties, ReactNode, default as React } from 'react';
import { OptionsItem } from './select1/select1';
interface DateRangeProps {
    start?: Date;
    end?: Date;
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatData?: {
        type: 1 | 2 | 3;
        value: Array<string | number>;
    };
}
interface SimpleFormProps {
    id?: string;
    label?: string;
    labelElement?: ReactNode;
    placeholder?: string;
    methods: UseFormReturn<FieldValues, any, undefined>;
    name: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    required?: boolean;
}
interface TextFieldFormProps extends SimpleFormProps {
    type?: React.HTMLInputTypeAttribute | "money";
    maxLength?: number;
    readOnly?: boolean;
    autoFocus?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    textFieldStyle?: CSSProperties;
    textFieldClassName?: string;
}
export declare function TextFieldForm({ style, textFieldStyle, ...params }: TextFieldFormProps): import("react/jsx-runtime").JSX.Element;
interface InputPasswordFormProps extends SimpleFormProps {
    maxLength?: number;
    readOnly?: boolean;
    autoFocus?: boolean;
    prefix?: ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    textFieldStyle?: CSSProperties;
    textFieldClassName?: string;
}
export declare const InputPasswordForm: (params: InputPasswordFormProps) => import("react/jsx-runtime").JSX.Element;
interface TextAreaFormProps extends SimpleFormProps {
    type?: React.HTMLInputTypeAttribute | "money";
    maxLength?: number;
    readOnly?: boolean;
    autoFocus?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    textAreaStyle?: CSSProperties;
    textAreaClassName?: string;
}
export declare function TextAreaForm({ style, textAreaStyle, ...params }: TextAreaFormProps): import("react/jsx-runtime").JSX.Element;
interface DateTimePickerFormProps extends SimpleFormProps {
    type?: "date" | "datetime";
    pickOnly?: boolean;
    autoFocus?: boolean;
    suffix?: ReactNode;
    prefix?: ReactNode;
    onChange?: (ev?: Date | DateRangeProps) => void;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    textAreaStyle?: CSSProperties;
    textAreaClassName?: string;
}
export declare function DateTimePickerForm(params: DateTimePickerFormProps): import("react/jsx-runtime").JSX.Element;
interface CKEditorFormProps extends SimpleFormProps {
    ckEditorUploadPlugin?: Array<any>;
    customConfig?: {
        [p: string]: any;
    };
    ckEditorStyle?: CSSProperties;
}
export declare function CKEditorForm(params: CKEditorFormProps): import("react/jsx-runtime").JSX.Element;
interface Select1FormProps extends SimpleFormProps {
    options: Array<{
        id: string | number;
        name: string;
        [p: string]: any;
    }>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{
        data: Array<OptionsItem>;
        totalCount: number;
    }>;
    onChange?: (v?: {
        id: string | number;
        name: string;
        [p: string]: any;
    }) => void;
    select1Style?: CSSProperties;
    prefix?: ReactNode;
}
export declare function Select1Form(params: Select1FormProps): import("react/jsx-runtime").JSX.Element;
interface SelectMultipleFormProps extends SimpleFormProps {
    options: Array<{
        id: string | number;
        name: string;
        [p: string]: any;
    }>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{
        data: Array<OptionsItem>;
        totalCount: number;
    }>;
    onChange?: (v?: Array<string | number>) => void;
    select1Style?: CSSProperties;
    prefix?: ReactNode;
}
export declare function SelectMultipleForm(params: SelectMultipleFormProps): import("react/jsx-runtime").JSX.Element;
interface SwitchFormProps extends SimpleFormProps {
    onChange?: (v: boolean) => void;
    size?: string | number;
}
export declare function SwitchForm(params: SwitchFormProps): import("react/jsx-runtime").JSX.Element;
interface RateFormProps extends SimpleFormProps {
    onChange?: (v: number) => void;
    size?: string | number;
}
export declare function RateForm(params: RateFormProps): import("react/jsx-runtime").JSX.Element;
interface CheckboxFormProps extends SimpleFormProps {
    onChange?: (v: boolean) => void;
    size?: string | number;
    radius?: string | number;
}
export declare function CheckboxForm(params: CheckboxFormProps): import("react/jsx-runtime").JSX.Element;
interface RadioButtonFormProps extends SimpleFormProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    size?: string | number;
    value?: string;
}
export declare function RadioButtonForm(params: RadioButtonFormProps): import("react/jsx-runtime").JSX.Element;
interface GroupRadioButtonFormProps extends SimpleFormProps {
    options: Array<{
        id: string | number;
        name: string;
        [p: string]: any;
    }>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare function GroupRadioButtonForm(params: GroupRadioButtonFormProps): import("react/jsx-runtime").JSX.Element;
interface ImportFileFormProps extends SimpleFormProps {
    multiple?: boolean;
    maxSize?: number;
    allowType?: Array<string>;
    onChange?: (a?: Array<File> | Array<{
        [p: string]: any;
    }>) => void;
    title?: string;
    subTitle?: string;
    direction?: 'row' | 'column';
}
export declare function ImportFileForm(params: ImportFileFormProps): import("react/jsx-runtime").JSX.Element;
interface RangeFormProps extends SimpleFormProps {
    endName: string;
    type?: 'number' | "money" | "daterange" | "datetimerange";
    placeholderStart?: string;
    placeholderEnd?: string;
}
/** type: number | date | date-time | money */
export declare function RangeForm(params: RangeFormProps): import("react/jsx-runtime").JSX.Element;
interface GroupCheckboxFormFrops extends SimpleFormProps {
    dataType: 'string' | 'list';
    options: Array<{
        id: string | number;
        name: string;
        [p: string]: any;
    }>;
    onChange?: (v: Array<{
        id: string | number;
        name: string;
        [p: string]: any;
    }>) => void;
}
/** dataType: string | list */
export declare function GroupCheckboxForm(params: GroupCheckboxFormFrops): import("react/jsx-runtime").JSX.Element;
interface ColorPickerForm extends SimpleFormProps {
    onChange?: (v: string) => void;
    textFieldStyle?: CSSProperties;
}
export declare const ColorPickerForm: (props: ColorPickerForm) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component-form.d.ts.map