import React, { CSSProperties, ReactNode } from "react";
import { WithTranslation } from 'react-i18next';
export declare const today: Date;
export declare const startDate: Date;
export declare const endDate: Date;
export declare const inRangeTime: (date: Date, startDate: Date, endDate: Date) => boolean;
export declare enum CalendarType {
    DATE = 0,
    MONTH = 1,
    YEAR = 2,
    DATETIME = 3
}
interface CalendarProps extends WithTranslation {
    id?: string;
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
export declare const Calendar: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<CalendarProps, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export {};
