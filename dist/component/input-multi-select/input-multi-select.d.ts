import { default as React, CSSProperties } from 'react';
import { OptionsItem } from '../select1/select1';
interface SelectMultipleProps {
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
    simpleStyle?: boolean;
}
export declare const SelectMultiple: ({ style, ...props }: SelectMultipleProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=input-multi-select.d.ts.map