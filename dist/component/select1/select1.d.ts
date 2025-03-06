import { default as React, CSSProperties, ReactNode } from 'react';
import { WithTranslation } from 'react-i18next';
export interface OptionsItem {
    id: string | number;
    parentId?: string;
    name: string | ReactNode;
    title?: string | ((onSelect: (e: OptionsItem) => void) => ReactNode);
    disabled?: boolean;
}
interface Select1Props extends WithTranslation {
    id?: string;
    value?: string | number;
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
    popupClassName?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    onOpenOptions?: (popupRef: HTMLDivElement) => void;
}
export declare const Select1: React.ComponentType<Omit<import('../../../node_modules/react-i18next/helpers').$Subtract<Select1Props, import('react-i18next').WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import('react-i18next').WithTranslationProps>;
export {};
//# sourceMappingURL=select1.d.ts.map