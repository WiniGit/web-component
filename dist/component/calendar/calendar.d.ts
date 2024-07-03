import React, { CSSProperties, ReactNode } from "react";
import './calendar.css';
export declare const today: Date;
export declare const startDate: Date;
export declare const endDate: Date;
export declare const inRangeTime: (date: Date, startDate: Date, endDate: Date) => boolean;
export declare const enum CalendarType {
    DATE = 0,
    MONTH = 1,
    YEAR = 2,
    DATETIME = 3
}
interface CalendarProps {
    value?: Date;
    min?: Date;
    max?: Date;
    onSelect?: (props: Date) => void;
    disabled?: boolean;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    type: CalendarType;
    showSidebar?: boolean;
    footer?: ReactNode;
}
interface CalendarState {
    value: Date;
    selectDate?: Date;
    selectMonth: number;
    selectYear: number;
    selectHours: number;
    selectMinutes: number;
    selectSeconds: number;
    type: CalendarType;
}
export declare class Calendar extends React.Component<CalendarProps, CalendarState> {
    state: Readonly<CalendarState>;
    showDateInMonth(): React.JSX.Element;
    showMonthInYear(): React.JSX.Element;
    showYearInRange(): React.JSX.Element;
    getTitle(): string | number;
    render(): React.ReactNode;
}
export {};
