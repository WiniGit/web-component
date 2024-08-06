import React, { CSSProperties } from 'react';
import './date-picker.css';
import { CalendarType } from '../../index';
interface DatePickerProps {
    value?: string;
    min?: Date;
    max?: Date;
    onChange?: (e?: string) => void;
    disabled?: boolean;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
    className?: string;
    hideButtonToday?: boolean;
    style?: CSSProperties;
    pickerType?: CalendarType;
    formatDate?: string;
}
interface DatePickerState {
    value?: string;
    offset: DOMRect;
    isOpen: boolean;
    style?: Object;
}
export declare class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    constructor(props: DatePickerProps);
    getNewValue: (value?: string) => Date | undefined;
    componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState): void;
    render(): React.JSX.Element;
}
export {};
