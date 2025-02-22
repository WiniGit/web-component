import { CSSProperties, ReactNode } from "react";
import React from "react";
interface ValueProps {
    start?: Date;
    end?: Date;
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatData?: {
        type: 1 | 2 | 3;
        value: Array<string | number>;
    };
}
interface DateTimePickerProps {
    id?: string;
    value?: Date;
    endValue?: Date;
    min?: Date;
    max?: Date;
    pickOnly?: boolean;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    pickerType?: "auto" | "date" | "datetime" | "daterange" | "datetimerange";
    enableRepeat?: boolean;
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatValue?: {
        type: 1 | 2 | 3;
        value: Array<"everyday" | "last" | number>;
    };
    prefix?: ReactNode;
    onChange?: (ev?: Date | ValueProps) => void;
}
export declare function DateTimePicker(props: DateTimePickerProps): React.JSX.Element;
export {};
