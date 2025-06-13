import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';
export interface OptionsItem {
    prefix?: ReactNode;
    id: string | number;
    parentId?: string | number;
    name: string | ReactNode;
    disabled?: boolean;
    totalChild?: number;
}
interface Select1Props {
    id?: string;
    value?: string | number;
    options: Required<Array<OptionsItem>>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{
        data: Array<OptionsItem>;
        totalCount: number;
    }>;
    onChange?: (v?: OptionsItem) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    prefix?: ReactNode;
    suffix?: ReactNode;
    simpleStyle?: boolean;
    customOptionsList?: ReactNode;
}
interface Select1Ref {
    element: HTMLDivElement;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    options: OptionsItem[];
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>;
    onOpenOptions: () => void;
}
export declare const Select1: import('react').ForwardRefExoticComponent<Select1Props & import('react').RefAttributes<Select1Ref>>;
export {};
//# sourceMappingURL=select1.d.ts.map