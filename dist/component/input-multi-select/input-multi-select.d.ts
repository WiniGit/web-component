import React, { CSSProperties } from 'react';
import { OptionsItem } from '../select1/select1';
import { WithTranslation } from 'react-i18next';
interface SelectMultipleProps extends WithTranslation {
    id?: string;
    value?: Array<string | number>;
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
    showClearValueButton?: boolean;
    popupClassName?: string;
}
export declare const SelectMultiple: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<SelectMultipleProps, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export {};
