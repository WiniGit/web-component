import { default as React, CSSProperties, ReactNode } from 'react';
export interface OptionsItem {
    id: string | number;
    parentId?: string;
    name: string | ReactNode;
    title?: string | ((onSelect: (e: OptionsItem) => void) => ReactNode);
    disabled?: boolean;
}
interface Select1Props {
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
    simpleStyle?: boolean;
}
export declare const Select1: ({ style, ...props }: Select1Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=select1.d.ts.map