import { default as React, CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';
import { OptionsItem } from '../select1/select1';
interface SelectMultipleProps {
    id?: string;
    value?: Array<string | number>;
    options: Required<Array<OptionsItem>>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{
        data: Array<OptionsItem>;
        totalCount: number;
    }>;
    onChange?: (value?: Array<string | number>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    showClearValueButton?: boolean;
    popupClassName?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    simpleStyle?: boolean;
    customOptionsList?: ReactNode;
    previewMaxLength?: number;
}
interface SelectMultipleRef {
    element: HTMLDivElement;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    options: OptionsItem[];
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>;
    onOpenOptions: () => void;
}
export declare const SelectMultiple: React.ForwardRefExoticComponent<SelectMultipleProps & React.RefAttributes<SelectMultipleRef>>;
export {};
//# sourceMappingURL=input-multi-select.d.ts.map