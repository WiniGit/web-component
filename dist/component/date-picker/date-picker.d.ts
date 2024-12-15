import React, { CSSProperties } from 'react';
import './date-picker.css';
import { CalendarType } from '../../index';
import { WithTranslation } from 'react-i18next';
interface DatePickerProps extends WithTranslation {
    id?: string;
    value?: string;
    min?: Date;
    max?: Date;
    onChange?: (e?: string) => void;
    onComplete?: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    pickOnly?: boolean;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
    className?: string;
    hideButtonToday?: boolean;
    style?: CSSProperties;
    pickerType?: CalendarType;
    formatDate?: string;
}
export declare const DatePicker: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<DatePickerProps, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export {};
