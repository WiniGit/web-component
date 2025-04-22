import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
interface FormByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    data?: {
        [p: string]: any;
    };
    propsData?: {
        [p: string]: {
            style?: CSSProperties;
            className?: string;
            onClick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    childrenData?: {
        [p: string]: ReactNode;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
    customOptions?: {
        [p: string]: Array<{
            [k: string]: any;
        }>;
    };
    onSubmit?: (e?: {
        [p: string]: any;
    }) => void;
    onError?: (e?: {
        [p: string]: any;
    }) => void;
}
interface FormByIdRef {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    methods: UseFormReturn<FieldValues, any, FieldValues>;
}
export declare const FormById: import('react').ForwardRefExoticComponent<FormByIdProps & import('react').RefAttributes<FormByIdRef>>;
export {};
//# sourceMappingURL=formById.d.ts.map